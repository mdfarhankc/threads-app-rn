import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    content: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likes: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    replies: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        content: { type: String },
        createdAt: { type: Date, default: Date.now() },
    }],
    createdAt: { type: Date, default: Date.now() },
});

const Post = mongoose.model("Post", postSchema);
export default Post;