export function transformLocationDetails(originalDetails: location_details): TransformedLocationDetails {
    return {
      location: originalDetails.location,
      salary_average: originalDetails.salary.average,
      salary_above_average: originalDetails.salary.above_average,
      salary_below_average: originalDetails.salary.below_average,
    };
  }