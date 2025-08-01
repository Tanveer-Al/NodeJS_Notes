const express = require("express");
const PORT = 4000;
const path = require("path");
const multer = require("multer");

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.render("homePage");
});

// single photo upload
app.post("/upload", upload.single("profileImage"), (req, res) => {
  return res.send("File uploaded successfully");
});

// multiple photo upload
// app.post("/upload", upload.fields([
//   { name: "profileImage" },
//   { name: "Image" }
// ]), (req, res) => {
//   const files = req.files;
//   if ((!files.profileImage || files.profileImage.length === 0) && (!files.Image || files.Image.length === 0)) {
//     return res.status(400).send("No files were uploaded.");
//   }
//   return res.send("Files uploaded successfully");
// });

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
