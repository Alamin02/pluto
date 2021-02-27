import express = require("express");
import { getConnection } from "typeorm";
import { validationResult } from "express-validator";
import { Blog } from "../entity";


// @POST - /api/v1/blogs
// Create a Blog
export async function createBlog(req: express.Request,res: express.Response) {
  // Validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, author, description } = req.body;
  
  try{
  // Save to database
  const BlogsRepository = getConnection().getRepository(Blog);
  const newBlog = new Blog();

  newBlog.title = title;
  newBlog.author = author;
  newBlog.description = description;

  await BlogsRepository.save(newBlog)

  }catch(err){
   res.json({ error: err})
    return;
  }
  res.json({ msg: "Blog created" });
  
}


// @GET - /api/v1/blogs/
// Get All Blogs
export async function getAllBlogs(req: express.Request, res: express.Response) {
  const BlogsRepository = getConnection().getRepository(Blog);
  const blogs = await BlogsRepository.find({
    select: ["id","title", "author", "description"],
  });

  res.json({ data: blogs});
}


// @GET - /api/v1/blogs/
//  Get a Blog
export async function getSingleBlog(req: express.Request, res: express.Response) {
  const id = req.params.blogId
  const blogsRepository = getConnection().getRepository(Blog);
  const singleblog = await blogsRepository.findOne({id});
  if(!singleblog){
    return res.status(400).json({msg:"Blog is not found"})
  }
  res.json({ data: singleblog});
}
 

// @PUT - /api/v1/blogs/:blogId
// update a Blog
export async function updateSingleBlog(req: express.Request, res: express.Response) {

    try {
      const { title, author, description } = req.body;
      const blogsRepository = getConnection().getRepository(Blog);
      const newBlog = new Blog();
      newBlog.title =title;
      newBlog.author =author;
      newBlog.description =description;

      await blogsRepository.update(
        { id: req.params.blogId },
        newBlog,
      );
      
    } catch(err) {
      res.json({err:'Blog is not updated'});
    }
    res.json({msg:'Blog is now updated'})
  }


// // @DELETE - /api/v1/blogs/:blogId
// // update blog
export async function deletedBlog(req: express.Request, res: express.Response){
    const id=req.params.blogId;
    const blogsRepository= getConnection().getRepository(Blog)
    try{    
        if(await blogsRepository.delete({id})){
            return res.json({msg:'delete successfully'})
        }
    }catch(err){
        res.json({error:'deleted blog is not identified'})
    }
   
}
  



