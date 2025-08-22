import React, {
  useReducer,
  useMemo,
  useCallback,
  useEffect,
  useState,
} from "react";
import PropTypes from "prop-types";
import { Modal, Button, ProgressBar } from "react-bootstrap";
import AboutStep from "./AboutStep";
import AddressStep from "./AddressStep";
import ConfirmationModal from "./ConfirmationModal";
import { FaUser, FaMapMarkerAlt } from "react-icons/fa";

const initialState = {
  step: 1,
  profileImage: null,
  previewImage: null,
  firstName: "",
  lastName: "",
  email: "",
  age: "",
  streetName: "",
  streetNumber: "",
  city: "",
  country: "Viet Nam",
  errors: {},
};

function wizardReducer(state, action) {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.payload.field]: action.payload.value,
        errors: { ...state.errors, [action.payload.field]: null },
      };
    case "SET_ERRORS":
      return { ...state, errors: action.payload };
    case "SET_IMAGE":
      return {
        ...state,
        profileImage: action.payload.file,
        previewImage: action.payload.preview,
      };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

const ProfileWizard = ({ show, handleClose, onAddStudent }) => {
  const [state, dispatch] = useReducer(wizardReducer, initialState);
  const [isAttempted, setIsAttempted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    setIsAttempted(false);
  }, [state.step]);

  const validateStep = useCallback(() => {
    const {
      step,
      firstName,
      lastName,
      email,
      age,
      streetName,
      streetNumber,
      city,
      country,
    } = state;
    const errors = {};

    if (step === 1) {
      if (!firstName) errors.firstName = "First name is required";
      if (!lastName) errors.lastName = "Last name is required";
      if (!email || !/\S+@\S+\.\S+/.test(email))
        errors.email = "A valid email is required";
      if (!age || age < 18 || age > 100)
        errors.age = "Age must be between 18 and 100";
    } else if (step === 2) {
      if (!streetName) errors.streetName = "Street name is required";
      if (!streetNumber) errors.streetNumber = "Street number is required";
      if (!city) errors.city = "City is required";
      if (!country) errors.country = "Country is required";
    }

    dispatch({ type: "SET_ERRORS", payload: errors });
    return Object.keys(errors).length === 0;
  }, [state]);

  const progress = useMemo(
    () => Math.round(((state.step - 1) / 1) * 100),
    [state.step]
  );

  const nextStep = useCallback(() => {
    setIsAttempted(true);
    if (validateStep() && state.step < 2) {
      dispatch({ type: "SET_STEP", payload: state.step + 1 });
    }
  }, [state.step, validateStep]);

  const prevStep = useCallback(() => {
    if (state.step > 1) {
      dispatch({ type: "SET_STEP", payload: state.step - 1 });
    }
  }, [state.step]);

  const onFieldChange = useCallback((field, value) => {
    dispatch({ type: "UPDATE_FIELD", payload: { field, value } });
  }, []);

  const onFileChange = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      dispatch({
        type: "SET_IMAGE",
        payload: { file, preview: URL.createObjectURL(file) },
      });
    }
  }, []);

  const handleFinish = () => {
    setIsAttempted(true);
    if (validateStep()) {
      setShowConfirmModal(true);
    }
  };

  const handleConfirmAndSubmit = () => {
    onAddStudent(state);
    setShowConfirmModal(false);
    closeAndReset();
  };

  const closeAndReset = () => {
    handleClose();
    setTimeout(() => {
      dispatch({ type: "RESET" });
      setIsAttempted(false);
    }, 300);
  };

  const renderStep = () => {
    const commonProps = { data: state, onFieldChange, errors: state.errors };
    switch (state.step) {
      case 1:
        return <AboutStep {...commonProps} onFileChange={onFileChange} />;
      case 2:
        return <AddressStep {...commonProps} />;
      default:
        return null;
    }
  };

  const steps = [
    { num: 1, icon: <FaUser />, name: "About" },
    { num: 2, icon: <FaMapMarkerAlt />, name: "Address" },
  ];

  return (
    <>
      <Modal
        show={show}
        onHide={closeAndReset}
        size="lg"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Build Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className="wizard-header">
            {steps.map((s) => (
              <div
                key={s.num}
                className={`wizard-step ${
                  state.step === s.num ? "active" : ""
                } ${state.step > s.num ? "completed" : ""}`}
              >
                <div className="wizard-step-icon">{s.icon}</div>
                <div className="wizard-step-name">{s.name}</div>
              </div>
            ))}
          </div>
          <ProgressBar now={progress} className="mb-4" />
          {renderStep()}
        </Modal.Body>
        <Modal.Footer>
          {state.step > 1 && (
            <Button variant="secondary" onClick={prevStep}>
              Previous
            </Button>
          )}
          {state.step < 2 && (
            <Button variant="primary" onClick={nextStep}>
              Next
            </Button>
          )}
          {state.step === 2 && (
            <Button variant="success" onClick={handleFinish}>
              Finish
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <ConfirmationModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmAndSubmit}
        data={state}
      />
    </>
  );
};

ProfileWizard.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onAddStudent: PropTypes.func.isRequired,
};

export default ProfileWizard;
