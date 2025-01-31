import { Schema, model, Document } from 'mongoose';

interface IPost extends Document {
    slug: string;
    title: string;
    content: string;
}

const postSchema = new Schema<IPost>({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
}, { timestamps: true });

export default model<IPost>('Post', postSchema);