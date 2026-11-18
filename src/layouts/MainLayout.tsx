import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

export const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-container">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <Header
        collapsed={collapsed}
        onToggleSidebar={() => setCollapsed(!collapsed)}
        onToggleMobile={() => setMobileOpen(!mobileOpen)}
      />
      <main className={`main-content ${collapsed ? 'sidebar-collapsed' : ''} page-entrance`}>
        <div className="container-fluid p-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

