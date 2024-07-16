import axios from "axios"
import config from './config.json'
import { Alert } from "../utils/alerts";


axios.interceptors.response.use((res) => {
    if (res.status != 200 && res.status != 201) {
        Alert("مشکل...!", res.data.message, "warning");
    }
    return res
}, (err) => {
    console.log(err);
    if (err.config.url != "https://ecomadminapi.azhadev.ir/api/auth/logout") {
        console.log("logout");

        Alert("مشکل...!", "مشکلی رخ داده است", "error");
        return Promise.reject(err)

    }
})

const httpService = (url, method, data, params = null) => {
    const tokenInfo = JSON.parse(localStorage.getItem('loginToken'))

    return axios({
        url: config.onlineApi + url,
        method,
        data,
        params,
        headers: {
            Authorization: tokenInfo ? `Bearer ${tokenInfo.token}` : null,
            "Content-Type": "application/json"
        }
    })
}
export default httpService