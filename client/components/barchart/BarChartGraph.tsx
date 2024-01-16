import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { BarChartGraphProps, TransformedLocationDetails } from './types';
import { transformLocationDetails } from '@/utils/dataConverter';

export default function BarChartGraph({data}:BarChartGraphProps) {
  const transformedData: TransformedLocationDetails[] = (data.map(dt => {return transformLocationDetails(dt)}));
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
    >
      <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Location" />
          <YAxis unit="K SEK"/>
          <Tooltip />
          <Legend />
          <Bar dataKey="salary_below_average" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
          <Bar dataKey="salary_average" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="salary_above_average" fill="#ca9082" activeBar={<Rectangle fill="gold" stroke="purple" />} />
    </BarChart>
  );
}

