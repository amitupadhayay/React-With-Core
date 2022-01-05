import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import APIService from '../../Services/APIService';
import ControllerName from '../../Constants/global-constant';

const initialState = {
    commonError: "",
}

export const commonSlice = createSlice({
    name: "common",
    initialState: initialState,
    reducers: {
        setCommonError: (state) => {
            state.loading = false;
            toast.error('Something went wrong');
        },
    },
    extraReducers: {

    }
});

export const {
    setCommonError,
} = commonSlice.actions;


export const getCommonError = (state => state.employeeSlice.commonError);
export default commonSlice.reducer;