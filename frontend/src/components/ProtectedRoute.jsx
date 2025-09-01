import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Layout from '../layout/Layout.jsx';

export default function ProtectedRoute() {
  const { token, user } = useAuth();

  if (!token) return <Navigate to="/login" replace />;

  if (!user) {
    return <div style={{ padding: 24 }}>Loading...</div>;
  }

  const roles = Array.isArray(user.roles) ? user.roles : [];
  const isSuperadmin = roles.includes("superadmin");

  if (!isSuperadmin) {
    return <div style={{ padding: 24 }}>Forbidden: Superadmin only</div>;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
