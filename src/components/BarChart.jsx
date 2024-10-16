import { useState, useEffect, useContext } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";
import { monthContext } from "../context/Context";

const apiUrl = import.meta.env.VITE_API_URL_BACKEND;

const BarChartComponent = () => {
  const fetchData = async (month) => {
    try {
      const response = await axios.get(
        `${apiUrl}transactions/bar-chart?month=${month}`
      );

      
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const [data, setData] = useState(null);
  const { month, setMonth } = useContext(monthContext);

  useEffect(() => {
    fetchData(month)
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, [month]);

  return (
    <>
      <div className="max-w-[600px] w-[500px] min-w-[400px] flex flex-col justify-center items-center px-5 py-10 bg-white rounded-xl shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
        <h3 className="font-bold">
          Bar Chart Stats -<span>{month}</span>
        </h3>

        {data && (
          <BarChart
            dataset={data}
            xAxis={[
              {
                scaleType: "band",
                dataKey: "range",
                tickLabelStyle: {
                  angle: 325,
                  textAnchor: "end",
                  fontSize: 12,
                },
              },
            ]}
            series={[{ dataKey: "count" }]}
            height={350}
          />
        )}
      </div>
    </>
  );
};

export default BarChartComponent;
