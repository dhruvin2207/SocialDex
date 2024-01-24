const express = require('express');
const { likePost, likeComment } = require('../controllers/like.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

const likeRouter = express.Router();

likeRouter.get('/like-post/:id', authMiddleware, likePost)
likeRouter.get('/like-comment/:id', authMiddleware, likeComment)


module.exports = {
    likeRouter
}