import React from "react"
const Actions = ({ rowData, setColorToEdit, handleDeleteColor}) => {
  return (
    <>
      <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="Color Edit"
        data-bs-placement="top"
        data-bs-toggle="modal"
        data-bs-target="#add_color_modal"
        onClick={()=>setColorToEdit(rowData)}
      ></i>

      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="Remove Color"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        onClick={()=>{handleDeleteColor(rowData)}}
      ></i>
    </>
  )
}

export default Actions