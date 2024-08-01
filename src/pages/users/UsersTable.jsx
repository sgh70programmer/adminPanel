import React, { useState } from "react"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import AddButtonLink from "../../components/AddButtonLink"
import PaginatedDataTable from "../../components/PaginatedDataTable"
import { deleteUserService, getAllPaginatedUsersService } from "../../services/users"
import { Alert, Confirm } from "../../utils/alerts"
import Actions from "./tableAddition/Actions"
import Roles from "./tableAddition/Roles"

const UsersTable = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchChar, setSearchChar] = useState("")
  const [currentPage, setCurrentPage] = useState(1) // صفحه حال حاضر
  const [countOnPage, setCountOnPage] = useState(2) // تعداد محصول در هر صفحه
  const [pageCount, setPageCount] = useState(0) // تعداد کل صفحات

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "user_name", title: "User Name" },
    {
      field: null,
      title: "Name",
      elements: (rowData) => `${rowData.first_name || ""} ${rowData.last_name || ""}`,
    },
    {
      field: null,
      title: "Role",
      elements: (rowData) => <Roles rowData={rowData} />,
    },
    { field: "phone", title: "Phone Number" },
    { field: "email", title: "Email" },
    {
      field: null,
      title: "Gender",
      elements: (rowData) => rowData.gender == 1 ? "sir" : "lady",
    },
    {
      field: null,
      title: "Action",
      elements: (rowData) => <Actions rowData={rowData} handleDeleteUser={handleDeleteUser} />,
    },
  ]
  const searchParams = {
    title: "Search",
    placeholder: "Enter part of contact number or email",
  }

  const handleGetUsers = async (page, count, char) => {
    setLoading(true)
    const res = await getAllPaginatedUsersService(page, count, char)
   
    res && setLoading(false)
    if (res.status === 200) {
     
      setData(res.data.data.data)
      setPageCount(res.data.data.last_page)
    }
  }

  const handleSearch = (char) => {
    setSearchChar(char)
    handleGetUsers(1, countOnPage, char)
  }

  const handleDeleteUser = async (user) => {
    if (await Confirm("Delete User", `Are you sure to delete ${user.user_name}?`)) {
      try {
        const res = await deleteUserService(user.id)
        if (res.status === 200) {
          Alert("Done", res.data.message, "success")
          handleGetUsers(currentPage, countOnPage, searchChar)
        }

      } catch {

      }

    }
  }


  useEffect(() => {
    handleGetUsers(currentPage, countOnPage, searchChar)
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
      <AddButtonLink href={"/users/add-user"} />
      <Outlet context={{ setData }} />
    </PaginatedDataTable>
  )
}

export default UsersTable