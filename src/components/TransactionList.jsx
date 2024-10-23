import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { monthContext } from "../context/Context";

const apiUrl = import.meta.env.VITE_API_URL_BACKEND;

const TransactionList = () => {
  const fetchData = async (month, searchTerm, pageNum) => {
    try {
      const response = await axios.get(
        `${apiUrl}transactions?month=${month}&search=${searchTerm}&page=${pageNum}`
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { month, setMonth } = useContext(monthContext);
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  const handleNextPage = () => {
    if (pageNum < data.total / 10) setPageNum(pageNum + 1);
  };
  const handlePrevPage = () => {
    if (pageNum > 1) setPageNum(pageNum - 1);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData(month, searchTerm, pageNum)
      .then((data) => setData(data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, [month, searchTerm, pageNum]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <>
      <div className="flex flex-col w-[95%] text-zinc-900 items-center justify-center gap-y-5 mb-16 ">
        <div className="flex max-[1230px]:w-[92vw] w-[1230px] justify-between gap-2 items-center max-[560px]:flex-col">
          <div>
            <input
              type="text"
              placeholder="Search transaction"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-1 px-3"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="min-[560px]:fixed top-15 right-[3%] z-20  min-[1300px]:right-[10%]">
            <select
              className="border border-gray-300 rounded-lg py-1 px-3"
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value={"March"}>Select Month</option>
              {months.map((month, key) => (
                <option key={key} value={month}>
                  {month.slice(0, 3)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ul className="flex flex-col gap-5 max-[1230px]:w-full w-[1230px] bg-white h-[70vh] overflow-scroll px-5 rounded-xl shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
          <li className="flex w-full text-sm font-bold space-x-10 sticky top-0 bg-white py-3 m-0 z-10">
            <div className="w-[40px] min-w-[40px] text-left">Id</div>
            <div className="w-[250px] min-w-[200px] text-left">Title</div>
            <div className="w-[350px] min-w-[300px] text-left">Description</div>
            <div className="w-[80px] min-w-[80px] text-left">Price</div>
            <div className="w-[80px] min-w-[80px] text-left">Category</div>
            <div className="w-[80px] min-w-[80px] text-left">Sold</div>
            <div className="w-[80px] w-[100px] min-w-[100px]">Image</div>
          </li>
          {isLoading ? (
            <h3 className="text-center">Loading...</h3>
          ) : (
            data?.transactions.map((transaction, key) => (
              <li key={key} className="flex text-sm  space-x-10 ">
                <div className="w-[40px] min-w-[40px] text-left">
                  {transaction.id}
                </div>
                <div className="w-[250px] min-w-[200px] text-left">
                  {transaction.title}
                </div>
                <div className="w-[350px] min-w-[300px] text-left">
                  {transaction.description}
                </div>
                <div className="w-[80px] min-w-[80px] text-left">
                  {transaction.price.toFixed(2)}
                </div>
                <div className="w-[80px] min-w-[80px] text-left">
                  {transaction.category}
                </div>
                <div className="w-[80px] min-w-[80px] text-left">
                  {transaction.sold ? "Sold" : "Not Sold"}
                </div>
                <div className=" w-[100px] min-w-[100px]">
                  <img src={transaction.image} />
                </div>
              </li>
            ))
          )}
        </ul>

        <div className="flex max-[1230px]:w-[92vw] w-[1230px] justify-between">
          <div>
            Page No: <span>{pageNum}</span>
          </div>
          <div>
            <span className="cursor-pointer" onClick={handlePrevPage}>
              Previous
            </span>{" "}
            -{" "}
            <span className="cursor-pointer" onClick={handleNextPage}>
              Next
            </span>
          </div>
          <div>
            {data?.total < 10 ? data?.total : 10} / {data?.total}
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionList;
