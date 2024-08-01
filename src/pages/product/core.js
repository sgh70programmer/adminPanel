import * as Yup from "yup"
import { createNewProductService, editProductService } from "../../services/products"
import { Alert } from "../../utils/alerts"

export const initialValues = {
  category_ids: "",
  title: "",
  price: "",
  weight: "",
  brand_id: "",
  color_ids: "",
  guarantee_ids: "",
  descriptions: "",
  short_descriptions: "",
  cart_descriptions: "",
  image: "",
  alt_image: "",
  keywords: "",
  stock: "",
  discount: "",
}

export const onSubmit = async (values, actions, productToEdit) => {
  if (productToEdit) {
    const res = await editProductService(productToEdit.id, values)
    if (res.status === 200) {
      Alert('Done', res.data.message, 'success')
    }
  } else {
    const res = await createNewProductService(values)
    if (res.status === 201) {
      Alert('Done', res.data.message, 'success')
    }
  }

}

export const validationSchema = Yup.object({
  category_ids: Yup.string()
    .required("Please fill in this field")
    .matches(/^[0-9\s-]+$/, "Only use numbers and dashes"),
  title: Yup.string()
    .required("Please fill in this field")
    .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "Use only letters and numbers"),
  price: Yup.number()
    .required("Please fill in this field"),
  weight: Yup.number(),
  brand_id: Yup.number(),
  color_ids: Yup.string().matches(/^[0-9\s-]+$/, "Only use numbers and dashes"),
  guarantee_ids: Yup.string().matches(/^[0-9\s-]+$/, "Only use numbers and dashes"),
  descriptions: Yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-<>/:.$?&]+$/, "Use only letters and numbers"),
  short_descriptions: Yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "Use only letters and numbers"),
  cart_descriptions: Yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "Use only letters and numbers"),
  image: Yup.mixed()
    .test("filesize", "File size cannot be more than 500 KB", (value) =>
      !value ? true : value.size <= 500 * 1024
    )
    .test("format", "The file format must be jpg", (value) =>
      !value ? true : value.type === "image/jpeg"
    ),
  alt_image: Yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "Use only letters and numbers"),
  keywords: Yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "Use only letters and numbers"),
  stock: Yup.number().required("Please fill in this field"),
  discount: Yup.number(),
})