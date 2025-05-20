import { model, Schema } from 'mongoose';
import { TBlog } from './blog.interface';

const BlogSchema = new Schema<TBlog>(
  {
    title: { type: String, required: true },

    short_description: { type: String, required: true },
    long_description: { type: String, required: true },
    image: { type: String, required: true },
    author: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      image: { type: String, required: true },
    },
  },
  
);

export const Blog = model<TBlog>('Blog', BlogSchema);
