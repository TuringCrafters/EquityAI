import { experience_details, location_details } from "@/app/analysis/page";
import { TransformedLocationDetails } from "@/components/barchart/types";
import { TransformedExperienceDetails } from "@/components/lineofbestfitchart/types";

export function transformLocationDetails(originalDetails: location_details): TransformedLocationDetails {
    return {
      location: originalDetails.location,
      salary_average: originalDetails.salary.average/1000,
      salary_above_average: originalDetails.salary.above_average/1000,
      salary_below_average: originalDetails.salary.below_average/1000,
    };
  }

  export function transformExperienceDetails(originalDetails: experience_details): TransformedExperienceDetails {
    return {
      yearsOfExperience: originalDetails.years_of_experience,
      salary_average: originalDetails.salary.average/1000,
      salary_above_average: originalDetails.salary.above_average/1000,
      salary_below_average: originalDetails.salary.below_average/1000,
    };
  }