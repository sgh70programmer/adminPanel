
import React, { useEffect, useState } from "react"
import PaginatedTable from "../../components/PaginatedTable"
import { deleteColorService, getAllColorsService } from "../../services/colors"
import { Alert, Confirm } from "../../utils/alerts"
import AddColor from "./AddColor"
import Actions from "./tableAddition/Actions"

const ColorsTable = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [colorToEdit, setColorToEdit] = useState(null)
  
    const dataInfo = [
      { field: "id", title: "#" },
      { field: "title", title: "Title" },
      { field: "code", title: "Color Code" },
      {
        field:null,
        title: "Color",
        elements: (rowData) => <div className="w-100 h-100 d-block" style={{ background: rowData.code, color:rowData.code }}>...</div>,
      },
      {
        field:null,
        title: "Action",
        elements: (rowData) => (
          <Actions rowData={rowData} setColorToEdit={setColorToEdit} handleDeleteColor={handleDeleteColor}/>
        ),
      },
    ]
  
  
    const searchParams = {
      title: "Search",
      placeholder: "Enter part of title",
      searchField: "title",
    }
  
    const handleGetAllColors = async ()=>{
      setLoading(true)
      const res = await getAllColorsService()
      res && setLoading(false)
      if (res.status === 200) {
          setData(res.data.data)
      }
    }
  
    const handleDeleteColor = async (color) => {
      if (await Confirm("Remove Color", `Are you sure to delete ${color.title}?`)) {
        try{
          const res = await deleteColorService(color.id)
          if (res.status === 200) {
            Alert("Done", res.data.message, "success")
            setData((lastData) => lastData.filter((d) => d.id != color.id))
          }

        }catch{

        }
   
      }
    }
  
    useEffect(()=>{
        handleGetAllColors()
    },[])
  return (
    <PaginatedTable
      data={data}
      dataInfo={dataInfo}
      numOfPAge={5}
      searchParams={searchParams}
      loading={loading}
    >
      <AddColor setData={setData} colorToEdit={colorToEdit} setColorToEdit={setColorToEdit} />
    </PaginatedTable>
  )
}

export default ColorsTable
