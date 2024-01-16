import React from 'react';
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
} from 'recharts';
import { LinearChartGraphProps, TransformedExperienceDetails } from './types';
import { transformExperienceDetails } from '@/utils/dataConverter';

const exampleData = [
  //x = years of experience , y = average salary
  //index is the years of experience
  //red is the average salary
  //blue is the below average salary
  //green is the above average salary
  { yearsOfExperience: 10000, salary_average: 1643, salary_below_average: 790, salary_above_average: 2496 },
  { yearsOfExperience: 1666, salary_average: 182, salary_below_average: 42, salary_above_average: 322 },
  { yearsOfExperience: 625, salary_average: 56, salary_below_average: 1, salary_above_average: 111 },
  /* Line of best fit start then end */
  { yearsOfExperience: 300, redLine: 0 },
  { yearsOfExperience: 10000, redLine: 1522 },
/*   { index: 600, blueLine: 0 },
  { index: 10000, blueLine: 678 }, */
];

export default function LineOfBestFitChart({data}:LinearChartGraphProps) {
    const convertedData: TransformedExperienceDetails[] = data.map((item) => transformExperienceDetails(item) );
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

          <XAxis dataKey="yearsOfExperience" type="number" 
          label={{ value: 'Years Of Experience', position: 'insideBottom', offset: 0 }} />
          <YAxis unit="K SEK" type="number" label={{ value: 'Salary', angle: -90, position: 'insideLeft' }} />
          <Scatter name="Salary average" dataKey="salary_average" fill="red" />
          <Scatter name="Salary below average" dataKey="salary_below_average" fill="blue" />
          <Scatter name="Salary above average" dataKey="salary_above_average" fill="green" />
          <Line dataKey="redLine" stroke="red" dot={false} activeDot={false} legendType="none" />
        </ComposedChart>
    );
  }
