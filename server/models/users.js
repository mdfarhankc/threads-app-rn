import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    profilePic: { type: String },
    joinedDate: { type: Date, default: Date.now() },
    sendFollowRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    receiveFollowRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    verified: { type: Boolean, default: false },
    verificationToken: { type: String },
});

const User = mongoose.model('User', userSchema);
export default User;