import express = require("express");
const router = express.Router();
import bcrypt = require("bcrypt");
import jwt = require("jsonwebtoken");
import { getConnection } from "typeorm";
import { validationResult } from "express-validator";
require("dotenv").config();

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
      .json({ errors: [{ msg: "Email or password does not match" }] });
  }

  // Verifying the password
  const isPasswordMatch = bcrypt.compareSync(password, previousEntry.password);
  if (!isPasswordMatch) {
    return res
      .status(400)
      .json({ errors: [{ msg: "Email or password does not match" }] });
  }

  // Generating a token
  const token = jwt.sign({ email }, secret, { expiresIn: "10h" });

  res.json({ token });
}

// @POST - /api/v1/users/register
// User Registration
export async function userRegistration(
  req: express.Request,
  res: express.Response
) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { name, email, password, phone, role } = req.body;
  const hash = await bcrypt.hash(password, saltRounds);

  // If there is a user
  const userRepository = getConnection().getRepository(User);
  const previousEntry = await userRepository.findOne({ email });
  if (previousEntry) {
    res.json({
      errors: [{ msg: "User already exists" }],
    });
  }

  // Create a new user
  try {
    const userRepository = getConnection().getRepository(User);
    const newUser = new User();

    newUser.name = name;
    newUser.email = email;
    newUser.phone = phone;
    newUser.role = role;
    newUser.password = hash;

    await userRepository.save(newUser);
  } catch (e) {
    console.error(e);

    res.status(400).json({ errors: [{ msg: "User could not be created" }] });
    return;
  }

  res.json({ success: [{ msg: "New user has been created!" }] });
}

// @GET - /api/v1/users/
// All users
export async function users(req: express.Request, res: express.Response) {
  const userRepository = getConnection().getRepository(User);
  const users = await userRepository.find({
    select: ["id", "name", "email", "phone", "role"],
  });

  res.json({ data: users });
}

// @PUT /v1/api/users/:userId
// update an user
export async function updateUser(req: express.Request, res: express.Response) {
  const userId = req.params.userId;
  const { name, email, phone, role } = req.body;

  const userRepository = getConnection().getRepository(User);
  const userToUpdate = await userRepository.findOne({ id: userId });
  if (userToUpdate) {
    try {
      const newUser = new User();
      newUser.name = name;
      newUser.email = email;
      newUser.phone = phone;
      newUser.role = role;
      await userRepository.update(userId, newUser);
      res.status(200).json({ success: [{ msg: "User info updated" }] });
    } catch (e) {
      res
        .status(400)
        .json({ errors: [{ msg: "User info could not be updated" }] });
    }
  } else {
    res.status(400).json({
      errors: [{ msg: "User not found or invalid url parameter(userId)" }],
    });
  }
}

// @DELETE /v1/ap/users/:userId
// delete an user
export async function deleteUser(req: express.Request, res: express.Response) {
  const userId = req.params.userId;

  const userRepository = getConnection().getRepository(User);
  const userToDelete = await userRepository.findOne({ id: userId });

  if (userToDelete) {
    try {
      await userRepository.delete(userId);
      res.json({ data: "User deleted" });
    } catch (e) {
      res.status(400).json({ errors: [{ msg: "User could not be deleted" }] });
    }
  } else {
    res.status(400).json({
      errors: [
        { msg: "User could not be deleted or invalid url parameter(userId)" },
      ],
    });
  }
}

export default router;
