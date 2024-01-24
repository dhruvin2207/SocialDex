const express = require('express');
const { createPost, getPosts } = require('../controllers/post.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

const postRouter = express.Router();

postRouter.post('/create-post', authMiddleware, createPost)
postRouter.get('/all-posts', authMiddleware, getPosts)

module.exports = { postRouter }