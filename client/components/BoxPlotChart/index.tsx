"use client";

import React from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { BoxPlotChartProps } from "@/types/BoxPlotChartProps";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function BoxPlotChart({ data }: BoxPlotChartProps) {
  const chartData = data
    .map((location) => {
      const { below_average, average, above_average } = location.salary;
      if (
        below_average !== undefined &&
        average !== undefined &&
        above_average !== undefined
      ) {
        let q1, q3;
        if (below_average === average && average === above_average) {
          q1 = below_average - 1000;
          q3 = above_average + 1000;
        } else {
          q1 = below_average + 0.25 * (average - below_average);
          q3 = average + 0.25 * (above_average - average);
        }
        return {
          name: location.data_value,
          data: [below_average, q1, average, q3, above_average],
        };
      } else {
        return null;
      }
    })
    .filter(Boolean);
  const options: ApexOptions = {
    chart: {
      type: "boxPlot",
      height: 400,
      width: 600,
      toolbar: {
        show: false,
      },
    },
    series: [
      {
        data: chartData.map((item) => ({
          x: item!.name,
          y: item!.data,
        })),
      },
    ],
    plotOptions: {
      boxPlot: {
        colors: {
          upper: "#FF4560",
          lower: "#008FFB",
        },
      },
    },
    xaxis: {
      type: "category",
      categories: data.map((location) => location.data_value),
    },
  };

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
