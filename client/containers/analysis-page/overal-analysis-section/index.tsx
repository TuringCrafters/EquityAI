import { DataContext } from "@/services/provider";
import React, { useContext } from "react";
import HorizontalBarChart from "../../../components/BiggestEarnersBarChart/index";

export const OveralAnalysis = () => {
  const { data } = useContext(DataContext);

  return (
    <section className="flex flex-row justify-evenly mx-20 mt-10 ">
      <article className="w-1/2 border-r-2 border-neutral-200">
        <div className="px-20">
          <h2 className="text-slate-950 text-2xl font-bold">
            Your company average worker
          </h2>
          <div className="flex flex-row justify-around my-20">
            <div className="bg-neutral-200 rounded-lg h-24 w-24 text-center py-4">
              <p className="font-medium">Age</p>
              <p className="text-xl font-bold">
                {data?.company_overview.average_age}
              </p>
            </div>
            <div className="bg-neutral-200 rounded-lg h-24 w-24 text-center py-4">
              <p className="font-medium">Salary</p>
              <p className="text-xl font-bold">
                {data?.company_overview.average_salary}
              </p>
              <p className="text-xs">(sek/month)</p>
            </div>
            <div className=" bg-neutral-200 rounded-lg h-24 w-24 text-center py-4">
              <p className="font-medium">Tenure</p>
              <p className="text-xl font-bold">
                {data?.company_overview.average_tenure}
              </p>
            </div>
          </div>
          <p className="text-sm text-neutral-500 mb-2">Number of employees</p>
          <h3 className="text-slate-950 text-4xl font-bold">
            {data?.company_overview.total_number_of_employees}
          </h3>
        </div>
      </article>
      <article className="w-1/2">
        <div className="px-20">
          <h2 className="text-slate-950 text-2xl font-bold mb-4">
            Your biggest earners
          </h2>
          <p className="text-sm text-neutral-500">
            These are the top 5 positions that have the biggest salary per month
            in your company.
          </p>
        </div>
        <div className="pl-5">
          <HorizontalBarChart key="barchart" />
        </div>
      </article>
    </section>
  );
};
