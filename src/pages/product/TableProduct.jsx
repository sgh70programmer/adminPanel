import React, { useState } from "react"
import { useEffect } from "react"
import PaginatedDataTable from "../../components/PaginatedDataTable"
import { deleteProductService, getProductsService } from "../../services/products"
import Actions from "./tableAddition/Actions"
import { Alert, Confirm } from "../../utils/alerts"
import AddButtonLink from "../../components/AddButtonLink"
import DOMPurify from 'dompurify'

const TableProduct = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchChar, setSearchChar] = useState("")
  const [currentPage, setCurrentPage] = useState(1) // صفحه حال حاضر
  const [countOnPage, setCountOnPage] = useState(2) // تعداد محصول در هر صفحه
  const [pageCount, setPageCount] = useState(0) // تعداد کل صفحات

  const dataInfo = [
    { field: "id", title: "#" },
    {
      field: null,
      title: "Product Group",
      elements: (rowData) => rowData.categories[0]?.title,
    },
    {
      field: null,
      title: "Product Description",
      elements: (rowData) => <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(rowData.descriptions) }}></span>,
    },
    { field: "title", title: "Title" },
    { field: "price", title: "Price" },
    { field: "stock", title: "Inventory" },
    {
      field: null,
      title: "Action",
      elements: (rowData) => <Actions rowData={rowData} handleDeleteProduct={handleDeleteProduct} />,
    },
  ]
  const searchParams = {
    title: "Search",
    placeholder: "Enter part of title",
  }

  const handleGetProducts = async (page, count, char) => {
    setLoading(true)
    const res = await getProductsService(page, count, char)
    res && setLoading(false)
    if (res.status === 200) {
      setData(res.data.data)
      setPageCount(res.data.last_page)
    }
  }

  const handleSearch = (char) => {
    setSearchChar(char)
    handleGetProducts(1, countOnPage, char)
  }

  const handleDeleteProduct = async (product) => {
    if (await Confirm("Remove Product", `Are you sure to delete ${product.title}?`)) {
      try {
        const res = await deleteProductService(product.id)
        if (res.status === 200) {
          Alert("Done", res.data.message, "success")
          handleGetProducts(currentPage, countOnPage, searchChar)

        }

      } catch {

      }

    }
  }

  useEffect(() => {
    handleGetProducts(currentPage, countOnPage, searchChar)
  }, [currentPage])

  return (
    <PaginatedDataTable
      tableData={data}
      dataInfo={dataInfo}
      searchParams={searchParams}
      loading={loading}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      pageCount={pageCount}
      handleSearch={handleSearch}
    >
      <AddButtonLink href={"/products/add-product"} />
    </PaginatedDataTable>
  )
}

export default TableProduct