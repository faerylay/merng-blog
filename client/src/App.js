import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components';
import { Home, Login, Register, NotFound, Profile } from './pages';

import { AuthRoute } from './utils';
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/login" element={
          <AuthRoute redirectTo="/">
            <Login />
          </AuthRoute>
        } />
        <Route exact path="/register" element={
          <AuthRoute redirectTo="/">
            <Register />
          </AuthRoute>
        } />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App;
