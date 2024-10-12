import React, { createContext, useReducer, useCallback, useEffect } from 'react';
import axios from 'axios';

const initialState = {
  users: [],
  allUsers: [],
  pageSize: 5,
  currentPage: 1,
  totalPages: 1,
  activeFilter: null,
  filterValue: '',
  isLoading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload, allUsers: action.payload, isLoading: false, error: null };
    case 'SET_FILTERED_USERS':
      return { ...state, users: action.payload };
    case 'SET_PAGE_SIZE':
      return { ...state, pageSize: action.payload };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_TOTAL_PAGES':
      return { ...state, totalPages: action.payload };
    case 'SET_FILTER':
      return { ...state, activeFilter: action.payload.field, filterValue: action.payload.value, currentPage: 1 };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
};

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchUsers = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await axios.get('https://dummyjson.com/users?limit=100');
      dispatch({ type: 'SET_USERS', payload: response.data.users });
    } catch (error) {
      console.error('Error fetching users:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch users. Please try again.' });
    }
  }, []);

  const applyFilters = useCallback(() => {
    let filteredUsers = state.allUsers;
    if (state.activeFilter && state.filterValue) {
      switch (state.activeFilter) {
        case 'firstName':
          filteredUsers = state.allUsers.filter(user => 
            user.firstName.toLowerCase().includes(state.filterValue.toLowerCase())
          );
          break;
        case 'email':
          filteredUsers = state.allUsers.filter(user => 
            user.email.toLowerCase().includes(state.filterValue.toLowerCase())
          );
          break;
        case 'gender':
          filteredUsers = state.allUsers.filter(user => 
            user.gender.toLowerCase() === state.filterValue.toLowerCase()
          );
          break;
        case 'birthDate':
          filteredUsers = state.allUsers.filter(user => 
            new Date(user.birthDate).getFullYear().toString() === state.filterValue
          );
          break;
        default:
          break;
      }
    }
    dispatch({ type: 'SET_FILTERED_USERS', payload: filteredUsers });
    dispatch({ type: 'SET_TOTAL_PAGES', payload: Math.ceil(filteredUsers.length / state.pageSize) });
  }, [state.allUsers, state.activeFilter, state.filterValue, state.pageSize]);

  const setFilter = useCallback((field, value) => {
    dispatch({ type: 'SET_FILTER', payload: { field, value } });
  }, []);

  useEffect(() => {
    if (state.allUsers.length > 0) {
      applyFilters();
    }
  }, [state.activeFilter, state.filterValue, applyFilters, state.allUsers]);

  return (
    <UserContext.Provider value={{ state, dispatch, fetchUsers, setFilter }}>
      {children}
    </UserContext.Provider>
  );
};