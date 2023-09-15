const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, b) => total + b.likes, 0);
};

const favouriteBlog = (blogs) => {
  return blogs.sort((a, b) => b.likes - a.likes)[0];
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
