import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { BarChartGraphProps } from "../../types/BarChartProps";
import { transformLocationDetails } from "@/services/dataConverter";
import { TransformedLocationDetails } from "@/types/TransformedLocationDetails";

export default function BarChartGraph({ data }: BarChartGraphProps) {
  const transformedData: TransformedLocationDetails[] = data.map((dt) => {
    return transformLocationDetails(dt);
  });
  return (
    <BarChart
      width={600}
      height={400}
      data={transformedData}
      margin={{
        top: 20,
        right: 80,
        bottom: 20,
        left: 20,
      }}
      className="mt-10"
      barCategoryGap={5}
      barGap={8}
      barSize={25}
    >
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis
        dataKey="location"
        key={"barchart-xaxys"}
        axisLine={{ stroke: "#ffffff" }}
        tickLine={{ stroke: "#ffffff" }}
        className="text-xs font-semibold"
        tick={{ fill: "#aab0b7" }}
        dy={10}
      />
      <YAxis
        unit="k"
        key={"barchart-yaxys"}
        className="text-xs font-semibold"
        axisLine={{ stroke: "#ffffff" }}
        tickLine={{ stroke: "#ffffff" }}
        tick={{ fill: "#aab0b7" }}
        width={80}
      />
      <Tooltip />
      <Legend
        key={"barchart-legend"}
        layout="horizontal"
        verticalAlign="top"
        align="center"
        iconSize={8}
        iconType="square"
        wrapperStyle={{ top: 0, left: 50 }}
        formatter={(value) => (
          <span className=" text-black text-xs font-semibold">{value}</span>
        )}
      />
      <Bar
        name="Below Average"
        key="bellow-average"
        dataKey="salary_below_average"
        fill="#62a46f"
        radius={[100, 100, 100, 100]}

        
      />
      <Bar
        name="Average Salary"
        key="average"
        dataKey="salary_average"
        fill="#376bec"
        radius={[100, 100, 100, 100]}

      />
      <Bar
        name="Above Average"
        key="above-average"
        dataKey="salary_above_average"
        fill="#c03dbb"
        radius={[100, 100, 100, 100]}

      />
    </BarChart>
  );
}
