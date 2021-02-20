import express = require("express");
const router = express.Router();
import bcrypt = require("bcrypt");
import { getConnection } from "typeorm";

import { User } from "../entity";

const saltRounds = 10;

router.post("/login", (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;

  res.send("Login");
});

router.post(
  "/register",
  async (req: express.Request, res: express.Response) => {
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
  }
);

router.get("/", async (req: express.Request, res: express.Response) => {
  const userRepository = getConnection().getRepository(User);
  const users = await userRepository.find({
    select: ["name", "email", "phone"],
  });

  res.json({ data: users });
});

export default router;
