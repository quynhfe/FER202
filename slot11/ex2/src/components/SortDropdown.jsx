import React from 'react';
import { Dropdown } from 'react-bootstrap';

const SortDropdown = ({ sortOption, setSortOption }) => (
  <div className="d-flex justify-content-end mb-3">
    <Dropdown onSelect={(eventKey) => setSortOption(eventKey)}>
      <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
        Sorting
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey="name-asc" active={sortOption === 'name-asc'}>Name A-Z</Dropdown.Item>
        <Dropdown.Item eventKey="name-desc" active={sortOption === 'name-desc'}>Name Z-A</Dropdown.Item>
        <Dropdown.Item eventKey="age-asc" active={sortOption === 'age-asc'}>Tuổi tăng dần</Dropdown.Item>
        <Dropdown.Item eventKey="age-desc" active={sortOption === 'age-desc'}>Tuổi giảm dần</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </div>
);

export default SortDropdown;
