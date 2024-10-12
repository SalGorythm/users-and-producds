import React, { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import DataTable from '../components/DataTable';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';

const UsersPage = () => {
  const { state, fetchUsers } = useContext(UserContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <Filters />
      <DataTable data={state.users} />
      <Pagination />
    </div>
  );
};

export default UsersPage;