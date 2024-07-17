import { ErrorMessage, FastField } from 'formik';
import React from 'react';
import FormikError from './FormikError';

const Input = ({type, name, label, className, placeholder}) => {
    return (
        <div className={`col-12 ${className}`}>
            <div className={`input-group mb-3 dir_ltr ${type == "color" && "justify-content-end"}`}>
                <FastField type={type} name={name} className={`form-control ${type == "color" && "form-control-color"}`} placeholder={placeholder} />
                <span className="input-group-text w_6rem justify-content-center"> {label} </span>
            </div>
            <ErrorMessage name={name} component={FormikError}/>
        </div>
    );
}

export default Input