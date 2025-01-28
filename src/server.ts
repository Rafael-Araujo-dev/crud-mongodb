import express, { Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.routes';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

console.log("trying to connect to MongoDB...");
mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => {
        console.log('MongoDB connected successfully');
        app.listen(PORT, () => console.log(`server running on port ${PORT}`));
    })
    .catch(() => console.log('Error connecting to MongoDB database'));

app.route('/').get(({}, response: Response) => {
    response.status(200).json('OK');
});

app.use('/api/posts', postRoutes);