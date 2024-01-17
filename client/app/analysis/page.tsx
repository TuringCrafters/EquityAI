"use client";

import axios from "axios";
import React, { Suspense, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import LineOfBestFitChart from "@/components/lineofbestfitchart/LineOfBestFitChart";

const StaticBarChartgraph = dynamic(
  () => import("@/components/barchart/BarChartGraph"),
  { ssr: false }
);

export interface location_details {
  location: string;
  salary: {
    average: number;
    above_average: number;
    below_average: number;
  };
}

export interface experience_details {
  years_of_experience: number;
  salary: {
    average: number;
    above_average: number;
    below_average: number;
  };
}

interface Analysis {
  location_details: location_details[];
  experience_details: experience_details[];
}

const Analysis = () => {
  const [information, setInformation] = useState<Analysis | null>(null);

  const fetchAnalysis = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/file/data`
      );
      setInformation(response?.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useQuery({
    queryKey: ["analysis"],
    queryFn: fetchAnalysis,
    enabled: true,
    refetchOnWindowFocus: false,
  });

  return (
    <>
    <div className="mt-10"></div>
      {/* <div>
        {information &&
          information.location_details.map((location) => {
            return (
              <ul key={location.location}>
                <li> Average salary: {location.salary.average}</li>
              </ul>
            );
          })}
      </div> */}
      <div className="flex row-auto justify-around m-14 items-center">
        <Suspense>
          {information?.location_details && (
            <StaticBarChartgraph data={information.location_details} />
          )}
        </Suspense>
        <Suspense>
          {information?.experience_details && (
            <LineOfBestFitChart data={information.experience_details} />
          )}
        </Suspense>
      </div>
    </>
  );
};

export default Analysis;
