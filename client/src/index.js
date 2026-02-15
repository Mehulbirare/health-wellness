import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ReminderProvider } from './context/ReminderContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <ReminderProvider>
          <App />
        </ReminderProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);