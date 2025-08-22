import React, { useContext } from "react";
import { Container, Alert } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const CheckoutPage = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Container className="my-5 text-center">
      <Alert variant="success" className="p-5 shadow-lg">
        <Alert.Heading as="h1">Checkout Successful!</Alert.Heading>
        <p className="lead">
          Thank you for your order. This is where the final payment process
          would take place in a real application.
        </p>
      </Alert>
    </Container>
  );
};

export default CheckoutPage;
