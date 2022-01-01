import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axiosAPI from '../../Services/axiosAPI';
import {
    fetchAllEmployeeSuccess, fetchSelectedEmployeeSuccess,
    setCommonError, saveEmployeeSuceess
}
    from '../slice/employeeSlice';
import ControllerName from '../../Constants/global-constant';
import APIService from '../../Services/APIService'


function* fetchAllEmployeeFunc() {
    try {
        const resp = yield call(() => axiosAPI.get(`${ControllerName.Employee}GetEmployeeListReact()`));
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
        let employeeId = action.payload.toString();
        const resp = yield call(() => axiosAPI.get(`${ControllerName.Employee}GetEmployeeDetails(employeeId=${employeeId})`));
        yield put(fetchSelectedEmployeeSuccess(resp?.data));
    }
    catch (error) {
        yield put(setCommonError(error));
    }
}

export function* fetchSelectedEmployeeSaga() {
    yield takeEvery('employee/fetchSelectedEmployee', fetchSelectedEmployeeFunc)
}

function* saveEmployeeFunc(action) {
    try {
        const resp = yield call(() => APIService.post("AddEditEmployee", ControllerName.Employee, action.payload));
        yield put(saveEmployeeSuceess(resp));
    }
    catch (error) {
        yield put(setCommonError(error));
    }
}

export function* saveEmployeeSaga() {
    yield takeEvery('employee/saveEmployee', saveEmployeeFunc)
}