import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserSearch from './pages/UserSearch';
import UserDetails from './pages/UserDetails';

function App() {
  return (
    <div className="App">
      <Routes>
         <Route path="/" element={<UserSearch />} />
         <Route path="/user/:username" element={<UserDetails />} />
      </Routes>
    </div>
  );
}

export default App;