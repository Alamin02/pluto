import express = require("express");
import { getConnection } from "typeorm";
import { UserImage, User } from "../entity";

// @POST //v1/api/profile/photo
// create user image
export async function createUserImage(
  req: express.Request,
  res: express.Response
) {
  const id = req.body.userId;
  console.log(id);
  const usersRepository = getConnection().getRepository(User);
  const user = await usersRepository.findOne({ id });
  const userImageRepository = getConnection().getRepository(UserImage);

  const createUserImage = [];
  const files = req.files as Express.Multer.File[];
  console.log(files);

  if (files.length && user) {
    for (let i = 0; i < files.length; i++) {
      const userImage = new UserImage();
      userImage.path = files[i].path;
      userImage.originalname = files[i].originalname;
      userImage.user = user;

      const savedUserImage = await userImageRepository.save(userImage);
      createUserImage.push(savedUserImage);
    }

    res.json({ msg: "Image added", data: createUserImage });
  } else {
    return res.status(400).json({ errors: [{ msg: "Image not found" }] });
  }
}
