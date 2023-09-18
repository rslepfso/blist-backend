const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

// Get all
blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((result) => response.json(result));
});

// Post
blogsRouter.post("/", (request, response, next) => {
  const body = request.body;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  blog
    .save()
    .then((result) => response.status(201).json(result))
    .catch((error) => next(error));
});

// Get single
blogsRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
