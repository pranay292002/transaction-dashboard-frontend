import { useState } from "react";
import TransactionList from "./components/TransactionList";
import BarChartComponent from "./components/BarChart";
import PieChartComponent from "./components/PieChart";
import "./App.css";
import Stats from "./components/Stats";
import { monthContext } from "./context/Context";

function App() {
  const [month, setMonth] = useState("March");

  return (
    <>
      <monthContext.Provider value={{ month, setMonth }}>
        <div className="w-[100vw] py-5 bg-zinc-100">
          <h2 className="text-center font-bold mb-5">Transaction Dashboard</h2>

          <div className="flex flex-wrap w-full justify-center items-center my-5">
            <TransactionList />
            <BarChartComponent />

            <div className="flex flex-col gap-5 justify-center items-center my-5">
              <PieChartComponent />

              <Stats />
            </div>
          </div>
        </div>
      </monthContext.Provider>
    </>
  );
}

export default App;
