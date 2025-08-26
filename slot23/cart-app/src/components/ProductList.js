import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { Card, Button, Row, Col } from "react-bootstrap";

const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Phone", price: 800 },
  { id: 3, name: "Headphones", price: 150 },
];

export default function ProductList() {
  const dispatch = useDispatch();

  return (
    <Row className="g-3">
      {products.map((p) => (
        <Col md={4} key={p.id}>
          <Card>
            <Card.Body>
              <Card.Title>{p.name}</Card.Title>
              <Card.Text>Price: ${p.price}</Card.Text>
              <Button onClick={() => dispatch(addToCart(p))}>
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
