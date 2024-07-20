import React, { useEffect, useState } from "react";
import PaginatedTable from "../../components/PaginatedTable";
import Addcategory from "./AddCategory";
import { deleteCategoryService, getCategoriesService } from "../../services/category";
import Actions from "./tableAdditons/Action";
import ShowInMenu from "./tableAdditons/ShowInMenu";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { convertDateToJalali } from "../../utils/convertDate";
import { Alert, Confirm } from "../../utils/alerts";

const Categorytable = () => {
  const params = useParams()
  const [data, setData] = useState([])
  const [forceRender, setForceRender] = useState(0);
  const [loading, setLoading] = useState(false)

  const handleGetCategories = async () => {
    setLoading(true)
    try {
      const res = await getCategoriesService(params.categoryId)
      if (res.status == 200) {
        setData(res.data.data)
      }

    } catch (err) {

    }finally{
      setLoading(false)
    }
  }

  const handleDeleteCategory = async (rowData)=>{
    if (await Confirm('حذف دسته بندی', `آیا از حذف ${rowData.title} اطمینان دارید؟`)) {
     try {
       const res = await deleteCategoryService(rowData.id);
       if (res.status === 200) {
         setData(data.filter(d=>d.id != rowData.id))
         Alert('انجام شد', res.data.message, 'success')
       }
     } catch (error) {
       
     }
    }
  }

  useEffect(() => {
    handleGetCategories()
  }, [params, forceRender])


  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان محصول" },
    { field: "parent_id", title: "والد" },
    {
      field:null,
      title: "تاریخ",
      elements: (rowData) => convertDateToJalali(rowData.created_at),
    },

    {
      field:null,
      title: "نمایش در منو",
      elements: (rowData) => <ShowInMenu rowData={rowData} />,
    },

    {
      field:null,
      title: "عملیات",
      elements: (rowData) => <Actions rowData={rowData} handleDeleteCategory={handleDeleteCategory} />,
    },

  ];




  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
    searchField: "title"
  }

  return (
    <>
 
      <Outlet />
      <PaginatedTable
        data={data}
        dataInfo={dataInfo}
        numOfPAge={5}
        searchParams={searchParams}
        loading={loading}
      >
        <Addcategory setForceRender={setForceRender} />
      </PaginatedTable>

    </>  

  );
};

export default Categorytable;
