import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('token'); // Check if token exists
  return token ? children : <Navigate to="/" />;
}