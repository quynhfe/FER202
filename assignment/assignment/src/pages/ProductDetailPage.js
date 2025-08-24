import React, { useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Badge,
  Card,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useProducts } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { AuthContext } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import LoginConfirmationModal from "../components/LoginConfirmationModal";
import { FaShoppingCart, FaHeart, FaArrowLeft } from "react-icons/fa";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { products, loading, error } = useProducts();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isWished } = useContext(WishlistContext);
  const { isAuthenticated, setRedirectPath } = useContext(AuthContext);
  const { showToast } = useToast();
  const [modalShow, setModalShow] = React.useState(false);

  if (loading) {
    return (
      <div className="text-center my-5 p-5">
        <Spinner animation="border" />
        <p>Loading Product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">Error loading products: {error}</Alert>
      </Container>
    );
  }

  // Fix: Try both string and number comparison
  const product = products.find((p) => {
    return p.id === parseInt(id) || p.id === id || p.id.toString() === id;
  });

  // Debug: Add console.log to check the values
  console.log("URL ID:", id, "Type:", typeof id);
  console.log(
    "Products:",
    products.map((p) => ({ id: p.id, type: typeof p.id }))
  );
  console.log("Found product:", product);

  if (!product) {
    return (
      <Container className="text-center my-5">
        <Alert variant="warning">
          <h2>Product not found!</h2>
          <p>The product you are looking for might not exist.</p>
          <p>Requested ID: {id}</p>
          <Button as={Link} to="/products">
            Back to Products
          </Button>
        </Alert>
      </Container>
    );
  }

  const handleWishlistClick = () => {
    if (!isAuthenticated) {
      setRedirectPath(`/product/${id}`);
      setModalShow(true);
    } else {
      const wasAdded = !isWished(product.id);
      toggleWishlist(product);
      showToast(
        wasAdded ? "Added to wishlist!" : "Removed from wishlist.",
        wasAdded ? "success" : "warning"
      );
    }
  };

  const handleConfirmLogin = () => {
    setModalShow(false);
    navigate("/login");
  };

  const handleAddToCartClick = () => {
    addToCart(product);
    showToast("Added to cart!", "success");
  };

  const wished = isWished(product.id);

  return (
    <>
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={11} lg={10}>
            <Card className="product-detail-card flex-md-row">
              <Col md={6} className="p-3">
                <div className="position-relative">
                  <Image
                    src={product.image}
                    alt={product.title}
                    className="product-detail-image"
                  />
                  {product.tags && product.tags.includes("hot") && (
                    <Badge
                      bg="danger"
                      className="position-absolute top-0 end-0 m-3"
                    >
                      HOT
                    </Badge>
                  )}
                </div>
              </Col>
              <Col md={6} className="d-flex flex-column product-detail-content">
                <h1 className="product-detail-title">{product.title}</h1>
                <p className="product-detail-brand">{product.brand}</p>
                <p className="product-detail-description">
                  {product.description}
                </p>

                <div className="product-detail-price">
                  {product.salePrice ? (
                    <>
                      <span className="text-danger fs-4 me-3">
                        ${product.salePrice}
                      </span>
                      <span className="text-muted text-decoration-line-through fs-5">
                        ${product.price}
                      </span>
                    </>
                  ) : (
                    <span className="fs-4">${product.price}</span>
                  )}
                </div>

                <div className="product-detail-actions mt-auto d-grid gap-3">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleAddToCartClick}
                  >
                    <FaShoppingCart className="me-2" /> Add to Cart
                  </Button>
                  <Button
                    variant={wished ? "danger" : "outline-danger"}
                    size="lg"
                    onClick={handleWishlistClick}
                  >
                    <FaHeart className="me-2" />
                    {wished ? "In Wishlist" : "Add to Wishlist"}
                  </Button>

                  <Link
                    to="/products"
                    className="btn btn-link mt-3 align-self-start"
                  >
                    <FaArrowLeft className="me-2" />
                    Back to Products
                  </Link>
                </div>
              </Col>
            </Card>
          </Col>
        </Row>
      </Container>

      <LoginConfirmationModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onConfirm={handleConfirmLogin}
      />
    </>
  );
};

export default ProductDetailPage;
