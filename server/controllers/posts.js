import Post from '../models/posts.js';

// create new post
const CreatePostController = async (req, res, next) => {
    try {
        const { content, userId } = req.body;

        if (!content) {
            return res.status(400).json({ success: false, message: 'Content is required' });
        }

        const newPost = new Post({ content, user: userId });
        await newPost.save();

        res.status(200).json({ success: true, message: 'Post created successfully' });
    } catch (error) {
        next(error);
    }
};

// get all post
const GetAllPostsController = async (req, res, next) => {
    try {
        const posts = await Post.find().populate('user', 'name').sort({ createdAt: -1 });
        res.status(200).json({ success: true, posts });
    } catch (error) {
        next(error);
    }
};

// like a post
const LikePostController = async (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.params.userId; // Assuming you have a way to get the logged-in user's ID

    try {
        const post = await Post.findById(postId).populate("user", "name");

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $addToSet: { likes: userId } }, // Add user's ID to the likes array
            { new: true } // To return the updated post
        );

        if (!updatedPost) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }
        updatedPost.user = post.user;

        res.status(200).json({ success: true, updatedPost });
    } catch (error) {
        next(error);
    }
};

// unlike post
const UnlikePostController = async (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.params.userId;

    try {
        const post = await Post.findById(postId).populate("user", "name");

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $pull: { likes: userId } },
            { new: true }
        );

        updatedPost.user = post.user;

        if (!updatedPost) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        res.json({ success: true, updatedPost });
    } catch (error) {
        next(error);
    }
};


export { CreatePostController, GetAllPostsController, LikePostController, UnlikePostController };