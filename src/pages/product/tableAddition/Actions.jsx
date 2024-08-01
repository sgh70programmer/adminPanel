import React from "react"
import { useNavigate } from "react-router-dom"
const Actions = ({ rowData, handleDeleteProduct}) => {
  const navigation = useNavigate()
  return (
    <>
      <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="Edit Product"
        onClick={()=>navigation('/products/add-product', {state:{productToEdit:rowData}})}
        
       
      ></i>
      <i
        className="fas fa-receipt text-info mx-1 hoverable_text pointer has_tooltip"
        title="Feature Registration"
        onClick={()=>navigation('/products/set-attr', {state:{selectedProduct:rowData}})}
      
        
      ></i>
       <i
        className="fas fa-images text-success mx-1 hoverable_text pointer has_tooltip"
        title="Gallery Management"
        onClick={()=>navigation('/products/gallery', {state:{selectedProduct:rowData}})}
      ></i>
      
      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="Remove Product"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        onClick={() => handleDeleteProduct(rowData)}
      ></i>
    </>
  )
}

export default Actions