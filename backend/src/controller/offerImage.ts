import express = require("express");
import { getConnection } from "typeorm";
import { OfferImage, Offer } from "../entity";

// get offer Images
export async function getAllOfferImages(
  req: express.Request,
  res: express.Response
) {
  // write function
  const offerRepository = getConnection().getRepository(OfferImage);
  const offerImages = await offerRepository.find();
  res.status(200).json({
    data: offerImages,
  });
}

// create offer Image
export async function CreateOfferImageEditModal(
  req: express.Request,
  res: express.Response
) {
  try {
    const id = req.body.offerId;
    const offerRepository = getConnection().getRepository(Offer);
    const offer = await offerRepository.findOne({ id });
    const offerImageRepository = getConnection().getRepository(OfferImage);

    const createOfferImage = [];
    const files = req.files as Express.Multer.File[];

    if (files.length && offer) {
      for (let i = 0; i < files.length; i++) {
        const offerImage = new OfferImage();
        offerImage.path = files[i].path;
        offerImage.originalname = files[i].originalname;
        offerImage.offer = offer;

        const savedOfferImage = await offerImageRepository.save(offerImage);
        createOfferImage.push(savedOfferImage);
      }

      return res.status(200).json({
        success: true,
        message: "OfferImage added!",
        data: createOfferImage,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, error: "OfferImage not found!" });
    }
  } catch (error) {
    return res.status(500).json("Something went wrong!");
  }
}
export async function createOfferImages(
  req: express.Request,
  res: express.Response
) {
  try {
    const offerImageRepository = getConnection().getRepository(OfferImage);

    const createOfferImage = [];
    const files = req.files as Express.Multer.File[];

    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        const offerImage = new OfferImage();
        offerImage.path = files[i].path;
        offerImage.originalname = files[i].originalname;

        const savedOfferImage = await offerImageRepository.save(offerImage);
        createOfferImage.push(savedOfferImage);
      }

      return res.status(200).json({
        success: true,
        message: "OfferImage added!",
        data: createOfferImage,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, error: "OfferImage not found!" });
    }
  } catch (error) {
    return res.status(500).json("Something went wrong!");
  }
}
// update offer Image
export async function updateOfferImage(
  req: express.Request,
  res: express.Response
) {}

// delete offer Image
export async function deleteOfferImage(
  req: express.Request,
  res: express.Response
) {
  try {
    const Id = req.params.offerImageId;
    const offerImageRepository = getConnection().getRepository(OfferImage);
    const imageToUpdate = await offerImageRepository.findOne({ id: Id });
    if (imageToUpdate) {
      try {
        await offerImageRepository.delete(imageToUpdate);
        res.status(200).json({ success: true, message: "OfferImage deleted!" });
      } catch (e) {
        return res.status(500).json("something went wrong");
      }
    } else {
      return res.status(400).json({
        success: false,
        error: "Invalid offerImagId!",
      });
    }
  } catch (error) {
    return res.status(500).json("Something went wrong!");
  }
}
