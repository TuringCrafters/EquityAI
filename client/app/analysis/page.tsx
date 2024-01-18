"use client";
import React, { useContext } from "react";
import dynamic from "next/dynamic";
import LineOfBestFitChart from "@/components/lineofbestfitchart/LineOfBestFitChart";
import { DataContext } from "@/utils/provider";

const StaticBarChartgraph = dynamic(
  () => import("@/components/barchart/BarChartGraph"),
  { ssr: false }
);

const AnalysisPage = () => {

  const {data} = useContext(DataContext);

  return (
    <main>
      <article className="">
        <section className="flex flex-row align-middle h-3/6 justify-center items-center border-2 border-red-700">
          <div className="items-center h-full border-2 border-green-600">
            {data?.location_details &&(
              <>  <h2>Bar Chart</h2>
              <StaticBarChartgraph data={data.location_details} />
              </>
            )}
          </div>
          <div className="items-center  max-h-100 border-2 border-blue-600">
            {data?.experience_details && (
              <>
              <h2>Line Chart</h2>
              <LineOfBestFitChart data={data.experience_details} />
              </>
            )}
          </div>
        </section>
      </article>
    </main>
  );
};

export default AnalysisPage;
