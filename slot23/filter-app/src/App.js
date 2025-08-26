import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import FilterBar from "./components/FilterBar";
import ProductList from "./components/ProductList";
import { Container } from "react-bootstrap";

export default function App() {
  return (
    <Provider store={store}>
      <Container className="mt-4">
        <h2>🔎 Filter App</h2>
        <FilterBar />
        <ProductList />
      </Container>
    </Provider>
  );
}
