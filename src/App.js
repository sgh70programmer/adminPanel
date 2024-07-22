import React from "react";
import AdminLayout from "./layouts/admin/Index"
import AuthLAyout from "./layouts/authLayout/AuthLAyout"
import { useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";





export default function App() {
  const location = useLocation()
  

  return (
    <Provider store={store}>
      <div className="App">
        {location.pathname.includes("/auth") ?
          <AuthLAyout /> : <AdminLayout />}

      </div>
    </Provider>


  );
}
