// src/components/auth/RegisterWizard.js

import React, { useState, useContext, useCallback } from "react";
import { Button, ProgressBar, Alert, Form, Card } from "react-bootstrap";
import { FaUser, FaLock, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import AboutStep from "./AboutStep";
import AccountStep from "./AccountStep";
import ConfirmationModal from "./ConfirmationModal";
import config from "../../config";

const RegisterWizard = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    fullName: "",
    email: "",
    avatar: null,
    username: "",
    password: "",
    confirm: "",
    secretQuestion: "",
    secretAnswer: "",
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const { register } = useContext(AuthContext);
  const { showToast } = useToast();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkEmailExists = async (email) => {
    try {
      const response = await fetch(
        `${config.dbUrl}/${config.collections.accounts}`
      );
      if (!response.ok) return false;
      const accounts = await response.json();
      return accounts.some(
        (account) => config.getField("userEmail", account) === email
      );
    } catch (error) {
      console.error("Failed to check email:", error);
      return false;
    }
  };

  const checkUsernameExists = async (username) => {
    try {
      const response = await fetch(
        `${config.dbUrl}/${config.collections.accounts}`
      );
      if (!response.ok) return false;
      const accounts = await response.json();
      return accounts.some(
        (account) => config.getField("userName", account) === username
      );
    } catch (error) {
      console.error("Failed to check username:", error);
      return false;
    }
  };

  const validateStep = useCallback(() => {
    const syncErrors = {};
    const {
      fullName,
      email,
      username,
      password,
      confirm,
      secretQuestion,
      secretAnswer,
    } = data;

    if (step === 1) {
      if (!fullName) syncErrors.fullName = "Full name is required.";
      if (!/^\S+@\S+\.\S+$/.test(email))
        syncErrors.email = "Valid email is required.";
    }

    if (step === 2) {
      if (!username) syncErrors.username = "Username is required.";
      else if (username.length < 6)
        syncErrors.username = "Username must be at least 6 characters.";

      if (!password) syncErrors.password = "Password is required.";
      else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          password
        )
      ) {
        syncErrors.password =
          "Must be 8+ characters, with uppercase, number, and special character.";
      }
      if (password !== confirm) syncErrors.confirm = "Passwords do not match.";
      if (!secretQuestion)
        syncErrors.secretQuestion = "Please select a question.";
      if (!secretAnswer) syncErrors.secretAnswer = "Answer is required.";
    }

    setErrors((prevErrors) => ({ ...prevErrors, ...syncErrors }));
    const combinedErrors = { ...errors, ...syncErrors };
    const stepFields =
      step === 1
        ? ["fullName", "email", "avatar"]
        : ["username", "password", "confirm", "secretQuestion", "secretAnswer"];
    const hasErrorInCurrentStep = stepFields.some(
      (field) => !!combinedErrors[field]
    );
    return !hasErrorInCurrentStep;
  }, [step, data, errors]);

  const nextStep = () => {
    if (validateStep()) {
      setStep((s) => s + 1);
    }
  };

  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      setShowConfirmModal(true);
    }
  };

  const handleConfirmAndSubmit = async () => {
    setIsSubmitting(true);
    setFormError("");
    const result = await register(data);

    if (result.success) {
      showToast("Registration successful! Please sign in.", "success");
      // The context now handles navigation.
    } else {
      setFormError(result.message);
      setShowConfirmModal(false);
    }

    setIsSubmitting(false);
  };

  const steps = [
    { num: 1, icon: <FaUser />, name: "About You" },
    { num: 2, icon: <FaLock />, name: "Account" },
  ];

  return (
    <>
      <Card className="auth-form-card">
        <Card.Header className="auth-form-header">
          <h1 className="text-center auth-form-title">Create an Account</h1>
          {formError && <Alert variant="danger">{formError}</Alert>}
          <div className="wizard-header">
            {steps.map((s, index) => (
              <React.Fragment key={s.num}>
                <div
                  className={`wizard-step ${step === s.num ? "active" : ""} ${
                    step > s.num ? "completed" : ""
                  }`}
                >
                  <div className="wizard-step-icon">
                    {step > s.num ? <FaCheck /> : s.icon}
                  </div>
                  <div className="wizard-step-name">{s.name}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className="wizard-connector" />
                )}
              </React.Fragment>
            ))}
          </div>
          <ProgressBar
            now={((step - 1) / (steps.length - 1)) * 100}
            className="mb-3"
          />
        </Card.Header>
        <Card.Body className="register-form-content auth-form-body">
          <Form noValidate>
            {step === 1 && (
              <AboutStep
                data={data}
                setData={setData}
                errors={errors}
                setErrors={setErrors}
                checkEmailExists={checkEmailExists}
              />
            )}
            {step === 2 && (
              <AccountStep
                data={data}
                setData={setData}
                errors={errors}
                setErrors={setErrors}
                checkUsernameExists={checkUsernameExists}
                secretQuestions={config.app.SECRET_QUESTIONS}
              />
            )}
          </Form>
        </Card.Body>
        <Card.Footer className="wizard-navigation auth-form-footer">
          {step > 1 ? (
            <Button variant="secondary" onClick={prevStep}>
              Previous
            </Button>
          ) : (
            <div />
          )}
          {step < 2 ? (
            <Button variant="primary" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </Card.Footer>
      </Card>

      <div className="text-center mt-3">
        Already have an account? <Link to="/login">Sign In</Link>
      </div>

      <ConfirmationModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmAndSubmit}
        data={data}
        isLoading={isSubmitting}
      />
    </>
  );
};

export default RegisterWizard;
