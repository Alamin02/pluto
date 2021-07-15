import express = require("express");
import { getConnection } from "typeorm";
import { Image } from "../entity";
export async function getImage(req: express.Request, res: express.Response) {
  try {
    const imageRepository = getConnection().getRepository(Image);
    const images = await imageRepository.find();
    return res.status(200).json({ success: true, data: images });
  } catch (error) {
    console.log(error);
    return res.status(500).json("something went wrong");
  }
}
export async function createImage(req: express.Request, res: express.Response) {
  try {
    const imageRepository = getConnection().getRepository(Image);
    const file = req.file as Express.Multer.File;
    if (file) {
      const newImage = new Image();
      newImage.path = file.path;
      newImage.originalname = file.originalname;
      const saveImage = await imageRepository.save(newImage);
      return res
        .status(200)
        .json({ success: true, message: "Image created!", data: saveImage });
    } else {
      return res
        .status(400)
        .json({ success: false, error: "Image not found!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("something went wrong");
  }
}

export async function deleteImage(req: express.Request, res: express.Response) {
  try {
    const id = req.params.imageId;
    const imageRepository = getConnection().getRepository(Image);
    const imageFindById = await imageRepository.findOne({ id });
    if (imageFindById) {
      await imageRepository.delete(id);
      return res.status(200).json({ success: true, message: "Image deleted!" });
    } else {
      return res.status(400).json({ success: false, error: "Invalid imageId" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("something went wrong ");
  }
}
