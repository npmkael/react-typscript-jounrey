import { useCities } from "../../contexts/CitiesProvider";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";

const CountryList = () => {
  const { cities, isLoading } = useCities();

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return (
      <Message message="Add your first city by clicking on a city on the map." />
    );
  }

  // `countries` is an array created by reducing the `cities` array.
  // The `reduce` function starts with an empty array ([]) as the initial value and
  // iterates over each `city` object in the `cities` array.

  const countries = cities.reduce<
    { country: string; emoji: string }[] // Type for the reduced result: array of objects with country, emoji, and id properties.
  >((arr, city) => {
    // For each `city`, check if its `country` already exists in the `arr`.
    if (!arr.map((el) => el.country).includes(city.country)) {
      // If the `country` does not already exist in `arr`, add a new object to the array.
      return [
        ...arr, // Spread the existing objects in `arr`.
        { country: city.country, emoji: city.emoji },
      ];
    } else {
      // If the `country` already exists in `arr`, return the array as-is.
      return arr;
    }
  }, []); // Initial value: an empty array to start reducing from.

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
};

export default CountryList;
