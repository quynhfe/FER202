// src/components/Card.jsx
 import React from 'react';
 import PropTypes from 'prop-types';
 import { Card as BootstrapCard, Button, Badge } from 'react-bootstrap';
 import styled from 'styled-components';
 

 const StyledCardImg = styled(BootstrapCard.Img)`
  object-fit: cover;
  height: 300px; 
 `;
 

 const CardFooter = styled(BootstrapCard.Footer)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
 `;
 

 function MovieCard({ movie, onAddToFavorites, onShowDetails, isFavorite }) {
  const { poster, title, description, year, country, duration, genre } = movie;
 

  return (
  <BootstrapCard className="h-100 shadow-sm">
  <StyledCardImg variant="top" src={poster} alt={title} />
  <BootstrapCard.Body className="d-flex flex-column">
  <BootstrapCard.Title className="mb-2" style={{ fontSize: '1rem' }}>
  {title}
  </BootstrapCard.Title>
  <BootstrapCard.Text className="flex-grow-1" style={{ fontSize: '0.875rem' }}>
  {description.substring(0, 60)}...
  </BootstrapCard.Text>
  <div className="mb-2">
  <Badge bg="info" className="me-1" style={{ fontSize: '0.75rem' }}>
  {genre}
  </Badge>
  <Badge bg="secondary" style={{ fontSize: '0.75rem' }}>
  {year}
  </Badge>
  </div>
  <small className="text-muted" style={{ fontSize: '0.75rem' }}>
  {country} | {duration} mins
  </small>
  </BootstrapCard.Body>
  <CardFooter>
  <Button variant={isFavorite ? 'danger' : 'primary'} size="sm" onClick={() => onAddToFavorites(movie)} style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>
  {isFavorite ? 'Remove' : 'Add to favourite'}
  </Button>
  <Button variant="outline-secondary" size="sm" onClick={() => onShowDetails(movie)} style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>
  Details
  </Button>
  </CardFooter>
  </BootstrapCard>
  );
 }
 

 MovieCard.propTypes = {
  movie: PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  country: PropTypes.string.isRequired,
  }).isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
  onShowDetails: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
 };
 

 export default MovieCard;