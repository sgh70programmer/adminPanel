import React, { useEffect, useState } from "react"
import ModalsContainer from "../../components/ModalsContainer"
import { initialValues, onSubmit, validationSchema } from "./core"
import { Formik, Form } from "formik"
import FormikControl from "../../components/form/FormikControl"
import SubmitButton from "../../components/form/SubmitButton"

const AddColor = ({ setData, colorToEdit, setColorToEdit }) => {
  const [reInitValues, setReInitValues] = useState(null)
  const [colorPickerValue, setColorPickerValue] = useState("#000")
  const [closeModal, setCloseModal] = useState(false)

  useEffect(() => {
    if (colorToEdit){
        setColorPickerValue(colorToEdit.code)
        setReInitValues({
            title: colorToEdit.title,
            code: colorToEdit.code,
        })
    }      
    else {
        setColorPickerValue("#000")
        setReInitValues(null)
    }
  }, [colorToEdit])

 

  return (
    <>
      <button
        className="btn btn-success d-flex justify-content-center align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#add_color_modal"
        onClick={() => setColorToEdit(null)}
      >
        <i className="fas fa-plus text-light"></i>
      </button>
      <ModalsContainer
        fullScreen={false}
        id={"add_color_modal"}
        title={colorToEdit ? "Color Edit" : "Add New Color"}
        closeModal={closeModal}
      >
        <div className="container">
          <div className="row justify-content-center">
            <Formik
              initialValues={reInitValues || initialValues}
              onSubmit={(values, actions) =>
                onSubmit(values, actions, setData, colorToEdit, setCloseModal)
              }
              validationSchema={validationSchema}
              enableReinitialize
            >
              <Form>
                <FormikControl
                  control="input"
                  type="text"
                  name="title"
                  label="Title"
                  placeholder="Only letters and numbers"
                />
                <FormikControl
                  control="input"
                  type="color"
                  name="code"
                  label="color selection"
                  placeholder="Only letters and numbers"
                />
      
                <div className="btn_box text-center col-12 mt-4">
                  <SubmitButton />
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </ModalsContainer>
    </>
  )
}

export default AddColor