import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext.jsx';

//Sau này sẽ bọc Provider context vào đây

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider><App /></AppProvider></BrowserRouter>
  </StrictMode>,
)

