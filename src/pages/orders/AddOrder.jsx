import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import FormikControl from '../../components/form/FormikControl'
import SubmitButton from '../../components/form/SubmitButton'
import ModalsContainer from '../../components/ModalsContainer'
import { getSinglrCartService } from '../../services/carts'
import { getAllDeliveriesService } from '../../services/deliveries'
import { getOneDiscountService } from '../../services/discounts'
import { getSinglrOrderService } from '../../services/orders'
import { Alert } from '../../utils/alerts'
import { convertDateToJalali } from '../../utils/convertDate'
import { numberWithCommas } from '../../utils/numbers'
import { initialValues, onSubmit, validationSchema } from './core'

const AddOrder = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const selectedOrderId = location.state?.orderId
    const {handleGetOrders} = useOutletContext()
    const [reInitialValues, setReInitialValues] = useState(null)
    const [discountPercent, setDiscountPercent] = useState(0)
    const [allDeliveries, setAllDeliveries] = useState([])
    const [selectedCartItemsInfo, setSelectedCartItemsInfo] = useState([])

    const getAllDeliveries = async ()=>{
        const res = await getAllDeliveriesService()
        if (res.status === 200)  setAllDeliveries(res.data.data.map(d=>({id:d.id, value:d.title + "-" + d.amount})))
    }

    const handleGetCartsInfo = async (cartId)=>{
        if (!cartId) return setSelectedCartItemsInfo([])
        const res = await getSinglrCartService(cartId)
    
       
        if (res.status === 200 && res.data.data) {
            let products = []
            const cart = res.data.data
            if(cart?.is_ordered) {
                setSelectedCartItemsInfo([])
                return Alert('Error', 'This basket is in another order', 'warning')
            }
            for (const item of cart?.items) {
                products.push({
                    id: item.id,
                    product: item.product,
                    guarantee: item.guarantee,
                    color: item.color,
                    count: item.count,
                })
            }
            setSelectedCartItemsInfo(products)
        }
    }

    const handleDiscountInfo = async (discountId)=>{
        if (!discountId) return setDiscountPercent(0)
        const res = await getOneDiscountService(discountId)
    console.log("res discount", res)
        if (res.status === 200 && res.data.data) setDiscountPercent(res.data.data.percent)
    }

    const getSelectedOrderInfo = async ()=>{
        const res = await getSinglrOrderService(selectedOrderId)
        if (res.status == 200) {
            const order = res.data.data
            setReInitialValues({
                cart_id: order.cart_id,
                discount_id: order.discount_id || "",
                delivery_id: order.delivery_id,
                address: order.address,
                phone: order.phone,
                email: order.email ||"",
                pay_at: order.pay_at ? convertDateToJalali(order.pay_at) : "",
                pay_card_number: order.pay_card_number ||"",
                pay_bank: order.pay_bank ||"",
            })
            let products = []
            const cart = order.cart
            for (const item of cart.items) {
                products.push({
                    id: item.id,
                    product: item.product,
                    guarantee: item.guarantee,
                    color: item.color,
                    count: item.count,
                    unit_price: item.unit_price
                })
            }
            setSelectedCartItemsInfo(products)
        }
    }


    useEffect(()=>{
        getAllDeliveries()
        selectedOrderId && getSelectedOrderInfo()
    },[])
    
    return (
        <>
            <ModalsContainer
            className="show d-block"
            id={"add_order_modal"}
            title={selectedOrderId ? "Order Details" :"Add Order"}
            fullScreen={true}
            closeFunction={()=>navigate(-1)}
            >
                <div className="container">
                    <Formik
                    initialValues={reInitialValues || initialValues}
                    onSubmit={(values, actions)=>onSubmit(values, actions, navigate, handleGetOrders)}
                    validationSchema={validationSchema}
                    enableReinitialize
                    >
                        {formik=>{
                            return (
                                <Form>
                                    <div className="row my-1 justify-content-center">
                                        <FormikControl
                                        className="col-12 col-md-4 col-lg-2 my-1"
                                        control="input"
                                        type="number"
                                        name="cart_id"
                                        placeholder="Cart Code"
                                        onBlur={(e)=>handleGetCartsInfo(e.target.value)}
                                        />
                                        <FormikControl
                                        className="col-12 col-md-4 col-lg-2 my-1 mini_date_box"
                                        control="date"
                                        formik={formik}
                                        name="pay_at"
                                        placeholder="date of payment"
                                        initialDate={undefined }
                                        yearsLimit={{from: 10, to:0}}
                                        />

                                        <div className="col-12 col-md-4 col-lg-2 my-1">
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            value={`Cart amount: ${ selectedCartItemsInfo.length > 0 ? numberWithCommas(selectedCartItemsInfo.map(p=>p.count*(p.unit_price || p.product.price)).reduce((a, b)=>a+b)) : 0}`} 
                                            disabled />
                                        </div>

                                        <FormikControl
                                        className="col-12 col-md-4 col-lg-2 my-1"
                                        control="input"
                                        type="number"
                                        name="discount_id"
                                        placeholder="Discount ID"
                                        onBlur={(e)=>handleDiscountInfo(e.target.value)}
                                        />

                                        <div className="col-12 col-md-4 col-lg-2 my-1">
                                            <input type="text" className="form-control" value={"discount percent: "+discountPercent} disabled />
                                        </div>


                                        <div className="col-12"></div>
                                        <FormikControl
                                        className="col-12 col-md-10 my-1"
                                        control="input"
                                        type="text"
                                        name="address"
                                        placeholder="Address"
                                        />
                                        <div className="col-12"></div>

                                        <FormikControl
                                        className="col-12 col-md-4 col-lg-2 my-1"
                                        control="select"
                                        options={allDeliveries}
                                        name="delivery_id"
                                        firstItem="Sending method"
                                        />

                                        <FormikControl
                                        className="col-12 col-md-4 col-lg-2 my-1"
                                        control="input"
                                        type="text"
                                        name="phone"
                                        placeholder="Phone number"
                                        />

                                        <FormikControl
                                        className="col-12 col-md-4 col-lg-2 my-1"
                                        control="input"
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        />

                                        <FormikControl
                                        className="col-12 col-md-4 col-lg-2 my-1"
                                        control="input"
                                        type="nomber"
                                        name="pay_card_number"
                                        placeholder="Card Number"
                                        />

                                        <FormikControl
                                        className="col-12 col-md-4 col-lg-2 my-1"
                                        control="input"
                                        type="text"
                                        name="pay_bank"
                                        placeholder="Bank name"
                                        />

                                        <hr className="mt-3" />
                                    </div>

                                    <div className='row'>
                                        {
                                            selectedCartItemsInfo.map(item=>(
                                                <div className="col-12 col-md-6 col-lg-4" key={item.id}>
                                                    <div className="input-group my-3 dir_ltr">
                                                        <span className="input-group-text text-end font_08 w-100 text_truncate">
                                                            {item.product.title}
                                                            (Unit price : {numberWithCommas(item.unit_price || item.product.price)})
                                                            (Warranty: {item.guarantee?.title})
                                                            ({item.count} number)
                                                            <i className="fas fa-circle mx-1" style={{ color: item.color?.code }}></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>

                                    {
                                        (selectedCartItemsInfo.length > 0 && !selectedOrderId) && (
                                            <div className="btn_box text-center col-12 mt-4">
                                                <SubmitButton />
                                            </div>
                                        )
                                    }

                                </Form>
                            )
                        }}
                    </Formik>
                </div>


            </ModalsContainer>

        </>

    )
}

export default AddOrder