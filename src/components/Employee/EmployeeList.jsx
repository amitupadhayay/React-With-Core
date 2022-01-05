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
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { toast } from 'react-toastify';
import ConfirmComponent from '../../CommonComponent/ConfirmComponent';
import RouteService from '../../Services/RouteService';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from '../../redux/actions/employeeActions';
import { fetchAllEmployee, getLoading, getAllEmployee, getCommonError } from '../../redux/slice/employeeSlice';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
import DialogComponent from '../../CommonComponent/DialogComponent';


function EmployeeList(props) {

    const [columns, setColumns] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [confimDialog, setConfimDialog] = useState(false);
    const [dialogData, setDialogData] = useState({});

    //const employeeList = useSelector((state) => state.allEmployee.employees);
    const employeeList = useSelector(getAllEmployee);
    const loading = useSelector(getLoading);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getColumns();
        //dispatch(fetchEmployees());
        dispatch(fetchAllEmployee());
    }, [dispatch]);

    const getColumns = () => {
        let cols = EmployeeService.getColumns();
        cols.push({
            name: '', sortable: false, width: '50px',
            cell: (row, index) => <div className='flex'>
                <div className='width-50'>
                    <FaIcons.FaUserEdit className='main-color' onClick={() => handleEdit(row)}></FaIcons.FaUserEdit>
                </div>
                <div className='width-50 pl-8'>
                    <AiIcons.AiFillDelete className='main-color' onClick={() => handleDelete(row)}></AiIcons.AiFillDelete>,
                </div>
            </div>
        });
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

    const handleEdit = (row) => {
        attachDialogData(row);
        setOpenDialog(true);
    }

    const handleDelete = (row) => {
        attachConfirmDialogData(row);
        setConfimDialog(true);
    }

    const handleRowSelection = (state) => {
        console.log('Selected Rows: ', state.selectedRows);
    }

    const handleRowClicked = row => {
        navigate(`/employee/${row.Id}`);
    };


    const confirmDailogClose = (row, resp) => {
        if (resp) {
            deleteEmployee(row.id);
        }
        else {
            setConfimDialog(false);
        }
    }

    const deleteEmployee = (id) => {
        EmployeeService.deleteEmployee(id)
            .then(response => {
                toast.success('Employee deleted successfully');
                setConfimDialog(false);
                getEmployeeList();
            })
            .catch(function (error) {
                toast.error(error);
            })
    }

    const handleDialogClose = (resp) => {
        setOpenDialog(resp);
        setConfimDialog(resp);
        if (resp) {
            getEmployeeList();
        }
    };


    const attachDialogData = (row) => {
        setDialogData({
            // width: '50vh',
            // height: '50vh',
            employeeId: row?.EmployeeId == null ? 0 : row?.EmployeeId,
            row: row,
            title: row?.EmployeeId == null ? 'Add Employee' : "Edit Employee",
            component: <EmployeeForm data={row} handleDialogClose={handleDialogClose}></EmployeeForm>
        });
        setOpenDialog(true);
    }

    const attachConfirmDialogData = (row) => {
        setDialogData({
            id: row.EmployeeId,
            title: 'confirm',
            message: 'Are you sure?'
        });
        setConfimDialog(true);
    }

    const goToEmployeeServer = () => {
        navigate('/employeeserver');
    }

    return (
        <div>

            <div className='sub-header pl-16'>
                <span onClick={() => attachDialogData(null)}><FaIcons.FaUserPlus></FaIcons.FaUserPlus>  Add Employee</span>
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
                    onSelectedRowsChange={handleRowSelection}
                    onRowClicked={handleRowClicked}
                />
            </div>

            <div>
                <span onClick={() => goToEmployeeServer()}><FaIcons.FaUserPlus></FaIcons.FaUserPlus> Employee Server</span>
            </div>

            {/* <Dialog open={openDialog} aria-labelledby="form-dialog-title" className='p-8'>
                <DialogTitleComponent data={dialogData} handleDialogClose={handleDialogClose}></DialogTitleComponent>
                <EmployeeForm data={dialogData} handleDialogClose={handleDialogClose}></EmployeeForm>
            </Dialog> */}

            {openDialog ? (
                <DialogComponent data={dialogData} handleDialogClose={handleDialogClose}>
                </DialogComponent>
            ) : null}

            {/* <Dialog open={confimDialog} aria-labelledby="form-dialog-title" className='p-8'>
                <DialogTitleComponent data={dialogData} handleDialogClose={handleDialogClose}></DialogTitleComponent>
                <ConfirmComponent data={dialogData} confirmDailogClose={confirmDailogClose}></ConfirmComponent>
            </Dialog> */}

        </div >
    );

}
export default EmployeeList;