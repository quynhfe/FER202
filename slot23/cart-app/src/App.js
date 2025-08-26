import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import { Container } from "react-bootstrap";

export default function App() {
  return (
    <Provider store={store}>
      <Container className="mt-4">
        <h2>🛒 Cart App</h2>
        <ProductList />
        <hr />
        <Cart />
      </Container>
    </Provider>
  );
}
