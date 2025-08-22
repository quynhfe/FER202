import React, { useState, useMemo, useContext } from "react"; // Thêm useContext
import { Container, Form, FormControl, Alert } from "react-bootstrap";
import Hero from "../components/Hero";
import DishesList from "../components/DishesList";
import DishFilters from "../components/DishFilters";
import { DishesContext } from "../context/DishesContext"; // 1. Import DishesContext

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const { dishes } = useContext(DishesContext); // 2. Lấy danh sách món ăn từ context

  const filteredDishes = useMemo(() => {
    let result = [...dishes]; // Sử dụng 'dishes' từ context

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
  }, [searchTerm, category, sortOrder, dishes]); // 3. Thêm 'dishes' vào dependency array

  return (
    <>
      <Hero />
      <Container className="my-4">
        <div className="d-flex flex-column flex-md-row gap-3 mb-4">
          <Form className="flex-grow-1">
            <FormControl
              type="search"
              placeholder="Search for your favorite dish..."
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>
          <DishFilters
            category={category}
            setCategory={setCategory}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        </div>

        {filteredDishes.length > 0 ? (
          <DishesList dishes={filteredDishes} />
        ) : (
          <Alert variant="warning" className="text-center">
            No dishes found matching your criteria.
          </Alert>
        )}
      </Container>
    </>
  );
}

export default HomePage;
