import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { AdminDashboard } from './AdminDashboard';
import { TenantDashboard } from './TenantDashboard';
import { ResidentDashboard } from './ResidentDashboard';

export const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <AdminDashboard />;
  }

  switch (currentUser.role) {
    case 'tenant':
      return <TenantDashboard />;
    case 'resident':
      return <ResidentDashboard />;
    case 'admin':
    default:
      return <AdminDashboard />;
  }
};

export default Dashboard;
