import { useContext, useState } from "react";
import { PostContext } from "../../App";

const FormAddPost = () => {
  const context = useContext(PostContext);

  if (context === undefined) {
    throw new Error("bullshet, no context");
  }

  const { onAddPost } = context;

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !body) return;

    onAddPost({ title, body });
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Post body"
      />
      <button>Add post</button>
    </form>
  );
};

export default FormAddPost;
