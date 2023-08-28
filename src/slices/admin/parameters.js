import {createSlice} from '@reduxjs/toolkit'
import {parametersApis} from "../../api-requests/parameters-api";

const initialState = {
    banks:  [],
    cycles: [],
    regions: [],
    pensionerStatus: [],
    pensionerTypes: [],
}

const parametersSlice = createSlice({
    name: 'parameters',
    initialState,
    reducers: {

        fetchBanks: (state, action) => {
            state.banks =  action.payload
        },
        fetchCycles: (state, action) => {
            state.cycles =  action.payload
        },
        fetchRegions: (state, action) => {
            state.regions =  action.payload
        },
        fetchPensionerStatus: (state, action) => {
            state.pensionerStatus =  action.payload
        },
        fetchPensionerTypes: (state, action) => {
            state.pensionerTypes =  action.payload
        },
    }
});


export const getBanks = (useAuth) => async dispatch => {
    const data = await parametersApis.fetchBanks(useAuth);
    dispatch(parametersSlice.actions.fetchBanks(data));
}
export const getBankBranches = (useAuth, bankId) => async dispatch => {
    const data = await parametersApis.fetchBankBranches(useAuth, bankId);
    return data;
}
export const getCycles = (useAuth) => async dispatch => {
    const data = await parametersApis.fetchCycles(useAuth);
    dispatch(parametersSlice.actions.fetchCycles(data));
}
export const getRegions = (useAuth) => async dispatch => {
    const data = await parametersApis.fetchRegions(useAuth);
    dispatch(parametersSlice.actions.fetchRegions(data));
}
export const getPensionerStatus = (useAuth) => async dispatch => {
    const data = await parametersApis.fetchPensionerStatus(useAuth);
    dispatch(parametersSlice.actions.fetchPensionerStatus(data));
}
export const getPensionerTypes = (useAuth) => async dispatch => {
    const data = await parametersApis.fetchPensionerTypes(useAuth);
    dispatch(parametersSlice.actions.fetchPensionerTypes(data));
}




export default parametersSlice.reducer