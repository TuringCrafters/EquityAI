"use client";
import axios from 'axios';
import React, { useState } from 'react'
import { useQuery } from "@tanstack/react-query";

const Analysis = () => {

    interface location_details {
        location: string;
        salary: {
            average: number;
            above_average: number;
            below_average: number;
        }
    }

    interface experience_details {
        years_of_experience: number;
            salary: {
                average: number;
                above_average: number;
                below_average: number;
            }
    }

    interface Analysis {
        location_details: location_details[];
        experience_details: experience_details[];
    }

    

const [information, setInformation] = useState<Analysis>()

     const fetchAnalysis = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/file/data`
                );
                setInformation(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }   
        }

        const {
            data: analysis,
            isLoading,
          } = useQuery({
            queryKey: ["analysis"],
            queryFn: fetchAnalysis,
            enabled: true,
            refetchOnWindowFocus: false,
          });


    return (

        //map through the information and display it as graphs


        <div>{}</div>

    )
}

export default Analysis;
