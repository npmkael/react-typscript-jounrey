import React from "react";
import { Post } from "../../types";

import styles from "./Header.module.css";
import Results from "../Results/Results";
import SearchPosts from "../SearchPosts/SearchPosts";

type HeaderProps = {
  posts: Post[];
  onClearPosts: () => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const Header = ({
  posts,
  onClearPosts,
  searchQuery,
  setSearchQuery,
}: HeaderProps) => {
  return (
    <header className={styles.container}>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <p>TypeScript (TSX) Edition</p>
      <div>
        <Results posts={posts} />
        <SearchPosts
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <button onClick={onClearPosts}>Clear posts</button>
      </div>
    </header>
  );
};

export default Header;
