import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Bell,
  Calendar,
  Building,
  Layers,
  Home,
  Users,
  FileCheck,
  AlertCircle,
  Wrench,
  UserCheck,
  Zap,
  ShieldCheck,
  DollarSign,
  CreditCard,
  Receipt,
  Scale,
  PieChart,
  Sparkles,
  BookmarkCheck,
  Package,
  Megaphone,
  Vote,
  FolderOpen,
  BarChart3,
  ClipboardList,
  ShieldAlert,
  Settings,
  ChevronRight
} from 'lucide-react';
import logoImg from '@/assets/logo/logo.png';

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  badge?: {
    text: string;
    variant: 'danger' | 'warning' | 'success' | 'info';
  };
}

interface NavSection {
  category: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, mobileOpen, onCloseMobile }) => {
  const navigationSections: NavSection[] = [
    {
      category: 'OVERVIEW',
      items: [
        { title: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
        { title: 'Notifications', path: '/notifications', icon: <Bell size={18} />, badge: { text: '4 New', variant: 'warning' } },
        { title: 'Events Calendar', path: '/events', icon: <Calendar size={18} /> },
      ],
    },
    {
      category: 'SOCIETY MANAGEMENT',
      items: [
        { title: 'Society Details', path: '/society', icon: <Building size={18} /> },
        { title: 'Blocks & Buildings', path: '/society', icon: <Layers size={18} /> },
        { title: 'Apartments', path: '/apartments', icon: <Home size={18} /> },
        { title: 'Residents & Tenants', path: '/residents', icon: <Users size={18} /> },
        { title: 'Rental Agreements', path: '/agreements', icon: <FileCheck size={18} />, badge: { text: '1 Expiring', variant: 'danger' } },
      ],
    },
    {
      category: 'OPERATIONS',
      items: [
        { title: 'Complaints', path: '/complaints', icon: <AlertCircle size={18} />, badge: { text: '2 P1', variant: 'danger' } },
        { title: 'Maintenance Mgt', path: '/maintenance', icon: <Wrench size={18} /> },
        { title: 'Staff & Vendors', path: '/vendors', icon: <UserCheck size={18} /> },
        { title: 'Utility Mgt', path: '/utilities', icon: <Zap size={18} /> },
        { title: 'Visitor Management', path: '/visitors', icon: <ShieldCheck size={18} /> },
      ],
    },
    {
      category: 'FINANCIAL MANAGEMENT',
      items: [
        { title: 'Maintenance Fees', path: '/payments', icon: <DollarSign size={18} /> },
        { title: 'Payments & Receipts', path: '/payments', icon: <CreditCard size={18} /> },
        { title: 'Expense Management', path: '/expenses', icon: <Receipt size={18} /> },
        { title: 'Bank Reconciliation', path: '/reconciliation', icon: <Scale size={18} /> },
        { title: 'Financial Reports', path: '/finance', icon: <PieChart size={18} /> },
      ],
    },
    {
      category: 'COMMUNITY MANAGEMENT',
      items: [
        { title: 'Festivals & Events', path: '/events', icon: <Sparkles size={18} /> },
        { title: 'Venue Booking', path: '/bookings', icon: <BookmarkCheck size={18} /> },
        { title: 'Inventory Mgt', path: '/inventory', icon: <Package size={18} /> },
        { title: 'Announcements', path: '/notifications', icon: <Megaphone size={18} /> },
        { title: 'Meetings & Voting', path: '/meetings', icon: <Vote size={18} /> },
      ],
    },
    {
      category: 'DOCUMENTS & REPORTS',
      items: [
        { title: 'Documents Repository', path: '/documents', icon: <FolderOpen size={18} /> },
        { title: 'Reports & Analytics', path: '/reports', icon: <BarChart3 size={18} /> },
        { title: 'Audit Logs', path: '/reports', icon: <ClipboardList size={18} /> },
      ],
    },
    {
      category: 'SYSTEM',
      items: [
        { title: 'User Management', path: '/settings', icon: <Users size={18} /> },
        { title: 'Roles & Permissions', path: '/settings', icon: <ShieldAlert size={18} /> },
        { title: 'Society Settings', path: '/settings', icon: <Settings size={18} /> },
      ],
    },
  ];

  return (
    <>
      <div
        className={`sidebar-overlay ${mobileOpen ? 'active' : ''}`}
        onClick={onCloseMobile}
      />
      <aside className={`app-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        <NavLink to="/dashboard" className="sidebar-brand">
          <img src={logoImg} alt="Apartment Job Logo" className="sidebar-brand-logo" />
          <div className="sidebar-brand-text">
            <span className="brand-title">APARTMENT JOB</span>
            <span className="brand-subtitle">Residential Platform</span>
          </div>
        </NavLink>

        <div className="sidebar-menu-wrapper">
          {navigationSections.map((section, idx) => (
            <div key={idx} className="nav-section-group">
              <div className="nav-category-title">{section.category}</div>
              {section.items.map((item, itemIdx) => (
                <div key={itemIdx} className="sidebar-nav-item">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      if (window.innerWidth < 992) onCloseMobile();
                    }}
                    title={collapsed ? item.title : undefined}
                  >
                    <span className="nav-link-icon">{item.icon}</span>
                    <span className="nav-link-text">{item.title}</span>
                    {item.badge && (
                      <span className={`nav-link-badge bg-${item.badge.variant}`}>
                        {item.badge.text}
                      </span>
                    )}
                  </NavLink>
                </div>
              ))}
            </div>
          ))}

          <div className="sidebar-footer-card">
            <span className="footer-badge">SOCIETY ACTIVE</span>
            <div className="footer-title">Emerald Heights CHS</div>
            <div className="footer-desc">224 Flats • 4 Towers</div>
          </div>
        </div>
      </aside>
    </>
  );
};

