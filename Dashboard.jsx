import { getPosts, savePost, deletePost } from "../services/api";
import PostCard from "./PostCard";
import { useEffect, useState } from "react";

export default function Dashboard({ token, role, onLogout }) {
  const [posts, setPosts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [image, setImage] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = () => getPosts(token).then(setPosts);

  const uploadImage = e => {
    const r = new FileReader();
    r.onload = () => setImage(r.result);
    r.readAsDataURL(e.target.files[0]);
  };

  const save = () => {
    savePost(token, {
      title: title.value,
      content: content.value,
      image
    }, editId).then(() => {
      setEditId(null);
      title.value = "";
      content.value = "";
      load();
    });
  };

  return (
    <div className="box">
      <button className="logout" onClick={onLogout}>Logout</button>

      <h2>Create / Edit Post</h2>
      <input id="title" placeholder="Title" />
      <textarea id="content" placeholder="Content" />
      <input type="file" onChange={uploadImage} />
      <button onClick={save}>
        {editId ? "Update Post" : "Create Post"}
      </button>

      <h2>Dashboard</h2>
      {posts.map(p => (
        <PostCard
          key={p.id}
          post={p}
          role={role}
          onEdit={(post) => {
            setEditId(post.id);
            title.value = post.title;
            content.value = post.content;
          }}
          onDelete={(id) => deletePost(token, id).then(load)}
        />
      ))}
    </div>
  );
}
