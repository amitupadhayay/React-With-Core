import { ActionTypes } from "../constants/actionTypes"

const initialState = {
    employees: [],
}


export const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_EMPLOYEES:
            return { ...state, employees: action.payload }
        default: {
            return state;
        }

    }
}

export const currentEmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_CURRENT_EMPLOYEE:
            return { ...state, ...action.payload }
        default: {
            return state;
        }           
    }
}

export default employeeReducer;