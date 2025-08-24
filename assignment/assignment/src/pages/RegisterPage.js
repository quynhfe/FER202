import React from "react";
import { Card } from "react-bootstrap";
import RegisterWizard from "../components/auth/RegisterWizard";

const RegisterPage = () => {
  return (
    <Card>
      <Card.Body className="p-4 p-md-5">
        <RegisterWizard />
      </Card.Body>
    </Card>
  );
};

export default RegisterPage;
