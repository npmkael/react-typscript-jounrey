import React from "react";
import styles from "./Footer.module.css";

type Props = {
  children: React.ReactNode;
};

const Footer = ({ children }: Props) => {
  return <footer className={styles.footer}>{children}</footer>;
};

export default Footer;
