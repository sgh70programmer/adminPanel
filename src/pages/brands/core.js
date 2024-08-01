import { Alert } from "../../utils/alerts"
import * as Yup from "yup"
import { addNewBrandService, editBrandService } from "../../services/brands"

export const initialValues = {
  original_name: "",
  persian_name: "",
  descriptions: "",
  logo: null,
}

export const onSubmit = async (values, actions, setData, brandToEdit, setCloseModal) => {
 
  if (brandToEdit) {
    const res = await editBrandService(brandToEdit.id, values)
    if (res.status === 200) {
      Alert('Done', res.data.message, 'success')
      setData(lastData => {
        let newData = [...lastData]
        let index = newData.findIndex(d => d.id == brandToEdit.id)
        newData[index] = res.data.data
        return newData
      })
      setCloseModal(true)
    }

  } else {
    const res = await addNewBrandService(values)
  
    if (res.status === 201) {
      Alert('Done', res.data.message, 'success')
      setData(lastData => [...lastData, res.data.data])
      actions.resetForm()
      setCloseModal(true)
    }
  }

}

export const validationSchema = Yup.object({
  original_name: Yup.string().required("Please fill in this section")
    .matches(
      /^[a-zA-Z0-9\s@!%$?&]+$/,
      "Use only Latin letters and numbers"
    ),
  persian_name: Yup.string()
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
      "Use only numbers and letters"
    ),
  descriptions: Yup.string().matches(
    /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
    "Use only numbers and letters"
  ),
  logo: Yup.mixed().notRequired()
    .test("filesize", "File size cannot be more than 500 KB", (value) =>
      !value ? true : value.size <= 500 * 1024
    )
    .test("format", "The file format must be jpg", (value) =>
      !value ? true : value.type === "image/jpeg" || value.type === "image/jpg" || value.type === "image/png"
    ),
})
