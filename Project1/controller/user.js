const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allUsers = await User.find({});
  return res.json(allUsers);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ mes: "user not found" });
  }
  return res.json(user);
}

async function handleUpdateUserById(req, res) {
  const user = await User.findByIdAndUpdate(req.params.id, {
    last_name: "abrar",
  });
  if (!user) {
    return res.status(404).json({ mes: "user not found" });
  }
  return res.status(201).json({ mes: "upadte successfully" });
}

async function handleDeleteUserById(req, res) {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).json({ mes: "user not found" });
  }
  return res.json({ mes: "delete successfully" });
}

async function handleCreateNerUser(req, res) {
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
  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
  });
  return res.status(201).json({
    mes: "user created successfully",
    id: result._id,
  });
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNerUser
};
