import { createContext, useContext, useEffect, useReducer } from "react";
import { CityType } from "../types";

type CitiesContextType = {
  cities: CityType[];
  isLoading: boolean;
  currentCity: CityType | null;
  error: string;
  getCity: (id: string) => void;
  createCity: (newCity: CityType) => void;
  deleteCity: (id: string) => void;
};

type CitiesStateType = {
  cities: CityType[];
  isLoading: boolean;
  currentCity: CityType | null;
  error: string;
};

type CitiesActionType =
  | { type: "loading" }
  | { type: "cities/loaded"; payload: CityType[] }
  | { type: "city/loaded"; payload: CityType }
  | { type: "city/created"; payload: CityType }
  | { type: "city/deleted"; payload: string }
  | { type: "rejected"; payload: string };

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext<CitiesContextType | undefined>(undefined);

const initialState: CitiesStateType = {
  cities: [],
  isLoading: false,
  currentCity: null,
  error: "",
};

function reducer(
  state: CitiesStateType,
  action: CitiesActionType
): CitiesStateType {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(
          (city: CityType) => city.id !== action.payload
        ),
        currentCity: null,
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unhandled action type in CitiesProvider reducer");
  }
}

const CitiesProvider = ({ children }: { children: React.ReactNode }) => {
  // const [cities, setCities] = useState<CityType[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState<CityType | null>(null);

  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({ type: "rejected", payload: "Failed to fetch cities data." });
      }
    }

    fetchCities();
  }, []);

  async function getCity(id: string) {
    if (currentCity && id === currentCity.id) return;

    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({ type: "rejected", payload: "Failed to fetch city data." });
    }
  }

  async function createCity(newCity: CityType) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was a problem on creating a city.",
      });
    }
  }

  async function deleteCity(id: string) {
    dispatch({ type: "loading" });
    console.log(currentCity);
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was a problem on deleting a city.",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);

  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider");
  }

  return context;
};

export { CitiesProvider, useCities };
