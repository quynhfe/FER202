// src/components/MovieRequestForm.jsx
import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { allGenres } from '../data/movies';

function MovieRequestForm() {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    year: '',
    duration: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required.';
    if (!formData.genre) newErrors.genre = 'Genre is required.';
    if (!formData.year || formData.year <= 1900) newErrors.year = 'Year must be after 1900.';
    if (!formData.duration || formData.duration <= 0) newErrors.duration = 'Duration must be greater than 0.';
    if (!formData.description || formData.description.length < 30) newErrors.description = 'Description must be at least 30 characters long.';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      // Here you would typically send the data to a server
      console.log('Form Submitted:', formData);
    } else {
      setSubmitted(false);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Movie Request Form</h2>
      {submitted && <Alert variant="success">Request submitted. Thank you!</Alert>}
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            isInvalid={!!errors.title}
          />
          <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="genre">
          <Form.Label>Genre</Form.Label>
          <Form.Select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            isInvalid={!!errors.genre}
          >
            <option value="">Select a genre</option>
            {allGenres.filter(g => g !== 'All').map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.genre}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="year">
          <Form.Label>Year</Form.Label>
          <Form.Control
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            isInvalid={!!errors.year}
          />
          <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="duration">
          <Form.Label>Duration (minutes)</Form.Label>
          <Form.Control
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            isInvalid={!!errors.duration}
          />
          <Form.Control.Feedback type="invalid">{errors.duration}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            isInvalid={!!errors.description}
          />
          <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit Request
        </Button>
      </Form>
    </Container>
  );
}

export default MovieRequestForm;