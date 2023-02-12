import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, MenuItem } from "@material-ui/core";
import { Save } from '@material-ui/icons';

import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { getDialogLoading, saveEmployee } from '../../redux/slice/employeeSlice';

import { GlobalVariable } from '../../Constants/global-constant';
import CommonLoaderIcon from '../../CommonComponent/CommonLoader';
import TextboxComponent from '../../Controls/TextboxComponent';
import NumberComponent from '../../Controls/NumberComponent';
import { crudEmployee } from '../../Services/Employee';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

// const validationSchema = yup.object({
//     email: yup.string().email("Enter a valid email").required("Email is required"),
//     password: yup.string().min(8, "Password should be of minimum 8 characters length").required("Password is required")
//   });

function EmployeeForm(props) {

    const [row] = useState(props.data);
    // const [employeeData, setEmployeeData] = useState<EmployeeProps>({});
    const dispatch = useDispatch();
    const loading = useSelector(getDialogLoading);
    const [employeeTypeList, setEmployeeTypeList] = useState([]);

    const { mutate: formMutate, isLoading, isError, error } = useMutation(crudEmployee, {
        onSuccess: () => {
            props.handleDialogClose(false);
        },
        onError: (error) => {
            toast.error(`something wrong`);
        }
    })

    useEffect(() => {
        //setFormValue();
        getEmployeeTypeList();
    }, []);

    const getEmployeeTypeList = () => {
        let list = [];
        list.push({ Text: "Permanent", Value: 0 });
        list.push({ Text: "Temporary", Value: 1 });
        list.push({ Text: "Contract", Value: 2 });
        list.push({ Text: "Payroll", Value: 3 });
        list.push({ Text: "Third Party", Value: 4 });
        setEmployeeTypeList(list);
    }

    const setInitialValue = () => {
        if (row?.EmployeeId !== "") {
            return {
                firstname: row?.FirstName,
                lastname: row?.LastName,
                salary: row?.Salary,
                address1: row?.Address1,
                address2: row?.Address2,
                employeetype: row?.EmployeeType,
            }
        }
        else {
            return {
                firstname: '',
                lastname: '',
                salary: '',
                address1: '',
                address2: '',
                employeetype: '',
            }
        }
    };

    const validationSchema = yup.object({
        firstname: yup.string().required("First Name is required"),
        lastname: yup.string().required("Last Name is required"),
        //salary: yup.number().integer().required("Salary is required"),
        salary: yup.string().required('Salary is required')
            .matches(GlobalVariable.DecimalOnly, GlobalVariable.DecimalOnlyMsg),
        address1: yup.string().required("Address1 is required"),
        address2: yup.string().required("Address2 is required"),
        employeetype: yup.string().nullable().required("Employee Type is required"),
    });

    const formik = useFormik({
        initialValues: setInitialValue(),
        validationSchema: validationSchema,
        validateOnMount: true,
        // onSubmit: (values) => {
        //     //console.log('onSubmit');
        // },
        // onChange: () => {
        //     //console.log('onChange');
        // },
        // handleChange: () => {
        //     //console.log('handleChange');
        // }
    });

    const setFormValue = () => {
        // if (dialogData.employeeId != 0) {
        //     formik.setFieldValue('firstname', dialogData.row.FirstName);
        //     formik.setFieldValue('lastname', dialogData.row.LastName);
        //     formik.setFieldValue('salary', dialogData.row.Salary);
        //     formik.setFieldValue('address1', dialogData.row.Address1);
        //     formik.setFieldValue('address2', dialogData.row.Address2);

        //     setTimeout(() => {
        //         formik.setFieldTouched('firstname', true);
        //         formik.setFieldTouched('lastname', true);
        //         formik.setFieldTouched('salary', true);
        //         formik.setFieldTouched('address1', true);
        //         formik.setFieldTouched('address2', true);
        //     }, 10);


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

        //formik.validateForm();
        //}

    }

    const handleBlur = (e) => {
        formik.setFieldTouched(e.target.name, true);
    }

    const saveEmployee = () => {
        //formik.touched = true;
        if (formik.isValid) {
            let formData = {
                Id: row == null ? null : row?.Id,
                FirstName: formik.values.firstname,
                LastName: formik.values.lastname,
                Salary: parseFloat(formik.values.salary),
                Address1: formik.values.address1,
                Address2: formik.values.address2,
                //CreatedDate: new Date(),
                //ModifiedDate: new Date(),
                EmployeeTypeId: formik.values.employeetype,
                EmployeeTypeText: employeeTypeList?.find(x => x.Value == formik.values?.employeetype)?.Text,
            };

            // EmployeeService.saveEmployee(formData)
            //     .then(response => {
            //         if (row?.EmployeeId === "") {
            //             toast.success('Employee added successfully');
            //         }
            //         else {
            //             toast.success('Employee updated successfully');
            //         }

            //         props.handleDialogClose(false);
            //     })
            //     .catch(function (error) {
            //         toast.error(error);
            //     });

            // dispatch(saveEmployee(formData));
            formMutate(formData);
        }
    }


    return (
        <div>

            <form className='form' onSubmit={formik.handleSubmit} onBlur={handleBlur} autoComplete="off">

                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <TextboxComponent name="firstname" label="First Name" value={formik.values.firstname}
                            formik={formik}></TextboxComponent>
                    </Grid>
                    <Grid item xs={6}>
                        <TextboxComponent name="lastname" label="Last Name" value={formik.values.lastname}
                            formik={formik}></TextboxComponent>
                    </Grid>
                    <Grid item xs={6}>
                        {/* <TextField fullWidth variant="outlined" name="salary" label="Salary" value={formik.values.salary}
                            onChange={formik.handleChange} error={formik.touched.salary && Boolean(formik.errors.salary)}
                            helperText={formik.touched.salary && formik.errors.salary}
                        ></TextField> */}
                        <NumberComponent name="salary" label="Salary" value={formik.values.salary}
                            formik={formik}></NumberComponent>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField fullWidth select variant="outlined" name="employeetype" label="Employee Type" value={formik.values.employeetype}
                            onChange={formik.handleChange} error={formik.touched.employeetype && Boolean(formik.errors.employeetype)}
                            helperText={formik.touched.employeetype && formik.errors.employeetype}>
                            {employeeTypeList.map((option) => (
                                <MenuItem key={option.Value} value={option.Value}>
                                    {option.Text}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField fullWidth multiline rows={2} maxRows={4} variant="outlined"
                            name="address1" label="Address 1" value={formik.values.address1}
                            onChange={formik.handleChange} error={formik.touched.address1 && Boolean(formik.errors.address1)}
                            helperText={formik.touched.address1 && formik.errors.address1}
                        ></TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField fullWidth multiline rows={2} maxRows={4} variant="outlined"
                            name="address2" label="Address 2" value={formik.values.address2}
                            onChange={formik.handleChange} error={formik.touched.address2 && Boolean(formik.errors.address2)}
                            helperText={formik.touched.address2 && formik.errors.address2}
                        ></TextField>
                    </Grid>

                    <Grid item xs={7}></Grid>
                    <Grid item xs={5}>
                        <Button variant="contained" type="submit" onClick={saveEmployee}>
                            {loading ? <CommonLoaderIcon size={20} text="Saving..." /> : <>
                                <Save className='btn-icon'></Save>
                                Save Employee </>
                            }
                        </Button>

                    </Grid>


                </Grid>

            </form>


        </div >
    )
}


EmployeeForm.propTypes = {
    EmployeeId: PropTypes.string,
    FirstName: PropTypes.string,
    LastName: PropTypes.string,
    Salary: PropTypes.string,
    Address1: PropTypes.string,
    Address2: PropTypes.string,
    // CreatedDate: PropTypes.Date,
    // ModifiedDate: PropTypes.Date,
}

export default EmployeeForm;