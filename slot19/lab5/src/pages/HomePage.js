import React, { useState, useMemo, useContext } from "react";
import { Container, Form, FormControl, Alert, Row, Col } from "react-bootstrap";
import Hero from "../components/Hero";
import DishesList from "../components/DishesList";
import PaginationComponent from "../components/PaginationComponent";
import { DishesContext } from "../context/DishesContext";
import DishFilters from "../components/DishFilters";

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const { dishes } = useContext(DishesContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const filteredDishes = useMemo(() => {
    let result = [...dishes];

    if (searchTerm.trim()) {
      result = result.filter(
        (dish) =>
          dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dish.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (category !== "All") {
      result = result.filter((dish) => dish.category === category);
    }
    if (sortOrder === "price_asc") {
      result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortOrder === "price_desc") {
      result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }
    return result;
  }, [searchTerm, category, sortOrder, dishes]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDishes = filteredDishes.slice(indexOfFirstItem, indexOfLastItem);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <>
      <Hero />
      <Container className="my-4">
        <Row className="mb-4 align-items-center">
          <Col md={5}>
            <Form className="flex-grow-1">
              <FormControl
                type="search"
                placeholder="Search for your favorite dish..."
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </Form>
          </Col>
          <Col md={7}>
            <Row className="align-items-center g-2">
              <Col md={8}>
                <DishFilters
                  category={category}
                  setCategory={(value) => {
                    setCategory(value);
                    setCurrentPage(1);
                  }}
                  sortOrder={sortOrder}
                  setSortOrder={(value) => {
                    setSortOrder(value);
                    setCurrentPage(1);
                  }}
                />
              </Col>
              <Col md={4}>
                <Form.Select
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                >
                  <option value={6}>6 per page</option>
                  <option value={9}>9 per page</option>
                  <option value={12}>12 per page</option>
                </Form.Select>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={10} xl={9}>
            {currentDishes.length > 0 ? (
              <DishesList dishes={currentDishes} />
            ) : (
              <Alert variant="warning" className="text-center">
                No dishes found matching your criteria.
              </Alert>
            )}

            <PaginationComponent
              totalItems={filteredDishes.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomePage;
