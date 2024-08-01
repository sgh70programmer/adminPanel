import React, { useEffect, useState } from "react"
import PaginatedTable from "../../components/PaginatedTable"
import { getAllPermissionsService } from "../../services/users"

const PermissionsTable = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
  
    const dataInfo = [
      { field: "id", title: "#" },
      { field: "title", title: "Title" },
      { field: "description", title: "Description" },
      { field: "category", title: "Category Title" }      
    ]
  
    const searchParams = {
      title: "Title",
      placeholder: "Enter part of title",
      searchField: "description",
    }
  
    const handleGetAllPermissions = async ()=>{
      setLoading(true)
      const res = await getAllPermissionsService()
      res && setLoading(false)
      if (res.status === 200) {
          setData(res.data.data)
      }
    }
  
    useEffect(()=>{
        handleGetAllPermissions()
    },[])
    
  return (
    <PaginatedTable
      data={data}
      dataInfo={dataInfo}
      numOfPAge={8}
      searchParams={searchParams}
      loading={loading}
    >
    </PaginatedTable>
  )
}

export default PermissionsTable