const express = require("express");
const app = express();
require("dotenv").config();
const ErrorResponse = require("./middleware/ErrorResponse");

app.use(express.json());
const user = require("./routes/user");
const post = require("./routes/post");
const connectDB = require("./db/index");
connectDB();

app.get("/", (req, res) => {
  res.json({ msg: "hello world" });
});

app.use("/user", user);
app.use("/posts", post);

app.use(ErrorResponse);


app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
