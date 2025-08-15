// src/components/Filter.jsx
import React from 'react';
import { Form, InputGroup, FormControl, Row, Col } from 'react-bootstrap';
import { allGenres } from '../data/movies';

function Filter({
  searchTerm,
  setSearchTerm,
  selectedGenre,
  setSelectedGenre,
  sortOrder,
  setSortOrder,
  movieCount
}) {
  return (
    <div className="my-4">
      <Row className="g-3">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
            <FormControl
              placeholder="Search by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={3}>
          <Form.Select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
            {allGenres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="none">Sort by</option>
            <option value="duration_asc">Duration ↑</option>
            <option value="duration_desc">Duration ↓</option>
          </Form.Select>
        </Col>
      </Row>
      <div className="mt-2 text-muted">
        Showing {movieCount} movies.
      </div>
    </div>
  );
}

export default Filter;