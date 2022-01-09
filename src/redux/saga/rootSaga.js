import { all } from 'redux-saga/effects';
import { fetchAllEmployeeSaga, fetchSelectedEmployeeSaga, saveEmployeeSaga, deleteEmployeeSaga } from './employeeSaga';

export function* rootSaga() {
    yield all([fetchAllEmployeeSaga(), fetchSelectedEmployeeSaga(), saveEmployeeSaga(),
    deleteEmployeeSaga()]);
}