import { all } from 'redux-saga/effects';
import { fetchAllEmployeeSaga, fetchSelectedEmployeeSaga } from './employeeSaga';

export function* rootSaga() {
    yield all([fetchAllEmployeeSaga(), fetchSelectedEmployeeSaga()]);
}