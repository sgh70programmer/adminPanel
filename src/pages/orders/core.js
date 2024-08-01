import { Alert } from "../../utils/alerts"
import * as Yup from "yup"
import { convertFormDateToMiladi } from "../../utils/convertDate"
import { addNewOrderService } from "../../services/orders"

export const initialValues = {
    cart_id: "",
    discount_id: "",
    delivery_id: "",
    address: "",
    phone: "",
    email: "",
    pay_at: "",
    pay_card_number: "",
    pay_bank: "",
}

export const onSubmit = async (values, actions, navigate, handleGetOrders) => {
    values = {
        ...values,
        pay_at:values.pay_at ? convertFormDateToMiladi(values.pay_at): null
    }
    const res = await addNewOrderService(values)
    if (res.status === 201) {
        Alert('Done', res.data.message, 'success')
        navigate(-1)
        handleGetOrders()
    }
}

export const validationSchema = Yup.object().shape({
    cart_id : Yup.number().typeError("Just enter a number").required("Please fill in this field"),
    discount_id : Yup.number().typeError("Just enter a number"),
    delivery_id : Yup.number().typeError("Just enter a number").required("Please fill in this field"),
    address : Yup.string()
        .required("Please fill in this field")
        .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "Use only letters and numbers"),
    phone : Yup.number().typeError("Just enter a number").required("Please fill in this field"),
    email : Yup.string().email("Follow the email format"),
    pay_at:Yup.string()
        .required("Please fill in this field")
        .matches(/^[0-9/\ \s-]+$/,"Only use numbers and dashes"),
    pay_card_number : Yup.number().typeError("Just enter a number"),
    pay_bank : Yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "Use only letters and numbers"),
})