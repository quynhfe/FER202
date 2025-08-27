// components/ProductCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Badge, ButtonGroup, Toast, ToastContainer } from 'react-bootstrap';
import { FaEye, FaCartPlus, FaHeart, FaCheck } from 'react-icons/fa';
import { formatPrice } from '../utils/format';
import { useApp } from '../contexts/AppContext.jsx';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart, addToFavourites, isInCart, isInFavourites } = useApp();
    const [showToast, setShowToast] = React.useState(false);
    const [toastMessage, setToastMessage] = React.useState('');
    const [toastVariant, setToastVariant] = React.useState('success');

    const handleViewDetails = () => {
        navigate(`/products/${product.id}`);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product);
        setToastMessage('Product added to cart!');
        setToastVariant('success');
        setShowToast(true);
    };

    const handleAddToFavourites = (e) => {
        e.stopPropagation();
        if (!isInFavourites(product.id)) {
            addToFavourites(product);
            setToastMessage('Product added to favourites!');
            setToastVariant('success');
            setShowToast(true);
        } else {
            setToastMessage('Product already in favourites!');
            setToastVariant('info');
            setShowToast(true);
        }
    };

    return (
        <>
            <Card className="h-100 shadow-sm product-card">
                <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.name}
                    style={{
                        height: '200px',
                        objectFit: 'cover',
                        cursor: 'pointer'
                    }}
                    onClick={handleViewDetails}
                />
                <Card.Body className="d-flex flex-column">
                    <div className="mb-2">
                        <Badge bg="secondary" className="mb-2">
                            {product.category}
                        </Badge>
                    </div>

                    <Card.Title
                        className="h6 mb-2 cursor-pointer"
                        onClick={handleViewDetails}
                        style={{ cursor: 'pointer' }}
                    >
                        {product.name}
                    </Card.Title>

                    <Card.Text className="flex-grow-1 small text-muted mb-2">
                        {product.description}
                    </Card.Text>

                    <div className="mb-3">
                        <Badge bg="primary" className="fs-6">
                            {formatPrice(product.price)}
                        </Badge>
                    </div>

                    <ButtonGroup className="w-100">
                        <Button
                            variant="outline-primary"
                            size="sm"
                            className="flex-fill"
                            onClick={handleViewDetails}
                        >
                            <FaEye className="me-1" />
                            View
                        </Button>

                        <Button
                            variant={isInCart(product.id) ? "success" : "outline-success"}
                            size="sm"
                            className="flex-fill"
                            onClick={handleAddToCart}
                        >
                            {isInCart(product.id) ? <FaCheck className="me-1" /> : <FaCartPlus className="me-1" />}
                            {isInCart(product.id) ? 'Added' : 'Cart'}
                        </Button>

                        <Button
                            variant={isInFavourites(product.id) ? "danger" : "outline-danger"}
                            size="sm"
                            className="flex-fill"
                            onClick={handleAddToFavourites}
                        >
                            <FaHeart className="me-1" />
                            {isInFavourites(product.id) ? 'Liked' : 'Like'}
                        </Button>
                    </ButtonGroup>
                </Card.Body>
            </Card>

            <ToastContainer
                className="p-3"
                position="top-end"
                style={{ zIndex: 1050 }}
            >
                <Toast
                    show={showToast}
                    onClose={() => setShowToast(false)}
                    delay={3000}
                    autohide
                    bg={toastVariant}
                >
                    <Toast.Header>
                        <strong className="me-auto">Notification</strong>
                    </Toast.Header>
                    <Toast.Body className={toastVariant === 'success' ? 'text-white' : ''}>
                        {toastMessage}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
};

export default ProductCard;