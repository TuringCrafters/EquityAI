import { experience_details, location_details } from "@/app/analysis/types";
import { TransformedLocationDetails } from "@/components/BarChart/types";
import {
  DataPoint,
  TransformedExperienceDetails,
} from "@/components/LineChart/types";

export function transformLocationDetails(
  originalDetails: location_details
): TransformedLocationDetails {
  return {
    location: originalDetails.data_value,
    salary_average: originalDetails.salary.average / 1000,
    salary_above_average: originalDetails.salary.above_average / 1000,
    salary_below_average: originalDetails.salary.below_average / 1000,
  };
}

export function transformExperienceDetails(
  originalDetails: experience_details
): TransformedExperienceDetails {
  return {
    yearsOfExperience: originalDetails.data_value,
    salary_average: originalDetails.salary.average / 1000,
    salary_above_average: originalDetails.salary.above_average / 1000,
    salary_below_average: originalDetails.salary.below_average / 1000,
  };
}

export function convertToPolynomialDataPoints(
  sortedDetails: experience_details[]
): DataPoint[] {
  const dataPoints: DataPoint[] = [];

  for (const i in sortedDetails) {
    const yearsOfExperience: number = sortedDetails[i].data_value;
    const averageSalary: number = sortedDetails[i].salary.average;

    dataPoints.push([yearsOfExperience, averageSalary]);
  }

  return dataPoints;
}
