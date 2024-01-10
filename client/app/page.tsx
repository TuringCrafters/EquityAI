"use client";

import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setPrompt(e.target.value);
  };

  async function sendPromptToServer(prompt: string) {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/ai", {
        prompt,
      });
      setAiResponse(response.data);
      console.log(aiResponse);
    } catch (error) {
      console.error("Error occurr during fetching", error);
    }
  }

  const handleSubmit = () => {
    sendPromptToServer(prompt);
    setPrompt("");
    console.log("sent info");
  };

  return (
    <main>
      <h4>Ask something to AI</h4>
      <form>
        <input
          onChange={handleInputChange}
          type="text"
          value={prompt}
          placeholder="Ask me!"
        />
        <button onClick={handleSubmit}>Ask</button>
      </form>
      <h5>{aiResponse}</h5>
    </main>
  );
}
