import CountryItem from "./CountryItem";
import Message from "./Message";
import Spinner from "./Spinner";
import styles from "./CountryList.module.css";

import { Cities } from "../models";

type Props = {
  cities: Cities[];
  isLoading: boolean;
};

const CountryList = ({ cities, isLoading }: Props) => {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map!" />
    );

  const countries = cities.reduce<Cities[]>((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, city];
    } else {
      return arr;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} />
      ))}
    </ul>
  );
};

export default CountryList;
