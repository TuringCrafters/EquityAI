import { ExperienceDetails } from "@/types/ExperienceDetails";
import { LocationDetails } from "@/types/LocationDetails";
import { TransformedExperienceDetails } from "@/types/TransformedExperienceDetails";
import { TransformedLocationDetails } from "@/types/TransformedLocationDetails";
import { DataPoint } from "regression";


export function transformLocationDetails(
  originalDetails: LocationDetails
): TransformedLocationDetails {
  return {
    location: originalDetails.data_value,
    salary_average: originalDetails.salary.average,
    salary_above_average: originalDetails.salary.above_average,
    salary_below_average: originalDetails.salary.below_average,
  };
}

export function transformExperienceDetails(
  originalDetails: ExperienceDetails
): TransformedExperienceDetails {
  return {
    yearsOfExperience: originalDetails.data_value,
    salary_average: originalDetails.salary.average,
    salary_above_average: originalDetails.salary.above_average,
    salary_below_average: originalDetails.salary.below_average,
  };
}

export function convertToPolynomialDataPoints(
  sortedDetails: ExperienceDetails[]
): DataPoint[] {
  const dataPoints: DataPoint[] = [];

  for (const i in sortedDetails) {
    const yearsOfExperience: number = sortedDetails[i].data_value;
    const averageSalary: number = sortedDetails[i].salary.average;

    dataPoints.push([yearsOfExperience, averageSalary]);
  }

  return dataPoints;
}
