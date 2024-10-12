import React, { useState, useMemo } from 'react';

const Filters = ({ onFilter, activeFilter, filterValue, onPageSizeChange, pageSize, isProduct, data }) => {
  const [showSearch, setShowSearch] = useState(false);

  const filterOptions = isProduct
    ? ['title', 'brand', 'category']
    : ['firstName', 'email', 'birthDate', 'gender'];

  const getUniqueValues = (key) => {
    return [...new Set(data.map(item => 
      key === 'birthDate' 
        ? new Date(item[key]).getFullYear().toString()
        : item[key]
    ))].sort();
  };

  const filterValues = useMemo(() => {
    return filterOptions.reduce((acc, key) => {
      acc[key] = getUniqueValues(key);
      return acc;
    }, {});
  }, [data, filterOptions]);

  const handleFilterChange = (field, value) => {
    onFilter(field, value);
  };

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      marginBottom: '1rem',
      borderBottom: '1px solid #e0e0e0',
      paddingBottom: '0.5rem'
    }}>
      <select
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        style={{ 
          padding: '0.5rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
          marginRight: '1rem'
        }}
      >
        {[5, 10, 20, 50].map((size) => (
          <option key={size} value={size}>
            {size} Entries
          </option>
        ))}
      </select>

      <div style={{ borderLeft: '1px solid #ccc', height: '24px', margin: '0 1rem' }} />

      <div style={{ position: 'relative', marginRight: '1rem' }}>
        <button
          onClick={() => setShowSearch(!showSearch)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.2rem'
          }}
        >
          🔍
        </button>
        {showSearch && (
          <input
            type="text"
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Search..."
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              zIndex: 1
            }}
          />
        )}
      </div>

      <div style={{ borderLeft: '1px solid #ccc', height: '24px', margin: '0 1rem' }} />

      {filterOptions.map((option, index) => (
        <React.Fragment key={option}>
          <select
            value={activeFilter === option ? filterValue : ''}
            onChange={(e) => handleFilterChange(option, e.target.value)}
            style={{
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              marginRight: '1rem'
            }}
          >
            <option value="">
              {isProduct ? option.charAt(0).toUpperCase() + option.slice(1) : 
               option === 'firstName' ? 'Name' :
               option === 'birthDate' ? 'Birth Date' :
               option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
            {filterValues[option].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          {/* {index < filterOptions.length - 1 && (
            <div style={{ borderLeft: '1px solid #ccc', height: '24px', margin: '0 1rem' }} />
          )} */}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Filters;