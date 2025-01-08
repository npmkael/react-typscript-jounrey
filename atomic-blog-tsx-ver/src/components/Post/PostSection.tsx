import { Post } from "../../types";
import FormAddPost from "./FormAddPost";
import Posts from "./Posts";

type PostSectionProps = {
  posts: Post[];
  onAddPost: (post: Post) => void;
};

const PostSection = ({ posts, onAddPost }: PostSectionProps) => {
  return (
    <main>
      <FormAddPost onAddPost={onAddPost} />
      <Posts posts={posts} />
    </main>
  );
};

export default PostSection;
