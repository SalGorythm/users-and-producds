import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul style={{ display: 'flex', listStyle: 'none', padding: 0, justifyContent: 'center' }}>
        <li style={{ margin: '0 5px' }}>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: '5px 10px',
              backgroundColor: 'transparent',
              border: '1px solid #ccc',
              cursor: currentPage === 1 ? 'default' : 'pointer',
              color: '#333'
            }}
          >
            ←
          </button>
        </li>
        {pageNumbers.map(number => (
          <li key={number} style={{ margin: '0 5px' }}>
            <button
              onClick={() => onPageChange(number)}
              style={{
                padding: '5px 10px',
                backgroundColor: currentPage === number ? '#007bff' : 'transparent',
                border: '1px solid #ccc',
                cursor: 'pointer',
                color: currentPage === number ? '#fff' : '#333'
              }}
            >
              {number}
            </button>
          </li>
        ))}
        <li style={{ margin: '0 5px' }}>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: '5px 10px',
              backgroundColor: 'transparent',
              border: '1px solid #ccc',
              cursor: currentPage === totalPages ? 'default' : 'pointer',
              color: '#333'
            }}
          >
            →
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;