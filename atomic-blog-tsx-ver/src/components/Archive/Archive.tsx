import { useState } from "react";
import { Post } from "../../types";

type ArchiveProps = {
  onAddPost: (post: Post) => void;
  createRandomPost: () => Post;
};

const Archive = ({ onAddPost, createRandomPost }: ArchiveProps) => {
  const [posts] = useState(() =>
    Array.from({ length: 16 }, () => createRandomPost())
  );

  const [showArchive, setShowArchive] = useState(false);

  return (
    <aside>
      <h2>Post Archive</h2>

      <button onClick={() => setShowArchive((show) => !show)}>
        {showArchive ? "Hide archive posts" : "Show archive posts"}
      </button>

      {showArchive && (
        <ul>
          {posts.map((post, i) => (
            <li key={i}>
              <p>
                <strong>{post.title}:</strong> {post.body}
              </p>
              <button onClick={() => onAddPost(post)}>Add as new post</button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default Archive;
