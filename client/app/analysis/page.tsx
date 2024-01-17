"use client";

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
    <div className="flex row-auto justify-around m-14 items-center">
      {information?.location_details && (
        <StaticBarChartgraph data={information.location_details} />
      )}

      {information?.experience_details && (
        <LineOfBestFitChart data={information.experience_details} />
      )}
    </div>
  );
};

export default Analysis;
