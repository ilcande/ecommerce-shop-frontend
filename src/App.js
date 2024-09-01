import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HomePage from './components/pages/HomePage';
import AdminLogin from './components/pages/AdminLogin';
import AdminDashboard from './components/pages/AdminDashboard';
import AdminRoute from './routes/AdminRoute';
import CreateProduct from './components/products/CreateProduct';
import CreatePart from './components/parts/CreatePart';
import CreateOption from './components/options/CreateOption';
import CreateConstraint from './components/constraints/CreateConstraint';
import CreateProductConfiguration from './components/product_configurations/CreateProductConfiguration';
import CreateStockLevel from './components/stock_levels/CreateStockLevel';
import Products from './components/products/Products';
import ProductDetail from './components/products/ProductDetail';
import UpdateProduct from './components/products/UpdateProduct';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/admin/products/new"
            element={
              <AdminRoute>
                <CreateProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/parts/new"
            element={
              <AdminRoute>
                <CreatePart />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/options/new"
            element={
              <AdminRoute>
                <CreateOption />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/constraints/new"
            element={
              <AdminRoute>
                <CreateConstraint />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/product-configurations/new"
            element={
              <AdminRoute>
                <CreateProductConfiguration />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/stock-levels/new"
            element={
              <AdminRoute>
                <CreateStockLevel />
              </AdminRoute>
            }
          />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route
            path="/admin/products/:productId/edit"
            element={
              <AdminRoute>
                <UpdateProduct />
              </AdminRoute>
            }
          />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
