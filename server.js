import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000"; // Backend API URL

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 🏠 Home Page (List all posts)
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    res.render("index.ejs", { posts: response.data });
  } catch (error) {
    console.error("❌ Error fetching posts:", error.message);
    res.status(500).send("Error loading posts.");
  }
});

// 🆕 New Post Page
app.get("/new", (req, res) => {
  res.render("newPost.ejs", {
    heading: "Create New Post",
    submit: "Create Post",
  });
});

// 📝 Edit Post Page
app.get("/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    res.render("modify.ejs", {
      heading: "Edit Post",
      submit: "Update Post",
      post: response.data,
    });
  } catch (error) {
    console.error("❌ Error fetching post for edit:", error.message);
    res.status(500).send("Error loading post for editing.");
  }
});

// 🔍 View Single Post Page
app.get("/posts/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    res.render("readMore.ejs", { post: response.data });
  } catch (error) {
    console.error("❌ Error fetching post:", error.message);
    res.status(500).send("Error loading post.");
  }
});

// ➕ Create Post (POST)
app.post("/api/posts", async (req, res) => {
  try {
    await axios.post(`${API_URL}/posts`, req.body);
    res.redirect("/");
  } catch (error) {
    console.error("❌ Error creating post:", error.message);
    res.status(500).send("Error creating post.");
  }
});

// ✏️ Update Post (PATCH)
app.post("/api/posts/:id", async (req, res) => {
  try {
    await axios.patch(`${API_URL}/posts/${req.params.id}`, req.body);
    res.redirect("/");
  } catch (error) {
    console.error("❌ Error updating post:", error.message);
    res.status(500).send("Error updating post.");
  }
});

// ❌ Delete Post
app.get("/api/posts/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/posts/${req.params.id}`);
    res.redirect("/");
  } catch (error) {
    console.error("❌ Error deleting post:", error.message);
    res.status(500).send("Error deleting post.");
  }
});

// 🟢 Start Server
app.listen(port, () => {
  console.log(`Frontend server running at http://localhost:${port}`);
});
