const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

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
  res.send(html);
});
app.post("/api/users/signup", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
});

// find one user
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    //edit user with id
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    //delete  user with id
    return res.json({ status: "sucess" });
  });

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`server is running on PORT: ${PORT}`);
});
