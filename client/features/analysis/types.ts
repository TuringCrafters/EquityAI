type TransformedExperienceDetails = {
  yearsOfExperience: number;
  salary_average: number;
  salary_above_average: number | null;
  salary_below_average: number | null;
};

type ExperienceDetails = {
  data_value: number;
  salary: {
    average: number;
    above_average: number;
    below_average: number;
  };
};

type LocationDetails = {
  data_value: string;
  salary: {
    average: number;
    above_average: number;
    below_average: number;
  };
}

export type { TransformedExperienceDetails, ExperienceDetails, LocationDetails };
