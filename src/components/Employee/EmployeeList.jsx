import React, { useState, useEffect } from 'react';
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
import { toast } from 'react-toastify';
import ConfirmComponent from '../../CommonComponent/ConfirmComponent';
import RouteService from '../../Services/RouteService';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from '../../redux/actions/employeeActions';
import {
    fetchAllEmployee, getLoading, getAllEmployee, getCommonError, deleteEmployee,
    getApiTransaction, setApiTransaction
} from '../../redux/slice/employeeSlice';
import Button from '@material-ui/core/Button';
//import { useNavigate } from 'react-router-dom';
import DialogComponent from '../../CommonComponent/DialogComponent';
import { Edit, EditOutlined, EditRounded, DeleteForever } from '@material-ui/icons';
import { getDialogState, setDialogState } from '../../redux/slice/commonSlice';

import { People, PeopleAlt, PeopleAltOutlined, PeopleAltRounded } from '@material-ui/icons';


function EmployeeList(props) {

    const [columns, setColumns] = useState([]);
    //const [openDialog, setOpenDialog] = useState(false);
    const [confirmPopup, setConfirmPopup] = useState(false);
    const [dialogData, setDialogData] = useState({});
    const [addEmployeePopup, setAddEmployeePopup] = useState({});

    //const employeeList = useSelector((state) => state.allEmployee.employees);
    const employeeList = useSelector(getAllEmployee);
    const loading = useSelector(getLoading);
    const apiTransaction = useSelector(getApiTransaction);
    const dialogState = useSelector(getDialogState);

    const dispatch = useDispatch();
    //const navigate = useNavigate();

    useEffect(() => {
        getColumns();
        //dispatch(fetchEmployees());
        dispatch(fetchAllEmployee());
    }, [dispatch]);

    // useEffect(() => {
    //     if (apiTransaction) {
    //         dispatch(setApiTransaction(false));
    //         dispatch(fetchAllEmployee());
    //     }
    // }, [apiTransaction]);

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
    };

    const handleEdit = (row) => {
        attachDialogData(row);
    }

    const attachDialogData = (row) => {
        setDialogData({
            // width: '50vh',
            // height: '50vh',
            //employeeId: row?.EmployeeId == null ? 0 : row?.EmployeeId,
            row: row,
            title: row?.EmployeeId == null ? 'Add Employee' : "Edit Employee",
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
                    progressPending={loading}
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

            {/* <Dialog open={openDialog} aria-labelledby="form-dialog-title" className='p-8'>
                <DialogTitleComponent data={dialogData} handleDialogClose={handleDialogClose}></DialogTitleComponent>
                <EmployeeForm data={dialogData} handleDialogClose={handleDialogClose}></EmployeeForm>
            </Dialog> */}

            {/* <Dialog open={confimDialog} aria-labelledby="form-dialog-title" className='p-8'>
                <DialogTitleComponent data={dialogData} handleDialogClose={handleDialogClose}></DialogTitleComponent>
                <ConfirmComponent data={dialogData} confirmDailogClose={confirmDailogClose}></ConfirmComponent>
            </Dialog> */}

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