import { usePosts } from "../../context/PostProvider";

const Results = () => {
  const context = usePosts();

  const { posts } = context;

  return <p>🚀 {posts.length} atomic posts found</p>;
};

export default Results;
