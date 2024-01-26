import LineOfBestFitChart from '@/components/LineChart'
import { DataContext } from '@/services/provider';
import dynamic from 'next/dynamic';
import React, { useContext, useRef } from 'react'

const StaticBarChartgraph = dynamic(() => import("@/components/BarChart"), {
  ssr: false,
});

export const MostCommonPosition = () => {
  const { data } = useContext(DataContext);
  return (
    <><section >
    <h2 className="flex ml-72 pl-6 text-2xl mt-10 mb-5 title-for-print">
      {data?.job_title}
    </h2>
    <section className="flex flex-col items-center md:flex-row md:items-start align-middle h-3/6 justify-center my-10">
      <div className="items-center h-full border-r-2 border-r-#aab0b7 chart-for-print">
        {data?.location_details && (
          <>
            <h3 className="ml-10 mt-5 font-semibold tracking-tighter subtitle-for-print-one">
              Salary based on Location
            </h3>
            <StaticBarChartgraph
              key="barchart"
              data={data.location_details}
            />
          </>
        )}
      </div>
      <div className="items-center  max-h-100 chart-for-print">
        {data?.experience_details && (
          <>
            <h3 className="ml-10 mt-5 mb-10 font-semibold tracking-tighter subtitle-for-print-two">
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
      <p className="mb-10">{data?.product_recommendation}</p>

  </section></>
  )
}
