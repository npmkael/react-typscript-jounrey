import { FormEvent } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: (e: FormEvent<HTMLButtonElement>) => void;
  type: string;
};

const Button = ({ children, onClick, type }: ButtonProps) => {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
};

export default Button;
