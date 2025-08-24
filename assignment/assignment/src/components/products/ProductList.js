import React, { useState, useMemo, useCallback } from "react";
import { Row, Col, Alert } from "react-bootstrap";
import ProductCard from "./ProductCard";
import Filter from "./Filter";
import PaginationComponent from "../ui/PaginationComponent";
import useDebounce from "../../hooks/useDebounce";
import { APP_CONFIG } from "../../config";

const ProductList = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(
    APP_CONFIG.ITEMS_PER_PAGE_OPTIONS[0]
  );

  const debouncedSearchTerm = useDebounce(
    searchTerm,
    APP_CONFIG.DEBOUNCE_DELAY
  );

  const visibleProducts = useMemo(() => {
    let filtered = [...products];

    if (debouncedSearchTerm) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    if (brandFilter) {
      filtered = filtered.filter((p) => p.brand === brandFilter);
    }

    if (tagFilter === "sale") {
      filtered = filtered.filter((p) => p.tags && p.tags.includes("sale"));
    } else if (tagFilter === "hot") {
      filtered = filtered.filter((p) => p.tags && p.tags.includes("hot"));
    } else if (tagFilter === "hot-and-sale") {
      filtered = filtered.filter(
        (p) => p.tags && p.tags.includes("hot") && p.tags.includes("sale")
      );
    }

    const sortFunctions = {
      "name-asc": (a, b) => a.title.localeCompare(b.title),
      "price-asc": (a, b) =>
        (a.salePrice || a.price) - (b.salePrice || b.price),
      "price-desc": (a, b) =>
        (b.salePrice || b.price) - (a.salePrice || a.price),
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
            <Col key={product.id}>
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
