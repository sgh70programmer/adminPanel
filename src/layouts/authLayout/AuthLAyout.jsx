import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom"
import Login from "../../pages/auth/Login"
import useIsLogin from '../../hook/authHook'

export default function AuthLAyout() {
    const [loading, isLogin] = useIsLogin()
  
    return (
        <div className="limiter">
            {loading ? (<h1 className="text-center waiting_center">لطفا صبر کنید...</h1>) :
                !isLogin ? (<div className="container-login100">
                    <Routes>
                        <Route path='*' element={<Login />} />
                    </Routes>
                </div>) :
            
                    <Navigate to={"/"} />}

        </div>
    )
}
