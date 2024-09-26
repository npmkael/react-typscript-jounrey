import React from "react";
import { Cities } from "../models";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";

type Props = {
  city: Cities;
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

const CityItem = ({ city }: Props) => {
  const { cityName, date, emoji, id } = city;
  return (
    <li>
      <Link to={`${id}`} className={styles.cityItem}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
};

export default CityItem;
