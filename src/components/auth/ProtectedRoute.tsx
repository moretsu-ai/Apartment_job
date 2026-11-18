import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { hasRouteAccess } from '@/config/permissions';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  path?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, path }) => {
  const { currentUser, isAuthenticated } = useAuth();
  const location = useLocation();

  const targetPath = path || location.pathname;

  // 1. Must be authenticated
  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // 2. Check permission for target route
  const permitted = hasRouteAccess(currentUser.role, targetPath);
  if (!permitted) {
    return <Navigate to="/unauthorized" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

