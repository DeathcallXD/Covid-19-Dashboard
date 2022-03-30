import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/LoginPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route path='/dashboard' element={<Dashboard />}></Route>
    </Routes>
  );
}

export default App;
