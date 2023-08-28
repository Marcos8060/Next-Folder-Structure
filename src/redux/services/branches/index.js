import useAxios from "../../../hooks/use-axios";
import { APP_API_URL } from "../../../utils/api-endpoints";



export const fetchBranches = (authUser) =>{
    return new Promise((resolve,reject) =>{
        const axiosInstance = useAxios(authUser)
        axiosInstance.get(APP_API_URL.GET_BRANCHES)
        .then((res) =>{
            resolve(res.data)
        })
        .catch((err) =>{
            reject(err.message)
        })
    })
}

export const fetchCounties = (authUser) =>{
    return new Promise((resolve,reject) =>{
        const axiosInstance = useAxios(authUser)
        axiosInstance.get(APP_API_URL.GET_COUNTIES)
        .then((res) =>{
            resolve(res.data)
        })
        .catch((err) =>{
            reject(err.message)
        })
    })
}