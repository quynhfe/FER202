// src/components/MovieDetailsModal.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function MovieDetailsModal({ movie, show, handleClose }) {
  if (!movie) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{movie.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={movie.poster} alt={movie.title} className="img-fluid mb-3" />
        <p><strong>Full Description:</strong> {movie.description}</p>
        <p><strong>Genre:</strong> {movie.genre}</p>
        <p><strong>Year:</strong> {movie.year}</p>
        <p><strong>Country:</strong> {movie.country}</p>
        <p><strong>Duration:</strong> {movie.duration} minutes</p>
        <hr />
        <h5>Showtimes</h5>
        <p>Monday - Friday: 5:00 PM, 8:00 PM</p>
        <p>Saturday - Sunday: 2:00 PM, 5:00 PM, 9:00 PM</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MovieDetailsModal;