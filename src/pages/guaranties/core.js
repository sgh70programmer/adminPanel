import { Alert } from "../../utils/alerts"
import * as Yup from "yup"
import { addNewGuaranteeService, editGuaranteeService } from "../../services/guarantees"



export const initialValues = {
  title: "",
  descriptions: "",
  length: "",
  length_unit: "",
}

export const onSubmit = async (values, actions, setData, guaranteeToEdit, setCloseModal) => {
  
  if (guaranteeToEdit) {
    const res = await editGuaranteeService(guaranteeToEdit.id, values)
    if (res.status === 200) {
      Alert("Done", res.data.message, "success")
      setData((lastData) => {
        let newData = [...lastData]
        let index = newData.findIndex((d) => d.id == guaranteeToEdit.id)
        newData[index] = res.data.data
        return newData
      })
      setCloseModal(true)
      
    }
  } else {
    const res = await addNewGuaranteeService(values)
    if (res.status === 201) {
      Alert("Done", res.data.message, "success")
      setData((lastData) => [...lastData, res.data.data])
      setCloseModal(true)
    }
  }
}

export const validationSchema = Yup.object({
  title: Yup.string()
    .required("Please fill in this field")
    .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/, "Use only Latin letters and numbers"),
  length: Yup.number(),
  descriptions: Yup.string().matches(
    /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
    "Use only numbers and letters"
  ),
  length_unit: Yup.string()
  .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/, "Use only Latin letters and numbers"),
})