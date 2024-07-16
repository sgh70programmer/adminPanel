import React from 'react'
import { ErrorMessage, FastField } from "formik";
import FormikError from "./FormikError";

export default function File({ name, label, className, placeholder }) {
    return (
        <FastField>
            {({ form }) => {
                return (
                    <div className={`col-12 ${className}`}>
                        <div className="input-group mb-3 dir_ltr">
                            <input
                                type="file"
                                className="form-control"
                                name={name}
                                placeholder={placeholder}
                                onChange={(e) => form.setFieldValue(name, e.target.files[0])}
                            />
                            <span className="input-group-text w_6rem justify-content-center"> {label} </span>
                        </div>
                        <ErrorMessage name={name} component={FormikError} />
                    </div>
                );
            }}
        </FastField>
    )
}
