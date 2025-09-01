import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { UIProvider } from './context/UIContext.jsx';

export default function App() {
  return (
    <AuthProvider>
      <UIProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </UIProvider>
    </AuthProvider>
  );
}
