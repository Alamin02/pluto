import express = require("express");
import { getConnection } from "typeorm";
import { UserImage, User } from "../entity";

// @POST //v1/api/profile/photo
// create user image
export async function createUserImage(
  req: express.Request,
  res: express.Response
) {
  const { id } = res.locals.user;
  try {
    const usersRepository = getConnection().getRepository(User);
    const user = await usersRepository.findOneOrFail({ id });
    const userImageRepository = getConnection().getRepository(UserImage);

    const file = req.file as Express.Multer.File;

    if (file) {
      const userImage = new UserImage();
      userImage.path = file.path;
      userImage.originalname = file.originalname;
      userImage.user = user;

      const savedUserImage = await userImageRepository.save(userImage);

      return res.status(200).json({ success: true, data: savedUserImage });
    } else {
      return res.status(400).json({ success: false, error: "Image not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something went wrong");
  }
}
export async function getUseeImages(
  req: express.Request,
  res: express.Response
) {
  const userImageRepository=getConnection().getRepository(UserImage)
  const finAll = await userImageRepository.find();
  res.status(200).json(finAll)
}