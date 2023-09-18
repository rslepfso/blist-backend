const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Goal versus Everton",
    author: "Leandro Trossard",
    url: "goal.com/1",
    likes: 99,
  },
  {
    title: "Goal versus Man Utd",
    author: "Gabriel Jesus",
    url: "goal.com/2",
    likes: 98,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("fetch two blogs", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(2);
}, 100000);

test("check for id property", async () => {
  const blogs = await api.get("/api/blogs");
  const requestedBlog = blogs.body[0];

  const response = await api.get(`/api/blogs/${requestedBlog.id}`);
  expect(response.body.id).toBeDefined();
});

test("check if post created", async () => {
  const newBlog = {
    title: "Goal versus Man Utd",
    author: "Declan Rice",
    url: "goal.com/3",
    likes: 97,
  };

  await api.post("/api/blogs/").send(newBlog);

  const blogs = await api.get("/api/blogs");
  expect(blogs.body.length).toBe(initialBlogs.length + 1);
  const lastBlog = blogs.body[blogs.body.length - 1];
  expect(lastBlog).toEqual({ ...newBlog, id: lastBlog.id });
});

test("check for deletion", async () => {
  const blogs = await api.get("/api/blogs");
  const blogToDelete = blogs.body[0];

  const response = api.delete(`/api/blogs/${blogToDelete.id}`);

  expect(204);
}, 100000);

test("check for succesful update", async () => {
  const blogs = await api.get("/api/blogs");
  const blogToUpdate = blogs.body[0];

  const newBlog = {
    title: "Goal versus Everton",
    author: "Leandro Trossard",
    url: "goal.com/1",
    likes: 1,
  };

  const response = await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog);

  expect(response.body.likes).toBe(1);
});

afterAll(async () => {
  await mongoose.connection.close();
});
