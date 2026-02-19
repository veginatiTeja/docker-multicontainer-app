const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Connect to MongoDB (docker service name = mongo)
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("Mongo Error:", err));

// Create Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

// Create Model
const User = mongoose.model("User", UserSchema);

app.get('/health', (req,res) => {
  console.log("checking server status")
  res.status(200).json({status: "OK"});
})

// Test Route
app.get("/", (req, res) => {
  res.send("Multi Container App Working 🚀");
});

// ✅ Add User Route
app.post("/add", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Name is required"
      });
    }

    const newUser = new User({ name });
    await newUser.save();

    res.status(201).json({
      message: "User added successfully",
      user: newUser
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
});

// ✅ Get All Users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json("users "+JSON.stringify(users));
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
