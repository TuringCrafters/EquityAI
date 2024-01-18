"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useState } from "react";



export const DataContext = createContext("");

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient()

  const [data, setData] = useState("Ello");
  return (
    <QueryClientProvider client={queryClient}>
      <DataContext.Provider value={data}>
        {children}
      </DataContext.Provider>
    </QueryClientProvider>
  );
}