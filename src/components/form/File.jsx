import React from 'react'
import { ErrorMessage, FastField } from "formik"
import FormikError from "./FormikError"

export default function File({ name, label, className, placeholder }) {
    return (
        <FastField>
            {({ form }) => {
                return (
                    <div className={`col-12 ${className}`}>
                        <div className="input-group mb-3 dir_ltr">
                            <span className="input-group-text justify-content-center"> {label} </span>
                            <input
                                type="file"
                                className="form-control"
                                name={name}
                                placeholder={placeholder}
                                onChange={(e) => form.setFieldValue(name, e.target.files[0])}
                            />

                        </div>
                        <ErrorMessage name={name} component={FormikError} />
                    </div>
                )
            }}
        </FastField>
    )
}
