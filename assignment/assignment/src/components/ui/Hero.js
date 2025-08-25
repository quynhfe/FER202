// src/components/ui/Hero.js

import React from "react";
import { Carousel } from "react-bootstrap";
import { useProducts } from "../../context/ProductContext";
import config from "../../config"; // Import config để dùng getField

const Hero = () => {
  const { products } = useProducts();

  // === MODIFICATION START ===
  // Thêm điều kiện kiểm tra: chỉ gọi .slice() khi 'products' tồn tại và là một mảng.
  // Nếu không, trả về một mảng rỗng để tránh lỗi.
  const heroProducts = Array.isArray(products) ? products.slice(0, 3) : [];
  // === MODIFICATION END ===

  return (
    <Carousel>
      {heroProducts.map((product) => (
        <Carousel.Item
          key={config.getField("productId", product)}
          interval={2000}
        >
          <img
            className="d-block w-100"
            style={{ height: "70vh", objectFit: "cover" }}
            src={config.getField("productImage", product)}
            alt={config.getField("productTitle", product)}
          />
          <Carousel.Caption className="hero-caption">
            <h3>{config.getField("productTitle", product)}</h3>
            <p>{config.getField("productDescription", product)}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Hero;
