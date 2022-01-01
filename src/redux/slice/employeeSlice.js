import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

// const saveEmployee = createAsyncThunk("employee/saveEmployee", async () => {
//     return await "";
// });

const initialState = {
    authenticated: false,
    loading: false,
    allEmployee: [],
    selectedEmployee: {},
    commonError: "",
    apiCalled: false,
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
        setCommonError: (state) => {
            state.loading = false;
            toast.error('Something went wrong');
        },
        setApiCalled: (state, action) => {
            state.apiCalled = false;
        },
        saveEmployee: (state, action) => {
            state.apiCalled = false;
        },
        saveEmployeeSuceess: (state, action) => {
            state.apiCalled = true;
        },

    },
    extraReducers: {

    }
});

export const {
    setAuthentication,
    fetchAllEmployee, fetchAllEmployeeSuccess, fetchSelectedEmployee, fetchSelectedEmployeeSuccess,
    setCommonError, setApiCalled, saveEmployee, saveEmployeeSuceess,
} = employeeSlice.actions;

export const getAuthentication = (state => state.employeeSlice.authenticated);
export const getLoading = (state => state.employeeSlice.loading);
export const getAllEmployee = (state => state.employeeSlice.allEmployee);
export const getSelectedEmployee = (state => state.employeeSlice.selectedEmployee);
export const getCommonError = (state => state.employeeSlice.commonError);
export const getApiCalled = (state => state.employeeSlice.apiCalled);

export default employeeSlice.reducer;