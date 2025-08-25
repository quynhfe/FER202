import React, { useContext } from "react";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
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
        <Alert variant="info" className="text-center p-4">
          <h4>Your wishlist is empty.</h4>
          <p>Looks like you haven't saved any items yet.</p>
          <Button as={Link} to="/products" variant="primary">
            Go Shopping
          </Button>
        </Alert>
      )}
    </Container>
  );
};

export default WishlistPage;
