import { call, put, takeEvery } from 'redux-saga/effects';
import APIService from '../../Services/APIService';
import { toast } from 'react-toastify';
import { authenticationSuccess, setCommonError } from '../slice/commonSlice';
import Controller from '../../Constants/global-constant';
import RouterService from '../../Services/RouterService'

function* authenticationFunc(action) {
    try {
        let username = action?.payload?.username;
        let password = action?.payload?.password;
        const resp = yield call(() => APIService.get(`CheckAuthentication(username=${username},password=${password})`));
        if (resp?.UserName) {
            yield put(authenticationSuccess(true));
            localStorage.setItem('token', resp?.data?.Token);
            toast.success('Login done successfully');
            history.push('/employee');    
           // RouterService.navigateByUrl('/employee');
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

