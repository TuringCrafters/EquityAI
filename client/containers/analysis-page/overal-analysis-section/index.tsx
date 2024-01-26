import { DataContext } from '@/services/provider';
import React, { useContext } from 'react'

export const OveralAnalysis = () => {
  const { data } = useContext(DataContext);
    
  return (
    <>
    <section className="flex flex-row justify-evenly mx-20 mt-10 py-5">
    <article className="w-1/2 border-r-2 border-slate-200">
      <div className="px-20">
        <h2 className="text-slate-950 text-2xl font-bold">
          Your company average worker
        </h2>
        <div className="flex flex-row justify-around my-5">
        <div className="bg-neutral-200 rounded-lg h-20 w-20">{data?.company_overview.average_age}</div>
        <div className="bg-neutral-200 rounded-lg h-20 w-20">{data?.company_overview.average_salary}</div>
        <div className=" bg-neutral-200 rounded-lg h-20 w-20">{data?.company_overview.average_tenure}</div>
        </div>
        <p className="text-sm text-neutral-500 mb-2">Number of employees</p>
        <h3 className="text-slate-950 text-2xl font-bold">
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
          These are the top 5 positions that have the biggest salary per
          month in your company.
        </p>
      </div>
    </article>
  </section>
    </>
  )
}
