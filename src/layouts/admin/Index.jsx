import React, { useCallback, useEffect } from 'react'
import Navbar from "./navbar/Index";
import Sidebar from "./sidebar/Index";
import AdminContextContainer, { AdminContext } from '../../context/adminLayoutContext';
import { Navigate } from "react-router-dom";
import Content from '../../pages/Content';
import useIsLogin from '../../hook/authHook';
import { useDispatch, useSelector } from 'react-redux';
import { getRolesActionRedux, sendRolesRequest } from '../../redux/user/userActions';

export default function Index() {
    const [loading, isLogin] =useIsLogin()
    const {data, error} = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    // dispatch(getRolesActionRedux())
    
    // dispatch(sendRolesRequest())
    // useEffect(() =>{
    //     dispatch(getRolesActionRedux())
    // }, [])
  

    return (
        <AdminContextContainer>
            {loading?( <h1 className="text-center waiting_center">لطفا صبر کنید...</h1>):
            isLogin?( <div>
                <Navbar />
                <Sidebar />
                <Content />
            </div>):<Navigate to={"/auth/login"} />}
           
        </AdminContextContainer>


    )
}
