import { DataContext } from "@/services/provider";
import React, { useContext } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList } from "recharts";

export default function HorizontalBarChart() {
  const { data } = useContext(DataContext);
  const positionsAndSalaries: { position: string; salary: number; currency: string }[] =
    data?.company_overview.top_five_highest_paying_positions || [];
  const barData = positionsAndSalaries.map(({ position, salary,currency }) => ({
    position,
    salary,
    currency
  }));
  return (
    <div className="w-3/4 mx-20 ">
      <ResponsiveContainer width={400} height={300}>
        <BarChart
          layout="vertical"
          className="mt-10"
          barCategoryGap={5}
          barGap={8}
          barSize={25}
          data={barData}
          margin={{
            left: 20,
          }}
        >
          <XAxis type="number" tick={false} axisLine={false} label={`${barData[0].currency.toLowerCase()}/month`}/>
          <YAxis
            dataKey="position"
            type="category"
            className="text-xs text-neutral-500 "
          />
          <Bar
            dataKey="salary"
            fill="#376bec"
            barSize={30}
            radius={[0, 100, 100, 0]}
            >
             
          <LabelList 
          dataKey="salary"
          position="outside"
          fill="white"
          />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
