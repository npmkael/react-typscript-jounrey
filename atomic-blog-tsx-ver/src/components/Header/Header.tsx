import styles from "./Header.module.css";
import Results from "../Results/Results";
import SearchPosts from "../SearchPosts/SearchPosts";
import { usePosts } from "../../context/PostProvider";

const Header = () => {
  const context = usePosts();

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
