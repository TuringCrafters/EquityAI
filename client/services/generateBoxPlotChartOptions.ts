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
};
