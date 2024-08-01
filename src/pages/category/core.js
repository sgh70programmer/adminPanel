import {
    createNewCategoryService,
    editCategoryService,
} from "../../services/category"
import { Alert } from "../../utils/alerts"
import * as Yup from "yup"


export const initialValues = {
    parent_id: "",
    title: "",
    description: "",
    image: null,
    is_active: true,
    show_in_menu: true,
}

export const onSubmit = async (values, actions, setForceRender, editId, setCloseModal) => {

    try {
        values = { ...values, is_active: values.is_active ? 1 : 0, show_in_menu: values.show_in_menu ? 1 : 0 }
        if (editId) {
            const res = await editCategoryService(editId, values)
            if (res.status == 200) {
                Alert("Edit Record", res.data.message, "success")
                setForceRender((last) => last + 1)
                setCloseModal(true)
            }
        } else {
            const res = await createNewCategoryService(values)
            if (res.status == 201) {
                Alert('The record was recorded', res.data.message, 'success')
                actions.resetForm()
                setForceRender(last => last + 1)
                setCloseModal(true)
            }
        }


    } catch (error) {

    }
}


export const validationSchema = Yup.object({
    parent_id: Yup.number(),
    title: Yup.string()
        .required("Please fill in this field")
        .matches(
            /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
           "Use only letters and numbers"
        ),
    description: Yup.string().matches(
        /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
        "Use only letters and numbers"
    ),
    image: Yup.mixed().notRequired()
        .test("filesize", "File size cannot be more than 500 KB", (value) =>
            !value ? true : value.size <= 500 * 1024
        )
        .test("format", "The file format must be jpg", (value) =>
            !value ? true : value.type === "image/jpeg"
        ),
    is_active: Yup.boolean(),
    show_in_menu: Yup.boolean(),
})
