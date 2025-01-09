import { createContext, useEffect, useState } from "react";
import { CityType } from "../types";

type CitiesContextType = {
  cities: CityType[];
  isLoading: boolean;
};

const CitiesContext = createContext<CitiesContextType | undefined>(undefined);

const BASE_URL = "http://localhost:8000";

const CitiesProvider = ({ children }: { children: React.ReactNode }) => {
  const [cities, setCities] = useState<CityType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider value={{ cities, isLoading }}>
      {children}
    </CitiesContext.Provider>
  );
};

export { CitiesProvider, CitiesContext };
