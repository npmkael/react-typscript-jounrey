import { useContext } from "react";

import styles from "./Header.module.css";
import Results from "../Results/Results";
import SearchPosts from "../SearchPosts/SearchPosts";
import { PostContext } from "../../App";

const Header = () => {
  const context = useContext(PostContext);

  if (context === undefined) {
    throw new Error("bullshet, no context");
  }
  // 3). Use the context value in the Header component.
  const { onClearPosts } = context;

  return (
    <header className={styles.container}>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <p>TypeScript (TSX) Edition</p>
      <div>
        <Results />
        <SearchPosts />
        <button onClick={onClearPosts}>Clear posts</button>
      </div>
    </header>
  );
};

export default Header;
