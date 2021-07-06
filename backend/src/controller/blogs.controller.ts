import express = require("express");
import { getConnection } from "typeorm";

import accessControl from "../utils/access-control";

import { Blog } from "../entity";

// @POST - /api/v1/blogs
// Create a Blog
export async function createBlog(req: express.Request, res: express.Response) {
  try {
    const permission = accessControl
      .can(res.locals.user.role)
      .createAny("blog");

    if (!permission.granted)
      return res.status(403).json({ success: false, error: "Not authorized" });

    const { title, author, description } = req.body;

    // Save to database
    const blogRepository = getConnection().getRepository(Blog);
    const duplicate = await blogRepository.findOne({ title });

    if (!duplicate) {
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
      return res
        .status(201)
        .json({ success: true, message: "New blog added!" });
    } else {
      return res
        .status(400)
        .json({ success: false, error: "Blog title already exists" });
    }
  } catch (err) {
    return res.status(500).json("Something went wrong");
  }
}

// @GET - /api/v1/blogs/
// Get All Blogs
export async function getAllBlogs(req: express.Request, res: express.Response) {
  try {
    const blogRepository = getConnection().getRepository(Blog);

    const page = parseInt(<string>req.query.page);
    const perPage = parseInt(<string>req.query.perPage);

    const [blogs, blogCount] = await blogRepository.findAndCount({
      select: ["id", "title", "author", "description", "path"],
      take: page * perPage,
      skip: (page - 1) * perPage,
    });

    return res.status(200).json({
      success: true,
      data: {
        blogs,
        blogCount,
        currentPage: page,
        maxPages: Math.ceil(blogCount / perPage),
        perPage,
      },
    });
  } catch (error) {
    return res.status(500).json("Something went wrong ");
  }
}

// @GET - /api/v1/blogs/:blogId
//  Get a Blog
export async function getSingleBlog(
  req: express.Request,
  res: express.Response
) {
  try {
    const id = req.params.blogId;
    const blogRepository = getConnection().getRepository(Blog);
    const singleBlog = await blogRepository.findOne({ id });
    if (!singleBlog) {
      return res
        .status(400)
        .json({ success: false, error: "Blog is not found" });
    }
    return res.status(200).json({ success: true, data: singleBlog });
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
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
      return res.status(403).json({ success: false, error: "Not authorized" });

    const { title, author, description } = req.body;
    const blogId = req.params.blogId;
    const blogRepository = getConnection().getRepository(Blog);
    const blogCheck = await blogRepository.findOne({ id: blogId });
    const duplicate = await blogRepository.findOne({ title });

    if (blogCheck) {
      if (duplicate && duplicate.id !== blogId) {
        return res
          .status(400)
          .json({ success: false, error: "Blog title already exists" });
      }
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

      await blogRepository.update({ id: blogId }, newBlog);
      return res
        .status(200)
        .json({ success: true, message: "Blog is now updated" });
    } else {
      return res
        .status(400)
        .json({ success: false, error: "Invalid blogId or blog deleted" });
    }
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
}

// @DELETE - /api/v1/blogs/blogImage/:blogId
//delete blog image
export async function deleleBlogImage(
  req: express.Request,
  res: express.Response
) {
  try {
    const id = req.params.blogId;
    const blogRepository = getConnection().getRepository(Blog);

    const findBlogById = await blogRepository.findOne({ id });
    if (findBlogById && findBlogById.path) {
      findBlogById.path = "";
      blogRepository.save(findBlogById);
    }
    return res
      .status(200)
      .json({ success: true, message: "blogImage deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "blog have no image" });
  }
}
// @DELETE - /api/v1/blogs/:blogId
// delete blog
export async function deleteBlog(req: express.Request, res: express.Response) {
  try {
    const permission = accessControl
      .can(res.locals.user.role)
      .deleteAny("blog");

    if (!permission.granted)
      return res.status(403).json({ success: false, error: "Not authorized" });

    const blogId = req.params.blogId;
    const blogRepository = getConnection().getRepository(Blog);
    const blogCheck = await blogRepository.findOne({ id: blogId });

    if (blogCheck) {
      await blogRepository.delete({ id: blogId });
      return res
        .status(200)
        .json({ success: true, message: "Delete successfully" });
    } else {
      return res.status(400).json({
        success: false,
        error: "Invalid blogId or blog already deleted",
      });
    }
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
}
