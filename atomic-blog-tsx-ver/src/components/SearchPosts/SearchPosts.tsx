import { useContext } from "react";
import { PostContext } from "../../App";

const SearchPosts = () => {
  const context = useContext(PostContext);

  if (context === undefined) {
    throw new Error("bullshet, no context");
  }

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
