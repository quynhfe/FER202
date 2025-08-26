import React from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import ProductList from "../components/products/ProductList";
import { useProducts } from "../context/ProductContext";
import Banner from "../components/ui/Banner";
import Slogan from "../components/ui/Slogan";

const ProductsPage = () => {
  const { products, loading, error } = useProducts();

  if (loading)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  if (error)
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  return (
    <>
      <Container className="mt-5" style={{ maxWidth: "1200px" }}>
        <Banner />
        <h1 className="products-main-title">Our Products</h1>
        <ProductList products={products} />
      </Container>
      <Slogan />
    </>
  );
};

export default ProductsPage;
