import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Skeleton } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.css";

import MainContainer from "../layout/MainContainer";
import { agent } from "../../helpers/agent";
import "./Carousel.css";

SwiperCore.use([Navigation, Pagination, Autoplay]);

export default function Carousel() {
  const [carousels, setCarousels] = useState([]);

  useEffect(() => {
    agent
      .getCarousels()
      .then((res) => res.json())
      .then(({ data }) => setCarousels(data));
  }, []);

  if (!carousels || !carousels.length) {
    return (
      <MainContainer>
        <div style={{ padding: "0.5rem" }}>
          <Skeleton active />
        </div>
      </MainContainer>
    );
  } else {
    return (
      <React.Fragment>
        <Swiper
          navigation
          loop
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 3500, disableOnInteraction: true }}
          spaceBetween={50}
          slidesPerView={1}
        >
          {carousels.map((carousel) => (
            <SwiperSlide key={carousel.title}>
              <div>
                <img
                  className="carousel-image"
                  src={carousel.image.path}
                  alt={carousel.title}
                />
                <div className="carousel-details-container">
                  <p className="carousel-title">{carousel.title}</p>
                  <p className="carousel-summary">{carousel.summary}</p>
                  <Button
                    type="primary"
                    style={{ textTransform: "capitalize" }}
                  >
                    <Link to={carousel.link}>view product</Link>
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </React.Fragment>
    );
  }
}
