import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const addBlogDataIndoDB = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  return result;
};

const getAllBlogDataFromDB = async () => {
  const result = await Blog.find();
  return result;
};

const deletedBlogIntoDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};
const updateBlogIntoDB = async (id: string, blogInfo: Partial<TBlog>) => {
  const result = await Blog.findByIdAndUpdate(id, { ...blogInfo });
  return result;
};
export const blogServices = {
 addBlogDataIndoDB,
 getAllBlogDataFromDB,
 deletedBlogIntoDB,
 updateBlogIntoDB
};
