import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserContextProvider } from './contexts/UserContext';
import { ProductContextProvider } from './contexts/ProductContext';
import UsersPage from './pages/UsersPage';
import ProductsPage from './pages/ProductsPage';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <div style={{ fontFamily: 'Neutra Text, sans-serif', color: '#322625' }}>
        <Header />
        <div style={{ padding: '2rem' }}>
          <Routes>
            <Route path="/users" element={
              <UserContextProvider>
                <UsersPage />
              </UserContextProvider>
            } />
            <Route path="/products" element={
              <ProductContextProvider>
                <ProductsPage />
              </ProductContextProvider>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;