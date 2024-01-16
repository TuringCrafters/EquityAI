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
  { yearsOfExperience: 10000, salary_average: 1643, salary_below_average: 790, salary_above_average: 2496 },
  { yearsOfExperience: 1666, red: 182, salary_below_average: 42, salary_above_average: 322 },
  { yearsOfExperience: 625, red: 56, salary_below_average: 1, salary_above_average: 111 },
  { yearsOfExperience: 300, redLine: 0 },
  { yearsOfExperience: 10000, redLine: 1522 },
];

type LineOfBestFit = {
  yearsOfExperience: number;
  line: number;
};

export default function LineOfBestFitChart({data}:LinearChartGraphProps) {
    const convertedData: TransformedExperienceDetails[] = data.map((item) => transformExperienceDetails(item) );
    const lineOfBestFitStart: LineOfBestFit ={yearsOfExperience: convertedData[0].yearsOfExperience, line: convertedData[0].salary_average};
    const lineOfBestFitEnd: LineOfBestFit ={yearsOfExperience: convertedData[convertedData.length - 1].yearsOfExperience, line: convertedData[convertedData.length - 1].salary_average};
        
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

          <XAxis dataKey="yearsOfExperience" type="number" 
          label={{ value: 'Years Of Experience', position: 'insideBottom', offset: 0 }} />
          <YAxis unit="K SEK" type="number" label={{ value: 'Salary', angle: -90, position: 'insideLeft' }} />
          <Scatter name="Salary average" dataKey="salary_average" fill="red" />
          <Scatter name="Salary below average" dataKey="salary_below_average" fill="blue" />
          <Scatter name="Salary above average" dataKey="salary_above_average" fill="green" />
          <Line dataKey="line" stroke="red" dot={false} activeDot={false} legendType="none" />
        </ComposedChart>
    );
  }
