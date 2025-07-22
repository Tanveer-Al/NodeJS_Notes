const express = require("express");
const PORT = 8000;
const route = require("./routes/url");
const { databaseConnect } = require("./connect");
const URL = require("./models/model");

const app = express();

app.use(express.json());

databaseConnect();

app.use("/api", route);

app.get("/:shortId", async (req, res) => {
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
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
