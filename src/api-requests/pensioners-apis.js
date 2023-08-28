import useAxios from "../hooks/use-axios";
import {APP_API_URL} from "../utils/api-endpoints";

class PensionersApis {
    fetchPensioners(useAuth, limit, page){
        return new Promise((resolve, reject) => {
            const axiosInstance = useAxios(useAuth);
            const config = {
                params: {
                    limit,
                    page,
                }
            }
            axiosInstance.get(APP_API_URL.GET_PENSIONERS, config).then( response => {
                resolve(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    getPensioner(useAuth, pensionerCode){
        return new Promise((resolve, reject) => {
            //const axiosInstance = useAxios(useAuth);
            axiosInstance.patch(APP_API_URL.GET_PENSIONERS, { pensionerCode} ).then( response => {
                resolve(response.data)
                console.log(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    addPensioner(useAuth, data){
        return new Promise((resolve, reject) => {
            const formData = {
                staffNo: data.staffNo,
                pensionerName: data.pensionerName,
                idNo: data.idNo,
                telephone: data.telephone,
                dateofBirth: data.dateofBirth,
                pensionerStatus: data.pensionerStatus,
                pensionerStatus_name: data.pensionerStatus_name,
                pensionerType_code: data.pensionerType_code,
                pensionerType_name: data.pensionerType_name,
                region_code: data.region_code,
                region_name: data.region_name,
                pensionerFingerprint: data.pensionerFingerprint,
                pensionerImage: data.pensionerImage,
                pensioner_Identifier: data.pensioner_Identifier,
                pensionersBankDetails: [
                    {
                        pensionerAccNo: data.pensionerAccNo,
                        bank_code: data.bank_code,
                        bank_name: data.bank_name,
                        branch_code: data.branch_code,
                        branch_name: data.branch_name,
                        pensionerAccName: data.pensionerAccName
                    }
                ]
            }
            const axiosInstance = useAxios(useAuth);
            axiosInstance.post(APP_API_URL.GET_PENSIONERS, formData ).then( response => {
                resolve(response.data)
                console.log(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    searchPensioner(useAuth, data){
        return new Promise((resolve, reject) => {

            const axiosInstance = useAxios(useAuth);
            axiosInstance.post(APP_API_URL.SEARCH_PENSIONERS, data ).then( response => {
                resolve(response.data)
                console.log(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
    updatePensioner(useAuth, data){
        return new Promise((resolve, reject) => {
            const formData = {
                staffNo: data.staffNo,
                pensionerName: data.pensionerName,
                idNo: data.idNo,
                telephone: data.telephone,
                dateofBirth: data.dateofBirth,
                pensionerStatus: data.pensionerStatus,
                pensionerStatus_name: data.pensionerStatus_name,
                pensionerType_code: data.pensionerType_code,
                pensionerType_name: data.pensionerType_name,
                region_code: data.region_code,
                region_name: data.region_name,
                pensionerFingerprint: data.pensionerFingerprint,
                pensionerImage: data.pensionerImage,
                pensioner_Identifier: data.pensioner_Identifier,
                pensionerCode: data.pensionerCode,
                pensionersBankDetails: [
                    {
                        pensionerAccNo: data.pensionerAccNo,
                        bank_code: data.bank_code,
                        bank_name: data.bank_name,
                        branch_code: data.branch_code,
                        branch_name: data.branch_name,
                        pensionerAccName: data.pensionerAccName
                    }
                ]
            }
            const axiosInstance = useAxios(useAuth);
            axiosInstance.put(APP_API_URL.GET_PENSIONERS, formData ).then( response => {
                resolve(response.data)
                console.log(response.data)
            }).catch(e => {
                reject(new Error(e.message))
                console.log(e.message)
            })
        })
    }
}

export const pensionersApis = new PensionersApis();