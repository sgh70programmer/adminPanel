import React, { useEffect, useState } from "react"
import AddButtonLink from "../../components/AddButtonLink"
import PaginatedTable from "../../components/PaginatedTable"
import { deleteRoleService, getAllRolesService } from "../../services/users"
import { Alert, Confirm } from "../../utils/alerts"
import Actions from "./tableAddition/Actions"
import {Outlet} from 'react-router-dom'

const RolesTable = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
  
    const dataInfo = [
      { field: "id", title: "#" },
      { field: "title", title: "Title" },
      { field: "description", title: "Description" },
      {
        field: null,
        title: "Action",
        elements: (rowData) => (
          <Actions rowData={rowData} handleDeleteRole={handleDeleteRole}/>
        ),
      },
    ]

    const searchParams = {
      title: "Search",
      placeholder: "Enter part of title",
      searchField: "title",
    }
  
    const handleGetAllRoles = async ()=>{
      setLoading(true)
      const res = await getAllRolesService()
      res && setLoading(false)
      if (res.status === 200) {
          setData(res.data.data)
      }
    }
  
    const handleDeleteRole = async (role) => {
      if(await Confirm(role.title, 'Are you sure you want to delete this role?')){
        try{
          const res = await deleteRoleService(role.id)
          if(res.status == 200){
            Alert('Done', res.data.message, 'success')
            setData(oldData => oldData.filter(data => data.id != role.id))
          }

        }catch{

        }
       
      }
    }
  
    useEffect(()=>{
        handleGetAllRoles()
    },[])
    
  return (
    <PaginatedTable
      data={data}
      dataInfo={dataInfo}
      numOfPAge={8}
      searchParams={searchParams}
      loading={loading}
    >
        <AddButtonLink href={"/roles/add-role"} />
        <Outlet context={{setData}}/>
    </PaginatedTable>
  )
}

export default RolesTable