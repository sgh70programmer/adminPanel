import { Alert } from "../../utils/alerts"
import * as Yup from "yup"
import { addNewDeliveryService, updateDeliveryService } from "../../services/deliveries"

export const initialValues = {
    title: "",
    amount: "",
    time: 1,
    time_unit: "day",
}

export const onSubmit = async (values, actions, setData, deliveryToEdit) => {

    if (deliveryToEdit) {
        const res = await updateDeliveryService(deliveryToEdit.id, values)
        if (res.status == 200) {
            Alert('Done', res.data.message, 'success')
            setData(lastData=>{
                let newData = [...lastData]
                let index = newData.findIndex((d) => d.id == deliveryToEdit.id)
                newData[index] = res.data.data
                return newData
            })
        }
    }else{
        const res = await addNewDeliveryService(values)
        if (res.status == 201) {
            Alert('Done', res.data.message, 'success')
            actions.resetForm()
            setData(old=>[...old, res.data.data])
        }
    }
}

export const validationSchema = Yup.object()
.shape({
    title: Yup.string()
        .required("Please fill in this field")
        .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "Use only letters and numbers"),
    amount: Yup.number().typeError("Just enter a number").required("Please fill in this field"),
    time: Yup.number().typeError("Just enter a number").required("Please fill in this field"),
    time_unit: Yup.string()
        .required("Please fill in this field")
        .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "Use only letters and numbers"),
})