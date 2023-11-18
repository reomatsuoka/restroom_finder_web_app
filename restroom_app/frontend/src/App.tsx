import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Map from './Map';
import Login from './Login';
import Signup from './Signup';
import { AuthProvider } from './AuthContext';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/map" element={<Map />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
