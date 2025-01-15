import { usePosts } from "../../context/PostProvider";
import Test from "../../Test";

const Posts = () => {
  return (
    <section>
      <List />
    </section>
  );
};

const List = () => {
  const context = usePosts();

  const { posts } = context;

  return (
    <>
      <ul>
        {posts.map((post, i) => (
          <li key={i}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
      {/* <Test /> */}
    </>
  );
};

export default Posts;
