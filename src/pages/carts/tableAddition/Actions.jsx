import React from "react"
import { useNavigate } from "react-router-dom"

const Actions = ({ rowData, handleDeleteCart }) => {
    const navigation = useNavigate()
    return (
        <>
           
            <i
                className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
                title="Basket editing"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                onClick={() => navigation("/carts/add-cart", { state: { cartId: rowData.id } })}
            ></i>
            <i
                className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                title="Basket deleting"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                onClick={() => handleDeleteCart(rowData)}
            ></i>

        </>
    )
}

export default Actions