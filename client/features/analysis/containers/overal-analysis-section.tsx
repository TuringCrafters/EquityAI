import { DataContext } from "@/services/provider";
import React, { useContext } from "react";

import FemaleIcon from "@/public/icon/femaleIcon";
import MaleIcon from "@/public/icon/maleIcon";
import HorizontalBarChart from "../components/HorizontalBarChart";

export const OveralAnalysis = () => {
  const { data } = useContext(DataContext);

  let numberOfPeople: Record<string, number> = {};
  let numberOfEmployees: number = 0;
  if (data) {
    numberOfPeople = data?.company_overview.gender_ratio;
    numberOfEmployees = data?.company_overview.total_number_of_employees;
  }

  let maleRatio: number | undefined = 0;
  let femaleRatio: number | undefined = 0;

  if (numberOfPeople) {
    maleRatio = numberOfPeople["Male"];
    femaleRatio = numberOfPeople["Female"];
  }

  const maleRatiopercentage: number = Math.round(
    ((maleRatio / numberOfEmployees) * 100)
  );
  const femaleRatioPercentage: number = Math.round(
    ((femaleRatio / numberOfEmployees) * 100)
  );

  return (
    <section className="flex flex-row justify-evenly mx-20 mt-10 print print-overall">
      <article className="w-1/2 border-r-2 border-neutral-200 print-overall__chart">
        <div className="px-20">
          <h2 className="text-slate-950 text-2xl font-bold">
            Your company average worker
          </h2>
          <div className="flex flex-row justify-around my-20 print-overall__boxes">
            <div className="bg-neutral-200 rounded-lg h-24 w-24 text-center py-4">
              <p className="font-medium">Age</p>
              <p className="text-xl font-bold">
                {data?.company_overview.average_age}
              </p>
              <p className="text-xs">years</p>
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
              <p className="text-xs">years</p>
            </div>
          </div>
          <div className=" flex flex-row">
            <div>
              <p className="text-sm text-neutral-500 mb-2">
                Number of employees
              </p>
              <h3 className="text-slate-950 text-4xl font-bold">
                {data?.company_overview.total_number_of_employees}
              </h3>
            </div>
            <div className="flex items-center  ml-20 w-1/2 p-0">
              <MaleIcon />
              <p className="pt-10 font-bold text-2xl">{maleRatiopercentage}%</p>
              <FemaleIcon />
              <p className="pt-10 font-bold text-2xl">
                {femaleRatioPercentage}%
              </p>
            </div>
          </div>
        </div>
      </article>
      <article className="w-1/2 print-overall__chart-two">
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
