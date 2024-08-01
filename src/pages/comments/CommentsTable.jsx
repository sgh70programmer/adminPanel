import React, { useEffect, useState } from 'react'
import PaginatedTable from '../../components/PaginatedTable'

export default function CommentsTable() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  

  const dataInfo = []



  const searchParams = {
    title: "Search",
    placeholder: "Enter part of title",
    searchField: "title",
  }



 

  useEffect(() => {
    
  }, [])
  return (
    <PaginatedTable
      data={data}
      dataInfo={dataInfo}
      numOfPAge={5}
      searchParams={searchParams}
      loading={loading}
    >
      
    </PaginatedTable>
  )
}
