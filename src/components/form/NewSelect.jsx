import { ErrorMessage, Field } from "formik"
import React from "react"
import FormikError from "./FormikError"

const NewSelect = ({ options, name, label, className, firstItem, handleOnchange }) => {

    function setOptions() {
        return (
            <>
                <option value=""> {firstItem} </option>
                {options.map((o) => (
                    <option key={o.id} value={o.id}> {o.value} </option>
                ))}
            </>

        )
    }
    return (
        <div className={`col-12 ${className}`}>
            <div className="input-group mb-3">
                <span className="input-group-text justify-content-center">{label}</span>
                <Field>
                    {({ form }) => {

                        return (

                            <>
                                {handleOnchange ? (<Field as="select" className="form-control" id={name} name={name}
                                    onChange={(e) => handleOnchange(e.target.value, form)}>
                                    {setOptions()}

                                </Field>) : (<Field as="select" className="form-control" id={name} name={name} >
                                    {setOptions()}
                                </Field>)}
                            </>

                        )
                    }}
                </Field>

            </div>
            <ErrorMessage name={name} component={FormikError} />
        </div>
    )
}

export default NewSelect