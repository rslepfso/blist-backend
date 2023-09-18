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

afterAll(async () => {
  await mongoose.connection.close();
});
