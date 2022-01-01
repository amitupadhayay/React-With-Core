import { all } from 'redux-saga/effects';
import { fetchAllEmployeeSaga, fetchSelectedEmployeeSaga, saveEmployeeSaga } from './employeeSaga';

export function* rootSaga() {
    yield all([fetchAllEmployeeSaga(), fetchSelectedEmployeeSaga(), saveEmployeeSaga()]);
}