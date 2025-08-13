import React from 'react';
import styled from 'styled-components';

const FilterSection = styled.div`
  padding: 2rem 0 1rem;
`;

const FilterDropdown = styled.select`
  background: white;
  border: 1px solid #dee2e6;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  color: #495057;
  min-width: 150px;
  
  &:focus {
    outline: none;
    border-color: #2c5530;
    box-shadow: 0 0 0 0.2rem rgba(44, 85, 48, 0.25);
  }
`;

const SearchInput = styled.input`
  background: white;
  border: 1px solid #dee2e6;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  width: 100%;
  max-width: 300px;
  
  &:focus {
    outline: none;
    border-color: #2c5530;
    box-shadow: 0 0 0 0.2rem rgba(44, 85, 48, 0.25);
  }
  
  &::placeholder {
    color: #adb5bd;
  }
`;

const Filter = ({
  searchTerm, setSearchTerm,
  maxPrepTime, setMaxPrepTime,
  maxCookTime, setMaxCookTime,
  sortOption, setSortOption
}) => {
  return (
    <FilterSection>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-8">
            <div className="d-flex flex-column flex-sm-row gap-3">

              <FilterDropdown value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="">Sort by</option>
                <option value="name-asc">Name A → Z</option>
                <option value="name-desc">Name Z → A</option>
                <option value="prep-asc">Prep Time ↑</option>
                <option value="prep-desc">Prep Time ↓</option>
                <option value="cook-asc">Cook Time ↑</option>
                <option value="cook-desc">Cook Time ↓</option>
              </FilterDropdown>

              <FilterDropdown value={maxPrepTime} onChange={(e) => setMaxPrepTime(e.target.value)}>
                <option value="">Max Prep Time</option>
                <option value="5">5 mins</option>
                <option value="10">10 mins</option>
                <option value="15">15 mins</option>
                <option value="20">20+ mins</option>
              </FilterDropdown>


              <FilterDropdown value={maxCookTime} onChange={(e) => setMaxCookTime(e.target.value)}>
                <option value="">Max Cook Time</option>
                <option value="0">No cooking</option>
                <option value="10">10 mins</option>
                <option value="15">15 mins</option>
                <option value="20">20+ mins</option>
              </FilterDropdown>
            </div>
          </div>

          <div className="col-md-4 mt-3 mt-md-0">
            <div className="d-flex justify-content-md-end">
              <SearchInput
                type="text"
                placeholder="🔍 Search by name or ingredient..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </FilterSection>
  );
};

export default Filter;