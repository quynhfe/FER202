import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Row, Col } from "react-bootstrap";
import { addToCart } from "../cart/cartSlice";

export default function ProductList() {
  const dispatch = useDispatch();
  const { list, filtered } = useSelector((state) => state.products);

  const products = filtered.length > 0 ? filtered : list;

  return (
    <Row xs={1} md={3} className="g-4">
      {products.map((p) => (
        <Col key={p.id}>
          <Card className="h-100 shadow-sm">
            <Card.Img
              variant="top"
              src={p.image}
              alt={p.title}
              style={{ objectFit: "cover", height: "200px" }}
            />
            <Card.Body>
              <Card.Title>{p.title}</Card.Title>
              <Card.Text>
                <strong>{p.price.toLocaleString()}₫</strong>
              </Card.Text>
              <Button
                style={{ backgroundColor: "#435fe1", borderColor: "#435fe1" }}
                className="w-100"
                onClick={() => dispatch(addToCart(p))}
              >
                🛒 Thêm vào giỏ
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
