import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import APIService from '../../Services/APIService';
import { toast } from 'react-toastify';
import {
    authentication, authenticationSuccess, setCommonError
}
    from '../slice/commonSlice';
import Controller from '../../Constants/global-constant';
import navigate from '../../history'
import WithNavigate from '../../Services/RouteService';
import history from '../../history';


function* authenticationFunc(action) {
    try {
        debugger;
        let userName = action?.payload?.username;
        let password = action?.payload?.password;
        const resp = yield call(() => APIService.get(Controller.Auth, `CheckAuthentication(userName=${userName},password=${password})`));
        if (resp?.data?.UserName) {
            yield put(authenticationSuccess(true));
            localStorage.setItem('token', resp?.data?.Token);
            toast.success('Login done successfully');
            //navigate('/employee');
            history.push('/employee');
        }
        else {
            toast.error('Username or Password is not correct!');
        }
    }
    catch (error) {
        yield put(setCommonError(error));
    }
}

export function* authenticationSaga() {
    yield takeEvery('common/authentication', authenticationFunc)
}

