import React, { useEffect, useState } from "react"
import PaginatedTable from "../../components/PaginatedTable"
import Addcategory from "./AddCategory"
import { deleteCategoryService, getCategoriesService } from "../../services/category"
import Actions from "./tableAdditons/Action"
import ShowInMenu from "./tableAdditons/ShowInMenu"
import { Outlet, useParams } from "react-router-dom"
import { convertDateToMiladi } from "../../utils/convertDate"
import { Alert, Confirm } from "../../utils/alerts"

const Categorytable = () => {
  const params = useParams()
  const [data, setData] = useState([])
  const [forceRender, setForceRender] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleGetCategories = async () => {
    setLoading(true)
    try {
      const res = await getCategoriesService(params.categoryId)
      if (res.status == 200) {
        setData(res.data.data)
      }

    } catch (err) {

    }finally{
      setLoading(false)
    }
  }

  const handleDeleteCategory = async (rowData)=>{
    if (await Confirm("Remove the category",`Are you sure to delete ${rowData.title}?`)) {
     try {
       const res = await deleteCategoryService(rowData.id)
       if (res.status === 200) {
         setData(data.filter(d=>d.id != rowData.id))
         Alert('Done', res.data.message, 'success')
       }
     } catch (error) {
       
     }
    }
  }

  useEffect(() => {
    handleGetCategories()
  }, [params, forceRender])


  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "Product Title" },
    { field: "parent_id", title: "Parent" },
    {
      field:null,
      title: "Date",
      elements: (rowData) => convertDateToMiladi(rowData.created_at),
    },

    {
      field:null,
      title: "Show in the menu",
      elements: (rowData) => <ShowInMenu rowData={rowData} />,
    },

    {
      field:null,
      title: "Action",
      elements: (rowData) => <Actions rowData={rowData} handleDeleteCategory={handleDeleteCategory} />,
    },

  ]




  const searchParams = {
    title: "Search",
    placeholder: "Enter part of the title",
    searchField: "title"
  }

  return (
    <>
 
      <Outlet />
      <PaginatedTable
        data={data}
        dataInfo={dataInfo}
        numOfPAge={5}
        searchParams={searchParams}
        loading={loading}
      >
        <Addcategory setForceRender={setForceRender} />
      </PaginatedTable>

    </>  

  )
}

export default Categorytable
