import express = require("express");
import { getConnection } from "typeorm";

import { Carousel, CarouselImage } from "../entity";

// @POST - baseUrl/carousels
// Create carousel
export async function createCarousel(
  req: express.Request,
  res: express.Response
) {
  try {
    const { title, summary, link, carouselImage } = req.body;
    const carouselRepository = getConnection().getRepository(Carousel);

    const duplicate = await carouselRepository.findOne({ title });
    if (!duplicate) {
      const newCarousel = new Carousel();
      newCarousel.title = title;
      newCarousel.summary = summary;
      newCarousel.image = carouselImage;
      newCarousel.link = link || "#";

      await carouselRepository.save(newCarousel);
      return res.status(200).json({
        success: true,
        message: "Carousel created!",
      });
    } else {
      return res.status(400).json({
        success: false,
        error: "Carousel with this title already exists!",
      });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
}

// @GET - baseUrl/carousels
// Get all carousels
export async function getCarousels(
  req: express.Request,
  res: express.Response
) {
  try {
    const carouselRepository = getConnection().getRepository(Carousel);

    const carousels = await carouselRepository.find({
      select: ["id", "title", "summary", "link"],
      relations: ["image"],
    });

    return res.status(200).json({
      success: true,
      data: carousels,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
}

// @DELETE - baseUrl/carousels/:carouselId
// delete a carousel
export async function deleteCarousel(
  req: express.Request,
  res: express.Response
) {
  try {
    const id = req.params.carouselId;

    const carouselRepository = getConnection().getRepository(Carousel);
    const findCarouselById = await carouselRepository.findOne({ id: id });

    if (findCarouselById) {
      await carouselRepository.delete({ id });
      return res.status(200).json({
        success: true,
        message: "Carousel deleted!",
      });
    } else {
      return res.status(400).json({
        success: false,
        error: "Carousel to delete not found or invalid id!",
      });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      error: "Something went wrong!",
    });
  }
}
