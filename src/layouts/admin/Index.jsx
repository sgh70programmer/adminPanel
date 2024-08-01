import React from 'react'
import Navbar from "./navbar/Index"
import Sidebar from "./sidebar/Index"
import AdminContextContainer from '../../context/adminLayoutContext'
import { Navigate } from "react-router-dom"
import Content from '../../pages/Content'
import useIsLogin from '../../hook/authHook'


export default function Index() {
    const [loading, isLogin] =useIsLogin()
    

    return (
        <AdminContextContainer>
            {loading?( <h1 className="text-center waiting_center">Please Wait...</h1>):
            isLogin?( <div>
                <Navbar />
                <Sidebar />
                <Content />
            </div>):<Navigate to={"/auth/login"} />}
           
        </AdminContextContainer>


    )
}
