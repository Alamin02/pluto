import express = require("express");
import { getConnection } from "typeorm";

import { Address } from "../entity";

// @GET - baseUrl/addresses
// Get all addresses list
export async function getAllAddresses(
  req: express.Request,
  res: express.Response
) {
  try {
    const addressRepository = getConnection().getRepository(Address);
    const { id, role } = res.locals.user;

    const addresses = await addressRepository.find({
      select: ["id", "division", "city", "district", "address"],
      relations: ["user"],
      ...(role === "admin"
        ? {}
        : {
            where: {
              user: {
                id: id,
              },
            },
          }),
    });

    res.status(200).json({ success: true, data: addresses });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      error: "Something went wrong!",
    });
  }
}

// @POST - baseUrl/addresses
// Create address
export async function createAddress(
  req: express.Request,
  res: express.Response
) {
  try {
    const { division, district, city, address, user } = req.body;
    const addressRepository = getConnection().getRepository(Address);

    const newAddress = new Address();

    newAddress.division = division;
    newAddress.district = district;
    newAddress.city = city;
    newAddress.address = address;
    newAddress.user = user;

    // save data to repository from request body
    await addressRepository.save(newAddress);

    res.status(200).json({ success: true, message: "New address added" });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
    return;
  }
}

// @GET - baseUrl/addresses/:addressId
// Get a particular address
export async function getAddress(req: express.Request, res: express.Response) {
  try {
    const id = req.params.addressId;
    const addressRepository = getConnection().getRepository(Address);
    const findAddressById = await addressRepository.findOne({ id });

    if (!findAddressById) {
      return res
        .status(400)
        .json({ success: false, error: "Address not found" });
    }

    // Save to database
    res
      .status(200)
      .json({ success: true, message: "Address found", data: findAddressById });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
}

// @PUT - /api/v1/addresses/:addressId
// Update address
export async function updateAddress(
  req: express.Request,
  res: express.Response
) {
  try {
    const addressRepository = getConnection().getRepository(Address);

    const id = req.params.addressId;
    const findAddressById = await addressRepository.findOne({ id });
    if (!findAddressById) {
      return res
        .status(400)
        .json({ success: false, error: "Address not found" });
    }
    const { division, city, district, address } = req.body;

    const newAddress = new Address();

    newAddress.division = division;
    newAddress.district = district;
    newAddress.city = city;
    newAddress.address = address;
    newAddress.user = res.locals.user.id;

    await addressRepository.update({ id: req.params.addressId }, newAddress);
    res.status(200).json({ success: true, message: "Address updated" });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
}

// @DELETE - /api/v1/addresses/:addressId
// Delete an address
export async function deleteAddress(
  req: express.Request,
  res: express.Response
) {
  try {
    const addressId = req.params.addressId;
    const addressRepository = getConnection().getRepository(Address);

    const findAddressById = await addressRepository.findOne({ id: addressId });

    if (findAddressById) {
      await addressRepository.delete(addressId);
      res.status(200).json({ success: true, message: "Address deleted" });
    } else {
      res.status(400).json({
        success: false,
        error: "Address not found or could not be deleted!",
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
}
