const listHeler = require("../utils/list_helper");

test("Dummy returns 1", () => {
  const blogs = [];
  const result = listHeler.dummy(blogs);

  expect(result).toBe(1);
});
