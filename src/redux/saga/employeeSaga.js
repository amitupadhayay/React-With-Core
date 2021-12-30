import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axiosAPI from '../../Services/axiosAPI';
import { fetchAllEmployeeSuccess, fetchSelectedEmployeeSuccess } from '../slice/employeeSlice';
import ControllerName from '../../Constants/global-constant'


function* fetchAllEmployeeFunc() {
    const resp = yield call(() => axiosAPI.get(`${ControllerName.Employee}GetEmployeeListReact()`));
    yield put(fetchAllEmployeeSuccess(resp.data));
}

export function* fetchAllEmployeeSaga() {
    yield takeEvery('employee/fetchAllEmployee', fetchAllEmployeeFunc)
}

function* fetchSelectedEmployeeFunc(action) {
    let employeeId = action.payload.toString();
    const resp = yield call(() => axiosAPI.get(`${ControllerName.Employee}GetEmployeeDetails(employeeId=${employeeId})`));
    yield put(fetchSelectedEmployeeSuccess(resp.data));
}

export function* fetchSelectedEmployeeSaga() {
    yield takeEvery('employee/fetchSelectedEmployee', fetchSelectedEmployeeFunc)
}