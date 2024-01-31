import LineOfBestFitChart from '@/components/LineChart'
import { DataContext } from '@/services/provider';
import dynamic from 'next/dynamic';
import React, { useContext } from 'react'

const StaticBarChartgraph = dynamic(() => import("@/components/BarChart"), {
  ssr: false,
});

export const MostCommonPosition = () => {
  const { data } = useContext(DataContext);
  return (

    <section className="px-20 mx-20 mt-10 border-b-2 border-b-neutral-200 print print-position">
      <h2 className="text-slate-950 text-2xl font-bold title-for-print mb-3">Your most common position</h2>
    <h3 className=" text-neutral-500 text-xl font-semibold ">
      {data?.job_title}
    </h3>
    <section className="flex flex-col items-center md:flex-row md:items-start align-middle h-3/6 justify-center my-10">
      <div className="items-center h-full border-r-2 border-r-neutral-200 print-position__chart">
        {data?.location_details && (
          <>
            <h3 className="ml-10 mt-5 font-semibold tracking-tighter print-position__chart__title">
              Salary based on Location
            </h3>
            <StaticBarChartgraph
              key="barchart"
              data={data.location_details}
            />
          </>
        )}
      </div>
      <div className="items-center  max-h-100 print-position__chart">
        {data?.experience_details && (
          <>
            <h3 className="ml-10 mt-5 mb-10 font-semibold tracking-tighter print-position__chart__title-two">
              Salary based on Years of Experience
            </h3>
            <LineOfBestFitChart
              key="linechart"
              data={data.experience_details}
            />
          </>
        )}
      </div>
    </section>     
  </section>
  )
}
