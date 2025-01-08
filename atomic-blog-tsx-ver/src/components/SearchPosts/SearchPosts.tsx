import { useContext } from "react";
import { usePosts } from "../../context/PostProvider";

const SearchPosts = () => {
  const context = usePosts();

  const { searchQuery, setSearchQuery } = context;

  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
    />
  );
};

export default SearchPosts;
