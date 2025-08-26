import React from "react";
import { useSelector } from "react-redux";
import { Card, Row, Col } from "react-bootstrap";

export default function ProductList() {
  const { items, search, category } = useSelector((state) => state.products);

  const filtered = items.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <Row className="g-3">
      {filtered.map((p) => (
        <Col md={4} key={p.id}>
          <Card>
            <Card.Body>
              <Card.Title>{p.name}</Card.Title>
              <Card.Text>
                {p.category} - ${p.price}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
