const listHelper = require("../utils/list_helper");

describe("Test favourite blog", () => {
  const testBlogList = [
    {
      id: 1,
      likes: 1,
    },
    {
      id: 2,
      likes: 5,
    },
    {
      id: 3,
      likes: 10,
    },
  ];

  const testSingleList = [
    {
      id: 4,
      likes: 20,
    },
  ];

  const testEmptyList = [];

  test("Test with full bloglist", () => {
    const result = listHelper.favouriteBlog(testBlogList);
    expect(result).toEqual(testBlogList[0]);
  });

  test("Test with single item", () => {
    const result = listHelper.favouriteBlog(testSingleList);
    expect(result).toEqual(testSingleList[0]);
  });
  test("Test empty bloglist", () => {
    const result = listHelper.favouriteBlog(testEmptyList);
    expect(result).toBe(undefined);
  });
});
