import React, { useState, useEffect, setState, state, Component } from 'react';
import axios from 'axios';
import EmployeeForm from './EmployeeForm';
import EmployeeService from '../../Services/EmployeeService';
//import ReactTable from "react-table";  
//import "react-table/react-table.css";  

//import DataTable from 'react-data-table-component';
import DataTable, { createTheme } from 'react-data-table-component';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CommonLoaderIcon from '../../CommonComponent/CommonLoader';
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogTitleComponent from '../../CommonComponent/DialogTitleComponent';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { toast } from 'react-toastify';
import ConfirmComponent from '../../CommonComponent/ConfirmComponent';
import RouteService from '../../Services/RouteService';


function EmployeeList(props) {

    const [employeeList, setEmployeeList] = useState([]);
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [confimDialog, setConfimDialog] = useState(false);
    const [dialogData, setDialogData] = useState({});

    useEffect(() => {
        getEmployeeList();
        getColumns();
    }, []);

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

    const getEmployeeList = () => {
        EmployeeService.getEmployeeList()
            .then(response => {
                setEmployeeList(response.data);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            })
    }

    const handleEdit = (row) => {
        attachDialogData(row);
        setOpenDialog(true);
    }

    const handleDelete = (row) => {
        attachConfirmDialogData(row);
        setConfimDialog(true);
    }

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
        setOpenDialog(false);
        setConfimDialog(false);
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
            title: "Add Employee",
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

    const goToEmployeeServer = ()=>{
        //props.history.push('/employeeserver');
        RouteService.navigate(props,'/employeeserver');
    }

    return (
        <div>

            <div className='sub-header'>
                <span onClick={() => attachDialogData(null)}><FaIcons.FaUserPlus></FaIcons.FaUserPlus>  Add Employee</span>
            </div>

            <div class='pt-36'>
                <DataTable
                    title=""
                    columns={columns}
                    data={employeeList}
                    pagination
                    highlightOnHover
                    progressPending={loading ? true : false}
                    progressComponent={<CommonLoaderIcon />}
                    persistTableHead
                />
            </div>

            <div>
            <span onClick={() => goToEmployeeServer()}><FaIcons.FaUserPlus></FaIcons.FaUserPlus> Employee Server</span>
            </div>

            <Dialog open={openDialog} aria-labelledby="form-dialog-title" className='p-8'>
                <DialogTitleComponent data={dialogData} handleDialogClose={handleDialogClose}></DialogTitleComponent>
                <EmployeeForm data={dialogData} handleDialogClose={handleDialogClose}></EmployeeForm>
            </Dialog>

            <Dialog open={confimDialog} aria-labelledby="form-dialog-title" className='p-8'>
                <DialogTitleComponent data={dialogData} handleDialogClose={handleDialogClose}></DialogTitleComponent>
                <ConfirmComponent data={dialogData} confirmDailogClose={confirmDailogClose}></ConfirmComponent>
            </Dialog>

        </div >
    );

}
export default EmployeeList;