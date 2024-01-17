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
import { convertToPolynomialDataPoints, transformExperienceDetails } from "@/utils/dataConverter";
import regression, { DataPoint } from "regression";

type LineOfBestFit = {
  yearsOfExperience: number;
  line: number;
};

export default function LineOfBestFitChart({ data }: LinearChartGraphProps) {
  const sortedData = data.sort(
    (a, b) => a.years_of_experience - b.years_of_experience
  );

  const dataPoints: DataPoint[] = convertToPolynomialDataPoints(sortedData);

  const convertedData: TransformedExperienceDetails[] = sortedData.map((item) =>
    transformExperienceDetails(item)
  );

  const slope = regression.linear(dataPoints);
  console.log(slope);
  console.log(slope.equation);
  

   const lineOfBestFitStart: LineOfBestFit = {
    yearsOfExperience: slope.points[0][0],
    line: (slope.equation[0]*slope.points[0][0]+ slope.equation[1])/1000
  };
  const lineOfBestFitEnd: LineOfBestFit = {
    yearsOfExperience:
    slope.points[slope.points.length-1][0],
    line: (slope.equation[0]*slope.points[slope.points.length-1][0]+ slope.equation[1])/1000,
  };

  const allData: any = convertedData;
  allData.push(lineOfBestFitStart);
  allData.push(lineOfBestFitEnd);

  
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
      <CartesianGrid stroke="#f5f5f5" />
      <Tooltip />
      <Legend />

      <XAxis
        dataKey="yearsOfExperience"
        type="number"
        label={{
          value: "Years Of Experience",
          position: "insideBottom",
          offset: 0,
        }}
      />
      <YAxis
        unit="K SEK"
        type="number"
        label={{ value: "Salary", angle: -90, position: "insideLeft" }}
      />
      <Scatter name="Salary average" dataKey="salary_average" fill="red" />
      <Scatter
        name="Salary below average"
        dataKey="salary_below_average"
        fill="blue"
      />
      <Scatter
        name="Salary above average"
        dataKey="salary_above_average"
        fill="green"
      />
      <Line
        dataKey="line"
        stroke="red"
        dot={false}
        activeDot={false}
        legendType="none"
      />
    </ComposedChart>
  );
}
