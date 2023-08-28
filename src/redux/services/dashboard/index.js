import useAxios from "../../../hooks/use-axios";
import { APP_API_URL } from "../../../utils/api-endpoints";



export const fetchDashboardData = (authUser) =>{
    return new Promise((resolve,reject) =>{
        const axiosInstance = useAxios(authUser)
        axiosInstance.post(APP_API_URL.GET_DASHBOARD, { userId: authUser.user.userid})
        .then((res) =>{
            resolve(res.data)
        })
        .catch((err) =>{
            reject(err.message)
        })
    })
}
