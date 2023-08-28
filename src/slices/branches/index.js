import { createSlice } from "@reduxjs/toolkit";
import { fetchBranches, fetchCounties } from "../../redux/services/branches";


const initialState = {
    branches : [],
    counties : [],
}

const branchSlice = createSlice({
    name: 'branch',
    initialState,
    reducers:{
        getBranches: (state,action) =>{
            state.branches = action.payload;
        },
        getCounties: (state,action) =>{
            state.counties = action.payload;
        }
    }
})
export const  { getBranches,getCounties } = branchSlice.actions;


export const getAllBranches = (authUser) => async dispatch =>{
    const res = await fetchBranches(authUser)
    dispatch(getBranches(res));
}

export const getAllCounties = (authUser) => async dispatch =>{
    const res = await fetchCounties(authUser)
    dispatch(getCounties(res));
}


export default branchSlice.reducer;


