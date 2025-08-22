import React, { useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, Button, Badge } from "react-bootstrap";
import { dishes } from "../data/data";
import { CartContext } from "../context/CartContext";
import { FavouritesContext } from "../context/FavouritesContext";
import { ToastContext } from "../context/ToastContext";
import { FaShoppingCart, FaHeart, FaArrowLeft } from "react-icons/fa";

const DishDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dish = dishes.find((d) => d.id === parseInt(id));

  const { addToCart } = useContext(CartContext);
  const { addFavourite, isFavourite } = useContext(FavouritesContext);
  const { showToast } = useContext(ToastContext);

  if (!dish) {
    return (
      <Container className="text-center my-5">
        <h2>Dish Not Found!</h2>
        <p>The dish you are looking for does not exist.</p>
        <Link to="/home" className="btn btn-primary">
          Go Back Home
        </Link>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addToCart(dish);
    showToast(`Added "${dish.name}" to your cart!`);
  };

  const handleFavouriteClick = () => {
    if (isFavourite(dish.id)) {
      navigate("/favourites");
    } else {
      addFavourite(dish);
      showToast(`Added "${dish.name}" to your favourites!`, "info");
    }
  };

  const alreadyFavourite = isFavourite(dish.id);

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <div className="dish-detail-card">
            <Row>
              <Col md={6}>
                <Image src={`/${dish.image}`} alt={dish.name} fluid rounded />
              </Col>
              <Col md={6} className="d-flex flex-column p-4">
                <div className="flex-grow-1">
                  <Badge pill bg="info" className="mb-2">
                    {dish.category}
                  </Badge>
                  <h1>{dish.name}</h1>
                  <p className="lead text-muted">{dish.description}</p>
                  <h3 className="text-primary fw-bold my-3">
                    ${parseFloat(dish.price).toFixed(2)}
                  </h3>
                </div>
                <div className="mt-4 d-grid gap-2 d-md-flex">
                  <Button variant="success" onClick={handleAddToCart} size="lg">
                    <FaShoppingCart className="me-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant={alreadyFavourite ? "primary" : "outline-danger"}
                    onClick={handleFavouriteClick}
                    size="lg"
                  >
                    <FaHeart className="me-2" />
                    {alreadyFavourite
                      ? "Browse Favourites"
                      : "Add to Favourite"}
                  </Button>
                </div>
                <Link to="/home" className="btn btn-link mt-3">
                  <FaArrowLeft className="me-2" />
                  Back to List
                </Link>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DishDetailPage;
