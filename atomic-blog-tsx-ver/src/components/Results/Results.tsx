import { useContext } from "react";
import { PostContext } from "../../App";

const Results = () => {
  const context = useContext(PostContext);

  if (context === undefined) {
    throw new Error("bullshet, no context");
  }

  const { posts } = context;

  return <p>🚀 {posts.length} atomic posts found</p>;
};

export default Results;
