import { DataContext } from "@/services/provider";
import React, { useContext } from "react";
import HorizontalBarChart from "../../../components/BiggestEarnersBarChart/index";

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
    (( maleRatio/ numberOfEmployees)*100)
  );
  const femaleRatioPercentage: number = Math.round(
    ((femaleRatio /numberOfEmployees )*100) 
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                width="60"
                height="60"
                className=""
              >
                <path
                  fill="#0d5df3"
                  d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352H152z"
                />
              </svg>
              <p className="pt-10 font-bold text-2xl">{maleRatiopercentage}%</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                width="60"
                height="60"
                className="ml-10"
              >
                <path
                  fill="#62a46f"
                  d="M160 0a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM88 384H70.2c-10.9 0-18.6-10.7-15.2-21.1L93.3 248.1 59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l53.6-89.2c20.3-33.7 56.7-54.3 96-54.3h11.6c39.3 0 75.7 20.6 96 54.3l53.6 89.2c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9l-33.9-56.3L265 362.9c3.5 10.4-4.3 21.1-15.2 21.1H232v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V384H152v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V384z"
                />
              </svg>
              <p className="pt-10 font-bold text-2xl">
                {femaleRatioPercentage}%
              </p>
            </div>
          </div>
        </div>
      </article>
      <article className="w-1/2 print-overall__chart">
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
