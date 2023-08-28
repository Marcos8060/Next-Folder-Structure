import { backendAxiosInstance } from "../../../api-requests/backend-axios-instance";
import useAxios from "../../../hooks/use-axios";
import { APP_API_URL } from "../../../utils/api-endpoints";



export const uploadFile = (authUser,data) =>{
    return new Promise((resolve,reject) =>{
        const axiosInstance = useAxios(authUser)
        axiosInstance.post(APP_API_URL.UPLOAD_FILE,data)
        .then((res) =>{
            resolve(res.data)
        })
        .catch((err) =>{
            reject(err.message)
        })
    })
}

export const saveFileUpload = (authUser,data) =>{
    return new Promise((resolve,reject) =>{
        const axiosInstance = useAxios(authUser)
        axiosInstance.put(APP_API_URL.UPLOAD_FILE,data)
            .then((res) =>{
                if (res.data.success){
                    resolve(res.data)
                }
                else{
                    reject( new Error(res.data?.errorMsg ?? "An error occurred! Try again") );
                }

            })
            .catch((err) =>{
                reject( new Error(err.message))
            })
    })
}

export const getFileUploads = (authUser,data) =>{
    return new Promise((resolve,reject) =>{
        const axiosInstance = useAxios(authUser)
        axiosInstance.post(APP_API_URL.GET_FILE_UPLOADS,data)
            .then((res) =>{
                resolve(res.data)
            })
            .catch((err) =>{
                reject(err.message)
            })
    })
}

export const getFailedUploads = (authUser,data) =>{
    return new Promise((resolve,reject) =>{
        const axiosInstance = useAxios(authUser)
        axiosInstance.post(APP_API_URL.GET_FAILED_UPLOADS,data)
            .then((res) =>{
                resolve(res.data)
            })
            .catch((err) =>{
                reject(err.message)
            })
    })
}