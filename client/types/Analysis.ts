import { ExperienceDetails } from "./ExperienceDetails";
import { LocationDetails } from "./LocationDetails";

export type Analysis = {
    response: string;
    job_title: string
    location_details: LocationDetails[];
    experience_details: ExperienceDetails[];
  }