"use client";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "../../components/ui/button";
import "../../styles/AnalysisPagePdfStyles.css";
import { AnalysisHeader } from '../../containers/analysis-page/header-section/index';
import { OveralAnalysis } from "@/containers/analysis-page/overal-analysis-section";
import { MostCommonPosition } from "@/containers/analysis-page/most-common-position-section";
import { Insights } from "@/containers/analysis-page/insights-section/indext";



const AnalysisPage = () => {
  const pageRef = useRef<HTMLElement | null>(null);
  const handlePDF = useReactToPrint({
    content: () => pageRef.current,
    documentTitle: "analysis-data",
  });

  return (
    <main className="h-dvh" ref={pageRef}>
      <AnalysisHeader/>
      <Button
        onClick={handlePDF}
        className="absolute top-4 right-6 rounded-full bg-blue-600 "
      >
        Save as PDF
      </Button>
      <Button className="absolute top-4 right-36 rounded-full bg-blue-600 ">
        Share PDF
      </Button>
      <OveralAnalysis/>
      <Insights/>
     {/*  <MostCommonPosition/> */}
    </main>
  );
};

export default AnalysisPage;
