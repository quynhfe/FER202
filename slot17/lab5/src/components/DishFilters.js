import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const DishFilters = ({ category, setCategory, sortOrder, setSortOrder }) => {
  const categories = ["All", "Main Course", "Appetizer", "Dessert", "Pizza"];

  return (
    <div className="p-3 bg-light rounded dish-filters">
      <Row className="g-2 align-items-center">
        <Col xs={12} md={6}>
          <Form.Group controlId="categoryFilter">
            <Form.Label className="visually-hidden">
              Filter by Category
            </Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Filter by Category"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group controlId="sortOrderFilter">
            <Form.Label className="visually-hidden">Sort by Price</Form.Label>
            <Form.Select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              aria-label="Sort by Price"
            >
              <option value="default">Sort by Default</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default DishFilters;
