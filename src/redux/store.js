import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers/index';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import employeeSlice from './slice/employeeSlice';
import commonSlice from './slice/commonSlice';
import {rootSaga} from './saga/rootSaga';

// const composeEmhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(
//     reducers,
//     composeEmhancers(applyMiddleware(thunk)),
//     //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

const saga = createSagaMiddleware();

const store = configureStore({
    reducer: {
        employeeSlice: employeeSlice,
        commonSlice: commonSlice,
    },
    middleware: [saga,thunk],
});

saga.run(rootSaga);

export default store;