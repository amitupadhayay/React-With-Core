import { useEffect } from 'react';

import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import CoreService from './CoreService';
import * as FaIcons from 'react-icons/fa';
//import Notify, { AlertTypes } from '../../Services/Notify';
import { toast } from 'react-toastify';
import Grid from '@material-ui/core/Grid';

import RouteService from '../../Services/RouteService';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { createBrowserHistory } from 'history';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthentication } from '../../redux/slice/employeeSlice';


function Login(props) {

    //const [dialogData, setDialogData] = useState(props.data);
    const history = createBrowserHistory();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.clear();
    }, [])

    const setInitialValue = () => {
        return {
            username: '',
            password: '',
        }
    };

    const validationSchema = yup.object({
        username: yup.string().required("User Name is required"),
        password: yup.string().required("Password is required"),
    });

    const formik = useFormik({
        initialValues: setInitialValue(),
        validationSchema: validationSchema,
        onSubmit: (values) => {
        },
        onChange: () => {
        }
    });

    const handleBlur = (e) => {
        setTimeout(() => {
            formik.setFieldTouched(e.target.name, true);
        }, 10);
    }

    const handleLogin = () => {
        if (formik.isValid) {
            CoreService.checkAuthentication(formik.values.username, formik.values.password)
                .then(response => {
                    if (response.data.Token != null) {
                        localStorage.setItem('token', response.data.Token);
                        toast.success('Login done successfully');
                        //RouteService.navigateByHistory(history,'/employee');
                        dispatch(setAuthentication(true));
                        navigate('/employee');
                    }
                    else {
                        toast.error('Username or Password is incorrect');
                    }
                })
                .catch(function (error) {
                    toast.error(error);
                })
        }
    }

    return (
        <>
            <div className='full-width flex second-back-color hgt-100 absolute'>
                <div className='width-33'></div>
                <div className='width-33 text-center login-mt'>
                    <Card>
                        <CardContent>
                            <form className='form' onSubmit={formik.handleSubmit} onBlur={handleBlur} autoComplete="off">
                                <Grid container spacing={3}>
                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={8}>
                                        <TextField fullWidth name="username" label="User Name" value={formik.values.username}
                                            onChange={formik.handleChange} error={formik.touched.username && Boolean(formik.errors.username)}
                                            helperText={formik.touched.username && formik.errors.username}
                                        ></TextField>
                                    </Grid>
                                    <Grid item xs={2}></Grid>

                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={8}>
                                        <TextField type='password' fullWidth name="password" label="Password" value={formik.values.password}
                                            onChange={formik.handleChange} error={formik.touched.password && Boolean(formik.errors.password)}
                                            helperText={formik.touched.password && formik.errors.password}
                                        ></TextField>
                                    </Grid>
                                    <Grid item xs={2}></Grid>

                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={8}>
                                        <Button type='submit' variant="contained" type="submit" onClick={handleLogin}>
                                            <FaIcons.FaSave></FaIcons.FaSave>Login
                                        </Button>
                                    </Grid>
                                    <Grid item xs={2}></Grid>

                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </div>
                <div className='width-33'></div>

            </div>
        </>
    )

}
export default Login;