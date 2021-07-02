import express = require("express");
import { getConnection } from "typeorm";
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
    return res.status(403).json({ success: false, error: "Unauthorized" });
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
    return res.json({ success: false, error: "Image not found" });
  }

  try {
    if (!previousEntry) {
      const newOffer = new Offer();
      newOffer.name = name;
      newOffer.discount = discount;
      newOffer.description = description;
      newOffer.offerImage = createOfferImage;

      await offersRepository.save(newOffer);

      res.status(200).json({ success: true, message: "Offer created" });
    } else {
      res.status(400).json({ success: false, error: "offer already exist" });
    }
  } catch (e) {
    res.status(400).json({ success: false, error: e });
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
    return res.status(403).json({ success: false, error: "Unauthorized" });
  }

  try {
    if (offerToUpdate) {
      const newOffer = new Offer();
      newOffer.name = name;
      newOffer.discount = discount;
      newOffer.description = description;
      offersRepository.merge(offerToUpdate, newOffer);
      await offersRepository.save(offerToUpdate);

      res.status(200).json({ success: true, message: "offer updated" });
    } else {
      res.status(400).json({
        success: false,
        error:
          "offer name must be unique or offer to update not found or invalid id",
      });
    }
  } catch (e) {
    res
      .status(400)
      .json({ success: false, error: "offer name must be unique" });
  }
}

// @DELETE /v1/api/offers/:offerId
// delete a offer
export async function deleteOffer(req: express.Request, res: express.Response) {
  const permisson = accessControl.can(res.locals.user.role).deleteAny("offer");
  if (!permisson.granted) {
    return res.status(403).json({ success: false, error: "Unauthorized" });
  }

  const offerId = req.params.offerId;
  const offersRepository = getConnection().getRepository(Offer);
  const offerToUpdate = await offersRepository.findOne({ id: offerId });
  try {
    if (offerToUpdate) {
      await offersRepository.delete(offerId);
      res.status(200).json({ success: true, message: "Offer deleted" });
    } else {
      res.status(400).json({
        success: false,
        error: "offer to delete not found or invalid id",
      });
    }
  } catch (e) {
    res.status(400).json({ success: false, error: e });
  }
}
