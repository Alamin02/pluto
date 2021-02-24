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
export async function userLogin(req: express.Request, res: express.Response) {
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
  }

  // Verifying the password
  const isPasswordMatch = bcrypt.compareSync(password, previousEntry.password);
  if (!isPasswordMatch) {
    return res
      .status(400)
      .json({ errors: [{ msg: "Email or password doesnot match" }] });
  }

  // Generating a token
  const token = jwt.sign({ email }, secret, { expiresIn: "1h" });

  res.json({ token });
}

// @POST - /api/v1/users/register
// User Registration
export async function userRegistration(
  req: express.Request,
  res: express.Response
) {
  //validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, phone } = req.body;

  // If there is an user
  const userRepository = getConnection().getRepository(User);
  const previousEntry = await userRepository.findOne({ email });
  if (previousEntry) throw Error('User already exists');

  // Hasn the password
  const hash = await bcrypt.hash(password, saltRounds);

  // Create a new user
  try {
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
}

// @GET - /api/v1/users/
// All users
export async function users(req: express.Request, res: express.Response) {
  const userRepository = getConnection().getRepository(User);
  const users = await userRepository.find({
    select: ["name", "email", "phone"],
  });

  res.json({ data: users });
}

export default router;
