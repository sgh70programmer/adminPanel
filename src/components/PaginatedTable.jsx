import React, { useState, useEffect } from 'react';
import SpinnerLoad from "./SpinnerLoad";

const PaginatedTable = ({ children, data, dataInfo, additionField, numOfPAge, searchParams, loading }) => {
  const [initData, setIninData] = useState(data);
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [searchChar, setSearchChar] = useState("");
  const pageRange = 3


  useEffect(() => {
    let pCount = Math.ceil(initData.length / numOfPAge);
    setPageCount(pCount);
    let pArr = [];
    for (let i = 1; i <= pCount; i++) pArr = [...pArr, i];
    setPages(pArr);
  }, [initData]);

  useEffect(() => {
    let start = currentPage * numOfPAge - numOfPAge; // 0
    let end = currentPage * numOfPAge; // 2
    setTableData(initData.slice(start, end));
  }, [currentPage, initData]);

  useEffect(() => {

    setIninData(data.filter(d => d[searchParams.searchField].includes(searchChar)))
    setCurrentPage(1)
  }, [searchChar, data])

  return (
    <>
      <div className="row justify-content-between">
        <div className="col-10 col-md-6 col-lg-4">
          <div className="input-group mb-3 dir_ltr">
            <input
              type="text"
              className="form-control"
              placeholder={searchParams.placeholder}
              onChange={e => setSearchChar(e.target.value)}
            />
            <span className="input-group-text">{searchParams.title}</span>
          </div>
        </div>
        <div className="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
          {children}
        </div>
      </div>
      {
        loading ? <SpinnerLoad colorClass={"text-primary"} /> :
          data.length ? <table className="table table-responsive text-center table-hover table-bordered">
            <thead className="table-secondary">
              <tr>
                {dataInfo.map((i) => (
                  <th key={i.field}>{i.title}</th>
                ))}
                {
                  additionField ? additionField.map((a, index) =>
                    <th key={a.id + "__" + index}>{a.title}</th>
                  ) : null
                }
              </tr>
            </thead>
            <tbody>
              {tableData.map((d) => (
                <tr>
                  {dataInfo.map((i) => (
                    <td key={i.field + "_" + d.id}>{d[i.field]}</td>
                  ))}
                  {
                    additionField ? additionField.map((a, index) =>
                      <td key={a.id + "___" + index}>{a.elements(d)}</td>
                    ) : null
                  }
                </tr>
              ))}
            </tbody>
          </table> : <h5 className="text-center my-5 text-danger">هیچ رکوردی یافت نشد</h5>}
      {pages.length > 1 && <nav
        aria-label="Page navigation example"
        className="d-flex justify-content-center"
      >
        <ul className="pagination dir_ltr">
          <li className="page-item">
            <span className={`page-link ${currentPage == 1 && "disabled"}`} href="#" aria-label="Previous"
              onClick={() => setCurrentPage(currentPage => currentPage - 1)}
            >
              <span aria-hidden="true">&raquo;</span>
            </span>
          </li>
          {currentPage > pageRange ? (
            <li className="page-item me-2">
              <span
                className="page-link pointer"
                onClick={() => setCurrentPage(1)}
              >
                1
              </span>
            </li>
          ) : null}

          {pages.map((page) => {
            return (page < currentPage + pageRange && page > currentPage - pageRange) && <li className="page-item" key={page}>
              <span
                className={`page-link pointer ${currentPage == page ? "alert-success" : ""
                  }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </span>
            </li>
          }

          )}

          {currentPage <= pageCount - pageRange ? (
            <li className="page-item ms-2">
              <span
                className="page-link pointer"
                onClick={() => setCurrentPage(pageCount)}
              >
                {pageCount}
              </span>
            </li>
          ) : null}

          <li className="page-item">
            <span className={`page-link ${currentPage == pageCount && "disabled"}`} href="#" aria-label="Next"
              onClick={() => setCurrentPage(currentPage => currentPage + 1)}
            >
              <span aria-hidden="true">&laquo;</span>
            </span>
          </li>
        </ul>
      </nav>}


    </>
  );
}

export default PaginatedTable;