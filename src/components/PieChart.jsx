import { useState, useEffect, useContext } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";
import { monthContext } from "../context/Context";

const apiUrl = import.meta.env.VITE_API_URL_BACKEND;

const PieChartComponent = () => {
  const fetchData = async (month) => {
    try {
      const response = await axios.get(
        `${apiUrl}transactions/pie-chart?month=${month}`
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
      <div className="max-w-[600px] w-[500px] min-w-[400px] flex flex-col justify-center items-center p-5 bg-white rounded-xl mx-5 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
        <h3 className="font-bold">
          Pie Chart Stats -<span>{month}</span>
        </h3>
        {data && (
          <PieChart
            margin={{ top: 20 }}
            series={[
              {
                data: data.map((item, key) => {
                  return { id: key, value: item.items, label: item.category };
                }),
              },
            ]}
            height={200}
            slotProps={{
              legend: {
                direction: "column",
                position: { vertical: "middle", horizontal: "right" },
                labelStyle: {
                  fontSize: 12,
                },
              },
            }}
          />
        )}
      </div>
    </>
  );
};

export default PieChartComponent;
