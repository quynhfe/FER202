// src/components/Hero.js
import React from "react";
import { Carousel } from "react-bootstrap";
import { heroSlides } from "../data/data";

const Hero = () => {
  return (
    <Carousel fade className="hero-carousel mb-4" interval={3000}>
      {heroSlides.map((slide) => (
        <Carousel.Item key={slide.id}>
          <div
            className="hero-image"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <Carousel.Caption className="hero-caption">
            <h3 className="display-4 fw-bold">{slide.title}</h3>
            <p className="lead">{slide.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Hero;
