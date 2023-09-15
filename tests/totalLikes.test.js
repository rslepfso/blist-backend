const listHelper = require("../utils/list_helper");

describe("Total likes tests", () => {
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
    const result = listHelper.totalLikes(testBlogList);
    expect(result).toBe(16);
  });

  test("Test with single item", () => {
    const result = listHelper.totalLikes(testSingleList);
    expect(result).toBe(20);
  });
  test("Test empty bloglist", () => {
    const result = listHelper.totalLikes(testEmptyList);
    expect(result).toBe(0);
  });
});
