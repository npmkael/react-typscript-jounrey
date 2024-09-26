export type Cities = {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: CitiesPosition;
  id: number;
};

type CitiesPosition = {
  lat: number;
  lng: number;
};
