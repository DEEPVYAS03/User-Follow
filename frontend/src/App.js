import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Followers from './components/Followers';
import Following from './components/Following';
import NavigationBar from './components/Navbar';

function App() {
  const { token } = useContext(AuthContext);

  return (
    <Router>
      <NavigationBar />
      <div className="App">
        <Routes>
          <Route path="/" element={token ? <Navigate to="/home" /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={token ? <Home /> : <Navigate to="/" />} />
          <Route path="/followers" element={token ? <Followers /> : <Navigate to="/" />} />
          <Route path="/following" element={token ? <Following /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
