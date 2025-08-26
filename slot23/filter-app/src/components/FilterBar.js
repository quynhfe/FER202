import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch, setCategory } from "../features/productsSlice";
import { Form, Row, Col } from "react-bootstrap";

export default function FilterBar() {
  const dispatch = useDispatch();
  const { search, category } = useSelector((state) => state.products);

  return (
    <Row className="mb-3">
      <Col md={6}>
        <Form.Control
          placeholder="Search..."
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
      </Col>
      <Col md={6}>
        <Form.Select
          value={category}
          onChange={(e) => dispatch(setCategory(e.target.value))}
        >
          <option>All</option>
          <option>Electronics</option>
          <option>Clothes</option>
        </Form.Select>
      </Col>
    </Row>
  );
}
