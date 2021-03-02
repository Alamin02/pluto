import express = require("express");
import { getConnection } from "typeorm";
import { validationResult } from "express-validator";
import { Offer } from "../entity";

// @GET /v1/api/offers
// all offers
export async function offers(req: express.Request, res: express.Response) {
  const offersRepository = getConnection().getRepository(Offer);
  const allOffers = await offersRepository.find();

  res.status(200).json({ data: allOffers });
}

// @POST /v1/api/offers
// create offer
export async function createOffer(req: express.Request, res: express.Response) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, discount, description } = req.body;

  const offersRepository = getConnection().getRepository(Offer);
  const previousEntry = await offersRepository.find({ name });

  try {
    if (!previousEntry) {
      const newOffer = new Offer();
      newOffer.name = name;
      newOffer.discount = discount;
      newOffer.description = description;

      const offerCreated = await offersRepository.save(newOffer);
      res.status(200).json({ data: offerCreated });
    } else {
      res.status(400).json({ data: "offer already exist" });
    }
  } catch (e) {
    res.status(400).json({ msg: e });
  }
}

// @PUT /v1/api/offers/:offerId
// update a offer
export async function updateOffer(req: express.Request, res: express.Response) {
  const offerId = req.params.offerId;
  const { name, discount, description } = req.body;

  const offersRepository = getConnection().getRepository(Offer);
  const offerToUpdate = await offersRepository.findOne({ id: offerId });
  try {
    if (offerToUpdate) {
      const newOffer = new Offer();
      newOffer.name = name;
      newOffer.discount = discount;
      newOffer.description = description;
      await offersRepository.update(offerId, newOffer);
      res.status(200).json({ data: "offer updated" });
    } else {
      res.status(400).json({ data: "offer to update not found or invalid id" });
    }
  } catch (e) {
    res.status(400).json({ msg: e });
  }
}
// @DELETE /v1/api/offers/:offerId
// delete a offer
export async function deleteOffer(req: express.Request, res: express.Response) {
  const offerId = req.params.offerId;
  const offersRepository = getConnection().getRepository(Offer);
  const offerToUpdate = await offersRepository.findOne({ id: offerId });
  try {
    if (offerToUpdate) {
      await offersRepository.delete(offerId);
      res.json({ data: "offer deleted" });
    } else {
      res.status(400).json({ data: "offer to delete not found or invalid id" });
    }
  } catch (e) {
    res.status(400).json({ msg: e });
  }
}
