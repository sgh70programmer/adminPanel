import React from "react"
import { useNavigate } from "react-router-dom"
const Actions = ({ rowData, handleDeleteOrder }) => {
    const navigation = useNavigate()
    return (
        <>
            <i
                className="fas fa-shopping-cart text-info mx-1 hoverable_text pointer has_tooltip"
                title="Order Details"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                onClick={() => navigation("/orders/add-order", { state: { orderId: rowData.id } })}
            ></i>
            <i
                className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                title="Delete Cart"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                onClick={() => handleDeleteOrder(rowData)}
            ></i>
        
        </>
    )
}

export default Actions