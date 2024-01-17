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
      className='mt-10'
    >
      <CartesianGrid strokeDasharray="3 3" vertical={false}/>
          <XAxis dataKey="location" axisLine={{ stroke: '#ffffff' }} tickLine={{ stroke: '#ffffff' }} className='text-xs font-semibold' tick={{ fill: '#aab0b7' }}/>
          <YAxis unit="k" className='text-xs font-semibold' axisLine={{ stroke: '#ffffff' }} tickLine={{ stroke: '#ffffff' }} tick={{ fill: '#aab0b7' }} width={80}/>
          <Tooltip />
          <Legend layout="horizontal" verticalAlign="top" align='center' wrapperStyle={{top: 12, left: 50}} formatter={(value, entry, index) => <span className=" text-black text-xs font-semibold">{value}</span>}/>
          <Bar name="Below Average" dataKey="salary_below_average" fill="#62a46f" radius={[10, 10, 10, 10]} />
          <Bar name="Average Salary" dataKey="salary_average" fill="#376bec" radius={[10, 10,  10, 10]}/>
          <Bar name="Above Average" dataKey="salary_above_average" fill="#c03dbb" radius={[10, 10,  10, 10]} />
    </BarChart>
  );
}

