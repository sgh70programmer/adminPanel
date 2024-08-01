import React, { useEffect, useState } from "react"
import PaginatedTable from "../../components/PaginatedTable"
import { deleteGuaranteeService, getAllGuaranteesService } from "../../services/guarantees"
import { Alert, Confirm } from "../../utils/alerts"
import AddGuaranty from "./AddGuaranty"
import Actions from "./tableAddition/Actions"

const GuarantiesTable = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [guaranteeToEdit, setGuaranteeToEdit] = useState(null)

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "Title" },
    { field: "descriptions", title: "Description" },
    { field: "length", title: "Warranty Period" },
    { field: "length_unit", title: "Unit" },
    {
      field: null,
      title: "Action",
      elements: (rowData) => <Actions rowData={rowData} setGuaranteeToEdit={setGuaranteeToEdit} handleDeleteGuarantee={handleDeleteGuarantee} />,
    },
  ]



  const searchParams = {
    title: "Search",
    placeholder: "Enter part of title",
    searchField: "title",
  }

  const handleGetAllGuarantees = async () => {
    setLoading(true)
    const res = await getAllGuaranteesService()
    res && setLoading(false)
    if (res.status === 200) {
      setData(res.data.data)
    }
  }

  const handleDeleteGuarantee = async (guarantee) => {
    if (await Confirm("Void Warranty", 'Are you sure you want to delete this item?')) {
      try {
        const res = await deleteGuaranteeService(guarantee.id)
        if (res.status === 200) {
          Alert("Done", res.data.message, "success")
          setData((lastData) => lastData.filter((d) => d.id != guarantee.id))
        }

      } catch {

      }

    }
  }

  useEffect(() => {
    handleGetAllGuarantees()
  }, [])
  return (
    <PaginatedTable
      data={data}
      dataInfo={dataInfo}
      numOfPAge={2}
      searchParams={searchParams}
      loading={loading}
    >
      <AddGuaranty setData={setData} guaranteeToEdit={guaranteeToEdit} setGuaranteeToEdit={setGuaranteeToEdit} />
    </PaginatedTable>
  )
}

export default GuarantiesTable