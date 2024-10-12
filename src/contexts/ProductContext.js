import React, { createContext, useReducer, useCallback, useEffect } from 'react';
import axios from 'axios';

const initialState = {
  products: [],
  allProducts: [],
  pageSize: 5,
  currentPage: 1,
  totalPages: 1,
  activeFilter: null,
  filterValue: '',
  isLoading: false,
  error: null,
  activeTab: 'ALL',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload, allProducts: action.payload, isLoading: false, error: null };
    case 'SET_FILTERED_PRODUCTS':
      return { ...state, products: action.payload };
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
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload, currentPage: 1 };
    default:
      return state;
  }
};

export const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchProducts = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const endpoint = state.activeTab === 'LAPTOPS' ? 'https://dummyjson.com/products/category/laptops' : 'https://dummyjson.com/products';
      const response = await axios.get(`${endpoint}?limit=100`);
      dispatch({ type: 'SET_PRODUCTS', payload: response.data.products });
    } catch (error) {
      console.error('Error fetching products:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch products. Please try again.' });
    }
  }, [state.activeTab]);

  const applyFilters = useCallback(() => {
    let filteredProducts = state.allProducts;
    if (state.activeFilter && state.filterValue) {
      switch (state.activeFilter) {
        case 'title':
          filteredProducts = state.allProducts.filter(product => 
            product.title?.toLowerCase().includes(state.filterValue.toLowerCase())
          );
          break;
        case 'brand':
          filteredProducts = state.allProducts.filter(product => 
            product.brand?.toLowerCase().includes(state.filterValue.toLowerCase())
          );
          break;
        case 'category':
          filteredProducts = state.allProducts.filter(product => 
            product.category?.toLowerCase().includes(state.filterValue.toLowerCase())
          );
          break;
        default:
          break;
      }
    }
    dispatch({ type: 'SET_FILTERED_PRODUCTS', payload: filteredProducts });
    dispatch({ type: 'SET_TOTAL_PAGES', payload: Math.ceil(filteredProducts.length / state.pageSize) });
  }, [state.allProducts, state.activeFilter, state.filterValue, state.pageSize]);

  const setFilter = useCallback((field, value) => {
    dispatch({ type: 'SET_FILTER', payload: { field, value } });
  }, []);

  const setActiveTab = useCallback((tab) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: tab });
  }, []);

  useEffect(() => {
    if (state.allProducts.length > 0) {
      applyFilters();
    }
  }, [state.activeFilter, state.filterValue, applyFilters, state.allProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, state.activeTab]);

  return (
    <ProductContext.Provider value={{ state, dispatch, fetchProducts, setFilter, setActiveTab }}>
      {children}
    </ProductContext.Provider>
  );
};