import React from "react"
import Categorytable from "./CategoryTable"
import CategoryContextContainer from "../../context/categoryContext"

const Category = () => {
  return (
    <CategoryContextContainer>
      <div
        id="manage_product_category"
        className="manage_product_category main_section"
      >
        <h4 className="text-center my-3">Product category management</h4>
        <Categorytable />
        
      </div>
    </CategoryContextContainer>

  )
}

export default Category
