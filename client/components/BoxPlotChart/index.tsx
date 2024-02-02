"use client";

import React from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { BoxPlotChartProps } from "@/types/BoxPlotChartProps";
import { generateBoxplotChartOptions } from "@/services/generateBoxPlotChartOptions";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function BoxPlotChart({ data }: Readonly<BoxPlotChartProps>) {
  const options: ApexOptions = generateBoxplotChartOptions(data);
  return (
    <>
      {typeof window !== "undefined" && (
        <ReactApexChart
          options={options}
          series={options.series}
          type="boxPlot"
          height={400}
          width={500}
        />
      )}
    </>
  );
}
