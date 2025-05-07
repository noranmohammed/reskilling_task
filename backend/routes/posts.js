const express = require('express');
const { getAll, get, add, replace, remove,getByUserId } = require('../data/posts');
const { checkAuth } = require('../utils/auth');
const {isValidText,isValidDate} = require('../utils/validation');

const router = express.Router();

router.get('/', async (req, res, next) => {
    const page = parseInt(req.query.page) || 2;
    const limit = parseInt(req.query.limit) || 10;
  
    try {
      const { posts, currentPage, totalPages, totalPosts } = await getAll(page, limit);
      res.json({
        posts: posts,
        pagination: {
          currentPage: currentPage,
          totalPages: totalPages,
          totalPosts: totalPosts,
          limit: limit,
        },
      });
    } catch (error) {
      next(error);
    }
  });

router.get('/:id', async (req, res, next) => {
  try {
    const post = await get(req.params.id);
    res.json({ post: post });
  } catch (error) {
    next(error);
  }
});
router.get('/user/:userId', async (req, res, next) => {
    const userId = parseInt(req.params.userId);
  
    try {
      const userPosts = await getByUserId(userId);
      res.json({ posts: userPosts });
    } catch (error) {
      next(error);
    }
  });

router.use(checkAuth);

router.post('/', async (req, res, next) => {
  console.log(req.token);
  const data = req.body;

  let errors = {};

  

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'Adding the post failed due to validation errors.',
      errors,
    });
  }

  try {
    const newPost = await add(data);
    res.status(201).json({ message: 'post saved.', post: newPost });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  const data = req.body;
  const loggedInUserId = req.token.id;
  let errors = {};

  if (!isValidText(data.title)) {
    errors.title = 'Invalid title.';
  }

  if (!isValidText(data.description)) {
    errors.description = 'Invalid description.';
  }

  if (!isValidDate(data.date)) {
    errors.date = 'Invalid date.';
  }

//   if (!isValidImageUrl(data.image)) {
//     errors.image = 'Invalid image.';
//   }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'Updating the post failed due to validation errors.',
      errors,
    });
  }

  try {
    await replace(req.params.id, data, loggedInUserId);
    res.json({ message: 'post updated.', post: data });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: 'Post deleted.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;