
import { Alert } from "../../utils/alerts"
import * as Yup from "yup"
import { addNewColorService, editColorService } from "../../services/colors"

export const initialValues = {
  title: "",
  code: "#000"
}

export const onSubmit = async (values, actions, setData, colorToEdit, setCloseModal) => {
  if (colorToEdit) {
    const res = await editColorService(colorToEdit.id, values)
    if (res.status === 200) {
      Alert("Done", res.data.message, "success")
      setData((lastData) => {
        let newData = [...lastData]
        let index = newData.findIndex((d) => d.id == colorToEdit.id)
        newData[index] = res.data.data
        return newData
      })
      setCloseModal(true)
    }
  } else {
    const res = await addNewColorService(values)
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
  code: Yup.string().matches(/^[a-zA-Z0-9@!%$#?&]+$/,"Use only numbers and letters")
})
