import React from 'react'
import ModalsContainer from '../../components/ModalsContainer'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import { Form, Formik } from 'formik'
import FormikControl from '../../components/form/FormikControl'
import { initialValues, onSubmit, validationSchema } from './core'
import SubmitButton from '../../components/form/SubmitButton'
import { useState } from 'react'
import { useEffect } from 'react'
import { getAllProductTitlesService } from '../../services/products'
import { convertDateToJalali } from '../../utils/convertDate'

const AddDiscount = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [allProducts, setAllProducts] = useState([])
    const discountToEdit = location.state?.discountToEdit
    const [selectedProducts, setSelectedProducts] = useState([])
    const [reInitialValues, setReInitialValues] = useState(null)
    const { setData } = useOutletContext()

    const handleGetAllProductTitles = async () => {
        const res = await getAllProductTitlesService()
        if (res.status === 200) {
            setAllProducts(res.data.data.map(p => { return { id: p.id, value: p.title } }))
        }
    }

    const handleSetProductSelectBox = (formik) => {
        
        
            const idsArr = formik.values.product_ids.split("-").filter(id => id)
            
           
            const selectedProductArr = idsArr.map(id => allProducts.filter(p => p.id == id)[0]).filter(product=>product)
            
       
       
        

        return (
            <FormikControl
                className="animate__animated animate__shakeX"
                label="for"
                control="searchableSelect"
                options={allProducts}
                name="product_ids"
                firstItem="Select the desired product..."
                resultType="string"
                initialItems={selectedProductArr.length > 0 ? selectedProductArr : selectedProducts}
            />
        )
    }

    useEffect(() => {
       
        handleGetAllProductTitles()
            if (discountToEdit) {
                
                
                const productIds = discountToEdit.products.map(p => p.id).join("-")
               
                setReInitialValues({
                    ...discountToEdit,
                    expire_at: convertDateToJalali(discountToEdit.expire_at, 'jD / jM / jYYYY'),
                    for_all: discountToEdit.for_all ? true : false,
                    product_ids: productIds
                })
            }
       
    }, [])

    return (
        <ModalsContainer
            className="show d-block"
            id={"add_discount_modal"}
            title={"Add discount code"}
            fullScreen={false}
            closeFunction={() => navigate(-1)}
        >
            <div className="container">
                <div className="row justify-content-center">

                    <Formik
                        initialValues={reInitialValues || initialValues}
                        onSubmit={(values, actions) => onSubmit(values, actions, setData, discountToEdit)}
                        validationSchema={validationSchema}
                        enableReinitialize
                    >
                        {formik => {
                            
                            return (
                                <Form>
                                    <FormikControl
                                        control="input"
                                        type="text"
                                        name="title"
                                        label="discount title"
                                        placeholder="Only use Persian and Latin letters"
                                    />
                                    <FormikControl
                                        control="input"
                                        type="text"
                                        name="code"
                                        label="discount code"
                                        placeholder="Use only Latin letters and numbers"
                                    />
                                    <FormikControl
                                        control="input"
                                        type="number"
                                        name="percent"
                                        label="discount percent"
                                        placeholder="Just use numbers"
                                    />
                                    <FormikControl
                                        control="date"
                                        formik={formik}
                                        name="expire_at"
                                        label="expiration date"
                                        initialDate={discountToEdit?.expire_at || undefined }
                                        yearsLimit={{ from: 10, to: 10 }}
                                    />
                                    <div className="row mb-2">
                                        <div className="col-12 col-md-4">
                                            <FormikControl
                                                control="switch"
                                                name="for_all"
                                                label="For all"
                                            />
                                        </div>
                                    </div>
                                    {
                                        !formik.values.for_all ?  handleSetProductSelectBox(formik) : null
                                    }
                                    <div className="btn_box text-center col-12 mt-4">
                                        <SubmitButton />
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>

                </div>
            </div>

        </ModalsContainer>
    )
}

export default AddDiscount