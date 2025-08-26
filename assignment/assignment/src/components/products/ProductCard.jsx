// src/components/products/ProductCard.js

import React, { useContext } from "react";
import { Card, Button, Badge } from "react-bootstrap";
// MODIFICATION: Import useLocation
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { AuthContext } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import config from "../../config";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isWished } = useContext(WishlistContext);
  const { isAuthenticated, setRedirectPath } = useContext(AuthContext);
  const { showToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const productId = config.getField("productId", product);
  const productTitle = config.getField("productTitle", product);
  const productBrand = config.getField("productBrand", product);
  const productImage = config.getField("productImage", product);
  const productPrice = config.getField("productPrice", product);
  const productSalePrice = config.getField("productSalePrice", product);
  const productTags = config.getField("productTags", product) || [];
  // console.log("Config đọc được:", config.fields.productTitle);
  const handleAddToWishlist = () => {
    if (!isAuthenticated) {
      showToast("Please sign in to save to wishlist", "info");
      setRedirectPath(location.pathname);
      navigate("/login");
    } else {
      toggleWishlist(product);
      showToast("Added to wishlist!", "success");
    }
  };

  // MODIFICATION: Add a specific handler for removing
  const handleRemoveFromWishlist = () => {
    toggleWishlist(product);
    showToast("Removed from wishlist", "warning");
  };

  const handleAddToCart = () => {
    addToCart(product);
    showToast("Added to cart!", "success");
  };

  const wished = isWished(productId);
  // MODIFICATION: Check if we are on the wishlist page
  const onWishlistPage = location.pathname === "/wishlist";

  return (
    <Card className="h-100 product-card">
      <div className="product-image-container">
        <Card.Img
          variant="top"
          src={productImage}
          className="product-image"
          alt={productTitle}
        />
        {productTags.includes("hot") && (
          <Badge bg="danger" className="product-tag-hot">
            HOT
          </Badge>
        )}
      </div>

      <Card.Body className="product-content">
        <Card.Title className="product-title">{productTitle}</Card.Title>
        <Card.Text className="product-brand">{productBrand}</Card.Text>

        <div className="price-section">
          {productSalePrice ? (
            <>
              <span className="text-danger me-2">${productSalePrice}</span>
              <span className="text-muted text-decoration-line-through">
                ${productPrice}
              </span>
            </>
          ) : (
            <div className="fw-bold">${productPrice}</div>
          )}
        </div>
      </Card.Body>

      <Card.Footer className="bg-transparent border-0 p-3">
        <div className="d-grid gap-2">
          <Button
            as={Link}
            to={`/product/${productId}`}
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

            {onWishlistPage ? (
              <Button
                variant="outline-danger"
                className="flex-fill"
                onClick={handleRemoveFromWishlist}
              >
                Remove from Wishlist
              </Button>
            ) : wished ? (
              <Button
                as={Link}
                to="/wishlist"
                variant="info"
                className="flex-fill"
              >
                View Wishlist
              </Button>
            ) : (
              <Button
                variant="outline-danger"
                className="flex-fill"
                onClick={handleAddToWishlist}
              >
                ♡ Wishlist
              </Button>
            )}
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;
