"use client";
import { Analysis } from "@/app/analysis/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useState } from "react";

interface DataContextType {
  data: Analysis | null, 
  setData: React.Dispatch<React.SetStateAction<Analysis | null>>
}


export const DataContext = createContext<DataContextType>({
  data: null,
  setData: () => {}
});

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient()
  const [data, setData] = useState<Analysis | null>(null);
  return (
    <QueryClientProvider client={queryClient}>
      <DataContext.Provider value={{data, setData}}>
        {children}
      </DataContext.Provider>
    </QueryClientProvider>
  );
}