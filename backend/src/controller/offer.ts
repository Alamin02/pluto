import express = require("express");
import { getConnection } from "typeorm";
import { validationResult } from "express-validator";
import accessControl from "../utils/access-control";
import { Offer, OfferImage } from "../entity";

// @GET /v1/api/offers
// all offers
export async function getAllOffers(
  req: express.Request,
  res: express.Response
) {
  const offersRepository = getConnection().getRepository(Offer);

  const [offers, offerCount] = await offersRepository.findAndCount({
    relations: ["offerImage", "products", "products.images"],
  });

  res.json({
    data: {
      offers,
      offerCount,
    },
  });
}

// get a offer
export async function getSingleOffer(
  req: express.Request,
  res: express.Response
) {
  const id = req.params.offerId;
  const offersRepository = getConnection().getRepository(Offer);
  const findByOffer = await offersRepository.findOne(
    { id: id },
    { relations: ["products"] }
  );

  if (!findByOffer) {
    res.status(400).json({ errors: [{ msg: "Offer not found" }] });
  }
  res.status(200).json({ msg: "offer found", data: findByOffer });
}

// @POST /v1/api/offers
// create offer
export async function createOffer(req: express.Request, res: express.Response) {
  const permission = accessControl.can(res.locals.user.role).createAny("offer");
  if (!permission.granted) {
    return res.status(403).json({ errors: [{ msg: "not authorized" }] });
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, discount, description } = req.body;

  const offersRepository = getConnection().getRepository(Offer);
  const previousEntry = await offersRepository.findOne({ name });

  const offerImageRepository = getConnection().getRepository(OfferImage);
  const createOfferImage = [];
  const files = req.files as Express.Multer.File[];

  if (files.length) {
    for (let i = 0; i < files.length; i++) {
      const offerImage = new OfferImage();
      offerImage.path = files[i].path;
      offerImage.originalname = files[i].originalname;

      const savedProductImage = await offerImageRepository.save(offerImage);
      createOfferImage.push(savedProductImage);
    }
  } else {
    return res.json({ errors: [{ msg: "Image not found" }] });
  }

  if (!previousEntry) {
    try {
      const newOffer = new Offer();
      newOffer.name = name;
      newOffer.discount = discount;
      newOffer.description = description;
      newOffer.offerImage = createOfferImage;

      await offersRepository.save(newOffer);
      res.status(200).json({ msg: "offer created" });
    } catch (e) {
      res.status(400).json({ errors: [{ msg: e }] });
    }
  } else {
    res.status(400).json({ errors: [{ msg: "offer already exist" }] });
  }
}

// @PUT /v1/api/offers/:offerId
// update a offer
export async function updateOffer(req: express.Request, res: express.Response) {
  const offerId = req.params.offerId;
  const { name, discount, description } = req.body;

  const offersRepository = getConnection().getRepository(Offer);
  const offerToUpdate = await offersRepository.findOne({ id: offerId });

  const permisson = accessControl.can(res.locals.user.role).updateAny("offer");
  if (!permisson.granted) {
    return res.status(403).json({ errors: [{ msg: "not authorized" }] });
  }

  if (offerToUpdate) {
    try {
      const newOffer = new Offer();
      newOffer.name = name;
      newOffer.discount = discount;
      newOffer.description = description;
      offersRepository.merge(offerToUpdate, newOffer);
      await offersRepository.save(offerToUpdate);
    } catch (e) {
      res.status(400).json({ errors: [{ msg: "offer name must be unique" }] });
    }
  } else {
    res.status(400).json({
      errors: [
        {
          msg: "offer name must be unique or offer to update not found or invalid id",
        },
      ],
    });
  }
  res.status(200).json({ msg: "offer updated" });
}

// @DELETE /v1/api/offers/:offerId
// delete a offer
export async function deleteOffer(req: express.Request, res: express.Response) {
  const permisson = accessControl.can(res.locals.user.role).deleteAny("offer");
  if (!permisson.granted) {
    return res.status(403).json({ errors: [{ msg: "not authorized" }] });
  }

  const offerId = req.params.offerId;
  const offersRepository = getConnection().getRepository(Offer);
  const offerToUpdate = await offersRepository.findOne({ id: offerId });
  if (offerToUpdate) {
    try {
      await offersRepository.delete(offerId);
      res.json({ msg: "offer deleted" });
    } catch (e) {
      res.status(400).json({ msg: e });
    }
  } else {
    res
      .status(400)
      .json({ errors: [{ msg: "offer to delete not found or invalid id" }] });
  }
}
