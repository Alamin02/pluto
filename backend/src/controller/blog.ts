import express = require('express');
import { getConnection } from 'typeorm';
import { validationResult } from 'express-validator';
import { Blog } from '../entity';

// @POST - /api/v1/blogs
// Create a Blog
export async function createBlog(req: express.Request, res: express.Response) {
  // Validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, author, description } = req.body;

  try {
    // Save to database
    const blogRepository = getConnection().getRepository(Blog);
    const newBlog = new Blog();

    newBlog.title = title;
    newBlog.author = author;
    newBlog.description = description;

    await blogRepository.save(newBlog);
  } catch (err) {
    res.json({ errors: 'Blog could not be added' });
    return;
  }
  res.json({ msg: 'Blog created' });
}

// @GET - /api/v1/blogs/
// Get All Blogs
export async function getAllBlogs(req: express.Request, res: express.Response) {
  const blogRepository = getConnection().getRepository(Blog);

  const page = parseInt(<string>req.query.page);
  const perPage = parseInt(<string>req.query.perPage);

  const [blogs, blogCount] = await blogRepository.findAndCount({
    select: ['id', 'title', 'author', 'description'],
    take: page * perPage,
    skip: (page - 1) * perPage,
  });

  res.json({
    data: {
      blogs,
      blogCount,
      currentPage: page,
      maxPages: Math.ceil(blogCount / perPage),
      perPage,
    },
  });
}

// @GET - /api/v1/blogs/:blogId
//  Get a Blog
export async function getSingleBlog(
  req: express.Request,
  res: express.Response
) {
  const id = req.params.blogId;
  const blogRepository = getConnection().getRepository(Blog);
  const singleblog = await blogRepository.findOne({ id });
  if (!singleblog) {
    return res.status(400).json({ msg: 'Blog is not found' });
  }
  res.json({ data: singleblog });
}

// @PUT - /api/v1/blogs/:blogId
// update a Blog
export async function updateSingleBlog(
  req: express.Request,
  res: express.Response
) {
  try {
    const { title, author, description } = req.body;
    const blogRepository = getConnection().getRepository(Blog);
    const newBlog = new Blog();
    newBlog.title = title;
    newBlog.author = author;
    newBlog.description = description;

    await blogRepository.update({ id: req.params.blogId }, newBlog);
  } catch (err) {
    res.json({ errors: 'Blog is not updated' });
  }
  res.json({ msg: 'Blog is now updated' });
}

// @DELETE - /api/v1/blogs/:blogId
// delete blog
export async function deleteBlog(req: express.Request, res: express.Response) {
  const id = req.params.blogId;
  const blogRepository = getConnection().getRepository(Blog);
  try {
    if (await blogRepository.delete({ id })) {
      return res.json({ msg: 'delete successfully' });
    }
  } catch (err) {
    res.json({ errors: 'blog is not identified' });
  }
}
