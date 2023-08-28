import { createSlice } from "@reduxjs/toolkit";
import { addDepartment, deleteDepartment, fetchDepartments, updateDepartment } from "../../redux/services/departments";

const initialState = {
    departments : [],
}

const departmentSlice = createSlice({
    name: 'department',
    initialState,
    reducers:{
        getDepartments: (state,action) =>{
            state.departments = action.payload;
        },
    }
})

export const  { getDepartments } = departmentSlice.actions;


export const getAllDepartments = (authUser) => async dispatch =>{
    const res = await fetchDepartments(authUser)
    dispatch(getDepartments(res));
}


export const createDepartment = (authUser,data) => async dispatch => {
    const response = await addDepartment(authUser,data)
    console.log(response);
    try {
        console.log(response.data);
        // dispatch(fetchSuccess(response.message));
    } catch (error) {
        console.log(error.message);
        // dispatch(fetchError(error.message));
    }
}

export const removeDepartment = (authUser,data) => async dispatch => {
    const response = await deleteDepartment(authUser,data)
    console.log(response);
    try {
        console.log(response.data);
        // dispatch(fetchSuccess(response.message));
    } catch (error) {
        console.log(error.message);
        // dispatch(fetchError(error.message));
    }
}

export const editDepartment = (authUser,data) => async dispatch => {
    const response = await updateDepartment(authUser,data)
    console.log(response);
    try {
        console.log(response.data);
        // dispatch(fetchSuccess(response.message));
    } catch (error) {
        console.log(error.message);
        // dispatch(fetchError(error.message));
    }
}

export default departmentSlice.reducer;


