const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("signup", { error: "User already exists with this email" });
    }
    const NewUser = await User.create({
      name,
      email,
      password,
    });
    if (!NewUser) {
      return res.render("signup", { error: "Signup failed. Please try again." });
    }
    console.log("Signup Successfully");
    return res.redirect("/login");
  } catch (err) {
    console.error("Signup error:", err);
    return res.render("signup", { error: "Internal server error" });
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.render("login", {
        error: "Invalid Email OR Password",
      });
    }
    console.log("Login successfully");
    const token = setUser(user);
    res.cookie("token", token);
    res.redirect("/");
  } catch (err) {
    console.error("Login error:", err);
    return res.render("login", { error: "Internal server error" });
  }
}

module.exports = { handleUserSignup, handleUserLogin };
