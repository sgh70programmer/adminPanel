import React from "react"
import { Form, Formik } from "formik"
import FormikControl from "../../../components/form/FormikControl"
import SubmitButton from "../../../components/form/SubmitButton"
import { initialValues, onSubmit, validationSchema } from "./core"

const AddAttr = ({reInitValues,location ,setData ,attrToEdit ,setAttrToEdit }) => {
  return (
    <Formik
      initialValues={reInitValues || initialValues}
      onSubmit={(values, actions) =>
        onSubmit(
          values,
          actions,
          location.state.categoryData.id,
          setData,
          attrToEdit,
          setAttrToEdit
        )
      }
      validationSchema={validationSchema}
      enableReinitialize
    >
      <Form>
        <div
          className={`row my-3 ${
            attrToEdit ? "alert-danger danger_shadow" : ""
          } justify-content-center align-items-center is_inline`}
        >
          <FormikControl
            control="input"
            type="text"
            name="title"
            label="Title"
            className="col-md-6 col-lg-4 my-1"
            placeholder="New Feature Title"
          />
          <FormikControl
            control="input"
            type="text"
            name="unit"
            label="Unit"
            className="col-md-6 col-lg-4 my-1"
            placeholder="New Feature Unit"
          />
          <div className="col-8 col-lg-2 my-1">
            <FormikControl
              control="switch"
              name="in_filter"
              label="Show in filter"
            />
          </div>
          <div className="col-4 col-lg-2 d-flex justify-content-center align-items-start my-1">
            <SubmitButton />
            {attrToEdit ? (
              <button
                className="byn btn-sm btn-secondary me-2"
                onClick={() => setAttrToEdit(null)}
              >
                cancel
              </button>
            ) : null}
          </div>
        </div>
      </Form>
    </Formik>
  )
}

export default AddAttr