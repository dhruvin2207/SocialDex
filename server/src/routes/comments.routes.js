const express = require('express');
const { createComment } = require('../controllers/comment.controller');
const { authMiddleware } = require('../middleware/auth.middleware');


const commentsRouter = express.Router();

commentsRouter.post('/:id/comment', authMiddleware, createComment)

module.exports = {
    commentsRouter
}