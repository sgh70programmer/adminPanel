import React from "react"
import { useNavigate } from "react-router-dom"
const Actions = ({ rowData, handleDeleteDiscount}) => {
  const navigate = useNavigate()
  return (
    <>
      <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="Edit discount code"
        onClick={()=>navigate('/discounts/add-discount-code', {state:{discountToEdit:rowData}})}
      ></i>

      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="Remove discount code"
        onClick={()=>handleDeleteDiscount(rowData)}
      ></i>
    </>
  )
}

export default Actions