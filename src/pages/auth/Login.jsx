
import React from "react"
import {Form, Formik } from "formik"
import * as Yup from "yup"
import AuthFormikControl from "../../components/authForm/AuthFormikControl"
import {useNavigate } from "react-router-dom"
import { loginService } from "../../services/auth"


const initialValues = {
    phone: "",
    password: "",
    remember: false,
}
const onSubmit = async (values, submitMethods, navigate) => {
    try {
        const res = await loginService(values)
        if (res.status == 200) {
            localStorage.setItem("loginToken", JSON.stringify(res.data))
            navigate("/")
        }

        submitMethods.setSubmitting(false)

    } catch (error){
        submitMethods.setSubmitting(false)
        
    }
}
const validationSchema = Yup.object({
    phone: Yup.string()
        .required("Please fill in this field")
        .matches(/^09(0[1-2]|1[0-9]|3[0-9]|2[0-1])-?[0-9]{3}-?[0-9]{4}$/, "Phone number must be 11 digits")
    ,
    password: Yup.string()
        .required("Please fill in this field")
        .matches(/^[a-zA-Z0-9@!%$?&]+$/, "Use only letters and numbers"),
    remember: Yup.boolean(),
})

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
                            <span className="login100-form-title">members enterance</span>

                            <AuthFormikControl
                                formik={formik}
                                control="input"
                                type="text"
                                name="phone"
                                icon="fa fa-mobile"
                                label="phone number"
                            />

                            <AuthFormikControl
                                formik={formik}
                                control="input"
                                type="password"
                                name="password"
                                icon="fa fa-lock"
                                label="password"
                            />

                            <AuthFormikControl
                                control="switch"
                                name="remember"
                                label="remember me"
                            />


                            <div className="container-login100-form-btn">
                                <button type="submit" className="login100-form-btn" disabled={formik.isSubmitting}>
                                    {formik.isSubmitting ? "please wait..." : "log in"}
                                </button>
                            </div>
                        </Form>
                        <div className="login100-pic js-tilt">
                            <img src="/auth/images/img-01.png" alt="IMG" />
                        </div>
                    </div>
                )
            }}
        </Formik>
    )
}

export default Login
