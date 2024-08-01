import React, { useState } from "react"
import ModalsContainer from "../../components/ModalsContainer"
import {Formik, Form} from 'formik'
import FormikControl from '../../components/form/FormikControl'
import SubmitButton from '../../components/form/SubmitButton'
import { useEffect } from 'react'
import { initialValues, onSubmit, validationSchema } from "./core"


const AddGuaranty = ({ setData, guaranteeToEdit, setGuaranteeToEdit }) => {
  const [reInitValues, setReInitValues] = useState(null)
  const [closeModal, setCloseModal] = useState(false)

  useEffect(() => {
    if (guaranteeToEdit)
      setReInitValues({
        title: guaranteeToEdit.title,
        descriptions: guaranteeToEdit.descriptions || "",
        length: guaranteeToEdit.length || "",
        length_unit: guaranteeToEdit.length_unit || "",
      })
    else setReInitValues(null)
  }, [guaranteeToEdit])
  return (
    <>
      <button
        className="btn btn-success d-flex justify-content-center align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#add_guarantee_modal"
        onClick={() => setGuaranteeToEdit(null)}
      >
        <i className="fas fa-plus text-light"></i>
      </button>
      <ModalsContainer
        id="add_guarantee_modal"
        title={guaranteeToEdit ? "Warranty Edit" : "Add warranty"}
        fullScreen={false}
        closeModal={closeModal}
      >
        <div className="container">
          <div className="row justify-content-center">
            <Formik
              initialValues={reInitValues || initialValues}
              onSubmit={(values, actions) =>
                onSubmit(values, actions, setData, guaranteeToEdit, setCloseModal)
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
                  control="textarea"
                  type="text"
                  name="descriptions"
                  label="Description"
                  placeholder="Only letters and numbers"
                />
                <FormikControl
                  control="input"
                  type="number"
                  name="length"
                  label="Warranty Period"
                  placeholder="Only numbers"
                />
                <FormikControl
                  control="input"
                  type="text"
                  name="length_unit"
                  label="Unit"
                  placeholder="only letters"
                />
                <div className="btn_box text-center col-12">
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

export default AddGuaranty