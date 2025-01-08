import { useContext } from "react";
import { PostContext } from "../../App";

const Posts = () => {
  return (
    <section>
      <List />
    </section>
  );
};

const List = () => {
  const context = useContext(PostContext);

  if (context === undefined) {
    throw new Error("bullshet, no context");
  }

  const { posts } = context;

  return (
    <ul>
      {posts.map((post, i) => (
        <li key={i}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
};

export default Posts;
