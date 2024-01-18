"use client";
import axios from "axios";
import React, { Suspense, useContext, useState } from "react";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import LineOfBestFitChart from "@/components/lineofbestfitchart/LineOfBestFitChart";
import { Analysis } from "./types";
import fetchAnalysis from "@/utils/fetchAnalysis";

const StaticBarChartgraph = dynamic(
  () => import("@/components/barchart/BarChartGraph"),
  { ssr: false }
);
const Analysis = () => {
  const [information, setInformation] = useState<Analysis | null>(null);

  const { data } = useQuery({
    queryKey: ["analysis"],
    queryFn: fetchAnalysis,
    enabled: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setInformation(data);
  }, [data]);

  return (
    <main>
      <article className="">
        <section className="flex flex-row align-middle h-3/6 justify-center items-center border-2 border-red-700">
          <div className="items-center h-full border-2 border-green-600">
            {information?.location_details &&(
              <>  <h2>Bar Chart</h2>
              <StaticBarChartgraph data={information.location_details} />
              </>
            )}
          </div>
          <div className="items-center  max-h-100 border-2 border-blue-600">
            {information?.experience_details && (
              <>
              <h2>Line Chart</h2>
              <LineOfBestFitChart data={information.experience_details} />
              </>
            )}
          </div>
        </section>
      </article>
    </main>
  );
};

export default Analysis;
