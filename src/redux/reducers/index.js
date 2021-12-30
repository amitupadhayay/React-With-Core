import { combineReducers } from 'redux'
import { employeeReducer,currentEmployeeReducer } from './employeeReducers'

const reducers = combineReducers({
    allEmployee: employeeReducer,
    currentEmployee: currentEmployeeReducer,
})

export default reducers;
