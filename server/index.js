import 'dotenv/config.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';

import env from './utils/ValidateEnv.js';
import UserRouter from './routes/users.js';
import PostRouter from './routes/posts.js';
import ErrorMiddleware from './middlewares/ErrorMiddleware.js';

const app = express();
const port = env.PORT | 8000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

mongoose.connect(env.MONGO_CONNECTION_STRING, {
}).then(() => {
    console.log("Connected to MongoDB!");
}).catch((error) => {
    console.error("Error Connecting", error);
});

// auth routes
app.use('/api/users', UserRouter);
app.use('/api', PostRouter);

// errors will be sent to this middleware
app.use(ErrorMiddleware);

app.listen(port, () => {
    console.log("The server is running on ", port);
});
