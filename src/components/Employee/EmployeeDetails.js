
import React, { useState, useEffect } from 'react';
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

import { useDispatch, useSelector } from 'react-redux';
import EmployeeService from '../../Services/EmployeeService';
import { fetchCurrentEmployee } from '../../redux/actions/employeeActions';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import RouteService from '../../Services/RouteService';
import { fetchSelectedEmployee, getSelectedEmployee, getLoading } from '../../redux/slice/employeeSlice';

function EmployeeDetails(props) {

    //const employee = useSelector((state) => state.currentEmployee);
    const dispatch = useDispatch();
    let { employeeId } = useParams();
    const navigate = useNavigate();
    const employee = useSelector(getSelectedEmployee);
    const loading = useSelector(getLoading);

    useEffect(() => {
        if (employeeId && employeeId != '') {
            //dispatch(fetchCurrentEmployee(employeeId));
            dispatch(fetchSelectedEmployee(employeeId));
        }
    }, []);

    // const getEmployeeDetail = async () => {
    //     const resp = await EmployeeService.getEmployeeDetails(employeeId)
    //         .catch((err) => {
    //             console.log(err);
    //         });
    //     dispatch(getCurrentEmployees(resp?.data));
    // }

    const goBack = () => {
        navigate('/employee');
    }

    return (
        <div>
            <div className='sub-header'>
                <span onClick={() => goBack()}><FaIcons.FaBackward></FaIcons.FaBackward> Back </span>
            </div>
            {/* <div>
                <Button variant="contained" color="primary" onClick={() => goBack()}>
                    Back
                </Button>
            </div> */}
            <div className="card">
                <Card>
                    <CardContent>
                        <img src='https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg'></img>
                        <h2>{employee?.FirstName} {employee?.LastName}</h2>
                        <h4>{employee?.Salary}</h4>
                        <h4>{employee?.Address1} {employee?.Address2}</h4>
                        <h4>{employee?.CreatedDate}</h4>
                        <h4>{employee?.ModifiedDate}</h4>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default EmployeeDetails;