import React from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import ProductList from "../components/products/ProductList";
import { useProducts } from "../context/ProductContext";

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
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  return (
    <Container
      className="my-5"
      style={{ margin: "0 auto", maxWidth: "1200px" }}
    >
      <h1 className="products-main-title">Our Products</h1>
      <ProductList products={products} />
    </Container>
  );
};

export default ProductsPage;
