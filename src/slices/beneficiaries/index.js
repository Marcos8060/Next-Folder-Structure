import { createSlice } from "@reduxjs/toolkit";
import { fetchBeneficiaries, fetchfailedBeneficiaries } from "../../redux/services/beneficiaries";

const initialState = {
    beneficiaries : [],
    failedBeneficiaries : [],
}

const beneficiarySlice = createSlice({
    name: 'beneficiary',
    initialState,
    reducers:{
        getBeneficiaries: (state,action) =>{
            state.beneficiaries = action.payload;
        },
        getFailedBeneficiaries: (state,action) =>{
            state.failedBeneficiaries = action.payload;
        },
    }
})
export const  { getBeneficiaries, getFailedBeneficiaries } = beneficiarySlice.actions;


export const getAllActiveBeneficiaries = (authUser,data) => async dispatch => {
    const response = await fetchBeneficiaries(authUser,data)
    try {
        dispatch(getBeneficiaries(response.result))
    } catch (error) {
        console.log(error.message);
    }
}

export const getAllFailedBeneficiaries = (authUser,data) => async dispatch => {
    const response = await fetchfailedBeneficiaries(authUser,data)
    try {
        dispatch(getFailedBeneficiaries(response))
    } catch (error) {
        console.log(error.message);
        // dispatch(fetchError(error.message));
    }
}



export default beneficiarySlice.reducer;


