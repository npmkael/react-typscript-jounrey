import { createContext, useContext, useState } from "react";
import { Post } from "../types";
import { faker } from "@faker-js/faker";

const createRandomPost = () => {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
};

type PostPrivderProps = {
  posts: Post[];
  onAddPost: (post: Post) => void;
  onClearPosts: () => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  createRandomPost: () => Post;
};

const PostContext = createContext<PostPrivderProps | undefined>(undefined);

const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Derived state. These are the posts that will actually be displayed.
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  const handleAddPost = (post: Post) => {
    setPosts((posts) => [post, ...posts]);
  };

  const handleClearPosts = () => {
    setPosts([]);
  };

  return (
    // Pass or Provide the value prop to the PostContext.Provider component.
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        onAddPost: handleAddPost,
        onClearPosts: handleClearPosts,
        searchQuery,
        setSearchQuery,
        createRandomPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

// Custom hook to consume the PostContext.
const usePosts = () => {
  const context = useContext(PostContext);

  if (context === undefined) {
    throw new Error("bullshet, no context");
  }

  return context;
};

export { PostProvider, usePosts };
