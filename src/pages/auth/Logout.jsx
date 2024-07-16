import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Alert } from "../../utils/alerts";
import { logoutService } from "../../services/auth";

export default function Logout() {
    const [loading, setLoading] = useState(true)

    const handleLogout  = async () =>{
        try{
            const res = await logoutService()
            if(res.status == 200){
                localStorage.removeItem("loginToken");
            }
            setLoading(false)
        }catch(err){
            setLoading(false);
            
        }
     
    }

    useEffect(() => {
        
            handleLogout()
       
    }, [])

    return (
        <>
            {loading ? (
                <h1 className="text-center waiting_center">لطفا صبر کنید...</h1>
            ) : (
                <Navigate to="/auth/login" />
            )}
        </>
    )
}
