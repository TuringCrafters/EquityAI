import { experience_details } from "@/app/analysis/page";

export type LinearChartGraphProps = {
  data: experience_details[];
};

export type TransformedExperienceDetails = {
  yearsOfExperience: number;
  salary_average: number;
  salary_above_average: number;
  salary_below_average: number;
};

  /// Currently not used
export type LineOfBestFit = {
  yearsOfExperience: number;
  line: number;
};

export type DataPoint = [number, number];