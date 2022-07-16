import { ActionTypes } from "../constants/actionTypes"
import EmployeeService from '../../Services/EmployeeService'

export const fetchEmployees = () => {
    return async (dispatch) => {
        const resp = await EmployeeService.getEmployeeList();
        dispatch({ type: ActionTypes.FETCH_EMPLOYEES, payload: resp.data })
    };
}

export const fetchCurrentEmployee = (employeeId) => {
    return async (dispatch) => {
        const resp = await EmployeeService.getEmployeeDetails(employeeId);
        dispatch({ type: ActionTypes.FETCH_CURRENT_EMPLOYEE, payload: resp.data })
    } 
}