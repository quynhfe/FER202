import React, { useContext } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { AuthContext } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isWished } = useContext(WishlistContext);
  const { isAuthenticated, setRedirectPath } = useContext(AuthContext);
  const { showToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const handleWishlistClick = () => {
    if (!isAuthenticated) {
      showToast("Please sign in to save to wishlist", "info");
      setRedirectPath(location.pathname);
      navigate("/login");
    } else {
      const wasAdded = !isWished(product.id);
      toggleWishlist(product);
      showToast(
        wasAdded ? "Added to wishlist!" : "Removed from wishlist",
        wasAdded ? "success" : "warning"
      );
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    showToast("Added to cart!", "success");
  };

  const wished = isWished(product.id);

  return (
    <Card className="h-100 product-card">
      <div className="product-image-container">
        <Card.Img
          variant="top"
          src={product.image}
          className="product-image"
          alt={product.title}
        />
        {product.tags && product.tags.includes("hot") && (
          <Badge bg="danger" className="product-tag-hot">
            HOT
          </Badge>
        )}
      </div>

      <Card.Body className="product-content">
        <Card.Title className="product-title">{product.title}</Card.Title>
        <Card.Text className="product-brand">{product.brand}</Card.Text>

        <div className="price-section">
          {product.salePrice ? (
            <>
              <span className="text-danger me-2">${product.salePrice}</span>
              <span className="text-muted text-decoration-line-through">
                ${product.price}
              </span>
            </>
          ) : (
            <div className="fw-bold">${product.price}</div>
          )}
        </div>
      </Card.Body>

      <Card.Footer className="bg-transparent border-0 p-3">
        <div className="d-grid gap-2">
          <Button
            as={Link}
            to={`/product/${product.id}`}
            variant="primary"
            className="mb-2"
          >
            View Details
          </Button>

          <div className="d-flex gap-2">
            <Button
              variant="outline-primary"
              className="flex-fill"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              variant={wished ? "danger" : "outline-danger"}
              className="flex-fill"
              onClick={handleWishlistClick}
            >
              {wished ? "♥ Saved" : "♡ Save"}
            </Button>
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;
