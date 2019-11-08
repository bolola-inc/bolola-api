"use strict";

const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const routes = require("./routes");
const users = require("./routes/users");
const auth = require("./routes/auth");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", routes);
app.use("/users", users);
app.use("/auth", auth);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: (app.get("env") === "development") ? err : {}
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`started ${process.env.PORT || 3000}`);
});
