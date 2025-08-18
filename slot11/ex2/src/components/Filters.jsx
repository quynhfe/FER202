import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const Filters = ({ searchTerm, setSearchTerm, ageRange, setAgeRange, hasAvatar, setHasAvatar }) => (
  <div className="p-4 mb-4 bg-white rounded shadow-sm">
    <Row className="g-3 align-items-end">
      <Col md={5}>
        <Form.Group controlId="searchByName">
          <Form.Label>Search by name/email</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g., Nguyen An or an.nguyen@..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group controlId="filterByAge">
          <Form.Label>Age range</Form.Label>
          <Form.Select value={ageRange} onChange={(e) => setAgeRange(e.target.value)}>
            <option value="">All Ages</option>
            <option value="<=20">≤20</option>
            <option value="21-25">21–25</option>
            <option value=">25">&gt;25</option>
          </Form.Select>
        </Form.Group>
      </Col>
      <Col md={3} className="d-flex align-items-center justify-content-start pt-3">
        <Form.Check
          type="checkbox"
          id="hasAvatarCheck"
          label="Has avatar"
          checked={hasAvatar}
          onChange={(e) => setHasAvatar(e.target.checked)}
        />
      </Col>
    </Row>
  </div>
);

export default Filters;
