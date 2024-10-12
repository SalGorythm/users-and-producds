import React, { useContext, useEffect, useCallback } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import DataTable from '../components/DataTable';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';

const ProductsPage = () => {
  const { state, dispatch, fetchProducts, setFilter, setActiveTab } = useContext(ProductContext);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, state.activeTab]);

  const handleFilter = useCallback((field, value) => {
    setFilter(field, value);
  }, [setFilter]);

  const handlePageSizeChange = useCallback((newSize) => {
    dispatch({ type: 'SET_PAGE_SIZE', payload: newSize });
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 1 });
  }, [dispatch]);

  const handlePageChange = useCallback((newPage) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: newPage });
  }, [dispatch]);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, [setActiveTab]);

  const paginatedProducts = state.products.slice(
    (state.currentPage - 1) * state.pageSize,
    state.currentPage * state.pageSize
  );

  if (state.isLoading) {
    return <div>Loading...</div>;
  }

  if (state.error) {
    return <div>Error: {state.error}</div>;
  }

  return (
    <div style={{ padding: '2rem', backgroundColor: '#fff' }}>
      <div style={{ marginBottom: '1rem' }}>
        <span style={{ color: '#999' }}>Home</span> / <span style={{ color: '#000', fontWeight: 'bold' }}>Products</span>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <button
          onClick={() => handleTabChange('ALL')}
          style={{
            backgroundColor: state.activeTab === 'ALL' ? '#fdc936' : '#c0e3e5',
            border: 'none',
            padding: '0.5rem 1rem',
            marginRight: '0.5rem',
            cursor: 'pointer'
          }}
        >
          ALL
        </button>
        <button
          onClick={() => handleTabChange('LAPTOPS')}
          style={{
            backgroundColor: state.activeTab === 'LAPTOPS' ? '#fdc936' : '#c0e3e5',
            border: 'none',
            padding: '0.5rem 1rem',
            cursor: 'pointer'
          }}
        >
          LAPTOPS
        </button>
      </div>
      <Filters
        onFilter={handleFilter}
        activeFilter={state.activeFilter}
        filterValue={state.filterValue}
        onPageSizeChange={handlePageSizeChange}
        pageSize={state.pageSize}
        isProduct={true}
        data={state.allProducts}
      />
      <DataTable data={paginatedProducts} isProduct={true} />
      <Pagination
        currentPage={state.currentPage}
        totalPages={state.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductsPage;