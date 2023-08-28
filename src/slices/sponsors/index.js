import { createSlice } from "@reduxjs/toolkit";
import {
    addSponsor,
    addSponsorUser,
    fetchSponsors,
    getSponsorActiveBeneficiaries, getSponsorRejectedBeneficiaries,
    getSponsorUser
} from "../../redux/services/sponsors";


const initialState = {
    sponsors : [],
    sponsorUsers: [],
    activeBeneficiaries: [],
    rejectedBeneficiaries: [],
}

const sponsorSlice = createSlice({
    name: 'sponsor',
    initialState,
    reducers:{
        getSponsors: (state,action) =>{
            state.sponsors = action.payload;
        },
        displaySponsorUsers: (state,action) =>{
            state.sponsorUsers = action.payload;
        },
        setActiveBeneficiaries: (state,action) =>{
            state.activeBeneficiaries = action.payload;
        },
        setRejectedBeneficiaries: (state,action) =>{
            state.rejectedBeneficiaries = action.payload;
        },
    }
})
export const  { getSponsors,displaySponsorUsers, setActiveBeneficiaries, setRejectedBeneficiaries } = sponsorSlice.actions;


export const getAllSponsors = (authUser) => async (dispatch) =>{
    const res = await fetchSponsors(authUser)
    dispatch(getSponsors(res));
}

export const createSponsor = (authUser,data) => async dispatch => {
    const response = await addSponsor(authUser,data)
    try {
        console.log(response.data);
        // dispatch(fetchSuccess(response.message));
    } catch (error) {
        console.log(error.message);
        // dispatch(fetchError(error.message));
    }
}

export const createSponsorUser = (authUser,data) => async dispatch => {
    const response = await addSponsorUser(authUser,data)
    console.log(response);
    try {
        console.log(response.data);
        dispatch(displaySponsorUsers(response.data))
        // dispatch(fetchSuccess(response.message));
    } catch (error) {
        console.log(error.message);
        // dispatch(fetchError(error.message));
    }
}


export const getAllSponsorUsers = (authUser,data) => async dispatch => {
    const response = await getSponsorUser(authUser,data)
    console.log(response);
    try {
        console.log(response.data);
        // dispatch(fetchSuccess(response.message));
    } catch (error) {
        console.log(error.message);
        // dispatch(fetchError(error.message));
    }

}

export const getActiveBeneficiaries = (authUser, data) => async dispatch => {
    const response = await getSponsorActiveBeneficiaries(authUser,data);
    dispatch(setActiveBeneficiaries(response));
}

export const getRejectedBeneficiaries = (authUser, data) => async dispatch => {
    const response = await getSponsorRejectedBeneficiaries(authUser,data);
    dispatch(setRejectedBeneficiaries(response));
}




export default sponsorSlice.reducer;


