import React from 'react';

const DataTable = ({ data, isProduct = false }) => {
  if (data.length === 0) {
    return <p>No data available.</p>;
  }

  const columns = isProduct 
    ? ['TITLE', 'DESCRIPTION', 'PRICE', 'DISCOUNT', 'RATING', 'STOCK', 'BRAND', 'CATEGORY']
    : ['FIRST NAME', 'LAST NAME', 'MAIDEN NAME', 'AGE', 'GENDER', 'EMAIL', 'USERNAME', 'BLOODGROUP', 'EYECOLOR'];

  const getProductValue = (product, column) => {
    switch (column) {
      case 'TITLE': return product.title;
      case 'DESCRIPTION': return product.description.substring(0, 50) + '...';
      case 'PRICE': return `$${product.price.toFixed(2)}`;
      case 'DISCOUNT': return `${product.discountPercentage.toFixed(2)}%`;
      case 'RATING': return product.rating.toFixed(2);
      case 'STOCK': return product.stock;
      case 'BRAND': return product.brand;
      case 'CATEGORY': return product.category;
      default: return '';
    }
  };

  const getUserValue = (user, column) => {
    switch (column) {
      case 'FIRST NAME': return user.firstName;
      case 'LAST NAME': return user.lastName;
      case 'MAIDEN NAME': return user.maidenName;
      case 'AGE': return user.age;
      case 'GENDER': return user.gender;
      case 'EMAIL': return user.email;
      case 'USERNAME': return user.username;
      case 'BLOODGROUP': return user.bloodGroup;
      case 'EYECOLOR': return user.eyeColor;
      default: return '';
    }
  };

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
      <thead>
        <tr style={{ backgroundColor: '#e6f3f3' }}>
          {columns.map(column => (
            <th key={column} style={{ padding: '0.75rem', textAlign: 'left', color: '#666', fontWeight: 'normal' }}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f8f8f8', borderBottom: '1px solid #e0e0e0' }}>
            {columns.map(column => (
              <td key={column} style={{ padding: '0.75rem' }}>
                {isProduct 
                  ? getProductValue(item, column)
                  : getUserValue(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;