const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const db = require("./db.js"); // Import the database operations

const prisma = new PrismaClient();
const app = express();

app.use(cors()); // Add CORS middleware
app.use(express.json());

// Middleware for database operations with proper disconnection
const withPrismaDisconnect = async (req, res, operation) => {
  try {
    const result = await operation();
    console.log("Operation completed successfully");
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
    console.log("DB Disconnected");
  }
};

// User routes
app.post("/users", async (req, res) => {
  try {
    const user = await withPrismaDisconnect(req, res, async () => {
      return await db.createUser(req.body);
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await withPrismaDisconnect(req, res, async () => {
      return await db.getAllUsers();
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await withPrismaDisconnect(req, res, async () => {
      return await db.getUserById(req.params.id);
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await withPrismaDisconnect(req, res, async () => {
      return await db.updateUser(req.params.id, req.body);
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    await withPrismaDisconnect(req, res, async () => {
      return await db.deleteUser(req.params.id);
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
});

// Profile routes
app.post("/profiles", async (req, res) => {
  try {
    const profile = await withPrismaDisconnect(req, res, async () => {
      return await db.createProfile(req.body);
    });
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ error: "Error creating profile" });
  }
});

app.get("/profiles/user/:userId", async (req, res) => {
  try {
    const profile = await withPrismaDisconnect(req, res, async () => {
      return await db.getProfileByUserId(req.params.userId);
    });
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: "Error fetching profile" });
  }
});

app.put("/profiles/user/:userId", async (req, res) => {
  try {
    const updatedProfile = await withPrismaDisconnect(req, res, async () => {
      return await db.updateProfile(req.params.userId, req.body);
    });
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ error: "Error updating profile" });
  }
});

app.delete("/profiles/:id", async (req, res) => {
  try {
    await withPrismaDisconnect(req, res, async () => {
      return await db.deleteProfile(req.params.id);
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting profile" });
  }
});

// Post routes
app.post("/posts", async (req, res) => {
  try {
    const post = await withPrismaDisconnect(req, res, async () => {
      return await db.createPost(req.body);
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "Error creating post" });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await withPrismaDisconnect(req, res, async () => {
      return await db.getAllPosts();
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts" });
  }
});

app.get("/posts/:id", async (req, res) => {
  try {
    const post = await withPrismaDisconnect(req, res, async () => {
      return await db.getPostById(req.params.id);
    });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Error fetching post" });
  }
});

app.get("/posts/author/:authorId", async (req, res) => {
  try {
    const posts = await withPrismaDisconnect(req, res, async () => {
      return await db.getPostsByAuthorId(req.params.authorId);
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts" });
  }
});

app.put("/posts/:id", async (req, res) => {
  try {
    const updatedPost = await withPrismaDisconnect(req, res, async () => {
      return await db.updatePost(req.params.id, req.body);
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Error updating post" });
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    await withPrismaDisconnect(req, res, async () => {
      return await db.deletePost(req.params.id);
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting post" });
  }
});

// Keep the original endpoint for backward compatibility
app.post("/", async (req, res) => {
  try {
    const dataset = req.body;
    const user = await db.main(dataset)
      .then(async (result) => {
        await prisma.$disconnect();
        console.log("DB Disconnected");
        return result;
      })
      .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        console.log("DB Disconnected after error");
        throw error;
      });
      
    console.log("User created successfully");
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

app.listen(5001, () => {
  console.log("Server is running");
});