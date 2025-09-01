import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Users from '../pages/Users.jsx';
import Roles from '../pages/Roles.jsx';
import Analytics from '../pages/Analytics.jsx';
import AuditLogs from '../pages/AuditLogs.jsx';
import NotFound from '../pages/NotFound.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';

export default function AppRoutes() {
  return (
    <Routes>
     
      <Route path="/login" element={<Login />} />

      
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/audit-logs" element={<AuditLogs />} />
      </Route>

    
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
