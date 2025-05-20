import { model, Schema } from 'mongoose';
import { TBlog } from './blog.interface';

const BlogSchema = new Schema<TBlog>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
});

export const Blog = model<TBlog>('Blog', BlogSchema);
