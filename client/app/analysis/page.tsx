"use client";
import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "../../components/ui/button";
import "../../styles/AnalysisPagePdfStyles.css";
import { AnalysisHeader } from "../../containers/analysis-page/header-section/index";
import { OveralAnalysis } from "@/containers/analysis-page/overal-analysis-section";
import { Insights } from "@/containers/analysis-page/insights-section/indext";
import { Recommendations } from "@/containers/analysis-page/recomendation-section";
import NavBarAnalysis from "@/components/NavbarAnalysis";
import Footer from "@/components/Footer";
import { MostCommonPosition } from "@/containers/analysis-page/most-common-position-section";
import ClipboardCopyButton from "./ClipboardCopyButton";

const AnalysisPage = () => {
  const pageRef = useRef<HTMLElement | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareLink, setShareLink] = useState();

  const handlePDF = useReactToPrint({
    content: () => pageRef.current,
    documentTitle: "analysis-data",
    onAfterPrint() {},
  });

  function getAllCSS() {
    let css = "";

    for (let i = 0; i < document.styleSheets.length; i++) {
      const styleSheet = document.styleSheets[i];

      if ("cssRules" in styleSheet) {
        for (let j = 0; j < styleSheet.cssRules.length; j++) {
          const rule = styleSheet.cssRules[j];
          if ("cssText" in rule) {
            css += rule.cssText + "\n";
          }
        }
      }
    }

    return css;
  }

  const generatePdfBlob = () => {
    setIsGenerating(true);
    const html = document.documentElement.outerHTML;

    fetch("/api/upload", {
      method: "POST",
      headers: {
        Content: "application/json",
      },
      body: JSON.stringify({
        html,
        css: getAllCSS(),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setShareLink(res.url);
      })
      .finally(() => {
        setIsGenerating(false);
      });
  };

  return (
    <main className="h-dvh" ref={pageRef}>
      <NavBarAnalysis />
      <AnalysisHeader />
      <aside className="absolute top-4 right-6 z-20 flex gap-3 noprint">
        {shareLink ? (
          <ClipboardCopyButton value={shareLink} />
        ) : (
          <Button
            onClick={generatePdfBlob}
            className="relative rounded-full bg-blue-600 noprint min-w-36"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <span className="animate-pulse">Generating...</span>
            ) : (
              "Share PDF"
            )}
          </Button>
        )}
        <Button
          onClick={handlePDF}
          className="relative rounded-full bg-blue-600"
        >
          Save as PDF
        </Button>
      </aside>

      <OveralAnalysis />
      <Insights />
      <MostCommonPosition />
      <Recommendations />
      <Footer />
    </main>
  );
};

export default AnalysisPage;
