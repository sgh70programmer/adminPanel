import { Alert } from "../../utils/alerts"
import * as Yup from "yup"
import { addNewRoleService, editRolePermissionsService, editRoleService } from "../../services/users"

export const initialValues = {
    title: "",
    description: "",
    permissions_id: [],
}

export const onSubmit = async (values, actions, setData, roleIdToEdit, editType) => {
    if (editType == "role") {
        const res = await editRoleService(roleIdToEdit, values)
        if (res.status === 200) {
            Alert('Done', res.data.message, 'success')
            setData(lastData=>{
                let newData = [...lastData]
                let index = newData.findIndex((d) => d.id == roleIdToEdit)
                newData[index] = res.data.data
                return newData
            })
        }
    }else if (editType == "permissions") {
        const res = await editRolePermissionsService(roleIdToEdit, values)
        if (res.status === 200)  Alert('Done', res.data.message, 'success')
    }else{
        const res = await addNewRoleService(values)
        if (res.status === 201) {
            Alert('Done', res.data.message, 'success')
            setData(old=>[...old, res.data.data])
        }
    }
}

export const validationSchema = Yup.object().shape({
    title: Yup.string().when('editPermissions', {
        is: true,
        then: null,
        otherwise:() => Yup.string().required("Please fill in this field")
        .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-_.$?&]+$/, "Use only letters and numbers"),
    }),        
    description: Yup.string().when('editPermissions', {
        is: true,
        then: null,
        otherwise: () => Yup.string().required("Please fill in this field")
        .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-_.$?&]+$/, "Use only letters and numbers"),
    }),
    permissions_id: Yup.array().min(1, "Choose at least one")
})

