import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { monthContext } from "../context/Context";

const apiUrl = import.meta.env.VITE_API_URL_BACKEND;

const Stats = () => {
  const fetchData = async (month) => {
    try {
      const response = await axios.get(
        `${apiUrl}transactions/statistics?month=${month}`
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { month, setMonth } = useContext(monthContext);

  useEffect(() => {
    setIsLoading(true);
    fetchData(month)
      .then((data) => setData(data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, [month]);

  return (
    <>
      <div className="max-w-[600px] w-[500px] min-w-[400px] flex flex-col justify-center items-center p-10 bg-white rounded-xl mx-5 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
        <h3 className="font-bold">
          Statistics -<span>{month}</span>
        </h3>
        {isLoading ? (
          <h3>Loading...</h3>
        ) : (
          <ul className="p-5">
            <li className="flex">
              <div className="text-left w-[150px]">Total sale</div>{" "}
              <span className="text-left ">
                {data?.totalSaleAmount.toFixed(2)}
              </span>
            </li>
            <li className="flex">
              <div className="text-left w-[150px]">Total sold item</div>{" "}
              <span className="text-left ">{data?.totalSoldItems}</span>
            </li>
            <li className="flex">
              <div className="text-left w-[150px]">Total not sold item</div>{" "}
              <span className="text-left ">{data?.totalNotSoldItems}</span>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default Stats;
