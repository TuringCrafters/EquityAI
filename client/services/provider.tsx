"use client";

import { Analysis } from "@/types/Analysis";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";

interface DataContextType {
  data: Analysis | null;
  setData: React.Dispatch<React.SetStateAction<Analysis | null>>;
}

export const DataContext = createContext<DataContextType>({
  data: null,
  setData: () => {},
});

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  const [data, setData] = useState<Analysis | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    const storedTimestamp = localStorage.getItem("dataTimestamp");

    if (storedData && storedTimestamp) {
      const currentTime = new Date().getTime();
      const storedTime = parseInt(storedTimestamp, 10);

      if (currentTime - storedTime <= 10 * 60 * 1000) {
        setData(JSON.parse(storedData));
      } else {
        localStorage.removeItem("data");
        localStorage.removeItem("dataTimestamp");
      }
    }
  }, []);

  useEffect(() => {
    if (data) {
      localStorage.setItem("data", JSON.stringify(data));
      localStorage.setItem("dataTimestamp", new Date().getTime().toString());
    }
  }, [data]);
  return (
    <QueryClientProvider client={queryClient}>
      <DataContext.Provider value={{ data, setData }}>
        {children}
      </DataContext.Provider>
    </QueryClientProvider>
  );
}
