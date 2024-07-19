
import * as Yup from "yup";
import { addProductAttrService } from "../../../services/products";
import { Alert } from "../../../utils/alerts";
  
  export const onSubmit = async (values, actions, productId) => {
    let data = {}
    console.log("values", values);
    for (const key in values) {
        if (values[key]) data = {...data, [key]:{value: values[key]}}
    }
    console.log(data);
    const res = await addProductAttrService(productId, data)
    console.log(res);
    if (res.status === 200) {
        Alert('انجام شد', res.data.message, 'success');
    }
  };
