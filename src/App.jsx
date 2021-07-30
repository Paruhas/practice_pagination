import { useEffect, useState } from "react";
import "./App.css";
import mockData from "./data.json";

function App() {
  const [tableData, setTableData] = useState([]);

  const getTableData = async () => {
    const res = await mockData;
    setTableData(res);
  };

  useEffect(() => {
    getTableData();
  }, []);

  // // ===== Pagination ===== // //
  const dataPerPage = 10;
  const [currPageNumber, setCurrPageNumber] = useState(1);

  const arrOfPageNumber = [];
  for (let i = 1; i <= Math.ceil(tableData.length / dataPerPage); i += 1) {
    arrOfPageNumber.push(i);
  }

  const handlePaginationBack = () => {
    console.log("CLICK <");
  };

  const handlePaginationNext = () => {
    console.log("CLICK >");
  };

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
              {tableData.map((item) => {
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
          <button onClick={() => handlePaginationBack}>{`<`}</button>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <button onClick={() => handlePaginationNext}>{`>`}</button>
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

          .app-table {
            width: 50%;
            border-collapse: collapse;
            margin: auto;
          }

          .app-table > tbody > tr {
            border-bottom: 1px solid black;
            height: 5rem;
          }

          .app-pagination {
            width: max-content;
            margin: auto;
          }

          .app-pagination > button {
            width: 50px;
            height: 50px;
            font-size: 18px;
            background: none;
            border: none;
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
}

export default App;
