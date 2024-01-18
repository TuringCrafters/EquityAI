export type location_details = {
  location: string;
  salary: {
    average: number;
    above_average: number;
    below_average: number;
  };
}

export type experience_details = {
  years_of_experience: number;
  salary: {
    average: number;
    above_average: number;
    below_average: number;
  };
}

export interface Analysis {
  response: string;
  location_details: location_details[];
  experience_details: experience_details[];
}
