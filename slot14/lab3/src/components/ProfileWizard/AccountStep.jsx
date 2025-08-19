import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AccountStep = ({ data, onFieldChange, errors }) => {
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const secretQuestions = ["What is your first pet’s name?", "What is your mother’s maiden name?", "In which city were you born?", "Who was your favorite teacher?"];

    return (
        <Form noValidate>
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text"
                    value={data.username}
                    onChange={(e) => onFieldChange('username', e.target.value)}
                    isInvalid={!!errors.username} required />
                <Form.Control.Feedback type="invalid">{errors.username}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                    <Form.Control type={showPass ? 'text' : 'password'}
                        value={data.password}
                        onChange={(e) => onFieldChange('password', e.target.value)}
                        isInvalid={!!errors.password}
                        required />
                    <Button
                        variant="outline-secondary" onClick={() => setShowPass(!showPass)}>{showPass ? <FaEyeSlash /> : <FaEye />}</Button>
                    <Form.Control.Feedback type="invalid">{errors.password}
                    </Form.Control.Feedback></InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label><InputGroup>
                    <Form.Control type={showConfirmPass ? 'text' : 'password'} value={data.confirmPassword} onChange={(e) => onFieldChange('confirmPassword', e.target.value)} isInvalid={!!errors.confirmPassword} required /><Button variant="outline-secondary" onClick={() => setShowConfirmPass(!showConfirmPass)}>{showConfirmPass ? <FaEyeSlash /> : <FaEye />}</Button><Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback></InputGroup></Form.Group>
            <Form.Group className="mb-3" controlId="secretQuestion">
                <Form.Label>Secret Question</Form.Label><Form.Select value={data.secretQuestion}
                    onChange={(e) => onFieldChange('secretQuestion', e.target.value)} isInvalid={!!errors.secretQuestion} required>
                    <option value="">Choose...</option>{secretQuestions.map(q => <option key={q} value={q}>{q}</option>)}</Form.Select>
                <Form.Control.Feedback type="invalid">{errors.secretQuestion}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="secretAnswer"><Form.Label>Answer</Form.Label>
                <Form.Control type="text"
                    value={data.secretAnswer}
                    onChange={(e) => onFieldChange('secretAnswer', e.target.value)}
                    isInvalid={!!errors.secretAnswer} required />
                <Form.Control.Feedback type="invalid">{errors.secretAnswer}
                </Form.Control.Feedback>
            </Form.Group>
        </Form>
    );
};

AccountStep.propTypes = {
    data: PropTypes.object.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

export default AccountStep;