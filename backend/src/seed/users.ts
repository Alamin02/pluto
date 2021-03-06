import { getConnection } from "typeorm";
import { User } from "../entity";
import bcrypt = require("bcrypt");

const saltRounds = 10;
const usersList = [
  {
    name: "A",
    email: "a@gmail.com",
    phone: "12345",
    password: "123",
  },
  {
    name: "B",
    email: "b@gmail.com",
    phone: "12345",
    password: "123",
  },
  {
    name: "C",
    email: "c@gmail.com",
    phone: "12345",
    password: "123",
  },
  {
    name: "D",
    email: "d@gmail.com",
    phone: "12345",
    password: "123",
  },
  {
    name: "E",
    email: "e@gmail.com",
    phone: "12345",
    password: "123",
  },
  {
    name: "F",
    email: "f@gmail.com",
    phone: "12345",
    password: "123",
  },
  {
    name: "G",
    email: "g@gmail.com",
    phone: "12345",
    password: "123",
  },
  {
    name: "H",
    email: "h@gmail.com",
    phone: "12345",
    password: "123",
  },
  {
    name: "I",
    email: "i@gmail.com",
    phone: "12345",
    password: "123",
  },
  {
    name: "J",
    email: "j@gmail.com",
    phone: "12345",
    password: "123",
  },
];

export async function seedUsers() {
  const userRepository = getConnection().getRepository(User);
  for (const { name, email, phone, password } of usersList) {
    const newUser = new User();

    newUser.name = name;
    newUser.email = email;
    newUser.phone = phone;
    newUser.password = await bcrypt.hash(password, saltRounds);

    await userRepository.save(newUser);
  }
}
