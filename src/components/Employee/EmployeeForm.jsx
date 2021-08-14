import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitleComponent from '../../CommonComponent/DialogTitleComponent';
import Grid from '@material-ui/core/Grid';

import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import EmployeeService from '../../Services/EmployeeService';
import * as FaIcons from 'react-icons/fa';
import Notify, { AlertTypes } from '../../Services/Notify';
import { toast } from 'react-toastify';

// const validationSchema = yup.object({
//     email: yup.string().email("Enter a valid email").required("Email is required"),
//     password: yup.string().min(8, "Password should be of minimum 8 characters length").required("Password is required")
//   });

function EmployeeForm(props) {

    const [open, setOpen] = useState(false);
    const [dialogData, setDialogData] = useState(props.data);

    useEffect(() => {
        setFormValue();
    }, [])

    const setInitialValue = () => {
        return {
            firstname: '',
            lastname: '',
            salary: '',
            address1: '',
            address2: ''
        }
    };

    const validationSchema = yup.object({
        firstname: yup.string().required("First Name is required"),
        lastname: yup.string().required("Last Name is required"),
        salary: yup.string().required("Salary is required"),
        address1: yup.string().required("Address1 is required"),
        address2: yup.string().required("Address2 is required"),
    });

    const formik = useFormik({
        initialValues: setInitialValue(),
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let asd = formik.errors;
            //console.log(values);
        },
        // onChange: () => {
        //     let asds = formik;
        // }
        onChange: () => {
            console.log('test');
        }
    });

    const setFormValue = () => {
        if (dialogData.employeeId != 0) {
            formik.setFieldValue('firstname', dialogData.row.FirstName);
            formik.setFieldValue('lastname', dialogData.row.LastName);
            formik.setFieldValue('salary', dialogData.row.Salary);
            formik.setFieldValue('address1', dialogData.row.Address1);
            formik.setFieldValue('address2', dialogData.row.Address2);

            setTimeout(() => {
                formik.setFieldTouched('firstname', true);
                formik.setFieldTouched('lastname', true);
                formik.setFieldTouched('salary', true);
                formik.setFieldTouched('address1', true);
                formik.setFieldTouched('address2', true);
            }, 10);


            // formik.values.firstname =  dialogData.row.FirstName;
            // formik.values.lastname =  dialogData.row.LastName;
            // formik.values.salary =  dialogData.row.Salary;
            // formik.values.address1 =  dialogData.row.Address1;
            // formik.values.address2 =  dialogData.row.Address2;

            // formik.touched.firstname = true;
            // formik.touched.lastname = true;
            // formik.touched.salary = true;
            // formik.touched.address1 = true;
            // formik.touched.address2 = true;

            formik.validateForm();
        }
    }

    const handleBlur = (e) => {
        setTimeout(() => {
            formik.setFieldTouched(e.target.name, true);
        }, 10);
    }

    const addEmplyee = () => {
        if (formik.isValid) {
            var val = {
                EmployeeId: dialogData.row == null ? 0 : dialogData.row.EmployeeId,
                FirstName: formik.values.firstname,
                LastName: formik.values.lastname,
                Salary: parseInt(formik.values.salary),
                Address1: formik.values.address1,
                Address2: formik.values.address2,
                CreatedDate: new Date(),
                ModifiedDate: new Date(),
            };

            EmployeeService.saveEmployee(val)
                .then(response => {
                    if (dialogData.employeeId == 0) {
                        toast.success('Employee added successfully');
                    }
                    else {
                        toast.success('Employee updated successfully');
                    }

                    props.handleDialogClose(true);
                })
                .catch(function (error) {
                    toast.error(error);
                })
        }
    }


    return (
        <div>

            <form className='form' onSubmit={formik.handleSubmit} onBlur={handleBlur} autoComplete="off">

                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <TextField fullWidth name="firstname" label="First Name" value={formik.values.firstname}
                            onChange={formik.handleChange} error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                            helperText={formik.touched.firstname && formik.errors.firstname}
                        ></TextField>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth name="lastname" label="Last Name" value={formik.values.lastname}
                            onChange={formik.handleChange} error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                            helperText={formik.touched.lastname && formik.errors.lastname}
                        ></TextField>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth name="salary" label="Salary" value={formik.values.salary}
                            onChange={formik.handleChange} error={formik.touched.salary && Boolean(formik.errors.salary)}
                            helperText={formik.touched.salary && formik.errors.salary}
                        ></TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField fullWidth name="address1" label="Address 1" value={formik.values.address1}
                            onChange={formik.handleChange} error={formik.touched.address1 && Boolean(formik.errors.address1)}
                            helperText={formik.touched.address1 && formik.errors.address1}
                        ></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth name="address2" label="Address 2" value={formik.values.address2}
                            onChange={formik.handleChange} error={formik.touched.address2 && Boolean(formik.errors.address2)}
                            helperText={formik.touched.address2 && formik.errors.address2}
                        ></TextField>
                    </Grid>

                    <Grid item xs={7}></Grid>
                    <Grid item xs={5}>
                        <Button disabled={!formik.isValid} variant="contained" type="submit" onClick={addEmplyee}>
                            <FaIcons.FaSave></FaIcons.FaSave>Save Employee
                        </Button>
                    </Grid>


                </Grid>

            </form>


        </div>







    )

}
export default EmployeeForm;