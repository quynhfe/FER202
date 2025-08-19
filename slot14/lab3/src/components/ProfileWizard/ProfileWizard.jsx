import React, { useState, useReducer, useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form, Row, Col, InputGroup, Toast, ToastContainer, ProgressBar } from 'react-bootstrap';
import { FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';

const initialState = {
    step: 1,
    profileImage: null,
    previewImage: null,
    firstName: '',
    lastName: '',
    email: 'quynh@fe.edu.vn',
    age: '',
    username: '',
    password: '',
    confirmPassword: '',
    secretQuestion: '',
    secretAnswer: '',
    streetName: '',
    streetNumber: '',
    city: '',
    country: 'Viet Nam',
    errors: {}
};

function wizardReducer(state, action) {
    switch (action.type) {
        case 'SET_STEP':
            return { ...state, step: action.payload };
        case 'UPDATE_FIELD':
            return { ...state, [action.payload.field]: action.payload.value };
        case 'SET_ERRORS':
            return { ...state, errors: action.payload };
        case 'SET_IMAGE':
            return { ...state, profileImage: action.payload.file, previewImage: action.payload.preview };
        case 'RESET':
            return { ...initialState };
        default:
            return state;
    }
}

const ProfileWizard = ({ show, handleClose, onAddStudent }) => {
    const [state, dispatch] = useReducer(wizardReducer, initialState);
    const [showToast, setShowToast] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const secretQuestions = [
        "What is your first pet's name?", 
        "What is your mother's maiden name?", 
        "In which city were you born?", 
        "Who was your favorite teacher?"
    ];
    const countries = ["Viet Nam", "Korea", "Italy", "Japan", "USA", "Germany", "France"];

    const validateStep = useCallback(() => {
        const { step, firstName, lastName, email, age, username, password, confirmPassword, secretQuestion, secretAnswer, streetName, streetNumber, city, country } = state;
        const errors = {};
        
        if (step === 1) {
            if (!firstName) errors.firstName = 'First name is required';
            if (!lastName) errors.lastName = 'Last name is required';
            if (!email || !/\S+@\S+\.\S+/.test(email)) errors.email = 'A valid email is required';
            if (!age || age < 1 || age > 100) errors.age = 'Age must be between 1 and 100';
        } else if (step === 2) {
            if (!username || username.length < 6) errors.username = 'Username must be at least 6 characters';
            if (!password || !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(password)) {
                 errors.password = 'Needs 8+ chars, 1 uppercase, 1 number, 1 special char';
            }
            if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
            if (!secretQuestion) errors.secretQuestion = 'Please select a question';
            if (!secretAnswer) errors.secretAnswer = 'Answer is required';
        } else if (step === 3) {
            if (!streetName) errors.streetName = 'Street name is required';
            if (!streetNumber) errors.streetNumber = 'Street number is required';
            if (!city) errors.city = 'City is required';
            if (!country) errors.country = 'Country is required';
        }

        dispatch({ type: 'SET_ERRORS', payload: errors });
        return Object.keys(errors).length === 0;
    }, [state]);

    useEffect(() => {
        if (show) validateStep();
    }, [state.firstName, state.lastName, state.email, state.age, state.username, state.password, state.confirmPassword, state.secretQuestion, state.secretAnswer, state.streetName, state.streetNumber, state.city, state.country, show, validateStep]);

    const isStepValid = useMemo(() => Object.keys(state.errors).length === 0, [state.errors]);
    const progress = useMemo(() => Math.round(((state.step - 1) / 2) * 100), [state.step]);

    const nextStep = useCallback(() => {
        if (isStepValid && state.step < 3) {
            dispatch({ type: 'SET_STEP', payload: state.step + 1 });
        }
    }, [isStepValid, state.step]);

    const prevStep = useCallback(() => {
        if (state.step > 1) {
            dispatch({ type: 'SET_STEP', payload: state.step - 1 });
        }
    }, [state.step]);

    const onFieldChange = useCallback((field, value) => {
        dispatch({ type: 'UPDATE_FIELD', payload: { field, value } });
    }, []);

    const onFileChange = useCallback((event) => {
        const file = event.target.files[0];
        if (file) {
            dispatch({ type: 'SET_IMAGE', payload: { file, preview: URL.createObjectURL(file) } });
        }
    }, []);

    const handleFinish = () => {
        if (isStepValid) {
            onAddStudent(state);
            setShowToast(true);
            closeAndReset();
        }
    };
    
    const closeAndReset = () => {
        handleClose();
        setTimeout(() => {
            dispatch({ type: 'RESET' });
        }, 300);
    };

    const renderStep1 = () => (
        <div style={{ padding: '20px' }}>
            <h5 style={{ marginBottom: '20px', textAlign: 'center', color: '#495057' }}>Personal Information</h5>
            
            <Row>
                <Col md={4} className="text-center mb-4">
                    <Form.Label htmlFor="file-upload" style={{cursor: 'pointer'}}>
                        {state.previewImage ? (
                            <img 
                                src={state.previewImage} 
                                alt="Preview" 
                                style={{
                                    width: '100px', 
                                    height: '100px', 
                                    borderRadius: '50%', 
                                    objectFit: 'cover', 
                                    border: '3px solid #dee2e6'
                                }} 
                            />
                        ) : (
                            <div style={{
                                width: '100px', 
                                height: '100px', 
                                borderRadius: '50%', 
                                border: '2px dashed #adb5bd', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                backgroundColor: '#f8f9fa'
                            }}>
                                <FaUser size={40} color="#adb5bd" />
                            </div>
                        )}
                    </Form.Label>
                    <Form.Control 
                        id="file-upload" 
                        type="file" 
                        accept="image/*" 
                        onChange={onFileChange} 
                        className="d-none" 
                    />
                    <div style={{ fontSize: '0.8rem', color: '#6c757d', marginTop: '5px' }}>
                        Upload Photo
                    </div>
                </Col>
                
                <Col md={8}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>First Name *</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={state.firstName} 
                                    onChange={(e) => onFieldChange('firstName', e.target.value)} 
                                    isInvalid={!!state.errors.firstName}
                                    style={{ borderRadius: '4px' }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {state.errors.firstName}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Last Name *</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={state.lastName} 
                                    onChange={(e) => onFieldChange('lastName', e.target.value)} 
                                    isInvalid={!!state.errors.lastName}
                                    style={{ borderRadius: '4px' }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {state.errors.lastName}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control 
                            type="email" 
                            value={state.email} 
                            onChange={(e) => onFieldChange('email', e.target.value)} 
                            isInvalid={!!state.errors.email}
                            style={{ borderRadius: '4px' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {state.errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Age *</Form.Label>
                        <Form.Control 
                            type="number" 
                            value={state.age} 
                            onChange={(e) => onFieldChange('age', parseInt(e.target.value))} 
                            isInvalid={!!state.errors.age}
                            style={{ borderRadius: '4px' }}
                            min="1"
                            max="100"
                        />
                        <Form.Control.Feedback type="invalid">
                            {state.errors.age}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
        </div>
    );

    const renderStep2 = () => (
        <div style={{ padding: '20px' }}>
            <h5 style={{ marginBottom: '20px', textAlign: 'center', color: '#495057' }}>Account Information</h5>
            
            <Form.Group className="mb-3">
                <Form.Label>Username *</Form.Label>
                <Form.Control 
                    type="text" 
                    value={state.username} 
                    onChange={(e) => onFieldChange('username', e.target.value)} 
                    isInvalid={!!state.errors.username}
                    style={{ borderRadius: '4px' }}
                />
                <Form.Control.Feedback type="invalid">
                    {state.errors.username}
                </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Password *</Form.Label>
                <InputGroup>
                    <Form.Control 
                        type={showPass ? 'text' : 'password'} 
                        value={state.password} 
                        onChange={(e) => onFieldChange('password', e.target.value)} 
                        isInvalid={!!state.errors.password}
                        style={{ borderRadius: '4px 0 0 4px' }}
                    />
                    <Button 
                        variant="outline-secondary" 
                        onClick={() => setShowPass(!showPass)}
                        style={{ borderRadius: '0 4px 4px 0' }}
                    >
                        {showPass ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                </InputGroup>
                {state.errors.password && (
                    <div className="text-danger small mt-1">{state.errors.password}</div>
                )}
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Confirm Password *</Form.Label>
                <InputGroup>
                    <Form.Control 
                        type={showConfirmPass ? 'text' : 'password'} 
                        value={state.confirmPassword} 
                        onChange={(e) => onFieldChange('confirmPassword', e.target.value)} 
                        isInvalid={!!state.errors.confirmPassword}
                        style={{ borderRadius: '4px 0 0 4px' }}
                    />
                    <Button 
                        variant="outline-secondary" 
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                        style={{ borderRadius: '0 4px 4px 0' }}
                    >
                        {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                </InputGroup>
                {state.errors.confirmPassword && (
                    <div className="text-danger small mt-1">{state.errors.confirmPassword}</div>
                )}
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Security Question *</Form.Label>
                <Form.Select 
                    value={state.secretQuestion} 
                    onChange={(e) => onFieldChange('secretQuestion', e.target.value)} 
                    isInvalid={!!state.errors.secretQuestion}
                    style={{ borderRadius: '4px' }}
                >
                    <option value="">Choose a question...</option>
                    {secretQuestions.map(q => (
                        <option key={q} value={q}>{q}</option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    {state.errors.secretQuestion}
                </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Answer *</Form.Label>
                <Form.Control 
                    type="text" 
                    value={state.secretAnswer} 
                    onChange={(e) => onFieldChange('secretAnswer', e.target.value)} 
                    isInvalid={!!state.errors.secretAnswer}
                    style={{ borderRadius: '4px' }}
                />
                <Form.Control.Feedback type="invalid">
                    {state.errors.secretAnswer}
                </Form.Control.Feedback>
            </Form.Group>
        </div>
    );

    const renderStep3 = () => (
        <div style={{ padding: '20px' }}>
            <h5 style={{ marginBottom: '20px', textAlign: 'center', color: '#495057' }}>Address Information</h5>
            
            <Row>
                <Col md={8}>
                    <Form.Group className="mb-3">
                        <Form.Label>Street Name *</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={state.streetName} 
                            onChange={(e) => onFieldChange('streetName', e.target.value)} 
                            isInvalid={!!state.errors.streetName}
                            style={{ borderRadius: '4px' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {state.errors.streetName}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Street Number *</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={state.streetNumber} 
                            onChange={(e) => onFieldChange('streetNumber', e.target.value)} 
                            isInvalid={!!state.errors.streetNumber}
                            style={{ borderRadius: '4px' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {state.errors.streetNumber}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>City *</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={state.city} 
                            onChange={(e) => onFieldChange('city', e.target.value)} 
                            isInvalid={!!state.errors.city}
                            style={{ borderRadius: '4px' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {state.errors.city}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Country *</Form.Label>
                        <Form.Select 
                            value={state.country} 
                            onChange={(e) => onFieldChange('country', e.target.value)} 
                            isInvalid={!!state.errors.country}
                            style={{ borderRadius: '4px' }}
                        >
                            {countries.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {state.errors.country}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
        </div>
    );

    const renderStep = () => {
        switch (state.step) {
            case 1: return renderStep1();
            case 2: return renderStep2();
            case 3: return renderStep3();
            default: return null;
        }
    };

    const getStepTitle = () => {
        switch (state.step) {
            case 1: return 'Step 1 of 3';
            case 2: return 'Step 2 of 3';
            case 3: return 'Step 3 of 3';
            default: return '';
        }
    };

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
                <Modal.Header 
                    closeButton 
                    style={{ 
                        backgroundColor: '#f8f9fa', 
                        borderBottom: '1px solid #dee2e6' 
                    }}
                >
                    <Modal.Title style={{ color: '#495057', fontSize: '1.2rem' }}>
                        Build Your Profile - {getStepTitle()}
                    </Modal.Title>
                </Modal.Header>
                
                <Modal.Body style={{ backgroundColor: '#ffffff', minHeight: '400px' }}>
                    {/* Progress Bar */}
                    <div style={{ marginBottom: '25px' }}>
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            marginBottom: '10px',
                            fontSize: '0.9rem',
                            color: '#6c757d'
                        }}>
                            <span style={{ color: state.step >= 1 ? '#007bff' : '#6c757d', fontWeight: state.step === 1 ? 'bold' : 'normal' }}>
                                Personal Info
                            </span>
                            <span style={{ color: state.step >= 2 ? '#007bff' : '#6c757d', fontWeight: state.step === 2 ? 'bold' : 'normal' }}>
                                Account
                            </span>
                            <span style={{ color: state.step >= 3 ? '#007bff' : '#6c757d', fontWeight: state.step === 3 ? 'bold' : 'normal' }}>
                                Address
                            </span>
                        </div>
                        <ProgressBar 
                            now={progress} 
                            style={{ height: '8px', borderRadius: '4px' }}
                            variant="primary"
                        />
                        <div style={{ 
                            textAlign: 'center', 
                            marginTop: '8px', 
                            fontSize: '0.85rem', 
                            color: '#495057',
                            fontWeight: '500'
                        }}>
                            Step {state.step} of 3
                        </div>
                    </div>
                    
                    {renderStep()}
                </Modal.Body>
                
                <Modal.Footer style={{ backgroundColor: '#f8f9fa', borderTop: '1px solid #dee2e6' }}>
                    {state.step > 1 && (
                        <Button 
                            variant="secondary" 
                            onClick={prevStep}
                            style={{ borderRadius: '4px' }}
                        >
                            Previous
                        </Button>
                    )}
                    {state.step < 3 && (
                        <Button 
                            className="btn-main-theme" 
                            onClick={nextStep} 
                            disabled={!isStepValid}
                            style={{ borderRadius: '4px' }}
                        >
                            Next
                        </Button>
                    )}
                    {state.step === 3 && (
                        <Button 
                            className="btn-main-theme" 
                            onClick={handleFinish} 
                            disabled={!isStepValid}
                            style={{ borderRadius: '4px' }}
                        >
                            Finish
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
            
            <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
                <Toast 
                    onClose={() => setShowToast(false)} 
                    show={showToast} 
                    delay={3000} 
                    autohide 
                    bg="success"
                >
                    <Toast.Header closeButton={false}>
                        <strong className="me-auto text-white">Success</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">
                        New profile added successfully!
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
};

ProfileWizard.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    onAddStudent: PropTypes.func.isRequired,
};

export default ProfileWizard;