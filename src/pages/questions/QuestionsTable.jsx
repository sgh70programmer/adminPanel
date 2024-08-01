import React, { useEffect, useState } from 'react'
import PaginatedTable from '../../components/PaginatedTable'

export default function QuestionsTable() {
    const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  

  const dataInfo = []



  const searchParams = {
    title: "Search",
    placeholder: "Enter part of the question",
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
