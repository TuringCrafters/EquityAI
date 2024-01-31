import { DataContext } from "@/services/provider";
import { PieChart, Pie, Cell } from "recharts";
import React, { useContext } from "react";

const COLORS = ["#62a46f", "#f5f5f5"];

export const PayGapPieChart = () => {
  const { data } = useContext(DataContext);

  if (!data) {
    return null;
  }

  const genderPayGap: number = parseFloat(data.gender_pay_gap);
  let womenPayGap: number = 0;

  if (genderPayGap !== 0) {
    womenPayGap = 100 - 100 * genderPayGap;
  }

  console.log(genderPayGap);
  console.log(womenPayGap);

  const pieChartData = [
    { name: "Woman", value: womenPayGap },
    { name: "Men", value: 100 - womenPayGap },
  ];
  return (
    <div className="flex items-center justify-around mx-40 my-8 py-5 bg-white rounded-lg shadow-md print-insights__chart">
      <div>
        <p className="text-lg text-neutral-700 font-bold pl-10">
          {genderPayGap === 0 ? (
            <>
              Congratulations, there is no pay gap <br /> in your company
              between different genders.
            </>
          ) : (
            <>
              Women in your company make {100 - womenPayGap}% less <br />
              than their male counterparts.
            </>
          )}
        </p>
      </div>
      <div className="flex flex-row mr-5">
        <div>
          <PieChart width={200} height={200}>
            <Pie
              data={pieChartData}
              labelLine={false}
              outerRadius={100}
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${entry.name}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div className="flex flex-row ml-0 mt-32">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            width="70"
            height="70"
          >
            <path
              fill="#62a46f"
              d="M160 0a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM88 384H70.2c-10.9 0-18.6-10.7-15.2-21.1L93.3 248.1 59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l53.6-89.2c20.3-33.7 56.7-54.3 96-54.3h11.6c39.3 0 75.7 20.6 96 54.3l53.6 89.2c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9l-33.9-56.3L265 362.9c3.5 10.4-4.3 21.1-15.2 21.1H232v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V384H152v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V384z"
            />
          </svg>
          {genderPayGap === 0 ? (
            <div className="flex flex-col pt-4">
              <p className="text-sm text-neutral-500">Women receive</p>
              <h4 className=" font-bold text-4xl">100%</h4>
            </div>
          ) : (
            <div className="flex flex-col pt-4">
              <p className="text-sm text-neutral-500">Women only receive</p>
              <h4 className=" font-bold text-4xl">{womenPayGap}%</h4>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
