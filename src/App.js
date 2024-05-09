import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login'; 
import Inicio from './inicio';
import FormularioFecha from './FormularioFecha';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/FormularioFecha" element={<FormularioFecha />} />
      </Routes>
    </Router>
  );
};

export default App;
