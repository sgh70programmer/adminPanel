
import { Alert } from "../../utils/alerts"
import * as Yup from "yup"
import { convertFormDateToMiladi } from "../../utils/convertDate"
import { addNewDiscountService, updateDiscountService } from "../../services/discounts"

export const initialValues = {
    title: "",
    code: "",
    percent: 0,
    expire_at: "",
    for_all: true,
    product_ids: "",
}

export const onSubmit = async (values, actions, setData, discountToEdit) => {
    values = {
        ...values,
        expire_at: convertFormDateToMiladi(values.expire_at)
    }
    if (discountToEdit) {
        const res = await updateDiscountService(discountToEdit.id, values)
        if (res.status == 200) {
            Alert('Done', res.data.message, 'success')
            setData(lastData=>{
                let newData = [...lastData]
                let index = newData.findIndex((d) => d.id == discountToEdit.id)
                newData[index] = res.data.data
                return newData
            })
        }
    }else{
        const res = await addNewDiscountService(values)
    if (res.status == 201) {
        Alert('Done', res.data.message, 'success')
        actions.resetForm()
        setData(old => [...old, res.data.data])
    }
    }
    
    
}

export const validationSchema = Yup.object()
    .shape({
        title: Yup.string()
            .required("Please fill in this field")
            .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "Use only letters and numbers"),
        expire_at: Yup.string()
            .required("Please fill in this field")
            .matches(/^[0-9/\ \s-]+$/, "Only use numbers and dashes"),
        code: Yup.string()
            .required("Please fill in this field")
            .matches(/^[a-zA-Z0-9\s@!%-.$?&]+$/, "Use only letters and numbers"),
        percent: Yup.number().required("Please fill in this field"),
        for_all: Yup.boolean(),
        product_ids: Yup.string().when('for_all', {
            is: false,
            then: () => Yup.string().required("Please fill in this field").matches(/^[0-9\s-]+$/, "Only use numbers and dashes"),
        }),
    })
