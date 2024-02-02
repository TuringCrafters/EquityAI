import React from "react";
import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
} from "recharts";
import {
  convertToPolynomialDataPoints,
  transformExperienceDetails,
} from "@/services/dataConverter";
import { DataPoint } from "regression";
import { calculateLineOfBestFit } from "@/services/lineOfBestFit";
import { LinearChartGraphProps } from "@/types/LinearChartGraphProps";
import { TransformedExperienceDetails } from "@/types/TransformedExperienceDetails";

export default function LineOfBestFitChart({
  data,
}: Readonly<LinearChartGraphProps>) {
  const sortedData = [...data];
  sortedData.sort((a, b) => a.data_value - b.data_value);

  const dataPoints: DataPoint[] = convertToPolynomialDataPoints(sortedData);

  const convertedData: TransformedExperienceDetails[] = sortedData.map((item) =>
    transformExperienceDetails(item)
  );

  const lineOfBestFit = calculateLineOfBestFit(dataPoints);
  const allData: any = convertedData;
  allData.push(...lineOfBestFit);

  return (
    <ComposedChart
      width={500}
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
      <Scatter
        key={`scatter-below-salary`}
        name="Below average"
        dataKey="salary_below_average"
        fill="#62a46f"
      />
      <Scatter
        key={`scatter-above-salary`}
        name="Above Average"
        dataKey="salary_above_average"
        fill="#376bec"
      />
      <Scatter
        name="Average"
        key={`scatter-salary-average`}
        dataKey="salary_average"
        fill="#c03dbb"
        shape="diamond"
      />
    </ComposedChart>
  );
}
