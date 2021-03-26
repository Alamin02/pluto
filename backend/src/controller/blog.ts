import express = require("express");
import { getConnection } from "typeorm";
import { validationResult } from "express-validator";
// import { AccessControl } from "accesscontrol";
import accessControl from "../utils/access-control";

import { Blog } from "../entity";

// const ac = new AccessControl();

// @POST - /api/v1/blogs
// Create a Blog
export async function createBlog(req: express.Request, res: express.Response) {
  const permission = accessControl.can(res.locals.user.role).createAny("blog");

  if (!permission.granted)
    return res.status(403).json({ errors: [{ msg: "not authorized" }] });

  // Validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, author, description } = req.body;

  // Save to database
  const blogRepository = getConnection().getRepository(Blog);
  const duplicateCheck = await blogRepository.findOne({ title });

  if (!duplicateCheck) {
    try {
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
    } catch (err) {
      res.json({ errors: err });
    }
  } else {
    res.json({ errors: [{ msg: "Blog already exists" }] });
  }

  res.json({ msg: "Blog created" });
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
  const singleblog = await blogRepository.findOne({ id });
  if (!singleblog) {
    return res.status(400).json({ msg: "Blog is not found" });
  }
  res.json({ data: singleblog });
}

// @PUT - /api/v1/blogs/:blogId
// update a Blog
export async function updateSingleBlog(
  req: express.Request,
  res: express.Response
) {
  const permission = accessControl.can(res.locals.user.role).updateAny("blog");

  if (!permission.granted)
    return res.status(403).json({ errors: [{ msg: "not authorized" }] });

  // Validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
      errors: [{ msg: "Title must be unique, or Blog can not be  updated" }],
    });
  }

  res.json({ msg: "Blog is now updated" });
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
    res.json({ msg: "blogImage deleted" });
  } catch (err) {
    res.json({ errors: [{ msg: "blog have no image" }] });
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
      return res.status(403).json({ errors: [{ msg: "not authorized" }] });

    if (await blogRepository.delete({ id })) {
      return res.json({ msg: "delete successfully" });
    }
  } catch (err) {
    res.json({ errors: [{ msg: "blog is not identified" }] });
  }
}
