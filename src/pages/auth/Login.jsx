
import React from "react";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import AuthFormikControl from "../../components/authForm/AuthFormikControl";
import { Navigate, useNavigate } from "react-router-dom";
import { loginService } from "../../services/auth";
import { Alert } from "../../utils/alerts";

const initialValues = {
    phone: "",
    password: "",
    remember: false,
};
const onSubmit = async (values, submitMethods, navigate) => {
    try {
        const res = await loginService(values);
        if (res.status == 200) {
            localStorage.setItem("loginToken", JSON.stringify(res.data))
            navigate("/")
        }

        submitMethods.setSubmitting(false)

    } catch (error){
        console.log("error", error);
        // Alert("مشکل...!", "مشکلی رخ داده است", "error");
        submitMethods.setSubmitting(false)
        
    }
};
const validationSchema = Yup.object({
    phone: Yup.string()
        .required("لطفا این قسمت را پر کنید")
        .matches(/^09(0[1-2]|1[0-9]|3[0-9]|2[0-1])-?[0-9]{3}-?[0-9]{4}$/, "شماره تلفن باید 11 رقم باشد")
    ,
    password: Yup.string()
        .required("لطفا این قسمت را پر کنید")
        .matches(/^[a-zA-Z0-9@!%$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
    remember: Yup.boolean(),
});

const Login = () => {
    const navigate = useNavigate()
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, submitMethods) => onSubmit(values, submitMethods, navigate)}
            validationSchema={validationSchema}
        >
            {(formik) => {
                
                return (
                    <div className="wrap-login100">
                        <Form className="login100-form validate-form pos-relative d-flex flex-column align-items-center justify-content-center">
                            <span className="login100-form-title">ورود اعضا</span>

                            <AuthFormikControl
                                formik={formik}
                                control="input"
                                type="text"
                                name="phone"
                                icon="fa fa-mobile"
                                label="شماره موبایل"
                            />

                            <AuthFormikControl
                                formik={formik}
                                control="input"
                                type="password"
                                name="password"
                                icon="fa fa-lock"
                                label="رمز عبور"
                            />

                            <AuthFormikControl
                                control="switch"
                                name="remember"
                                label="مرا بخاطر بسپارید"
                            />


                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn" disabled={formik.isSubmitting}>
                                    {formik.isSubmitting ? "لطفا صبر کنید..." : "ورود"}
                                </button>
                            </div>
                        </Form>
                        <div className="login100-pic js-tilt">
                            <img src="/auth/images/img-01.png" alt="IMG" />
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
};

export default Login;
