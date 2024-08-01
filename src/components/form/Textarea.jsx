
import { ErrorMessage, FastField } from 'formik'
import React from 'react'
import FormikError from './FormikError'

const Textarea = ({name, label, className, placeholder}) => {
    return (
        <div className={`col-12 ${className}`}>
            <div className="input-group mb-3 dir_ltr">
            <span className="input-group-text justify-content-center"> {label} </span>
                <FastField as="textarea" name={name} className="form-control d-flex align-items-center justify-content-center" placeholder={placeholder} />
                
            </div>
            <ErrorMessage name={name} component={FormikError}/>
        </div>
    )
}

export default Textarea
