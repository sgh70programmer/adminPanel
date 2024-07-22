import axios from "axios";
import { useEffect, useState } from "react";
import { getUserService } from "../services/auth";
import { useDispatch } from "react-redux";
import { receiveUserResponse } from "../redux/user/userActions";


export default function useIsLogin() {
    const [isLogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
   
    const handleCheckLogin = async () => {
        try {
            const res = await getUserService()
            setIsLogin(res.status == 200 ? true : false)
            setLoading(false)
            const user = res.data
            console.log("user", user);
            user.full_name = `${user.first_name || ""} ${user.last_name || ""}`.trim()
            dispatch(receiveUserResponse(user))

        } catch (err) {
            setIsLogin(false)
            setLoading(false)
        }

    }

    useEffect(() => {

        const loginToken = JSON.parse(localStorage.getItem("loginToken"))
        if (loginToken) {

            handleCheckLogin()

        } else {
            setIsLogin(false)
            setLoading(false)
        }

    }, [])

    return [loading, isLogin]
}