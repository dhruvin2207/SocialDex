const express = require('express');
const { createProfile, getProfile } = require('../controllers/user.controller');
const { upload } = require('../../multer.config');
const { authMiddleware } = require('../middleware/auth.middleware');

const userRouter = express.Router();

userRouter.post('/create-profile', authMiddleware, upload.single("profileImage"), createProfile)
userRouter.get('/get-profile/:id', authMiddleware, getProfile)

module.exports = userRouter