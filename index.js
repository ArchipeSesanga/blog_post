import express from "express";

const app = express();
const port = 4000;

let posts = [
  { id: 1, genre: "N/A", title: "The Rise of Decentralized Finance", content: "...", author: "Alex Thompson", date: "2023-08-01T10:00:00Z" },
  { id: 2, genre: "N/A", title: "The Impact of AI", content: "...", author: "Mia Williams", date: "2023-08-05T14:30:00Z" },
  { id: 3, genre: "N/A", title: "Sustainable Living", content: "...", author: "Samuel Green", date: "2023-08-10T09:15:00Z" },
];
let lastId = 3;

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET all posts
app.get("/posts", (req, res) => res.json(posts));

// GET post by ID
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// CREATE post
app.post("/posts", (req, res) => {
  const newId = ++lastId;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  posts.push(post);
  res.status(201).json(post);
});

// UPDATE post
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  // Only update fields provided
  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;
  post.author = req.body.author || post.author;

  res.json(post);
});

// DELETE post
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted successfully" });
});

// Start server
app.listen(port, () => console.log(`API server running on port ${port}`));
