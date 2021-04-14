import express = require("express");
const router = express.Router();
import bcrypt = require("bcrypt");
import jwt = require("jsonwebtoken");
import { getConnection } from "typeorm";
import { validationResult } from "express-validator";
require("dotenv").config();
import { Address, User, UserImage } from "../entity";

const secret = process.env.JWT_SECRET || "";
const saltRounds = 10;

// @GET - /api/v1/users/
// Get all users
export async function getUsers(req: express.Request, res: express.Response) {
  const userRepository = getConnection().getRepository(User);
  const users = await userRepository.find({
    select: ["id", "name", "email", "phone", "role"],
    relations: ["addresses", "image"],
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
    relations: ["addresses", "image"],
    where: [{ id: id }],
  });

  if (!findUserById) {
    return res.status(400).json({ errors: [{ msg: "User not found" }] });
  }

  res.json({ msg: "User found", data: findUserById });
}

// @PUT /v1/api/users/:userId
// update an user
export async function updateUserFrontend(
  req: express.Request,
  res: express.Response
) {
  const userId = req.params.userId;
  const { name, email, phone, address } = req.body;

  const userRepository = getConnection().getRepository(User);
  const userAddressRepository = getConnection().getRepository(Address);
  const userToUpdate = await userRepository.findOne({ id: userId });
  if (userToUpdate) {
    try {
      const newAddress: any = [];
      const newUser = new User();
      newUser.name = name;
      newUser.email = email;
      newUser.phone = phone;
      if (address) {
        const userAddress = new Address();
        userAddress.division = address;
        userAddress.district = address;
        userAddress.city = address;
        userAddress.user = userToUpdate;
        const saveUserAddress = await userAddressRepository.save(userAddress);
        newAddress.push(saveUserAddress);
        newUser.addresses = newAddress;
        await userRepository.update(userId, newUser);
        return res
          .status(200)
          .json({ success: [{ msg: "User info updated" }], data: newUser });
      } else {
        await userRepository.update(userId, newUser);
        const token = jwt.sign({ email }, secret, { expiresIn: "10h" });
        return res
          .status(200)
          .json({ msg: "Address not found", data: newUser, token: token });
      }
    } catch (e) {
      console.log(e);
      return res
        .status(400)
        .json({ errors: [{ msg: "User info could not be updated" }] });
    }
  } else {
    return res.status(400).json({
      errors: [{ msg: "User not found or invalid url parameter(userId)" }],
    });
  }
}

// @PUT /v1/api/users/:userId
// update an user
export async function updateUserAdminPanel(
  req: express.Request,
  res: express.Response
) {
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

// update user password
export async function updateUserPassword(
  req: express.Request,
  res: express.Response
) {
  const userId = req.params.userId;
  const { password, newPassword } = req.body;
  const hashPassword = await bcrypt.hash(newPassword, saltRounds);
  const userRepository = getConnection().getRepository(User);
  const currentUser = await userRepository.findOne({ id: userId });
  if (currentUser) {
    const isPasswordMatch = bcrypt.compareSync(password, currentUser.password);
    if (isPasswordMatch) {
      try {
        const newUser = new User();
        newUser.password = hashPassword;
        await userRepository.update(userId, newUser);
        return res.json({ info: "successfully updated" });
      } catch (e) {
        return res.json({
          errors: [
            { msg: "The password you enter doesn't match with the older one" },
          ],
        });
      }
    }
    return res.json({ error: "password does not match" });
  } else {
    return res.status(400).json({ errors: "User does not exist" });
  }
}

export default router;
