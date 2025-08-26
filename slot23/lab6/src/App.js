import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { Container, Row, Col, Card } from "react-bootstrap";
import LoginForm from "./features/auth/LoginForm";
import FilterBar from "./features/products/FilterBar";
import ProductList from "./features/products/ProductList";
import Cart from "./features/cart/Cart";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="app-container">
        <Container>
          <header className="app-header">
            <h1>🔥 Demo Redux App</h1>
            <p>Một ví dụ đơn giản về cách Redux Toolkit hoạt động.</p>
          </header>

          <Row className="g-5">
            <Col lg={7}>
              <FilterBar />
              <ProductList />
            </Col>

            <Col lg={5}>
              <div className="sidebar">
                <LoginForm />
                <Cart />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Provider>
  );
}

export default App;
