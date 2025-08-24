import React from "react";
import { Carousel } from "react-bootstrap";
import { useProducts } from "../../context/ProductContext";

const Hero = () => {
  const { products } = useProducts();
  const heroProducts = products.slice(0, 6);

  return (
    <Carousel>
      {heroProducts.map((product) => (
        <Carousel.Item key={product.id} interval={2000}>
          <img
            className="d-block w-100"
            style={{ height: "60vh", objectFit: "cover" }}
            src={product.image}
            alt={product.title}
          />
          <Carousel.Caption>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Hero;
