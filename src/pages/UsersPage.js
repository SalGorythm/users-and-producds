import React, { useContext, useEffect, useCallback } from 'react';
import { UserContext } from '../contexts/UserContext';
import DataTable from '../components/DataTable';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';

const UsersPage = () => {
  const { state, dispatch, fetchUsers, setFilter } = useContext(UserContext);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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

  const paginatedUsers = state.users.slice(
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
        <span style={{ color: '#999' }}>Home</span> / <span style={{ color: '#000', fontWeight: 'bold' }}>Users</span>
      </div>
      <Filters
        onFilter={handleFilter}
        activeFilter={state.activeFilter}
        filterValue={state.filterValue}
        onPageSizeChange={handlePageSizeChange}
        pageSize={state.pageSize}
        isProduct={false}
        data={state.allUsers}
      />
      <DataTable data={paginatedUsers} />
      <Pagination
        currentPage={state.currentPage}
        totalPages={state.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UsersPage;