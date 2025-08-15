// src/components/List.jsx
import React from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import MovieCard from './Card';

function List({ movies, onAddToFavorites, onShowDetails, favorites }) {
  if (movies.length === 0) {
    return <Alert variant="warning">No movies found matching your criteria.</Alert>;
  }

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {movies.map(movie => (
        <Col key={movie.id}>
          <MovieCard
            movie={movie}
            onAddToFavorites={onAddToFavorites}
            onShowDetails={onShowDetails}
            isFavorite={favorites.some(fav => fav.id === movie.id)}
          />
        </Col>
      ))}
    </Row>
  );
}

export default List;