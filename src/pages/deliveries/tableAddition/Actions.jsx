import React from "react"
import {useNavigate} from 'react-router-dom'
const Actions = ({rowData, handleDeleteDelivery}) => {
  const navigate = useNavigate()
  return (
    <>
      <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="Edit sending method"
        onClick={()=>navigate('/deliveries/add-delivery', {state:{deliveryToEdit:rowData}})}
      ></i>

      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="Remove sending method"
        onClick={()=>handleDeleteDelivery(rowData)}
      ></i>
    </>
  )
}

export default Actions