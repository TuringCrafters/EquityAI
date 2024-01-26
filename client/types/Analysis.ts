import { ExperienceDetails } from "./ExperienceDetails";
import { LocationDetails } from "./LocationDetails";

export type Analysis = {
  response: string;
  product_recommendation: string;
  unique_job_titles: string[];
  job_title: string;
  experience_details: ExperienceDetails[];
  location_details: LocationDetails[];
  gender_pay_gap: string;
  company_overview: {
    average_age: number;
    average_salary: number;
    average_tenure: number;
    top_five_highest_paying_positions:[
      { position: string; salary: number },
      { position: string; salary: number },
      { position: string; salary: number },
      { position: string; salary: number },
      { position: string; salary: number }
    ];
    total_number_of_employees: number;
  };
};
