import { useEffect, useState } from "react";
import "./App.css";
import mockData from "./data.json";

function App() {
  const [allData, setAllData] = useState([]);

  const getTableData = async () => {
    const res = await mockData;
    setAllData(res);
  };

  useEffect(() => {
    getTableData();
  }, []);

  // // ===== Pagination ===== // //
  const dataPerPage = 10;
  const [currPageNumber, setCurrPageNumber] = useState(1);

  const arrOfPageNumber = [];
  for (let i = 1; i <= Math.ceil(allData.length / dataPerPage); i += 1) {
    arrOfPageNumber.push(i);
  }

  const handleClickPageNumber = (e) => {
    const {
      target: { id },
    } = e;
    setCurrPageNumber(+id);
  };

  const handlePaginationBack = () => {
    setCurrPageNumber((prev) => prev - 1);
  };

  const handlePaginationNext = () => {
    setCurrPageNumber((prev) => prev + 1);
  };

  const renderPaginationNumber = arrOfPageNumber.map((item) => {
    if (item <= currPageNumber + 3 && item >= currPageNumber - 3) {
      return (
        <button
          type="button"
          key={item}
          id={item}
          onClick={(e) => handleClickPageNumber(e)}
          className={
            currPageNumber === +item ? "active-page" : "none-active-page"
          }
        >
          {item}
        </button>
      );
    } else {
      return null;
    }
  });

  const [dataFilterByPagination, setDataFilterByPagination] = useState([]);

  const getDataShowFormCurrNumPagination = (currPageNumber, allData) => {
    const startIndex = (currPageNumber - 1) * dataPerPage;
    const lastIndex = currPageNumber * dataPerPage;
    setDataFilterByPagination(allData.slice(startIndex, lastIndex));
  };
  console.log(dataFilterByPagination);

  useEffect(() => {
    getDataShowFormCurrNumPagination(currPageNumber, allData);
  }, [currPageNumber, allData]);

  return (
    <>
      <div className="app">
        <div className="app-header">
          <h1>Pagination Test</h1>
        </div>
        <div className="app-content">
          <table className="app-table">
            <tbody>
              <tr>
                <th>
                  <h3>ID</h3>
                </th>
                <th>
                  <h3>Name</h3>
                </th>
                <th>
                  <h3>Price</h3>
                </th>
              </tr>
              {dataFilterByPagination.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>
                      <p>{item.id}</p>
                    </td>
                    <td>
                      <p>{item.productName}</p>
                    </td>
                    <td>
                      <p>{item.productPrice}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="app-pagination">
          {currPageNumber !== arrOfPageNumber.slice(0)[0] && (
            <button
              type="button"
              onClick={() => handlePaginationBack()}
            >{`<`}</button>
          )}
          {renderPaginationNumber}
          {currPageNumber !== arrOfPageNumber.slice(-1)[0] && (
            <button
              type="button"
              onClick={() => handlePaginationNext()}
            >{`>`}</button>
          )}
        </div>
      </div>

      <style>
        {`
          .app-header {
            width: 100%;
            box-shadow: 0px -5px 20px 0px black;
            padding: 2rem;
            margin-bottom: 1rem;
          }

          .app-content {
            padding-bottom: 3rem;
          }

          .app-table {
            width: 50%;
            border-collapse: collapse;
            margin: auto;
          }

          .app-table > tbody > tr {
            border-bottom: 1px solid black;
            height: 5rem;
          }

          .app-table > tbody > tr > th:nth-child(1) {
            width: 10%;
          }
          .app-table > tbody > tr > th:nth-child(2) {
            width: 70%;
          }
          .app-table > tbody > tr > th:nth-child(3) {
            width: 20%;
          }

          .app-table > tbody > tr > td:nth-child(1) {
            width: 10%;
            text-align: center;
          }
          .app-table > tbody > tr > td:nth-child(2) {
            width: 70%;
          }
          .app-table > tbody > tr > td:nth-child(3) {
            width: 20%;
            text-align: center;
          }

          .app-pagination {
            width: max-content;
            margin: auto;
          }

          .app-pagination > button {
            width: 50px;
            height: 50px;
            font-size: 18px;
            border: none;
            cursor: pointer;
          }

          .active-page {
            background-color: gray;
          }

          .none-active-page {
            background: none;
          }

          
        `}
      </style>
    </>
  );
}

export default App;
