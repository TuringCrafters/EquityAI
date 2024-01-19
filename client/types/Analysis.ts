import { ExperienceDetails } from "./ExperienceDetails";
import { LocationDetails } from "./LocationDetails";

export type Analysis = {
    response: string;
    job_title: string;
    product_recommendation: string;
    location_details: LocationDetails[];
    experience_details: ExperienceDetails[];
  }