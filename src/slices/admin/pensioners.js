import { createSlice } from '@reduxjs/toolkit'
import { pensionersApis } from "../../api-requests/pensioners-apis";

const initialState = {
    pensioners:  [],
    totalCount: 0,
    page: 1,
    limit: 25,
    totalPages: 1,
}

const pensionersSlice = createSlice({
    name: 'pensioners',
    initialState,
    reducers: {
        fetchPensioners: (state, action) => {
            state.pensioners =  action.payload
        },
        setTotalCount: (state, action) => {
            state.totalCount = action.payload
        },
        setPage: (state, action) => {
            state.page = action.payload
        },
        setPageLimit: (state, action) => {
            state.limit = action.payload
        },
        setTotalPages: (state, action) => {
            state.totalPages = action.payload
        }
    }
});


export const getPensioners = (useAuth, limit, page) => async dispatch => {
    try{
        const data = await pensionersApis.fetchPensioners(useAuth, limit, page);
        dispatch(pensionersSlice.actions.fetchPensioners(data.pensionerData));
        dispatch(pensionersSlice.actions.setPage(data.pageNumber));
        dispatch(pensionersSlice.actions.setTotalCount(data.totalCount));
    }catch (e) {
        console.log(e)
    }
}

export const getPensioner = (useAuth, pensionerCode) => async dispatch => {
   return await pensionersApis.getPensioner(useAuth, pensionerCode);
}

export const searchPensioner = (useAuth, data) => async dispatch => {
    try{
        const searchData = await pensionersApis.searchPensioner(useAuth, data);
        dispatch(pensionersSlice.actions.fetchPensioners(searchData.data))
        dispatch(pensionersSlice.actions.setTotalCount(searchData.totalCount));
        dispatch(pensionersSlice.actions.setTotalPages(searchData.totalPages));
    }
    catch (e) {
        console.log(e)
    }
}

export const setPageLimit = (value) => dispatch => {
    dispatch(pensionersSlice.actions.setPageLimit(value));
}

export const setPage = (value) => dispatch => {
    dispatch(pensionersSlice.actions.setPage(value));
}

export const addPensioner = (useAuth, data) => async dispatch => {
   await pensionersApis.addPensioner(useAuth, data);
}

export const updatePensioner = (useAuth, data) => async dispatch => {
    await pensionersApis.updatePensioner(useAuth, data);
}

export default pensionersSlice.reducer