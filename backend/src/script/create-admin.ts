import minimist from "minimist";
import { getConnection } from "typeorm";
import { connectDatabase } from "../utils/connect-db";
import bcrypt = require("bcrypt");

import { User } from "../entity";

const cliArgs = minimist(process.argv.slice(2));

const run = async () => {
  const userRepository = getConnection().getRepository(User);
  const newUser = new User();

  const hash = await bcrypt.hash(cliArgs.password, 10);

  newUser.name = cliArgs.name || "Admin";
  newUser.email = cliArgs.email;
  newUser.phone = cliArgs.phone || "";
  newUser.role = "admin";
  newUser.password = hash;

  userRepository.save(newUser);
};

if (cliArgs.email && cliArgs.password) {
  connectDatabase().then(() => {
    run();
  });
}
