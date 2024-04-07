import express from 'express';

import { CreatePostController, GetAllPostsController, LikePostController, UnlikePostController } from '../controllers/posts.js';

const route = express.Router();

route.get('/posts', GetAllPostsController);
route.post('/create-post', CreatePostController);
route.post('/posts/:postId/:userId/like', LikePostController);
route.post('/posts/:postId/:userId/unlike', UnlikePostController);

export default route;