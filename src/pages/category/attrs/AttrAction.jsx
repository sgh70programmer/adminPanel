import React from "react"

const AttrAction = ({rowData, attrToEdit , setAttrToEdit, handleDeleteCategoryAttr}) => {
  return (
    <div className={`text-center ${attrToEdit && attrToEdit.id == rowData.id ? "alert-danger danger_shadow" : ""}`}>
      <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="Edit Feature"
        data-bs-placement="top"
        onClick={()=>setAttrToEdit(rowData)}
      ></i>
      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="Delete Feature"
        onClick={()=>handleDeleteCategoryAttr(rowData)}
      ></i>
    </div>
  )
}

export default AttrAction