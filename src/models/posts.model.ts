import { Schema, model, Document } from 'mongoose';

interface IPost extends Document {
    title: string;
    body: string;
}

const postSchema = new Schema<IPost>({
    title: { type: String, required: true },
    body: { type: String, required: true }
});

export default model<IPost>('Post', postSchema);