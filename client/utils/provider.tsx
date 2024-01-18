"use client";
import { Analysis } from "@/app/analysis/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useState } from "react";



export const DataContext = createContext<Analysis | null>(null);

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient()
  const [data, setData] = useState<Analysis | null>(null);
  return (
    <QueryClientProvider client={queryClient}>
      <DataContext.Provider value={data}>
        {children}
      </DataContext.Provider>
    </QueryClientProvider>
  );
}