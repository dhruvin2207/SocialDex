const express = require('express');
const { authRouter } = require('./auth.routes');
const { postRouter } = require('./post.routes');
const { commentsRouter } = require('./comments.routes');
const { likeRouter } = require('./like.route');

const rootRouter = express.Router();

rootRouter.use('/auth', authRouter)
rootRouter.use('/posts', postRouter)
rootRouter.use('/comments', commentsRouter)
rootRouter.use('/likes', likeRouter)

module.exports = { rootRouter }