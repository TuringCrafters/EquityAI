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

export type DataPoint = [number, number];