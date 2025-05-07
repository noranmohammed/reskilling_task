import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Posts from "./pages/Posts";
import NewPost from "./pages/NewPost";

function App() {
  return (
    <div className="bg-purple-100 min-h-screen">
      
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="dashboard" element={<PrivateRoute />}>
            <Route path="" element={<Dashboard />} />
            <Route path="newpost" element={<NewPost />} />
          </Route>
          <Route path="posts" element={<Posts />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
