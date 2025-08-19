import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AccountStep = ({ data, onFieldChange, errors }) => {
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const secretQuestions = [
        "What is your first pet's name?",
        "What is your mother's maiden name?",
        "In which city were you born?",
        "Who was your favorite teacher?"
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h5 style={{ marginBottom: '20px', textAlign: 'center', color: '#495057' }}>Account Information</h5>
            <Form.Group className="mb-3">
                <Form.Label>Username *</Form.Label>
                <Form.Control type="text" value={data.username} onChange={(e) => onFieldChange('username', e.target.value)} isInvalid={!!errors.username} style={{ borderRadius: '4px' }} />
                <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password *</Form.Label>
                <InputGroup>
                    <Form.Control type={showPass ? 'text' : 'password'} value={data.password} onChange={(e) => onFieldChange('password', e.target.value)} isInvalid={!!errors.password} style={{ borderRadius: '4px 0 0 4px' }} />
                    <Button variant="outline-secondary" onClick={() => setShowPass(!showPass)} style={{ borderRadius: '0 4px 4px 0' }}>
                        {showPass ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                </InputGroup>
                {errors.password && (<div className="text-danger small mt-1">{errors.password}</div>)}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Confirm Password *</Form.Label>
                <InputGroup>
                    <Form.Control type={showConfirmPass ? 'text' : 'password'} value={data.confirmPassword} onChange={(e) => onFieldChange('confirmPassword', e.target.value)} isInvalid={!!errors.confirmPassword} style={{ borderRadius: '4px 0 0 4px' }} />
                    <Button variant="outline-secondary" onClick={() => setShowConfirmPass(!showConfirmPass)} style={{ borderRadius: '0 4px 4px 0' }}>
                        {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                </InputGroup>
                {errors.confirmPassword && (<div className="text-danger small mt-1">{errors.confirmPassword}</div>)}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Security Question *</Form.Label>
                <Form.Select value={data.secretQuestion} onChange={(e) => onFieldChange('secretQuestion', e.target.value)} isInvalid={!!errors.secretQuestion} style={{ borderRadius: '4px' }}>
                    <option value="">Choose a question...</option>
                    {secretQuestions.map(q => (<option key={q} value={q}>{q}</option>))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.secretQuestion}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Answer *</Form.Label>
                <Form.Control type="text" value={data.secretAnswer} onChange={(e) => onFieldChange('secretAnswer', e.target.value)} isInvalid={!!errors.secretAnswer} style={{ borderRadius: '4px' }} />
                <Form.Control.Feedback type="invalid">{errors.secretAnswer}</Form.Control.Feedback>
            </Form.Group>
        </div>
    );
};

AccountStep.propTypes = {
    data: PropTypes.object.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

export default AccountStep;