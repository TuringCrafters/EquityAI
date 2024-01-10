"use client";

import { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';



export default function Home() {
  const [prompt, setPrompt] = useState('');

  async function fetchAiResponse () {
    const response = await axios.post('http://localhost:8080/api/v1/ai', { prompt });
    return response.data;
  };

  const { data: aiResponse, isLoading, refetch } = useQuery({
    queryKey: ['aiResponse', { prompt }],
    queryFn: fetchAiResponse,
    enabled: false
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    refetch();
  };

  return (
    <main>
      <h4>Ask something to AI</h4>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleInputChange}
          type="text"
          value={prompt}
          placeholder="Ask me!"
        />
        <button type="submit">Ask</button>
      </form>
      {aiResponse && 
      isLoading ? <p>Loading...</p> : <h5>{aiResponse}</h5>}
    </main>
  );
}

