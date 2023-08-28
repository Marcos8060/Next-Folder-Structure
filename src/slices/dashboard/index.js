import { createSlice } from "@reduxjs/toolkit";
import {fetchDashboardData} from "../../redux/services/dashboard";


const initialState = {
    data: null,
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers:{
        getData: (state,action) =>{
            state.data = action.payload;
        },

    }
})
export const  { getData } = dashboardSlice.actions;


export const getDashboardData = (authUser) => async dispatch =>{
    const res = await fetchDashboardData(authUser)
    dispatch(getData(res));
}


export default dashboardSlice.reducer;


