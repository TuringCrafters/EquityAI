"use client";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import "@/features/analysis/"
import { AnalysisHeader, Footer, Insights, MostCommonPosition, NavBarAnalysis, OveralAnalysis, Recommendations } from "@/features/analysis";


const AnalysisPage = () => {
  const pageRef = useRef<HTMLElement | null>(null);
  const handlePDF = useReactToPrint({
    content: () => pageRef.current,
    documentTitle: "analysis-data",
  });

  return (
    <main className="h-dvh" ref={pageRef}>
      <NavBarAnalysis />
      <AnalysisHeader />
      <div className="absolute top-4 right-6 z-20 flex">
        <Button
          onClick={handlePDF}
          className="rounded-full bg-blue-600 noprint"
        >
          Save as PDF
        </Button>
      </div>
      <OveralAnalysis />
      <Insights />
      <MostCommonPosition />
      <Recommendations />
      <Footer />
    </main>
  );
};

export default AnalysisPage;
