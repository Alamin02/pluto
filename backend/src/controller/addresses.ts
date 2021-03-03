import express = require("express");
import { getConnection } from "typeorm";
import { validationResult } from "express-validator";

import { Address } from "../entity";

// @GET - /api/v1/addresses
// Get all addresses list
export async function getAllAddresses(
  req: express.Request,
  res: express.Response
) {
  const addressRepository = getConnection().getRepository(Address);
  const addresses = await addressRepository.find({
    select: ["division", "city", "district", "address"],
  });

  res.json({ data: addresses });
}

// @POST - /api/v1/addresses
// Create address
export async function createAddress(
  req: express.Request,
  res: express.Response
) {
  // error validation
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { division, district, city, address, user } = req.body;

  try {
    // get the repository from product entity
    const addressRepository = getConnection().getRepository(Address);

    const newAddress = new Address();

    newAddress.division = division;
    newAddress.district = district;
    newAddress.city = city;
    newAddress.address = address;
    newAddress.user = user;

    // save data to repository from request body
    await addressRepository.save(newAddress);
  } catch (e) {
    res.status(400).json({
      error: "Address could not be added, detailed address must be unique",
    });
    return;
  }
  res.json({ msg: "New address added" });
}

// @GET - /api/v1/addresses/:addressId
// Get a particular address
export async function getAddress(req: express.Request, res: express.Response) {
  const id = req.params.addressId;
  const addressRepository = getConnection().getRepository(Address);
  const findAddressById = await addressRepository.findOne({ id });

  if (!findAddressById) {
    return res.status(400).json({ error: "Address not found" });
  }

  // Save to database
  res.json({ msg: "Address found", data: findAddressById });
}

// @PUT - /api/v1/addresses/:addressId
// Update address
export async function updateAddress(
  req: express.Request,
  res: express.Response
) {
  const addressRepository = getConnection().getRepository(Address);

  const id = req.params.addressId;
  const findAddressById = await addressRepository.findOne({ id });
  if (!findAddressById) {
    return res.status(400).json({ error: "Address not found" });
  }

  try {
    const { division, city, district, address, user } = req.body;

    const newAddress = new Address();

    newAddress.division = division;
    newAddress.district = district;
    newAddress.city = city;
    newAddress.address = address;
    newAddress.user = user;

    await addressRepository.update({ id: req.params.addressId }, newAddress);
  } catch (e) {
    return res.status(400).json({ error: "Address could not be updated" });
  }

  res.json({ msg: "Address updated" });
}

// @DELETE - /api/v1/addresses/:addressId
// Delete an address
export async function deleteAddress(
  req: express.Request,
  res: express.Response
) {
  const id = req.params.addressId;
  const addressRepository = getConnection().getRepository(Address);

  try {
    await addressRepository.delete(id);
  } catch (e) {
    return res.status(400).json({ error: "Address could not be deleted" });
  }

  res.json({ msg: "Address deleted" });
}
