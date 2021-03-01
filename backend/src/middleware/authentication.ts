import express = require("express");

import jwt = require("jsonwebtoken");
import { getConnection } from "typeorm";
const debug = require("debug")("app");
import { User } from "../entity";
require('dotenv').config()

const secret = process.env.JWT_SECRET || "";

export const authenticationMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secret, async (err: any, user: any) => {
    debug(err);
    if (err) return res.sendStatus(403);

    const userRepository = getConnection().getRepository(User);
    const userRecord = await userRepository.findOne({ email: user.email });

    if (!userRecord) {
      return res.sendStatus(403);
    }

    next();
  });
};
