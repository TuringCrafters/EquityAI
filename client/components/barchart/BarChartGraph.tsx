import { location_details } from '@/app/analysis/page';
import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const barData = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
]

interface BarChartGraphProps {
  data: location_details[]; 
}

export interface TransformedLocationDetails {
  location: string;
  salary_average: number;
  salary_above_average: number;
  salary_below_average: number;
}

export function transformLocationDetails(originalDetails: location_details): TransformedLocationDetails {
  return {
    location: originalDetails.location,
    salary_average: originalDetails.salary.average,
    salary_above_average: originalDetails.salary.above_average,
    salary_below_average: originalDetails.salary.below_average,
  };
}

export default function BarChartGraph({data}:BarChartGraphProps) {
  const transformedData: TransformedLocationDetails[] = (data.map(dt => {return transformLocationDetails(dt)}));
  return (
    <BarChart
      width={500}
      height={300}
      data={transformedData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="location" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="salary_below_average" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
          <Bar dataKey="salary_average" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="salary_above_average" fill="#ca9082" activeBar={<Rectangle fill="gold" stroke="purple" />} />
    </BarChart>
  );
}

