import express = require("express");
const router = express.Router();
import bcrypt = require("bcrypt");
import jwt = require("jsonwebtoken");
import { getConnection } from "typeorm";
import { validationResult } from "express-validator";
require("dotenv").config();

import { User } from "../entity";

// @GET - /api/v1/users/
// Get all users
export async function getUsers(req: express.Request, res: express.Response) {
  const userRepository = getConnection().getRepository(User);
  const users = await userRepository.find({
    select: ["id", "name", "email", "phone", "role"],
    relations: ["addresses"],
  });

  res.json({ data: users });
}

// @GET - /api/v1/user
// Get an user
export async function getUser(req: express.Request, res: express.Response) {
  const id = req.params.userId;

  const userRepository = getConnection().getRepository(User);
  const findUserById = await userRepository.findOne({
    select: ["id", "name", "email", "phone", "role"],
    relations: ["addresses"],
    where: [{ id: id }],
  });

  if (!findUserById) {
    return res.status(400).json({ errors: [{ msg: "User not found" }] });
  }

  res.json({ msg: "User found", data: findUserById });
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
