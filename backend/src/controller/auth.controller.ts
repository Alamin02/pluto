import express = require("express");
import bcrypt = require("bcrypt");
import jwt = require("jsonwebtoken");
import { getConnection } from "typeorm";
import { User } from "../entity";

require("dotenv").config();

const router = express.Router();
const secret = process.env.JWT_SECRET || "";
const saltRounds = 10;

// @POST - /api/v1/auth/login
// User Login
export async function userLogin(req: express.Request, res: express.Response) {
  const { email, password } = req.body;

  try {
    // Find the user
    const userRepository = getConnection().getRepository(User);
    const findUserEmail = await userRepository.findOne({ email });

    if (!findUserEmail) {
      return res
        .status(400)
        .json({ success: false, error: "Email or password does not match" });
    }

    // Verifying the password
    const doesPasswordMatch = bcrypt.compareSync(
      password,
      findUserEmail.password
    );

    if (!doesPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, error: "Email or password does not match" });
    }

    // Generating a token
    const token = jwt.sign({ email }, secret, { expiresIn: "10h" });

    res.json({ success: true, message: "Login successful!", token });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
}

// @POST - /api/v1/auth/register
// User Registration
export async function userRegistration(
  req: express.Request,
  res: express.Response
) {
  const { name, email, password, phone, role, addresses } = req.body;
  const hash = await bcrypt.hash(password, saltRounds);

  try {
    const userRepository = getConnection().getRepository(User);

    const previousEntry = await userRepository.findOne({ email });

    if (previousEntry) {
      res.status(400).json({
        success: false,
        error: "User already exists",
      });
    }

    // Create a new user
    try {
      const userRepository = getConnection().getRepository(User);
      const newUser = new User();

      newUser.name = name;
      newUser.email = email;
      newUser.phone = phone;
      newUser.role = "user";
      newUser.password = hash;

      if (addresses) {
        newUser.addresses = addresses;
      }

      await userRepository.save(newUser);
    } catch (e) {
      console.error(e);
      return res
        .status(400)
        .json({ success: false, error: "New account could not be created" });
    }
    // Generating a token
    const token = jwt.sign({ email }, secret, { expiresIn: "10h" });

    res.json({ success: true, message: "New account created!", token: token });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
}

export default router;
