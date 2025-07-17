const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const { type } = require("os");

const app = express();

//middleware
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("home page");
});

// REST API
// All users details
app.get("/api/users", (req, res) => {
  res.json(users);
});

// All Users name
app.get("/users", (req, res) => {
  const html = `<ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>`;
  res.status(200).send(html);
});
app.post("/api/users/signup", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "success", id: users.length });
  });
});

// find one user
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
      res.status(404).send({ req: "bad request" });
    }
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const body = req.body;
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
    users[userIndex] = { ...users[userIndex], ...body };
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "error", message: "Failed to update user" });
      }
      return res.json({ status: "success", user: users[userIndex] });
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
    users.splice(userIndex, 1);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "error", message: "Failed to delete user" });
      }
      return res.json({ status: "success", message: "User deleted" });
    });
  });

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`server is running on PORT: ${PORT}`);
});
