import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axiosAPI from '../../Services/axiosAPI';
import {
    fetchAllEmployeeSuccess, fetchSelectedEmployeeSuccess, saveEmployeeSuceess,
    setCommonError, deleteEmployeeSuceess, modifyEmployeeData, removeEmployeeData
}
    from '../slice/employeeSlice';
import { setDialogState } from '../slice/commonSlice';
import ControllerName from '../../Constants/global-constant';
import APIService from '../../Services/APIService';
import { toast } from 'react-toastify';


function* fetchAllEmployeeFunc() {
    try {
        const resp = yield call(() => APIService.get(ControllerName.Employee, 'GetEmployeeListReact()'));
        yield put(fetchAllEmployeeSuccess(resp?.data));
    }
    catch (error) {
        yield put(setCommonError(error));
    }
}

export function* fetchAllEmployeeSaga() {
    yield takeEvery('employee/fetchAllEmployee', fetchAllEmployeeFunc)
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

function* saveEmployeeFunc(action) {
    try {
        const resp = yield call(() => APIService.post(ControllerName.Employee, "AddEditEmployee", action.payload));
        yield put(saveEmployeeSuceess());
        yield put(setDialogState(false));
        yield put(modifyEmployeeData(resp?.data));
        toast.success(`Employee ${action?.payload?.EmployeeId === null ? 'added' : 'updated'} successfully.`);
    }
    catch (error) {
        yield put(setCommonError(error));
    }
}

export function* saveEmployeeSaga() {
    yield takeEvery('employee/saveEmployee', saveEmployeeFunc);
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