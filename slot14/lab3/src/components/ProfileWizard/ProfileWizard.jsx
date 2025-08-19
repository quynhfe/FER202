import React, { useReducer, useMemo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, ProgressBar, ToastContainer } from 'react-bootstrap';

import AboutStep from './AboutStep';
import AccountStep from './AccountStep';
import AddressStep from './AddressStep';

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

    const renderStep = () => {
        const commonProps = {
            data: state,
            onFieldChange: onFieldChange,
            errors: state.errors
        };

        switch (state.step) {
            case 1:
                return <AboutStep {...commonProps} onFileChange={onFileChange} />;
            case 2:
                return <AccountStep {...commonProps} />;
            case 3:
                return <AddressStep {...commonProps} />;
            default:
                return null;
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
            <Modal show={show} onHide={closeAndReset} size="lg" centered backdrop="static" keyboard={false}>
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
                            className="primary" 
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