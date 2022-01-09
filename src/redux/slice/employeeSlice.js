import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import APIService from '../../Services/APIService';
import ControllerName from '../../Constants/global-constant';

export const saveEmployeeThunk = createAsyncThunk("employee/saveEmployee", async (formData) => {
    const resp = await APIService.post("AddEditEmployee", ControllerName.Employee, formData);
    return resp.data;
});

const initialState = {
    authenticated: false,
    loading: false,
    apiTransaction: false,
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
        setApiTransaction: (state, action) => {
            state.apiTransaction = action.payload;
        },
        saveEmployee: (state, action) => {
            state.loading = true;
            //state.apiTransaction = false;
        },
        saveEmployeeSuceess: (state, action) => {
            state.loading = false;
            //state.apiTransaction = true;
        },
        modifyEmployeeData: (state, action) => {
            let employeeList = JSON.parse(JSON.stringify(state.allEmployee));
            employeeList = employeeList.filter(x => x.EmployeeId !== action.payload?.EmployeeId);
            state.allEmployee = [action.payload, ...employeeList];
        },
        setCommonError: (state) => {
            state.loading = false;
            toast.error('Something went wrong');
        },
        deleteEmployee: (state) => {
            state.loading = true;
        },
        deleteEmployeeSuceess: (state) => {
            state.loading = false;
        },
        removeEmployeeData: (state, action) => {
            let employeeList = JSON.parse(JSON.stringify(state.allEmployee));
            employeeList = employeeList.filter(x => x.EmployeeId !== action?.payload);
            state.allEmployee = [...employeeList];
        },
    },
    extraReducers: {
        [saveEmployeeThunk.pending]: (state) => {
            console.log('pending');
            return { ...state, loading: true };
        },
        [saveEmployeeThunk.fulfilled]: (state, action) => {
            console.log('api call done');
            return { ...state, loading: false };
        },
    }
});

export const {
    setAuthentication,
    fetchAllEmployee, fetchAllEmployeeSuccess, fetchSelectedEmployee, fetchSelectedEmployeeSuccess,
    setCommonError, setApiTransaction, saveEmployee, saveEmployeeSuceess, modifyEmployeeData,
    deleteEmployee, deleteEmployeeSuceess, removeEmployeeData,
} = employeeSlice.actions;

export const getAuthentication = (state => state.employeeSlice.authenticated);
export const getLoading = (state => state.employeeSlice.loading);
export const getAllEmployee = (state => state.employeeSlice.allEmployee);
export const getSelectedEmployee = (state => state.employeeSlice.selectedEmployee);
export const getCommonError = (state => state.employeeSlice.commonError);
export const getApiTransaction = (state => state.employeeSlice.apiTransaction);

export default employeeSlice.reducer;