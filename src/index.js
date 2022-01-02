import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeContext"
import { AuthContextProvider } from "./context/AuthContext"

ReactDOM.render(
  <React.StrictMode>
    <Router >
      <AuthContextProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

