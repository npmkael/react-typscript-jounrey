import { Post } from "../../types";

type PostsProps = {
  posts: Post[];
};

const Posts = ({ posts }: PostsProps) => {
  return (
    <section>
      <List posts={posts} />
    </section>
  );
};

const List = ({ posts }: PostsProps) => {
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
