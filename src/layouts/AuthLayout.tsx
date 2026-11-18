import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout: React.FC = () => {
  return (
    <div className="auth-wrapper min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#F0F4F7' }}>
      <Outlet />
    </div>
  );
};

