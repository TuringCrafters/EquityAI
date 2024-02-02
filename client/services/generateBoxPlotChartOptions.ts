import { BoxPlotChartProps } from "@/types/BoxPlotChartProps";
import { ApexOptions } from "apexcharts";
import { generateBoxplotChartData } from "./generateBoxplotChartData";
import { BoxplotChartData } from "@/types/BoxplotChartData";

export const generateBoxplotChartOptions = (
  data: BoxPlotChartProps["data"]
): ApexOptions => {
  const chartData: BoxplotChartData[] = generateBoxplotChartData(data);
  return {
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
          upper: "#376bec",
          lower: "#c03dbb",
        },
      },
    },
    xaxis: {
      type: "category",
      categories: data.map((location) => location.data_value),
      labels: {
        style: {
          colors: "#aab0b7",
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#aab0b7",
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
        },
        formatter: function (value) {
          return value / 1000 + "k";
        },
      },
    },
  };
};
