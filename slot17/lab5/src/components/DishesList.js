import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Button, Badge } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import { FavouritesContext } from "../context/FavouritesContext";
import { ToastContext } from "../context/ToastContext";
import { FaEye, FaShoppingCart, FaHeart, FaTrash } from "react-icons/fa";

const DishesList = ({ dishes, isFavouritesPage = false }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { addFavourite, removeFavourite, isFavourite } =
    useContext(FavouritesContext);
  const { showToast } = useContext(ToastContext);

  const handleFavouriteClick = (dish) => {
    if (isFavourite(dish.id)) {
      navigate("/favourites");
    } else {
      addFavourite(dish);
      showToast(`Added "${dish.name}" to favourites!`, "info");
    }
  };

  const handleRemoveFavourite = (dishId, dishName) => {
    removeFavourite(dishId);
    showToast(`Removed "${dishName}" from favourites!`, "warning");
  };

  const handleAddToCart = (dish) => {
    addToCart(dish);
    showToast(`Added "${dish.name}" to your cart!`);
  };

  return (
    <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
      {dishes.map((dish) => {
        const alreadyFavourite = isFavourite(dish.id);
        return (
          <Col key={dish.id}>
            <Card className="h-100 shadow-sm dish-card">
              <div className="img-box">
                <Card.Img variant="top" src={dish.image} alt={dish.name} />
                <Badge pill bg="dark" className="dish-category">
                  {dish.category}
                </Badge>
              </div>
              <Card.Body className="d-flex flex-column">
                <div className="flex-grow-1">
                  <Card.Title className="fw-bold">{dish.name}</Card.Title>
                  <Card.Text className="text-muted small">
                    {dish.description}
                  </Card.Text>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <p className="fw-bold text-primary mb-0 fs-5">
                    ${parseFloat(dish.price).toFixed(2)}
                  </p>
                  {isFavouritesPage ? (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveFavourite(dish.id, dish.name)}
                      title="Remove from Favourites"
                    >
                      <FaTrash />
                    </Button>
                  ) : (
                    <Button
                      variant={alreadyFavourite ? "primary" : "outline-danger"}
                      size="sm"
                      onClick={() => handleFavouriteClick(dish)}
                      title={
                        alreadyFavourite
                          ? "Browse Favourites"
                          : "Add to Favourites"
                      }
                    >
                      <FaHeart />
                    </Button>
                  )}
                </div>
              </Card.Body>
              <Card.Footer className="d-grid gap-2">
                <Button variant="success" onClick={() => handleAddToCart(dish)}>
                  <FaShoppingCart className="me-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => navigate(`/dishes/${dish.id}`)}
                >
                  <FaEye className="me-2" />
                  View Details
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        );
      })}
    </Row>
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
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
  isFavouritesPage: PropTypes.bool,
};

export default DishesList;
