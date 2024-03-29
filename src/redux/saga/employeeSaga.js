import { call, put, takeEvery } from 'redux-saga/effects';
import {
    fetchAllEmployeeSuccess, fetchSelectedEmployeeSuccess,
    setCommonError, deleteEmployeeSuceess, modifyEmployeeData, removeEmployeeData
}
    from '../slice/employeeSlice';
import { setDialogState } from '../slice/commonSlice';
import ControllerName from '../../Constants/global-constant';
import APIService from '../../Services/APIService';
import { toast } from 'react-toastify';


function* fetchAllEmployee() {
    try {
        const resp = yield call(() => APIService.get(ControllerName.Employee, 'GetEmployeeList()'));
        yield put(fetchAllEmployeeSuccess(resp?.data));
    }
    catch (error) {
        yield put(setCommonError(error));
    }
}

export function* fetchAllEmployeeSaga() {
    yield takeEvery('employee/fetchAllEmployee', fetchAllEmployee)
}

function* fetchSelectedEmployeeFunc(action) {
    try {
        let employeeId = parseInt(action.payload);
        //const resp = yield call(() => APIService.get(ControllerName.Employee,`GetEmployeeDetails(employeeId=${employeeId})`));
        const resp = yield call(() => APIService.djangoGet(`employee/${employeeId}/`));
        yield put(fetchSelectedEmployeeSuccess(resp?.data));
    }
    catch (error) {
        yield put(setCommonError(error));
    }
}

export function* fetchSelectedEmployeeSaga() {
    yield takeEvery('employee/fetchSelectedEmployee', fetchSelectedEmployeeFunc);
}

function* saveEmployee(action) {
    console.log(action);
    try {
        const resp = yield call(() => APIService.post(ControllerName.Employee, "AddEditEmployee", action.payload));
        //yield put(saveEmployeeSuceess());
        yield put(setDialogState(false));
        yield put(modifyEmployeeData(resp?.data));
        toast.success(`Employee ${action?.payload?.Id === null ? 'added' : 'updated'} successfully.`);
    }
    catch (error) {
        yield put(setCommonError(error));
    }
}

export function* saveEmployeeSaga() {
    yield takeEvery('employee/saveEmployee', saveEmployee);
}

function* deleteEmployeeFunc(action) {
    try {
        const resp = yield call(() => APIService.delete(ControllerName.Employee, "DeleteEmployee(employeeId=" + action.payload + ")"));
        yield put(deleteEmployeeSuceess(resp));
        yield put(removeEmployeeData(action?.payload));
        toast.success(`Employee deleted successfully.`);
    }
    catch (error) {
        yield put(setCommonError(error));
    }
}

export function* deleteEmployeeSaga() {
    yield takeEvery('employee/deleteEmployee', deleteEmployeeFunc);
}