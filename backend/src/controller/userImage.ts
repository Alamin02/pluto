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

    res.json({ msg: "Image added", data: savedUserImage });
  } else {
    return res.status(400).json({ errors: [{ msg: "Image not found" }] });
  }
}
