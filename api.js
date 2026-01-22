const API = "http://localhost:5000";

export const loginAPI = (email) =>
  fetch(API + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  }).then(res => res.json());

export const getPosts = (token) =>
  fetch(API + "/posts", {
    headers: { Authorization: token }
  }).then(res => res.json());

export const savePost = (token, post, editId) =>
  fetch(API + "/posts" + (editId ? "/" + editId : ""), {
    method: editId ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(post)
  });

export const deletePost = (token, id) =>
  fetch(API + "/posts/" + id, {
    method: "DELETE",
    headers: { Authorization: token }
  });
