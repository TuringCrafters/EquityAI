import React from "react";
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
} from "recharts";
import { LinearChartGraphProps, TransformedExperienceDetails } from "./types";
import {
  convertToPolynomialDataPoints,
  transformExperienceDetails,
} from "@/utils/dataConverter";
import { DataPoint } from "regression";
import { calculateLineOfBestFit } from "@/utils/lineOfBestFit";


export default function LineOfBestFitChart({ data }: LinearChartGraphProps) {
  const sortedData = data.sort(
    (a, b) => a.years_of_experience - b.years_of_experience
  );

  const dataPoints: DataPoint[] = convertToPolynomialDataPoints(sortedData);

  const convertedData: TransformedExperienceDetails[] = sortedData.map((item) =>
    transformExperienceDetails(item)
  );

  const lineOfBestFit = calculateLineOfBestFit(dataPoints);
  const allData : any= convertedData;
  allData.push(...lineOfBestFit);

  return (
    <ComposedChart
      width={600}
      height={400}
      data={convertedData}
      margin={{
        top: 20,
        right: 80,
        bottom: 20,
        left: 20,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <Tooltip />
      <Legend
        layout="horizontal"
        verticalAlign="top"
        align="center"
        iconSize={9}
        wrapperStyle={{ top: 0, left: 50 }}
        formatter={(value) => (
          <span className=" text-black text-xs font-semibold">{value}</span>
        )}
      />
      <XAxis
        dataKey="yearsOfExperience"
        type="number"
        axisLine={{ stroke: "#ffffff" }}
        tickLine={{ stroke: "#ffffff" }}
        className="text-xs font-semibold"
        tick={{ fill: "#aab0b7" }}
        dy={10}

      />
      <YAxis
        unit="k"
        type="number"
        className="text-xs font-semibold"
        axisLine={{ stroke: "#ffffff" }}
        tickLine={{ stroke: "#ffffff" }}
        tick={{ fill: "#aab0b7" }}
        width={80}
      />
      <Scatter name="Average Salary" dataKey="salary_average" fill="#c03dbb" />
      <Scatter
        name="Below average"
        dataKey="salary_below_average"
        fill="#62a46f"
      />
      <Scatter
        name="Above Average"
        dataKey="salary_above_average"
        fill="#376bec"
      />
      <Line
        dataKey="line"
        stroke="#c03dbb"
        strokeWidth={2}
        strokeDasharray="3 3"
        dot={false}
        activeDot={false}
        legendType="none"
      />
    </ComposedChart>
  );
}
