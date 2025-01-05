import { City } from "../../types";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";

const CityList = ({
  cities,
  isLoading,
}: {
  cities: City[];
  isLoading: boolean;
}) => {
  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return (
      <Message message="Add your first city by clicking on a city on the map." />
    );
  }

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
};

export default CityList;
