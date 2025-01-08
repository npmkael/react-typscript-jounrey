import { createContext, useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { Post } from "./types";
import Header from "./components/Header/Header";
import PostSection from "./components/Post/PostSection";
import Archive from "./components/Archive/Archive";
import Footer from "./components/Footer/Footer";

const createRandomPost = () => {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
};

// 1). Create a new context called PostContext.
interface PostContextType {
  posts: Post[];
  onAddPost: (post: Post) => void;
  onClearPosts: () => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  createRandomPost: () => Post;
}

export const PostContext = createContext<PostContextType | undefined>(
  undefined
);

const App = () => {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isFakeDark, setIsFakeDark] = useState(false);

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

  useEffect(() => {
    document.documentElement.classList.toggle("fake-dark-mode");
  }, [isFakeDark]);

  return (
    // 2). Pass or Provide the value prop to the PostContext.Provider component.
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
      <section>
        <button
          onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
          className="btn-fake-dark-mode"
        >
          {isFakeDark ? "☀️" : "🌙"}
        </button>

        {/* Header Component */}
        <Header />
        <PostSection />
        <Archive />
        <Footer />
      </section>
    </PostContext.Provider>
  );
};

export default App;
