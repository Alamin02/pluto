import express = require("express");
import bcrypt = require("bcrypt");
import { getConnection } from "typeorm";
require("dotenv").config();
import { User } from "../entity";

const saltRounds = 10;

// @POST - baseUrl/user/admin
export async function createUserAdmin(
  req: express.Request,
  res: express.Response
) {
  try {
    const { name, email, password, phone, role, addresses } = req.body;
    const hash = await bcrypt.hash(password, saltRounds);
    const userRepository = getConnection().getRepository(User);

    const findUserByEmail = await userRepository.findOne({ email });

    if (findUserByEmail) {
      res.status(400).json({
        success: false,
        error: "User already exists!",
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

      if (addresses) {
        newUser.addresses = addresses;
      }

      await userRepository.save(newUser);
    } catch (e) {
      console.error(e);
      return res
        .status(400)
        .json({ success: false, error: "New user could not be added" });
    }
    res.status(200).json({
      success: true,
      message: "New user added.",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      error: "Something went wrong!",
    });
  }
}

// @PUT - baseUrl/users/admin/:userId
export async function updateUserAdmin(
  req: express.Request,
  res: express.Response
) {
  try {
    const userId = req.params.userId;
    const { name, email, phone, role } = req.body;

    const userRepository = getConnection().getRepository(User);
    const findUserById = await userRepository.findOne({ id: userId });

    if (findUserById) {
      const newUser = new User();
      newUser.name = name;
      newUser.email = email;
      newUser.phone = phone;
      newUser.role = role;
      await userRepository.update(userId, newUser);
      res.status(200).json({ success: [{ msg: "User info updated" }] });
    } else {
      res.status(400).json({
        errors: [{ msg: "User not found!" }],
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      error: "Something went wrong!",
    });
  }
}
