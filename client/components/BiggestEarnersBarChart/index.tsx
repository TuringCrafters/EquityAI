import { DataContext } from "@/services/provider";
import React, { useContext } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

export default function HorizontalBarChart() {
  const { data } = useContext(DataContext);
  const positionsAndSalaries: { position: string; salary: number }[] =
    data?.company_overview.top_five_highest_paying_positions || [];
  const barData = positionsAndSalaries.map(({ position, salary }) => ({
    position,
    salary,
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
          <XAxis type="number" tick={false} axisLine={false} />
          <YAxis
            dataKey="position"
            type="category"
            className="text-xs text-neutral-500"
          />
          <Bar
            dataKey="salary"
            fill="#376bec"
            barSize={30}
            radius={[0, 100, 100, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
