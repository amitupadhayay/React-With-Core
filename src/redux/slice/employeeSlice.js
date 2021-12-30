import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authenticated: false,
    loading: false,
    allEmployee: [],
    selectedEmployee: {},
}

export const employeeSlice = createSlice({
    name: "employee",
    initialState: initialState,
    reducers: {
        setAuthentication: (state, action) => {
            state.authenticated = action.payload;
        },
        fetchAllEmployee: (state, action) => {
            state.loading = true;
        },
        fetchAllEmployeeSuccess: (state, action) => {
            state.loading = false;
            state.allEmployee = action.payload;
        },
        fetchSelectedEmployee: (state, action) => {
            state.loading = true;
        },
        fetchSelectedEmployeeSuccess: (state, action) => {
            state.loading = false;
            state.selectedEmployee = action.payload;
        },
    }
});

export const {
    setAuthentication,
    fetchAllEmployee, fetchAllEmployeeSuccess, fetchSelectedEmployee, fetchSelectedEmployeeSuccess
} = employeeSlice.actions;

export const getAuthentication = (state => state.employeeSlice.authenticated);
export const getLoading = (state => state.employeeSlice.loading);
export const getAllEmployee = (state => state.employeeSlice.allEmployee);
export const getSelectedEmployee = (state => state.employeeSlice.selectedEmployee);

export default employeeSlice.reducer;