import { useEffect } from 'react';

import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useDispatch } from 'react-redux';
import { authentication } from '../../redux/slice/commonSlice';

import { Save} from '@material-ui/icons';


function Login(props) {
    //const [dialogData, setDialogData] = useState(props.data);
    //const history = createBrowserHistory();
    //const navigate = useNavigate();
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
        formik.setFieldTouched(e.target.name, true);
    }

    const handleLogin = () => {
        if (formik.isValid) {
            // CoreService.checkAuthentication(formik.values.username, formik.values.password)
            //     .then(response => {
            //         if (response.data.Token != null) {
            //             localStorage.setItem('token', response.data.Token);
            //             toast.success('Login done successfully');
            //             dispatch(setAuthentication(true));
            //             navigate('/employee');
            //         }
            //         else {
            //             toast.error('Username or Password is incorrect');
            //         }
            //     })
            //     .catch(function (error) {
            //         toast.error(error);
            //     })

            let formData = {
                username: formik.values.username,
                password: formik.values.password,
            };

            dispatch(authentication(formData));
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
                                        <TextField fullWidth variant="outlined" name="username" label="User Name" value={formik.values.username}
                                            onChange={formik.handleChange} error={formik.touched.username && Boolean(formik.errors.username)}
                                            helperText={formik.touched.username && formik.errors.username}
                                        ></TextField>
                                    </Grid>
                                    <Grid item xs={2}></Grid>

                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={8}>
                                        <TextField type='password' variant="outlined" fullWidth name="password" label="Password" value={formik.values.password}
                                            onChange={formik.handleChange} error={formik.touched.password && Boolean(formik.errors.password)}
                                            helperText={formik.touched.password && formik.errors.password}
                                        ></TextField>
                                    </Grid>
                                    <Grid item xs={2}></Grid>

                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={8}>
                                        <Button type='submit' variant="contained" onClick={handleLogin}>
                                            <Save></Save>Login
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