// src/components/products/ProductList.js

import React, { useState, useMemo, useCallback } from "react";
import { Row, Col, Alert } from "react-bootstrap";
import ProductCard from "./ProductCard";
import Filter from "./Filter";
import PaginationComponent from "../ui/PaginationComponent";
import useDebounce from "../../hooks/useDebounce";
import config from "../../config"; // Import config

const ProductList = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(
    config.app.ITEMS_PER_PAGE_OPTIONS[0]
  );

  const debouncedSearchTerm = useDebounce(
    searchTerm,
    config.app.DEBOUNCE_DELAY
  );

  const visibleProducts = useMemo(() => {
    let filtered = [...products];

    if (debouncedSearchTerm) {
      filtered = filtered.filter((p) =>
        config
          .getField("productTitle", p)
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase())
      );
    }

    if (brandFilter) {
      filtered = filtered.filter(
        (p) => config.getField("productBrand", p) === brandFilter
      );
    }

    const tagsField = "productTags";
    if (tagFilter === "sale") {
      filtered = filtered.filter(
        (p) =>
          config.getField(tagsField, p) &&
          config.getField(tagsField, p).includes("sale")
      );
    } else if (tagFilter === "hot") {
      filtered = filtered.filter(
        (p) =>
          config.getField(tagsField, p) &&
          config.getField(tagsField, p).includes("hot")
      );
    } else if (tagFilter === "hot-and-sale") {
      filtered = filtered.filter(
        (p) =>
          config.getField(tagsField, p) &&
          config.getField(tagsField, p).includes("hot") &&
          config.getField(tagsField, p).includes("sale")
      );
    }

    const sortFunctions = {
      "name-asc": (a, b) =>
        config
          .getField("productTitle", a)
          .localeCompare(config.getField("productTitle", b)),
      "price-asc": (a, b) =>
        (config.getField("productSalePrice", a) ||
          config.getField("productPrice", a)) -
        (config.getField("productSalePrice", b) ||
          config.getField("productPrice", b)),
      "price-desc": (a, b) =>
        (config.getField("productSalePrice", b) ||
          config.getField("productPrice", b)) -
        (config.getField("productSalePrice", a) ||
          config.getField("productPrice", a)),
    };

    if (sortFunctions[sortOption]) {
      filtered.sort(sortFunctions[sortOption]);
    }
    return filtered;
  }, [products, debouncedSearchTerm, sortOption, brandFilter, tagFilter]);

  const resetPageAndSet = useCallback(
    (setter) => (value) => {
      setter(value);
      setCurrentPage(1);
    },
    []
  );

  const currentProducts = useMemo(
    () =>
      visibleProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [visibleProducts, currentPage, itemsPerPage]
  );

  return (
    <div>
      <Filter
        products={products}
        searchTerm={searchTerm}
        setSearchTerm={resetPageAndSet(setSearchTerm)}
        sortOption={sortOption}
        setSortOption={resetPageAndSet(setSortOption)}
        brandFilter={brandFilter}
        setBrandFilter={resetPageAndSet(setBrandFilter)}
        tagFilter={tagFilter}
        setTagFilter={resetPageAndSet(setTagFilter)}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={resetPageAndSet(setItemsPerPage)}
      />

      {currentProducts.length > 0 ? (
        <Row xs={1} sm={2} lg={3} className="g-4">
          {currentProducts.map((product) => (
            <Col key={config.getField("productId", product)}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info" className="text-center mt-4">
          No products found.
        </Alert>
      )}
      <PaginationComponent
        totalItems={visibleProducts.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ProductList;
