const express = require("express");
const app = express();
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const middleware = require("./utils/middleware");

const config = require("./utils/config");

app.use(express.json());

mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log("Connected"))
  .catch((error) => console.log("Something went wrong", error.message));

app.use("/api/blogs", blogsRouter);
app.use("/api/users", userRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
