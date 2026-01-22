export default function PostCard({ post, role, onEdit, onDelete }) {
  return (
    <div className="post">
      <img src={post.image} />
      <h4>{post.title}</h4>
      <p>{post.content}</p>
      <button onClick={() => onEdit(post)}>Edit</button>
      {role === "admin" && (
        <button onClick={() => onDelete(post.id)}>Delete</button>
      )}
    </div>
  );
}
