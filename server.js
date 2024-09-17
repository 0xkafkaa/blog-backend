const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());
const user = require("./routes/user");
const connectDB = require("./db/index");
connectDB();

app.get("/", (req, res) => {
  res.json({ msg: "hello world" });
});

app.use("/user", user);

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
