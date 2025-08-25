// src/components/products/Filter.js

import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import config from "../../config"; // Import config

const Filter = ({
  products,
  searchTerm,
  setSearchTerm,
  sortOption,
  setSortOption,
  brandFilter,
  setBrandFilter,
  tagFilter,
  setTagFilter,
  itemsPerPage,
  setItemsPerPage,
}) => {
  const uniqueBrands = [
    ...new Set(products.map((p) => config.getField("productBrand", p))),
  ];

  return (
    <div className="filter-container">
      <Row className="g-3 align-items-center">
        <Col xs={12} md={6} lg={4}>
          <Form.Control
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col xs={6} md={3} lg={2}>
          <Form.Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="name-asc">Name A-Z</option>
            <option value="price-asc">Price Ascending</option>
            <option value="price-desc">Price Descending</option>
          </Form.Select>
        </Col>
        <Col xs={6} md={3} lg={2}>
          <Form.Select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
          >
            <option value="">All Brands</option>
            {uniqueBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={6} md={3} lg={2}>
          <Form.Select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
          >
            <option value="">All Products</option>
            <option value="sale">On Sale</option>
            <option value="hot">Hot</option>
            <option value="hot-and-sale">Hot & Sale</option>
          </Form.Select>
        </Col>
        <Col xs={6} md={3} lg={2}>
          <Form.Select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            {config.app.ITEMS_PER_PAGE_OPTIONS.map((num) => (
              <option key={num} value={num}>
                {num} per page
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
    </div>
  );
};

export default Filter;
