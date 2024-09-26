import styles from "./CountryItem.module.css";
import { Cities } from "../models";

type Props = {
  country: Cities;
};

function CountryItem({ country }: Props) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
