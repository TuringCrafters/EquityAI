"use client";

import React from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { generateBoxplotChartOptions } from "../generateBoxPlotChartOptions";
import { LocationDetails } from "../types";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type BoxPlotChartProps = {
    data: LocationDetails[];
  };

export default function BoxPlotChart({ data }: BoxPlotChartProps) {
  const options: ApexOptions = generateBoxplotChartOptions(data);
  return (
    <>
      {typeof window !== "undefined" && (
        <ReactApexChart
          options={options}
          series={options.series}
          type="boxPlot"
          height={400}
          width={"100%"}
        />
      )}
    </>
  );
}
