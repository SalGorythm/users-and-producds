import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const navStyle = {
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '1rem 2rem',
  };

  const ulStyle = {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 0,
    padding: 0,
  };

  const liStyle = {
    marginRight: '2rem',
  };

  const linkStyle = (isActive) => ({
    color: '#322625',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
    backgroundColor: isActive ? '#c0e3e5' : 'transparent',
  });

  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        <li style={liStyle}>
          <Link to="/users" style={linkStyle(location.pathname === '/users')}>
            Users
          </Link>
        </li>
        <li style={liStyle}>
          <Link to="/products" style={linkStyle(location.pathname === '/products')}>
            Products
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;