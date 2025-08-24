import React, { useContext } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { WishlistContext } from "../context/WishlistContext";
import ProductCard from "../components/products/ProductCard";

const WishlistPage = () => {
  const { wishlistState } = useContext(WishlistContext);
  const { items } = wishlistState;

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">My Wishlist</h1>
      {items.length > 0 ? (
        <Row xs={1} sm={2} lg={3} className="g-4">
          {items.map((product) => (
            <Col key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info" className="text-center">
          Your wishlist is empty.
        </Alert>
      )}
    </Container>
  );
};

export default WishlistPage;
