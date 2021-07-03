import express = require("express");
const router = express.Router();
import bcrypt = require("bcrypt");
import { getConnection } from "typeorm";
require("dotenv").config();
import { User } from "../entity";

const saltRounds = 10;

// @GET - baseUrl/users
export async function getUsers(req: express.Request, res: express.Response) {
  try {
    const userRepository = getConnection().getRepository(User);
    const users = await userRepository.find({
      select: ["id", "name", "email", "phone", "role"],
      relations: ["addresses", "image"],
    });

    res.json({ success: true, data: users });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      error: "Something went wrong!",
    });
  }
}

// @GET - baseUrl/user
export async function getUser(req: express.Request, res: express.Response) {
  const id = req.params.userId;

  try {
    const userRepository = getConnection().getRepository(User);
    const findUserById = await userRepository.findOne({
      select: ["id", "name", "email", "phone", "role"],
      relations: ["addresses", "image"],
      where: [{ id: id }],
    });

    if (!findUserById) {
      return res.status(400).json({
        success: false,
        error: "User not found!",
      });
    }

    res.json({ success: true, data: findUserById });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      error: "Something went wrong!",
    });
  }
}

// update user
// @PUT baseUrl/users/:userId
export async function updateUser(req: express.Request, res: express.Response) {
  const userId = req.params.userId;

  try {
    const { name, email, phone } = req.body;
    const userRepository = getConnection().getRepository(User);
    const findUserById = await userRepository.findOne({ id: userId });

    const newUser = new User();

    if (findUserById) {
      if (name) {
        newUser.name = name;
      }

      if (findUserById.email !== email) {
        newUser.email = email;
      } else {
        return res.status(400).json({
          success: false,
          error: "User with this name already exists",
        });
      }

      // if (findUserById.email !== email) {
      //   const findUserByEmail = await userRepository.findOne({ email });
      //   if (!findUserByEmail) {
      //     newUser.email = email;
      //   } else {
      //     return res
      //       .status(400).json({
      //         success: false,
      //         error: "User with this name already exists",
      //       });
      //   }
      // } else {
      //   newUser.email = email;
      // }

      if (phone) {
        newUser.phone = phone;
      }

      await userRepository.update(userId, newUser);

      // Generating a token
      return res.status(200).json({
        success: true,
        message: "User info updated",
      });
    } else {
      return res.status(400).json({
        success: false,
        error: "User not found!",
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

// update user password
// @PUT - baseUrl/users/:userId/password
export async function updateUserPassword(
  req: express.Request,
  res: express.Response
) {
  const userId = req.params.userId;

  try {
    const { password, newPassword } = req.body;
    const userRepository = getConnection().getRepository(User);
    const findUserById = await userRepository.findOne({ id: userId });
    const hashPassword = await bcrypt.hash(newPassword, saltRounds);

    const newUser = new User();

    if (findUserById) {
      const doesPasswordMatch = bcrypt.compareSync(
        password,
        findUserById.password
      );
      if (doesPasswordMatch) {
        newUser.password = hashPassword;
        await userRepository.update(userId, newUser);
        return res.json({
          success: true,
          message: "Password successfully updated.",
        });
      } else {
        return res.json({
          error: "Your old password does not match!",
        });
      }
    } else {
      return res.status(400).json({ success: false, error: "User not found!" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
}

// @DELETE baseUrl/users/:userId
export async function deleteUser(req: express.Request, res: express.Response) {
  const userId = req.params.userId;

  try {
    const userRepository = getConnection().getRepository(User);
    const userToDelete = await userRepository.findOne({ id: userId });

    if (userToDelete) {
      await userRepository.delete(userId);
      res.json({ success: true, message: "User deleted!" });
    } else {
      res.status(400).json({
        success: false,
        error: "User could not be deleted!",
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

export default router;
