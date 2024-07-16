import React from "react";
import AdminLayout from "./layouts/admin/Index"
import AuthLAyout from "./layouts/authLayout/AuthLAyout"
import { useLocation } from "react-router-dom";




export default function App() {
const location = useLocation()


  return (
    <div className="App">
      {location.pathname.includes("/auth")?
      <AuthLAyout/>:<AdminLayout/>}
     
    </div>
    
  );
}
