import React from "react";
import { useDispatch } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";
import { setFilter } from "./productsSlice";

export default function FilterBar() {
  const dispatch = useDispatch();

  return (
    <Row className="mb-4">
      <Col md={6}>
        <Form.Control
          type="text"
          placeholder="🔍 Tìm sản phẩm..."
          onChange={(e) => dispatch(setFilter(e.target.value))}
        />
      </Col>
    </Row>
  );
}
