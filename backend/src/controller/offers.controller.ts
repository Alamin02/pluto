import express = require("express");
import { getConnection } from "typeorm";
import accessControl from "../utils/access-control";
import { Offer } from "../entity";


// @GET /v1/api/offers
// all offers
export async function getAllOffers(
  req: express.Request,
  res: express.Response
) {
  try {
    const offersRepository = getConnection().getRepository(Offer);

    const [offers, offerCount] = await offersRepository.findAndCount({
      relations: ["offerImage", "products", "products.productImage"],
    });

    return res.status(200).json({
      success: false,
      data: {
        offers,
        offerCount,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something went wrong!");
  }
}

// get a offer
export async function getSingleOffer(
  req: express.Request,
  res: express.Response
) {
  try {
    const id = req.params.offerId;
    const offersRepository = getConnection().getRepository(Offer);
    const findByOffer = await offersRepository.findOne(
      { id: id },
      { relations: ["offerImage", "products", "products.productImage"] }
    );

    if (!findByOffer) {
      return res.status(400).json({ success: false, error: "Offer not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Offer found!", data: findByOffer });
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
}

// @POST /v1/api/offers
// create offer
export async function createOffer(req: express.Request, res: express.Response) {
  try {
    const permission = accessControl
      .can(res.locals.user.role)
      .createAny("offer");
    if (!permission.granted) {
      return res.status(403).json({ success: false, error: "Unauthorized" });
    }

    const { name, discount, description, offerImages } = req.body;

    const offersRepository = getConnection().getRepository(Offer);
    const previousEntry = await offersRepository.findOne({ name });

    if (!previousEntry) {
      if (offerImages.length) {
        const newOffer = new Offer();
        newOffer.name = name;
        newOffer.discount = discount;
        newOffer.description = description;
        newOffer.offerImage = offerImages;

        await offersRepository.save(newOffer);

        return res
          .status(201)
          .json({ success: true, message: "Offer created!" });
      } else {
        return res
          .status(400)
          .json({ success: false, error: "offerImages not found!" });
      }
    } else {
      return res
        .status(400)
        .json({ success: false, error: "Offer already exists!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something went wrong");
  }
}

// @PUT /v1/api/offers/:offerId
// update a offer
export async function updateOffer(req: express.Request, res: express.Response) {
  try {
    const permisson = accessControl
      .can(res.locals.user.role)
      .updateAny("offer");
    if (!permisson.granted) {
      return res.status(403).json({ success: false, error: "Unauthorized" });
    }

    const offerId = req.params.offerId;
    const { name, discount, description, offerImages } = req.body;

    const offersRepository = getConnection().getRepository(Offer);
    const offerToUpdate = await offersRepository.findOne({ id: offerId });
    const duplicate = await offersRepository.findOne({ name });

    if (offerToUpdate) {
      if (duplicate && duplicate.id !== offerId) {
        return res.status(400).json({
          successs: false,
          error: "Offer with this name already exists!",
        });
      }
      if (offerImages.length) {
        const newOffer = new Offer();
        newOffer.name = name;
        newOffer.discount = discount;
        newOffer.description = description;
        newOffer.offerImage = offerImages;
        offersRepository.merge(offerToUpdate, newOffer);
        await offersRepository.save(offerToUpdate);

        return res
          .status(201)
          .json({ success: true, message: "Offer updated!" });
      } else {
        return res
          .status(400)
          .json({ success: false, error: "offerImage can not be empty!" });
      }
    } else {
      return res.status(400).json({
        success: false,
        error: "Invalid offerId!",
      });
    }
  } catch (error) {
    res.status(500).json("Something went wrong!");
  }
}

// @DELETE /v1/api/offers/:offerId
// delete a offer
export async function deleteOffer(req: express.Request, res: express.Response) {
  try {
    const permisson = accessControl
      .can(res.locals.user.role)
      .deleteAny("offer");
    if (!permisson.granted) {
      return res.status(403).json({ success: false, error: "Unauthorized" });
    }

    const offerId = req.params.offerId;
    const offersRepository = getConnection().getRepository(Offer);
    const offerToUpdate = await offersRepository.findOne({ id: offerId });

    if (offerToUpdate) {
      await offersRepository.delete(offerId);
      return res.status(200).json({ success: true, message: "Offer deleted!" });
    } else {
      return res.status(400).json({
        success: false,
        error: "Invalid offerId!",
      });
    }
  } catch (error) {
    res.status(500).json("Something went wrong!");
  }
}
