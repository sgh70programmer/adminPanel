import axios from "axios"
import config from './config.json'
import { Alert } from "../utils/alerts"

export const apiPath = config.onlinePath

axios.interceptors.response.use((res) => {
    if (res.status != 200 && res.status != 201) {
        if (typeof(res.data) == 'object') {
            let message = ""
            for (const key in res.data) {
                message = message + ` ${res.data[key]}`
            }
            res.data.message = message
        }
        Alert("problem...!", res.data.message, "warning")
    }
    return res
}, (err) => {
    if (err.config.url != "https://ecomadminapi.azhadev.ir/api/auth/logout") {
        

        Alert(err.response.status, err.response.data?.message || "There has been a problem", "error")
        return Promise.reject(err)

    }
})

const httpService = (url, method, data, params = null) => {
    
   
    const tokenInfo = JSON.parse(localStorage.getItem('loginToken'))

    return axios({
        url: apiPath+ "/api" + url,
        method,
        data,
        params,
        headers: {
            Authorization: tokenInfo ? `Bearer ${tokenInfo.token}` : null,
            
            
        }
    })
}
export default httpService