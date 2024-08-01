import React, { useState } from "react"
import { useEffect } from "react"
import PaginatedTable from "../../components/PaginatedTable"
import { deleteBrandService, getAllBrandsService } from "../../services/brands"
import { apiPath } from "../../services/httpService"
import AddBrands from "./AddBrands"
import Actions from "./tableAdditional/Actions"
import { Alert, Confirm } from "../../utils/alerts"

const Brandstable = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [brandToEdit, setBrandToEdit] = useState(null)

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "original_name", title: "Latin Title" },
    { field: "persian_name", title: "Persian Title" },
    { field: "descriptions", title: "Description" },
    {
      field: null,
      title: "Logo",
      elements: (rowData) =>
        rowData.logo ? <img src={apiPath + "/" + rowData.logo} width="40" /> : null,
    },
    {
      field: null,
      title: "Action",
      elements: (rowData) => <Actions rowData={rowData} setBrandToEdit={setBrandToEdit} handleDeleteBrand={handleDeleteBrand} />,
    },
  ]


  const searchParams = {
    title: "Search",
    placeholder: "Enter part of the title",
    searchField: "original_name",
  }

  const handleGetAllBrands = async () => {
    setLoading(true)
    const res = await getAllBrandsService()
    res && setLoading(false)
    if (res.status === 200) {
      setData(res.data.data)
    }
  }

  const handleDeleteBrand = async (brand) => {
    try {
      if (await Confirm("Remove the brand", `Are you sure to delete ${brand.original_name}?`)) {
        const res = await deleteBrandService(brand.id)
        if (res.status === 200) {
          Alert("Done", res.data.message, "success")
          setData((lastData) => lastData.filter((d) => d.id != brand.id))
        }
      }

    } catch {

    }

  }

  useEffect(() => {
    handleGetAllBrands()
  }, [])

  return (
    <>
      <PaginatedTable
        data={data}
        dataInfo={dataInfo}
        numOfPAge={8}
        searchParams={searchParams}
        loading={loading}
      >
        <AddBrands setData={setData} brandToEdit={brandToEdit} setBrandToEdit={setBrandToEdit} />
      </PaginatedTable>
    </>
  )
}

export default Brandstable