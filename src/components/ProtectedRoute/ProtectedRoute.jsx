import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Mientras Firebase chequea si hay sesión, mostramos un mensajito
  if (loading) {
    return <h2 style={{ textAlign: 'center', marginTop: '4rem' }}>Verificando sesión...</h2>;
  }

  // Si no hay usuario logueado, lo mandamos al Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si está logueado, lo dejamos pasar a la ruta /admin
  return children;
};

export default ProtectedRoute;