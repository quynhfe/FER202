// pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import AppNavbar from '../components/Navbar';
import api from '../services/api';
import { useApp } from '../contexts/AppContext.jsx';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login, isAuthenticated } = useApp();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/products');
        }
    }, [isAuthenticated, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (error) setError('');
    };

    const validateForm = () => {
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return false;
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Fetch accounts from db.json
            const { data: accounts } = await api.get('/accounts');

            // Find matching account
            const account = accounts.find(acc =>
                acc.email === formData.email && acc.password === formData.password
            );

            if (!account) {
                setError('Invalid email or password');
                return;
            }

            if (!account.isActive) {
                setError('Account is inactive. Please contact administrator.');
                return;
            }

            // Login successful
            setSuccess('Login successful! Redirecting...');

            // Use context login method
            const userData = {
                email: account.email,
                isActive: account.isActive,
                loginTime: new Date().toISOString()
            };

            login(userData);

            // Redirect after short delay
            setTimeout(() => {
                navigate('/products');
            }, 1500);

        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AppNavbar />
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col md={6} lg={4}>
                        <Card className="shadow">
                            <Card.Header className="bg-primary text-white text-center">
                                <h4 className="mb-0">
                                    <FaUser className="me-2" />
                                    Login
                                </h4>
                            </Card.Header>
                            <Card.Body className="p-4">
                                {error && (
                                    <Alert variant="danger" className="mb-3">
                                        {error}
                                    </Alert>
                                )}

                                {success && (
                                    <Alert variant="success" className="mb-3">
                                        {success}
                                    </Alert>
                                )}

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Enter your email"
                                            disabled={loading}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <div className="position-relative">
                                            <Form.Control
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                placeholder="Enter your password"
                                                disabled={loading}
                                                required
                                            />
                                            <Button
                                                variant="outline-secondary"
                                                size="sm"
                                                className="position-absolute end-0 top-50 translate-middle-y me-2"
                                                style={{ border: 'none', background: 'none' }}
                                                onClick={() => setShowPassword(!showPassword)}
                                                type="button"
                                            >
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </Button>
                                        </div>
                                    </Form.Group>

                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="w-100"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    className="me-2"
                                                />
                                                Logging in...
                                            </>
                                        ) : (
                                            <>
                                                <FaLock className="me-2" />
                                                Login
                                            </>
                                        )}
                                    </Button>
                                </Form>

                                <hr className="my-4" />

                                <div className="text-center">
                                    <Link to="/products" className="btn btn-outline-secondary">
                                        Back to Products
                                    </Link>
                                </div>

                                {/* Demo accounts info */}
                                <Card className="mt-4 bg-light">
                                    <Card.Body className="p-3">
                                        <h6 className="text-muted mb-2">Demo Accounts:</h6>
                                        <small className="text-muted">
                                            <strong>Admin:</strong> admin@example.com / Admin123@<br />
                                            <strong>User:</strong> traltb@fe.edu.vn / Traltb123@<br />
                                            <strong>Inactive:</strong> bobb@example.com / Bobb123@
                                        </small>
                                    </Card.Body>
                                </Card>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default LoginPage;