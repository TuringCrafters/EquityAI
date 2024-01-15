"use client";

import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import UploadFile from "../components/upload/UploadFile";

export default function Home() {
  const [prompt, setPrompt] = useState("");

  async function fetchAiResponse() {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/ai`,
      { prompt }
    );
    return response.data;
  }

  const {
    data: aiResponse,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["aiResponse", { prompt }],
    queryFn: fetchAiResponse,
    enabled: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch();
  };

  return <UploadFile></UploadFile>;
}
