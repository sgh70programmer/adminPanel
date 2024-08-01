
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import AddButtonLink from '../../components/AddButtonLink'
import PaginatedTable from '../../components/PaginatedTable'
import { deleteDiscountService, getAllDiscountsService } from '../../services/discounts'
import { convertDateToJalali, convertDateToMiladi } from '../../utils/convertDate'
import Actions from './tableAddition/Actions'
import { Alert, Confirm } from '../../utils/alerts'

const DiscounTstable = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "Title" },
    { field: "code", title: "discount code" },
    { field: "percent", title: "discount percent" },
    {
      field: null,
      title: "Expiration date",
      elements: (rowData) => convertDateToMiladi(rowData.expire_at),
    },
    {
      field: null,
      title: "Status",
      elements: (rowData) => rowData.is_active ? "active" : "inactive",
    },
    {
      field: null,
      title: "Regarding",
      elements: (rowData) => rowData.for_all ? "all" : "a number of products",
    },
    {
      field: null,
      title: "Action",
      elements: (rowData) => <Actions rowData={rowData} handleDeleteDiscount={handleDeleteDiscount} />,
    },
  ]

  const searchParams = {
    title: "Search",
    placeholder: "Enter part of title",
    searchField: "title",
  }

  const handleGetAllDiscounts = async () => {
    setLoading(true)
    const res = await getAllDiscountsService()
    setLoading(false)
    if (res.status === 200) {
      setData(res.data.data)
    }
  }

  const handleDeleteDiscount = async (discount) => {
    if (await Confirm(discount.title, 'Are you sure to delete this discount code?')) {
      try {
        const res = await deleteDiscountService(discount.id)
        if (res.status === 200) {
          Alert('Deleted...!', res.data.message, 'success')
          setData(old => old.filter(d => d.id != discount.id))
        }

      } catch {

      }

    }
  }

  useEffect(() => {
    handleGetAllDiscounts()
  }, [])
  return (
    <PaginatedTable
      data={data}
      dataInfo={dataInfo}
      numOfPAge={4}
      searchParams={searchParams}
      loading={loading}
    >
      <AddButtonLink href={"/discounts/add-discount-code"} />
      <Outlet context={{ setData }} />
    </PaginatedTable>
  )
}

export default DiscounTstable
