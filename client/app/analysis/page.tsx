"use client";
import React, { useContext, useRef } from "react";
import dynamic from "next/dynamic";
import { useReactToPrint } from "react-to-print";
import { DataContext } from "@/services/provider";
import LineOfBestFitChart from "@/components/LineChart";
import { Button } from "../../components/UI/button"


const StaticBarChartgraph = dynamic(() => import("@/components/BarChart"), {
  ssr: false,
});

const AnalysisPage = () => {
  const { data } = useContext(DataContext);
  const pageRef = useRef<HTMLElement | null>(null);
  const handlePDF = useReactToPrint({
    content: () => pageRef.current,
    documentTitle: "analysis-data",
  });

  return (
    <main className="h-dvh">
      <Button onClick={handlePDF} className="absolute top-4 right-6 rounded-full bg-blue-600 ">Save as PDF</Button>
      <article ref={pageRef}>
        <section className="flex flex-col items-center md:flex-row md:items-start align-middle h-3/6 justify-center mt-10">
          <h2>{data?.job_title}</h2>
          <div className="items-center h-full border-r-2 border-r-#aab0b7">
            {data?.location_details && (
              <>
                <h3 className="ml-10 mt-5 font-semibold tracking-tighter">
                  Salary per location
                </h3>
                <StaticBarChartgraph
                  key="barchart"
                  data={data.location_details}
                />
              </>
            )}
          </div>
          <div className="items-center  max-h-100">
            {data?.experience_details && (
              <>
                <h3 className="ml-10 mt-5 mb-10 font-semibold tracking-tighter">
                  Salary per years
                </h3>
                <LineOfBestFitChart
                  key="linechart"
                  data={data.experience_details}
                />
              </>
            )}
          </div>
        </section>
        <p className="my-10 text-justify">{data?.response}</p>
      </article>
    </main>
  );
};

export default AnalysisPage;
