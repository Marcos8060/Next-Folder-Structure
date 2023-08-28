import { createSlice } from "@reduxjs/toolkit";
import { getURL } from "next/dist/shared/lib/utils";
import {getFailedUploads, getFileUploads, saveFileUpload, uploadFile} from "../../redux/services/upload";


const initialState = {
    uploads: null,
    failedUploads: null,
}

const uploadSlice = createSlice({
    name: 'upload',
    initialState,
    reducers:{
        getUploads: (state,action) =>{
            state.uploads = action.payload;
        },
        reset:(state, action) => {
            state.uploads = initialState.uploads
        },
        getFailedUpload: (state,action) =>{
            state.failedUploads = action.payload;
        },
    }
})
export const  { getUploads, reset, getFailedUpload } = uploadSlice.actions;


export const uploadFiles = (authUser, formData) => async (dispatch) =>{
    const response = await uploadFile(authUser, formData)
    try {
        dispatch(getUploads(response.result))
    } catch (error) {
        console.log(error.message);
        // dispatch(fetchError(error.message));
    }
    return response;
}

export const saveUploadFile = (authUser, formData) => async (dispatch) =>{

    return await saveFileUpload(authUser, formData);
}

export const getAllFileUploads = (authUser, data) => async (dispatch) =>{
    const response = await getFileUploads(authUser, data)
    try {
        dispatch(getUploads(response))
        // dispatch(fetchSuccess(response.message));
    } catch (error) {
        console.log(error.message);
        // dispatch(fetchError(error.message));
    }
    return response;
}


export const getAllFailedUploads = (authUser, data) => async (dispatch) =>{
    const response = await getFailedUploads(authUser, data)
    console.log(response)
    try {
        dispatch(getFailedUpload(response))
        // dispatch(fetchSuccess(response.message));
    } catch (error) {
        console.log(error.message);
        // dispatch(fetchError(error.message));
    }
    return response;
}



export default uploadSlice.reducer;


