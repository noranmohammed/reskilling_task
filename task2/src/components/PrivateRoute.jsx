import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// export default function PrivateRoute({ children }) {
//   const token = localStorage.getItem('token'); // Check if token exists
//   return token ? children : <Navigate to="/" />;
// }

export default function PrivateRoute() {
  const token = localStorage.getItem('token'); 
  console.log('token', token);
  return token ? <Outlet /> : <Navigate to="/" />;
}