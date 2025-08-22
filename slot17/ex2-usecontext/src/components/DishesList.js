import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import PropTypes from "prop-types";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const DishesList = ({ dishes }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4 fw-bold p-3">Danh sách món ăn</h2>
      <Row className="g-4">
        {dishes.map((dish) => (
          <Col key={dish.id} md={3} sm={6}>
            <Card className="h-100 shadow-sm d-flex flex-column">
              <div className="img-box">
                <Card.Img
                  variant="top"
                  src={dish.image}
                  alt={dish.name}
                  className="img-fluid"
                />
              </div>
              <Card.Body className="text-center flex-grow-1">
                <Card.Title>{dish.name}</Card.Title>
                <Card.Text className="text-muted">{dish.description}</Card.Text>
                <p className="fw-bold text-primary">
                  {`$${parseFloat(dish.price).toFixed(2)}`}
                </p>
              </Card.Body>
              <Card.Footer className="bg-transparent border-0 text-center">
                <Button
                  variant="success"
                  onClick={() => addToCart(dish)}
                  className="w-50"
                >
                  Add to Cart
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

DishesList.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DishesList;
