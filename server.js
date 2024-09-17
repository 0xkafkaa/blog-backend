const express = require("express");
const app = express();

require("dotenv").config();

app.get("/", (req, res) => {
  res.json({ msg: "hello world" });
});

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
