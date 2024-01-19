import { ExperienceDetails } from "./ExperienceDetails";
import { LocationDetails } from "./LocationDetails";

export type Analysis = {
    response: string;
    location_details: LocationDetails[];
    experience_details: ExperienceDetails[];
  }