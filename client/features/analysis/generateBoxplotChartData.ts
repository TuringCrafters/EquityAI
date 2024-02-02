import { BoxPlotChartProps } from "@/types/BoxPlotChartProps"
import { BoxplotChartData } from "@/types/BoxplotChartData";

export const generateBoxplotChartData =(data: BoxPlotChartProps["data"]): BoxplotChartData[]=>{
    return  data.map(({data_value, salary}) => {
      const { below_average, average, above_average } = salary;
      if (
        below_average !== undefined &&
        average !== undefined &&
        above_average !== undefined
      ) {
        const [q1, q3] = 
        below_average === average && average === above_average 
        ? [below_average - 1000, above_average + 1000]
        : [below_average + 0.25 * (average - below_average), average + 0.25 * (above_average - average)];
        return {
          name: data_value,
          data: [below_average, q1, average, q3, above_average],
        };
      } else {
        return null;
      }
    })
}

