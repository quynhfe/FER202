// src/components/Pagination.jsx
import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

function Pagination({ totalPages, currentPage, onPageChange }) {
  if (totalPages <= 1) {
    return null; // Không hiển thị phân trang nếu chỉ có 1 trang
  }

  const handlePageClick = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    onPageChange(pageNumber);
  };

  const items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <BootstrapPagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handlePageClick(number)}
      >
        {number}
      </BootstrapPagination.Item>
    );
  }

  return (
    <div className="d-flex justify-content-center mt-4">
      <BootstrapPagination>
        <BootstrapPagination.Prev
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {items}
        <BootstrapPagination.Next
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </BootstrapPagination>
    </div>
  );
}

export default Pagination;