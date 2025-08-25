// src/components/CartDetail.js

import React, { useContext } from "react";
import {
  Container,
  Card,
  Button,
  ListGroup,
  Row,
  Col,
  Alert,
  Image,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import config from "../config"; // Import config

const CartDetail = () => {
  const { cartState, incQty, decQty, removeFromCart, subtotal } =
    useContext(CartContext);
  const navigate = useNavigate();

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4 mt-4">Shopping Cart</h1>
      {cartState.items.length === 0 ? (
        <Alert variant="info" className="text-center p-4">
          <h4>Your cart is empty.</h4>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Button as={Link} to="/products" variant="primary">
            Go Shopping
          </Button>
        </Alert>
      ) : (
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item className="d-none d-md-flex fw-bold">
              <Col md={6}>Product</Col>
              <Col md={3} className="text-center">
                Quantity
              </Col>
              <Col md={2} className="text-end">
                Total
              </Col>
              <Col md={1}></Col>
            </ListGroup.Item>
            {cartState.items.map((item) => {
              const itemId = config.getField("productId", item);
              const itemTitle = config.getField("productTitle", item);
              const itemImage = config.getField("productImage", item);
              const itemBrand = config.getField("productBrand", item);
              const itemPrice = config.getField("productPrice", item);
              const itemSalePrice = config.getField("productSalePrice", item);

              return (
                <ListGroup.Item key={itemId}>
                  <Row className="align-items-center">
                    <Col
                      xs={12}
                      md={6}
                      className="d-flex align-items-center mb-3 mb-md-0"
                    >
                      <Image
                        src={itemImage}
                        alt={itemTitle}
                        className="cart-item-image me-3"
                      />
                      <div>
                        <h5 className="mb-0">{itemTitle}</h5>
                        <small className="text-muted">{itemBrand}</small>
                      </div>
                    </Col>
                    <Col
                      xs={8}
                      md={3}
                      className="d-flex justify-content-md-center align-items-center"
                    >
                      <div className="cart-quantity-controls">
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          onClick={() => decQty(itemId)}
                        >
                          <FaMinus />
                        </Button>
                        <span className="mx-3 fs-5">{item.qty}</span>
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          onClick={() => incQty(itemId)}
                        >
                          <FaPlus />
                        </Button>
                      </div>
                    </Col>
                    <Col xs={4} md={2} className="text-end fw-bold">
                      ${((itemSalePrice || itemPrice) * item.qty).toFixed(2)}
                    </Col>
                    <Col xs={12} md={1} className="text-md-end mt-2 mt-md-0">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeFromCart(itemId)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
          <Card.Footer className="p-3">
            <Row className="align-items-center">
              <Col md={6}>
                <Button
                  variant="secondary"
                  onClick={() => navigate("/products")}
                >
                  Continue Shopping
                </Button>
              </Col>
              <Col md={6} className="text-md-end mt-3 mt-md-0">
                <h4 className="mb-3">
                  Subtotal: <span className="text-primary">${subtotal}</span>
                </h4>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </Button>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      )}
    </Container>
  );
};

export default CartDetail;
