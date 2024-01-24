const express = require('express');
const { authRouter } = require('./auth.routes');
const { postRouter } = require('./post.routes');
const { commentsRouter } = require('./comments.routes');
const { likeRouter } = require('./like.route');
const userRouter = require('./user.routes');

const rootRouter = express.Router();

rootRouter.use('/auth', authRouter)
rootRouter.use('/posts', postRouter)
rootRouter.use('/comments', commentsRouter)
rootRouter.use('/likes', likeRouter)
rootRouter.use('/profile', userRouter)

module.exports = { rootRouter }