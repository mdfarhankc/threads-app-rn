import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import env from '../utils/ValidateEnv.js';

import User from "../models/users.js";
import SendVerificationEmail from '../utils/MailSender.js';

const secretKey = env.SECRET_KEY;

// Login
const LoginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "Email not registered!" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(404).json({ success: false, message: "Wrong Password!" });
        }

        const token = jwt.sign({ userId: user._id }, secretKey);

        res.status(200).json({ success: true, message: "Login Successful", token });
    } catch (error) {
        next(error);
    }
};

// Register
const RegisterController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        // check existing user
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email is already registered!" });
        }
        // hashing password
        const hashedPassword = await bcrypt.hash(password, 10);
        // create new uyser
        const newUser = new User({ username, email, password: hashedPassword });
        // generate verification token send to email
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");
        // save the user to database
        await newUser.save();
        // send the verification code to user
        SendVerificationEmail(newUser.email, newUser.verificationToken);

        res.status(200).json({ success: true, message: "Registration Successful. Please check your email for verification!" })

    } catch (error) {
        next(error);
    }
};

// Token verify
const TokenVerifyController = async (req, res, next) => {
    try {
        const token = req.params.token;

        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid Token" });
        }
        user.verified = true;
        user.verificationToken = undefined;
        await user.save();
        res.status(200).json({ success: true, message: "Email Verified Successfully!" });
    } catch (error) {
        next(error);
    }
};


// Get user profile
const UserProfileController = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, user });
    } catch (error) {
        next(error);
    }
};

// follow user
const FollowController = async (req, res, next) => {
    const { currentUserId, selectedUserId } = req.body;

    try {
        await User.findByIdAndUpdate(selectedUserId, {
            $push: { followers: currentUserId },
        });

        res.status(200).json({ success: true, message: "Followed User Successfully!" });
    } catch (error) {
        next(error);
    }
}

// unfollow user
const UnfollowController = async (req, res, next) => {
    const { loggedInUserId, targetUserId } = req.body;

    try {
        await User.findByIdAndUpdate(targetUserId, {
            $pull: { followers: loggedInUserId },
        });

        res.status(200).json({ success: true, message: "Unfollowed successfully" });
    } catch (error) {
        next(error);
    }
}
// Get current loggedin user
const GetUsersController = async (req, res, next) => {
    try {
        const loggedInUserId = req.params.userId;
        User.find({ _id: { $ne: loggedInUserId } })
            .then((users) => {
                res.status(200).json({ success: true, users });
            })
            .catch((error) => {
                console.log("Error: ", error);
                res.status(500).json({ success: false, message: "Error", error: error });
            });
    } catch (error) {
        next(error);
    }
}

export { LoginController, RegisterController, TokenVerifyController, UserProfileController, FollowController, UnfollowController, GetUsersController };