import { useState, useEffect } from 'react';
import EmployeeForm from './EmployeeForm';
import EmployeeService from '../../Services/EmployeeService';
//import ReactTable from "react-table";  
//import "react-table/react-table.css";  

//import DataTable from 'react-data-table-component';
import DataTable, { memoize } from 'react-data-table-component';
//import LinearProgress from '@material-ui/core/LinearProgress';
//import { makeStyles, useTheme } from '@material-ui/core/styles';
import CommonLoaderIcon from '../../CommonComponent/CommonLoader';
//import Button from "@material-ui/core/Button";
//import Dialog from '@material-ui/core/Dialog';
//import DialogTitleComponent from '../../CommonComponent/DialogTitleComponent';
import ConfirmComponent from '../../CommonComponent/ConfirmComponent';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAllEmployee, getLoading, getAllEmployee, deleteEmployee,
    getApiTransaction
} from '../../redux/slice/employeeSlice';
//import { useNavigate } from 'react-router-dom';
import DialogComponent from '../../CommonComponent/DialogComponent';
import { EditRounded, DeleteForever } from '@material-ui/icons';
import { getDialogState, setDialogState } from '../../redux/slice/commonSlice';

import { People } from '@material-ui/icons';
import { useQuery } from "react-query";
import { UrlConstant } from '../../Constants/global-constant';
import axios from 'axios';
import { fetchEmployees, getAllEmployeeList } from '../../Services/Employee';

// const fetchEmployees = async () => {
//     const res = await fetch('https://localhost:44312/api/GetEmployeeList()');
//     return res.json();
// }

// const fetchEmployees = async () => {
//     const res = await axios.get('https://localhost:44312/api/GetEmployeeList()');
//     return res.data;
// }


function EmployeeList(props) {

    const [columns, setColumns] = useState([]);
    //const [openDialog, setOpenDialog] = useState(false);
    const [confirmPopup, setConfirmPopup] = useState(false);
    const [dialogData, setDialogData] = useState({});
    const [addEmployeePopup, setAddEmployeePopup] = useState({});

    //const employeeList = useSelector((state) => state.allEmployee.employees);
    //const employeeList = useSelector(getAllEmployee);
    const loading = useSelector(getLoading);
    const apiTransaction = useSelector(getApiTransaction);
    const dialogState = useSelector(getDialogState);
    //const [employeeList, setEmployeeList] = useState([]);
    const dispatch = useDispatch();
    //const navigate = useNavigate();

    const { isLoading, error, data: employeeList, refetch: fetchEmployeeList } = useQuery("employee", getAllEmployeeList);

    useEffect(() => {
        getColumns();
        // dispatch(fetchAllEmployee());
    }, [dispatch]);

    const getColumns = () => {
        let cols = [];
        cols.push({
            name: 'Action', sortable: false, className: 'action-width',
            cell: (row, index) => <div>
                <EditRounded className='main-color' onClick={() => handleEdit(row)}></EditRounded>
                <DeleteForever className='main-color' onClick={() => handleDelete(row)}></DeleteForever>
            </div>
        });
        let allRows = EmployeeService.getEmployeeColumns();
        for (let r of allRows) {
            cols.push(r);
        }
        setColumns(cols);
    }

    const getEmployeeList = async () => {
        // EmployeeService.getEmployeeList()
        //     .then(response => {
        //         setEmployeeList(response.data);
        //         setLoading(false);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //         setLoading(false);
        //     })

        // const resp = await EmployeeService.getEmployeeList()
        //     .catch((err) => {
        //         console.log(err);
        //     });

        //dispatch(fetchEmployees());
        //setLoading(false);       
    }

    const handleDelete = (row) => {
        attachConfirmDialogData(row);
    }

    const attachConfirmDialogData = (row) => {
        let message = 'Are you sure?';
        setDialogData({
            width: '30vh',
            height: '10vh',
            //id: row.EmployeeId,
            title: 'confirmation',
            component: <ConfirmComponent id={row?.EmployeeId} message={message} confirmDailogClose={confirmDailogClose}></ConfirmComponent>
        });
        setConfirmPopup(true);
        dispatch(setDialogState(true));
    }

    const confirmDailogClose = (id, resp) => {
        if (resp) {
            dispatch(deleteEmployee(id));
        }
        handleDialogClose(false);
    }

    const handleRowSelection = (state) => {
        console.log('Selected Rows: ', state.selectedRows);
    }

    const handleRowClicked = row => {
        //navigate(`/employee/${row.Id}`);
        //navigate(`/employee/${row.id}`);
    };

    const handleDialogClose = (resp) => {
        dispatch(setDialogState(resp));
        setAddEmployeePopup(resp);
        setConfirmPopup(resp);
        fetchEmployeeList();
    };

    const handleEdit = (row) => {
        attachDialogData(row);
    }

    const attachDialogData = (row) => {
        setDialogData({
            //employeeId: row?.EmployeeId == null ? 0 : row?.EmployeeId,
            row: row,
            title: row?.Id == null ? 'Add Employee' : "Edit Employee",
            component: <EmployeeForm data={row} handleDialogClose={handleDialogClose}></EmployeeForm>
        });
        dispatch(setDialogState(true));
        setAddEmployeePopup(true);
    }

    const goToEmployeeServer = () => {
        // navigate('/employeeserver');
    }

    return (
        <div>

            <div className='sub-header pl-16'>
                <span onClick={() => attachDialogData(null)}><People></People>  Add Employee</span>
            </div>

            <div className='pt-36'>
                <DataTable
                    title=""
                    columns={columns}
                    data={employeeList}
                    pagination
                    highlightOnHover
                    progressPending={isLoading}
                    progressComponent={<CommonLoaderIcon size={40} text='Loading... Please Wait' />}
                    persistTableHead
                    selectableRows // add for checkbox selection
                    selectableRowsHighlight
                    onSelectedRowsChange={handleRowSelection}
                    onRowClicked={handleRowClicked}
                />
            </div>

            <div>
                <span onClick={() => goToEmployeeServer()}><People></People> Employee Server</span>
            </div>

            {dialogState && addEmployeePopup ? (
                <DialogComponent data={dialogData} handleDialogClose={handleDialogClose}>
                </DialogComponent>
            ) : null}

            {dialogState && confirmPopup ? (
                <DialogComponent data={dialogData} handleDialogClose={handleDialogClose}>
                </DialogComponent>
            ) : null}



        </div >
    );

}
export default EmployeeList;