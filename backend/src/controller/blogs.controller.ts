import express = require("express");
import { getConnection } from "typeorm";

import accessControl from "../utils/access-control";

import { Blog } from "../entity";

// @POST - /api/v1/blogs
// Create a Blog
export async function createBlog(req: express.Request, res: express.Response) {
  const permission = accessControl.can(res.locals.user.role).createAny("blog");

  if (!permission.granted)
    return res.status(403).json({ success: false, error: "Unauthorized" });

  // Validation result

  const { title, author, description } = req.body;

  // Save to database
  const blogRepository = getConnection().getRepository(Blog);
  const duplicateCheck = await blogRepository.findOne({ title });

  try {
    if (!duplicateCheck) {
      let imagePath;
      if (req.file) {
        imagePath = req.file.path;
      } else {
        imagePath = "";
      }

      const newBlog = new Blog();
      newBlog.title = title;
      newBlog.author = author;
      newBlog.description = description;
      newBlog.path = imagePath;

      await blogRepository.save(newBlog);
    } else {
      res.json({ success: false, error: "Blog already exists" });
      return;
    }
  } catch (err) {
    res.json({ success: false, error: err });
    return;
  }

  res.json({ success: true, message: "Blog created" });
}

// @GET - /api/v1/blogs/
// Get All Blogs
export async function getAllBlogs(req: express.Request, res: express.Response) {
  const blogRepository = getConnection().getRepository(Blog);

  const page = parseInt(<string>req.query.page);
  const perPage = parseInt(<string>req.query.perPage);

  const [blogs, blogCount] = await blogRepository.findAndCount({
    select: ["id", "title", "author", "description", "path"],
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
  const singleBlog = await blogRepository.findOne({ id });
  if (!singleBlog) {
    return res.status(400).json({ success: false, error: "Blog is not found" });
  }
  res.status(200).json({ data: singleBlog });
}

// @PUT - /api/v1/blogs/:blogId
// update a Blog
export async function updateSingleBlog(
  req: express.Request,
  res: express.Response
) {
  try {
    const permission = accessControl
      .can(res.locals.user.role)
      .updateAny("blog");

    if (!permission.granted)
      return res.status(403).json({ success: false, error: "Unauthorized" });

    const { title, author, description } = req.body;
    const blogRepository = getConnection().getRepository(Blog);
    try {
      let imagePath;
      if (req.file) {
        imagePath = req.file.path;
      }
      //  else {
      //   imagePath = "";
      // }
      const newBlog = new Blog();
      newBlog.title = title;
      newBlog.author = author;
      newBlog.description = description;
      if (imagePath) {
        newBlog.path = imagePath;
      }

      await blogRepository.update({ id: req.params.blogId }, newBlog);
    } catch (err) {
      res.json({
        success: false,
        error: "Title must be unique, or Blog can not be updated",
      });
    }
  } catch (error) {
    res.status(403).json({ success: false, error: "Internel error" });
    return;
  }
  res.status(200).json({ success: true, message: "Blog is now updated" });
}

// @DELETE - /api/v1/blogs/blogImage/:blogId
//delete blog image
export async function deleleBlogImage(
  req: express.Request,
  res: express.Response
) {
  const id = req.params.blogId;
  const blogRepository = getConnection().getRepository(Blog);

  try {
    const findBlogById = await blogRepository.findOne({ id });
    if (findBlogById && findBlogById.path) {
      findBlogById.path = "";
      blogRepository.save(findBlogById);
    }
    res.json({ success: true, message: "blogImage deleted" });
  } catch (err) {
    res.json({ success: false, error: "blog have no image" });
  }
}
// @DELETE - /api/v1/blogs/:blogId
// delete blog
export async function deleteBlog(req: express.Request, res: express.Response) {
  const id = req.params.blogId;
  const blogRepository = getConnection().getRepository(Blog);
  try {
    const permission = accessControl
      .can(res.locals.user.role)
      .deleteAny("blog");

    if (!permission.granted)
      return res.status(403).json({ success: false, error: "Unauthorized" });

    if (await blogRepository.delete({ id })) {
      return res.json({ success: true, message: "Delete successfully" });
    }
  } catch (err) {
    res.json({ success: false, error: "Blog is not identified" });
  }
}
