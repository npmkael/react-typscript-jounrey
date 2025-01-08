import React from "react";
import { Post } from "../../types";

type ResultsProps = {
  posts: Post[];
};

const Results = ({ posts }: ResultsProps) => {
  return <p>🚀 {posts.length} atomic posts found</p>;
};

export default Results;
