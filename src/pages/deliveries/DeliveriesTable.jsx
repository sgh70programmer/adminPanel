import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import AddButtonLink from '../../components/AddButtonLink'
import PaginatedTable from '../../components/PaginatedTable'
import { deleteDeliveryService, getAllDeliveriesService } from '../../services/deliveries'
import { Alert, Confirm } from '../../utils/alerts'
import Actions from './tableAddition/Actions'

const DeliveriesTable = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
  
    const dataInfo = [
      { field: "id", title: "#" },
      { field: "title", title: "Title" },
      { field: "amount", title: "Cost" },
      {
        field: null,
        title: "Delivery time",
        elements: (rowData) => rowData.time + " " + rowData.time_unit ,
      },
      {
        field: null,
        title: "Action",
        elements: (rowData) => <Actions rowData={rowData} handleDeleteDelivery={handleDeleteDelivery}/>,
      },
    ]
  
    const searchParams = {
      title: "Search",
      placeholder: "Enter part of user ID",
      searchField: "title",
    }
  
    const handleGetAllDeliveries = async ()=>{
      setLoading(true)
      const res = await getAllDeliveriesService()
      setLoading(false)
      if (res.status === 200) setData(res.data.data)
    }
  
    const handleDeleteDelivery = async (delivery)=>{
      if (await Confirm(delivery.title,'Are you sure you want to delete this item?')) {
        const res = await deleteDeliveryService(delivery.id)
        if (res.status === 200) {
          Alert('Deleted...!', res.data.message, 'success')
          setData(old=> old.filter(d => d.id != delivery.id))
        }
      }
    }
    
    useEffect(()=>{
      handleGetAllDeliveries()
    },[])
    return (
      <PaginatedTable
        data={data}
        dataInfo={dataInfo}
        numOfPAge={8}
        searchParams={searchParams}
        loading={loading}
      >
        <AddButtonLink href={"/deliveries/add-delivery"} />
        <Outlet context={{setData}}/>
      </PaginatedTable>
    )
  }

export default DeliveriesTable