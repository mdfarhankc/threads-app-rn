import express from 'express';

import { FollowController, GetUsersController, LoginController, RegisterController, TokenVerifyController, UnfollowController, UserProfileController } from '../controllers/users.js';

const route = express.Router();

// auth
route.post('/login', LoginController);
route.post('/register', RegisterController);
route.post('/verify/:token', TokenVerifyController);
// users
route.get('/user/:userId', GetUsersController);
route.get('/profile/:userId', UserProfileController);
route.post('/follow', FollowController);
route.post('/unfollow', UnfollowController);

export default route;