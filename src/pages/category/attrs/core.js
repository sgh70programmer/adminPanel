import { addCategoryAttrService, editCategoryAttrService } from "../../../services/categoryAttr"
import * as Yup from 'yup'
import { Alert } from "../../../utils/alerts"


export const initialValues = {
    title: "",
    unit: "",
    in_filter: true,
}

export const onSubmit = async (values, actions, catId, setData, attrToEdit, setAttrToEdit) => {
    try {
        values = {
            ...values,
            in_filter: values.in_filter ? 1 : 0
        }
        if (attrToEdit) {
            const res = await editCategoryAttrService(attrToEdit.id, values)
            if (res.status == 200) {
                setData(oldData => {
                    const newData = [...oldData]
                    const index = newData.findIndex(d => d.id == attrToEdit.id)
                    newData[index] = res.data.data
                    return newData
                })
                Alert('Done', res.data.message, 'success')
                setAttrToEdit(null)
            }
        } else {
            const res = await addCategoryAttrService(catId, values)
            if (res.status === 201) {
                Alert('Done', res.data.message, 'success')
                setData(oldData => [...oldData, res.data.data])
                actions.resetForm()
            }
        }

    } catch (error) {
    }
}

export const validationSchema = Yup.object({
    title: Yup.string()
        .required("Please fill in this field")
        .matches(
            /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
            "Use only letters and numbers"
        ),
    unit: Yup.string()
        .required("Please fill in this field")
        .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/, "You can only enter numbers")
    ,
    in_filter: Yup.boolean(),
})