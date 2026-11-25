import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Helmet } from 'react-helmet-async'; // <-- NUEVO
import "./App.css";

// Tus componentes
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart';

// Componentes de la profe y nuevos
import { ProductFormContainer } from './components/adminComponents/ProductForm/ProductFormContainer';
import { EditProductContainer } from './components/adminComponents/ProductForm/EditProductContainer';
import { AdminProducts } from './components/AdminProducts/AdminProducts';
import { ProductSuccess } from './components/adminComponents/ProductSuccess';
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { Login } from './components/Login/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { Dashboard } from './components/adminComponents/Dashboard/Dashboard';

function App() {
  return (
    <BrowserRouter>
      {/* TÍTULO GENERAL POR DEFECTO */}
      <Helmet>
        <title>Mi Kiosco | Tu kiosco de confianza</title>
        <meta name="description" content="Compra bebidas, snacks y más en Mi Kiosco." />
      </Helmet>

      <Routes>
        {/* ----------------------RUTAS PUBLICAS -------------------------*/}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/productos" element={<ItemListContainer />} />
          <Route path="/producto/:id" element={<ItemDetailContainer />} />
          <Route path="/carrito" element={<Cart />} />
        </Route>

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* -----------------------------ADMIN--------------------------- */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to={"dashboard"} replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* RUTAS DE PRODUCTOS */}
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<ProductFormContainer />} />
          <Route path="products/edit/:id" element={<EditProductContainer />} />
          <Route path="products/success/:id" element={<ProductSuccess />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;