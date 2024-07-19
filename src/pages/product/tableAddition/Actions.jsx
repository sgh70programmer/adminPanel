import React from "react";
const Actions = ({ rowData, handleDeleteProduct}) => {
  return (
    <>
      <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش محصول"
        
       
      ></i>
      <i
        className="fas fa-receipt text-info mx-1 hoverable_text pointer has_tooltip"
        title="ثبت ویژگی"
      
        
      ></i>
      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف محصول"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        onClick={() => handleDeleteProduct(rowData)}
      ></i>
    </>
  );
};

export default Actions;