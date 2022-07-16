import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import APIService from '../../Services/APIService';
import ControllerName from '../../Constants/global-constant';

const initialState = {
    commonError: "",
    dialogState: false,
    authenticated:false,
}

export const commonSlice = createSlice({
    name: "common",
    initialState: initialState,
    reducers: {
        setCommonError: (state) => {
            state.loading = false;
            toast.error('Something went wrong');
        },
        setDialogState: (state, action) => {
            state.dialogState = action?.payload;
        },
        authentication: (state, action) => {
            state.authenticated = false;
        },
        authenticationSuccess: (state, action) => {
            state.authenticated = true;
        },
        setAuthentication: (state, action) => {
            state.authenticated = action.payload;
        },
    },
    extraReducers: {

    }
});

export const {
    setCommonError, setDialogState,authentication,authenticationSuccess,setAuthentication
} = commonSlice.actions;

export const getAuthentication = (state => state.commonSlice.authenticated);
export const getCommonError = (state => state.commonSlice.commonError);
export const getDialogState = (state => state.commonSlice.dialogState);
export default commonSlice.reducer;