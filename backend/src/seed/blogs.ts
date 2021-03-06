import { getConnection } from "typeorm";
import { Blog } from "../entity";

const blogList = [
  {
    title: "a",
    author: "b",
    description: "xyz"
  },
  {
    title: "c",
    author: "d",
    description: "xyz"
  }
];

export async function seedBlog() {
  const blogRepository = getConnection().getRepository(Blog);

  for (const blog of blogList) {
    const newBlog = new Blog();

    newBlog.title = blog.title;
    newBlog.author = blog.author;
    newBlog.description = blog.description;

    await blogRepository.save(newBlog);
  }
}