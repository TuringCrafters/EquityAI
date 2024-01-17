import { location_details } from "@/app/analysis/page";

export type TransformedLocationDetails = {
    location: string;
    salary_average: number;
    salary_above_average: number;
    salary_below_average: number;
  }

export type BarChartGraphProps = {
    data: location_details[]; 
  }
  
  
  