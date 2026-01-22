const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const SECRET = "blog_saas_secret_key";
const DATA_FILE = "./data.json";

/* helpers */
const readData = () => JSON.parse(fs.readFileSync(DATA_FILE));
const writeData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

/* LOGIN */
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // SIMPLE ROLE LOGIC
  const role = email.includes("admin") ? "admin" : "user";

  if (!email || !password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ email, role }, SECRET, { expiresIn: "1h" });
  res.json({ token, role });
});

/* AUTH */
function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

/* POSTS */
app.get("/api/posts", auth, (req, res) => {
  res.json(readData());
});

app.post("/api/posts", auth, (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);

  const posts = readData();
  posts.push({ ...req.body, id: Date.now() });
  writeData(posts);
  res.json({ message: "Post created" });
});

app.put("/api/posts/:id", auth, (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);

  let posts = readData();
  posts = posts.map(p => p.id == req.params.id ? { ...p, ...req.body } : p);
  writeData(posts);
  res.json({ message: "Post updated" });
});

app.delete("/api/posts/:id", auth, (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);

  let posts = readData();
  posts = posts.filter(p => p.id != req.params.id);
  writeData(posts);
  res.json({ message: "Post deleted" });
});

app.listen(5000, () =>
  console.log("✅ Backend running on http://localhost:5000")
);

