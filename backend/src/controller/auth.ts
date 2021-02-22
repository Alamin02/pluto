import express = require("express");
const router = express.Router();
import bcrypt = require("bcrypt");
import jwt = require("jsonwebtoken");
import { getConnection } from "typeorm";
import { validationResult } from "express-validator";

import { User } from "../entity";

const secret = process.env.JWT_SECRET || "";
const saltRounds = 10;

// @POST - /api/v1/users/login
// User Login
module.exports.userLogin = async (
  req: express.Request,
  res: express.Response
) => {

  // Validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  // Find the user
  const userRepository = getConnection().getRepository(User);
  const previousEntry = await userRepository.findOne({ email });
  if (!previousEntry) {
    return res
      .status(400)
      .json({ errors: [{ msg: "Email or password doesnot match" }] });
  };

  // Verifying the password
  const isPasswordMatch = bcrypt.compareSync(password, previousEntry.password);
  if (!isPasswordMatch) {
    return res
      .status(400)
      .json({ errors: [{ msg: "Email or password doesnot match" }] });
  };

  // Generating a token
  const token = jwt.sign({ email }, "secret", { expiresIn: "1h" });

  res.json({ token });
};

// @POST - /api/v1/users/register
// User Registration
module.exports.userRegistration = async (
  req: express.Request,
  res: express.Response
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, phone } = req.body;

  const hash = await bcrypt.hash(password, saltRounds);

  // Create a new user
  try {
    const userRepository = getConnection().getRepository(User);
    const newUser = new User();

    newUser.name = name;
    newUser.email = email;
    newUser.phone = phone;
    newUser.password = hash;

    await userRepository.save(newUser);
  } catch (e) {
    res.status(400).json({ error: "Something went wrong" });
    return;
  }

  res.json({ msg: "Create new user!" });
};

// @GET - /api/v1/users/
// All users
module.exports.users = async (req: express.Request, res: express.Response) => {
  const userRepository = getConnection().getRepository(User);
  const users = await userRepository.find({
    select: ["name", "email", "phone"],
  });

  res.json({ data: users });
};

export default router;