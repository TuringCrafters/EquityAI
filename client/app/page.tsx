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
    <main className='h-full' >
      <h4 className='mb-4 text-center m-20 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>Ask something to AI</h4>
      <form onSubmit={handleSubmit} className='flex flex-col items-center'>
        <input
          onChange={handleInputChange}
          type="text"
          value={prompt}
          placeholder="Ask me!"
          className="block w-70 p-4 mx-auto mt-10 ps-10 justify-center text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
       <button
  type="submit"
  className="text-white bg-gradient-to-r mt-5 mx-auto justify-center from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
>Ask</button>
      </form>
      {aiResponse && 
      isLoading ? <p>Loading...</p> : <h5 className='mb-4 text-center m-20 text-4xl'>{aiResponse}</h5>}
    </main>
  );
}

