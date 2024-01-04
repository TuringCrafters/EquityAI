"use client"
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  async function sendInputToServer(userInput: string) {
    try {
      const response = await fetch('http://localhost:3000/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userInput })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setResponse(result.responseAi);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendInputToServer(input);
      setInput("");
    }
  };

  return (
    <main>
      <h4>Type your prompt here:</h4>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleInputSubmit}
      />
      <h5>{response}</h5>
    </main>
  )
}
