import React, { useState, useContext, useCallback } from "react";
import { Button, ProgressBar, Alert, Form } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import AboutStep from "./AboutStep";
import AccountStep from "./AccountStep";
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

  const validateStep = useCallback(() => {
    const newErrors = {};
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
      if (!fullName) newErrors.fullName = "Full name is required.";
      if (!/^\S+@\S+\.\S+$/.test(email))
        newErrors.email = "Valid email is required.";
    }

    if (step === 2) {
      if (!username) newErrors.username = "Username is required.";
      else if (username.length < 6)
        newErrors.username = "Username must be at least 6 characters.";

      if (!password) newErrors.password = "Password is required.";
      else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          password
        )
      ) {
        newErrors.password =
          "Must be 8+ characters, with uppercase, number, and special character.";
      }
      if (password !== confirm) newErrors.confirm = "Passwords do not match.";
      if (!secretQuestion)
        newErrors.secretQuestion = "Please select a question.";
      if (!secretAnswer) newErrors.secretAnswer = "Answer is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [step, data]);

  const nextStep = () => {
    if (validateStep()) {
      setStep((s) => s + 1);
    }
  };

  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (validateStep()) {
        setFormError("");
        const result = await register(data);
        if (result.success) {
          showToast("Registration successful! Welcome!", "success");
        } else {
          setFormError(result.message);
        }
      }
    },
    [validateStep, register, data, showToast]
  );

  return (
    <>
      <h2 className="text-center mb-4">Create an Account</h2>
      {formError && <Alert variant="danger">{formError}</Alert>}
      <ProgressBar now={(step / 2) * 100} className="mb-4" />
      <Form noValidate onSubmit={handleSubmit}>
        {step === 1 && (
          <AboutStep
            data={data}
            setData={setData}
            errors={errors}
            setErrors={setErrors}
          />
        )}
        {step === 2 && (
          <AccountStep
            data={data}
            setData={setData}
            errors={errors}
            secretQuestions={config.app.SECRET_QUESTIONS}
          />
        )}

        <div className="d-flex justify-content-between mt-4">
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
            <Button variant="success" type="submit">
              Submit
            </Button>
          )}
        </div>
      </Form>
    </>
  );
};

export default RegisterWizard;
