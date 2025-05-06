import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Posts from './pages/Posts';
import NewPost from './pages/NewPost';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/posts"
          element={
            <PrivateRoute>
              <Posts />
            </PrivateRoute>
          }
        />
        <Route
          path="/posts/newpost"
          element={
            <PrivateRoute>
              <NewPost/>
            </PrivateRoute>
          }
        />
        <Route
          path="/posts/:id/edit"
          element={
            <PrivateRoute>
              <h1>Edit Post</h1>
            </PrivateRoute>
          }
        />
        <Route
          path="/posts/create"
          element={
            <PrivateRoute>
              <NewPost />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;