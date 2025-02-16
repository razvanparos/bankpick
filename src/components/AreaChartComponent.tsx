import React, { useEffect, useState, useCallback } from "react";
import { AreaChart, Area, XAxis } from "recharts";
import { getChartData } from "../services/chartService.ts";

function AreaChartComponent() {
  const [chartData, setChartData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0);
  
  const updateSize = useCallback(() => {
    setWindowWidth(
      window.innerWidth > 400
        ? 460
        : window.innerWidth+10
    );
  }, []);

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [updateSize]);

  const fetchChartData = async()=>{
    let chartData = await getChartData()
    setChartData(chartData)
  }

  useEffect(() => {
    fetchChartData()
  }, []);

  return (
    <AreaChart
      className="area flex"
      width={windowWidth}
      height={320}
      data={chartData}
      margin={{
        top: 10,
        right: 62,
        left:32,
        bottom: 12,
      }}
    >
      <XAxis dataKey={`date`} fontSize={12} stroke="white" />
      <Area
        type="monotone"
        dataKey="pv"
        strokeWidth={7}
        stroke="rgb(0, 102, 255)"
        fill="rgba(0, 102, 255, 0.072)"
      />
    </AreaChart>
  );
}

export default AreaChartComponent;
