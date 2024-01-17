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
import { transformExperienceDetails } from "@/utils/dataConverter";

type LineOfBestFit = {
  yearsOfExperience: number;
  line: number;
};

export default function LineOfBestFitChart({ data }: LinearChartGraphProps) {
  /* Sorting data by years of experience */
  const sortedData = data.sort(
    (a, b) => a.years_of_experience - b.years_of_experience
  );


  const convertedData: TransformedExperienceDetails[] = sortedData.map((item) =>
    transformExperienceDetails(item)
  );
  const lineOfBestFitStart: LineOfBestFit = {
    yearsOfExperience: convertedData[0].yearsOfExperience,
    line: convertedData[0].salary_average,
  };
  const lineOfBestFitEnd: LineOfBestFit = {
    yearsOfExperience:
      convertedData[convertedData.length - 1].yearsOfExperience,
    line: convertedData[convertedData.length - 1].salary_average,
  };

  const allData: any = convertedData;
  allData.push(...convertedData);
  allData.push(lineOfBestFitStart);
  allData.push(lineOfBestFitEnd);

  return (
    <ComposedChart
      width={500}
      height={400}
      data={allData}
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
