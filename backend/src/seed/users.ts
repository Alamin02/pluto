import { getConnection } from "typeorm";
import { Address, User } from "../entity";
import bcrypt = require("bcrypt");
import { addressesList } from "./addresses";

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
];

export async function seedUsers() {
  const userRepository = getConnection().getRepository(User);
  const addressRepository = getConnection().getRepository(Address);

  for (const { name, email, phone, password } of usersList) {
    const newUser = new User();

    newUser.name = name;
    newUser.email = email;
    newUser.phone = phone;
    newUser.password = await bcrypt.hash(password, saltRounds);
    const createAddresses = [];
    for (const address of addressesList) {
      const newAddresses = new Address();
      newAddresses.division = address.division;
      newAddresses.district = address.district;
      newAddresses.city = address.address;
      newAddresses.address = address.address;

      const saveNewAddresses = await addressRepository.save(newAddresses);
      createAddresses.push(saveNewAddresses);
    }
    newUser.addresses = createAddresses;
    await userRepository.save(newUser);
  }
}
