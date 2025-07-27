const express = require("express");

const urlRoute = require("./routes/url");
const staticsRoute = require("./routes/staticsRoutes");
const userRoute = require("./routes/user");

const cookieParser = require("cookie-parser");
const { databaseConnect } = require("./connect");
const URL = require("./models/model");
const path = require("path");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middleware/auth");
const PORT = 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

databaseConnect();

app.set("view engine", "ejs");
app.set("views", path.resolve("./view"));

app.use("/",checkAuth, staticsRoute);
app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/user", userRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (!entry) {
    return res.status(404).send("URL not found");
  }
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
