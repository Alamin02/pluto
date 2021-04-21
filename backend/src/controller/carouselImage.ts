import express = require("express");
import { getConnection } from "typeorm";
import { Carousel, CarouselImage } from "../entity";

// @POST - api/v1/carousel-image
// create carousel image
export async function createCarouselImage(
  req: express.Request,
  res: express.Response
) {
  const id = req.body.carouselId;
  const carouselRepository = getConnection().getRepository(Carousel);
  const carousel = await carouselRepository.findOneOrFail({ id });
  const carouselImageRepository = getConnection().getRepository(CarouselImage);

  const file = req.file as Express.Multer.File;

  if (file) {
    const carouselImage = new CarouselImage();
    carouselImage.path = file.path;
    carouselImage.originalName = file.originalname;
    carouselImage.carousel = carousel;

    const savedCarouselImage = await carouselImageRepository.save(
      carouselImage
    );
    return res.json({ msg: "Carousel image added", data: savedCarouselImage });
  } else {
    return res
      .status(400)
      .json({ errors: [{ msg: "Carousel image not found" }] });
  }
}
