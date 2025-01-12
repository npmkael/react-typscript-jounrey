export type CityType = {
  cityName: string;
  country: string;
  emoji: string;
  date: Date;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  id?: string;
};

export type Position = {
  lat: number;
  lng: number;
};
