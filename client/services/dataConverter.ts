import { ExperienceDetails } from "@/types/ExperienceDetails";
import { LocationDetails } from "@/types/LocationDetails";
import { TransformedExperienceDetails } from "@/types/TransformedExperienceDetails";
import { TransformedLocationDetails } from "@/types/TransformedLocationDetails";
import { DataPoint } from "regression";
import { decimalConverter } from "./decimalConverter";

export function transformLocationDetails(
  originalDetails: LocationDetails
): TransformedLocationDetails {
  return {
    location: originalDetails.data_value,
    salary_average: decimalConverter(originalDetails.salary.average / 1000),
    salary_above_average: decimalConverter(
      originalDetails.salary.above_average / 1000
    ),
    salary_below_average: decimalConverter(
      originalDetails.salary.below_average / 1000
    ),
  };
}

export function transformExperienceDetails(
  originalDetails: ExperienceDetails
): TransformedExperienceDetails {
  const salaryAboveAverage =
    originalDetails.salary.above_average === originalDetails.salary.average
      ? null
      : originalDetails.salary.above_average;
  const salaryBellowAverage =
    originalDetails.salary.below_average === originalDetails.salary.average
      ? null
      : originalDetails.salary.below_average;
  return {
    yearsOfExperience: originalDetails.data_value,
    salary_average: decimalConverter(originalDetails.salary.average / 1000),
    salary_above_average:
      salaryAboveAverage !== null
        ? decimalConverter(salaryAboveAverage / 1000)
        : salaryAboveAverage,
    salary_below_average:
      salaryBellowAverage !== null
        ? decimalConverter(salaryBellowAverage / 1000)
        : salaryBellowAverage,
  };
}

export function convertToPolynomialDataPoints(
  sortedDetails: ExperienceDetails[]
): DataPoint[] {
  const dataPoints: DataPoint[] = [];

  for (const i in sortedDetails) {
    const yearsOfExperience: number = decimalConverter(
      sortedDetails[i].data_value
    );
    const averageSalary: number = decimalConverter(
      sortedDetails[i].salary.average
    );

    dataPoints.push([yearsOfExperience, averageSalary]);
  }

  return dataPoints;
}
