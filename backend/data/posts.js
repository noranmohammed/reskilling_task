const { NotFoundError } = require('../utils/errors');
const { readPostsData, writePostData } = require('./util');

async function getAll(page = 5, limit = 5) {
    const storedData = await readPostsData();
    if (!storedData || storedData.length === 0) {
      throw new NotFoundError('Could not find any posts.');
    }
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedPosts = storedData.slice(startIndex, endIndex);
  
    return {
      posts: paginatedPosts,
      currentPage: page,
      totalPages: Math.ceil(storedData.length / limit),
      totalPosts: storedData.length,
    };
  }

async function get(id) {
  const storedData = await readPostsData();
  if (!storedData.length === 0) {
    throw new NotFoundError('Could not find any posts.');
  }

  const post = storedData.find((post) => post.id === parseInt(id));
  if (!post) {
    throw new NotFoundError('Could not find post for id ' + id);
  }

  return post;
}

async function getByUserId(userId) {
    const storedData = await readPostsData();
    if (!storedData || storedData.length === 0) {
      throw new NotFoundError('Could not find any posts.');
    }
  
    const userPosts = storedData.filter((post) => post.userId === userId);
    if (userPosts.length === 0) {
      throw new NotFoundError('Could not find posts for user ID ' + userId);
    }
  
    return userPosts;
  }

async function add(data, loggedInUserId) {
    const storedData = await readPostsData();
    const postId = storedData.length > 0
      ? Math.max(...storedData.map(post => post.id)) + 1
      : 1;
    storedData.unshift({ ...data, id: postId, userId: loggedInUserId });
    await writePostData(storedData);
    return { id: postId, userId: loggedInUserId, ...data };
  }

  async function replace(id, data, loggedInUserId) {
    const storedData = await readPostsData();
    if (!storedData || storedData.length === 0) {
      throw new NotFoundError('Could not find any posts.');
    }
  
    const index = storedData.findIndex((post) => post.id === id);
    if (index < 0) {
      throw new NotFoundError('Could not find post for id ' + id);
    }
    if (storedData[index].userId !== loggedInUserId) {
      throw new Error('You are not authorized to edit this post.');
    }
    storedData[index] = { ...storedData[index], ...data, id: storedData[index].id, userId: storedData[index].userId };
    await writePostData(storedData);
  }

async function remove(id) {
  const storedData = await readPostsData();
  const updatedData = storedData.filter((post) => post.id !== id);
  await writePostData({ updatedData });
}

exports.getAll = getAll;
exports.get = get;
exports.getByUserId = getByUserId;
exports.add = add;
exports.replace = replace;
exports.remove = remove;