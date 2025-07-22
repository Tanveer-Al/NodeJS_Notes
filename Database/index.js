const express = require("express");
const mongoose = require("mongoose");

const app = express();

// coneect db
mongoose
  .connect("mongodb://127.0.0.1:27017/NodeTuturial")
  .then(() => {
    console.log("Database Connected successfully");
  })
  .catch(() => {
    console.log("Mongodb Error");
  });

// Schema
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);
//model
const userModel = mongoose.model("user", userSchema);

//middleware
app.use(express.urlencoded({ extended: false }));

// all users name and email details
app.get("/users", async (req, res) => {
  const allUsers = await userModel.find({});
  const html = `
  <ul>${allUsers
    .map((user) => `<li>${user.first_name} - ${user.email}</li>`)
    .join("")}</ul>
  `;
  res.send(html);
});

//all users full details
app.get("/api/users", async (req, res) => {
  const allUsers = await userModel.find({});
  return res.json(allUsers);
});

// post method
app.post("/api/users/signup", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender
  ) {
    return res.status(400).json({
      mes: "All field are req.......",
    });
  }
  const result = await userModel.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
  });
  return res.status(201).json({
    mes: "user created successfully",
  });
});

//one user details get, update and delete
app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ mes: "user not found" });
    }
    return res.json(user);
  })
  .patch(async (req, res) => {
    const user = await userModel.findByIdAndUpdate(req.params.id, {
      last_name: "abrar",
    });
    if (!user) {
      return res.status(404).json({ mes: "user not found" });
    }
    return res.status(201).json({ mes: "upadte successfully" });
  })
  .delete(async (req, res) => {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ mes: "user not found" });
    }
    return res.json({ mes: "delete successfully" });
  });

// Port
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
