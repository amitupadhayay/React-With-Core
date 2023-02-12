
import  {  useEffect } from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSelectedEmployee, getSelectedEmployee, getLoading } from '../../redux/slice/employeeSlice';
import CommonLoaderIcon from '../../CommonComponent/CommonLoader';

import { Forward } from '@material-ui/icons';

function EmployeeDetails(props) {

    //const employee = useSelector((state) => state.currentEmployee);
    const dispatch = useDispatch();
    const { employeeId } = useParams();
    //const navigate = useNavigate();
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
        //navigate('/employee');
    }

    return (
        <div>
            <div className='sub-header'>
                <span className='pl-16' onClick={() => goBack()}><Forward></Forward> Back </span>
            </div>
            <div className="card">
                {loading ? (<CommonLoaderIcon />) : (
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
                )}
            </div>
        </div>
    )
}

export default EmployeeDetails;