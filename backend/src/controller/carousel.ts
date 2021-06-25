import express = require("express");
import { getConnection } from "typeorm";

import { validationResult } from "express-validator";

import { Carousel, CarouselImage } from "../entity";

// @POST - /carousels
// Create carousel
export async function createCarousel(
  req: express.Request,
  res: express.Response
) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, summary, link } = req.body;

  try {
    const carouselRepository = getConnection().getRepository(Carousel);
    const carouselImageRepository = getConnection().getRepository(
      CarouselImage
    );

    const file = req.file as Express.Multer.File;

    const carouselImage = new CarouselImage();
    carouselImage.path = file.path;
    carouselImage.originalName = file.originalname;

    await carouselImageRepository.save(carouselImage);

    const newCarousel = new Carousel();
    newCarousel.title = title;
    newCarousel.summary = summary;
    newCarousel.link = link || "#";
    newCarousel.image = carouselImage;

    await carouselRepository.save(newCarousel);
  } catch (e) {
    res.status(400).json({
      errors: [{ msg: "Carousel could not be created" }, { error: e }],
    });
    return;
  }
  res.json({ msg: "Carousel created" });
}

// @GET - /carousels
// Get all carousels
export async function getCarousels(
  req: express.Request,
  res: express.Response
) {
  const carouselRepository = getConnection().getRepository(Carousel);

  const carousels = await carouselRepository.find({
    select: ["id", "title", "summary", "link"],
    relations: ["image"],
  });

  res.json({ data: carousels });
}

// @DELETE - /carousels/:carouselId
// delete a carousel
export async function deleteCarousel(
  req: express.Request,
  res: express.Response
) {
  const id = req.params.carouselId;
  const carouselRepository = getConnection().getRepository(Carousel);
  const findCarouselById = await carouselRepository.findOne({ id: id });

  if (findCarouselById) {
    try {
      await carouselRepository.delete({ id });
      res.json({ msg: "Carousel deleted" });
    } catch (e) {
      res.status(400).json({ msg: e });
    }
  } else {
    res.status(400).json({
      errors: [{ msg: "Carousel to delete not found or invalid id" }],
    });
  }
}
