const express = require("express");
const { connectMongoDB } = require("./connection");
const userRouter = require("./routes/user");
const { logReqRes } = require("./middleware/index");

const app = express();

// Port
const PORT = 8000;

//connection
connectMongoDB();

//middleware plugin
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

//Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
