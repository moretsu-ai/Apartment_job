import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  Building,
  User,
  Settings,
  LogOut,
  PlusCircle,
  CheckCircle2,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { mockNotifications } from '@/data/mock';

interface HeaderProps {
  collapsed: boolean;
  onToggleSidebar: () => void;
  onToggleMobile: () => void;
}

export const Header: React.FC<HeaderProps> = ({ collapsed, onToggleSidebar, onToggleMobile }) => {
  const navigate = useNavigate();
  const [showSocietyDropdown, setShowSocietyDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSociety, setCurrentSociety] = useState('Emerald Heights Co-op Housing Society');

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const societyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotificationDropdown(false);
      }
      if (societyRef.current && !societyRef.current.contains(event.target as Node)) {
        setShowSocietyDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const societies = [
    'Emerald Heights Co-op Housing Society',
    'Greenwood Residency CHS (Phase 2)',
    'Palm Groves Enclave'
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/complaints?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className={`app-header ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="header-left">
        <button
          type="button"
          className="sidebar-toggle-btn d-none d-lg-flex"
          onClick={onToggleSidebar}
          aria-label="Toggle Sidebar"
          title="Toggle Sidebar"
        >
          <Menu size={18} />
        </button>

        <button
          type="button"
          className="sidebar-toggle-btn d-lg-none"
          onClick={onToggleMobile}
          aria-label="Toggle Mobile Menu"
        >
          <Menu size={18} />
        </button>

        {/* Society Selector Dropdown */}
        <div className="society-selector" ref={societyRef}>
          <button
            type="button"
            className="society-dropdown-btn"
            onClick={() => setShowSocietyDropdown(!showSocietyDropdown)}
          >
            <Building size={15} className="text-teal-primary" />
            <span className="d-none d-sm-inline text-truncate" style={{ maxWidth: '240px' }}>
              {currentSociety}
            </span>
            <ChevronDown size={14} className="text-muted" />
          </button>

          {showSocietyDropdown && (
            <div
              className="dropdown-menu show shadow-sm dropdown-entrance p-2"
              style={{ position: 'absolute', top: '100%', left: 0, minWidth: '280px', zIndex: 1050 }}
            >
              <div className="text-xs text-muted fw-bold px-2 py-1 text-uppercase">Switch Society Workspace</div>
              {societies.map((soc, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`dropdown-item rounded py-2 d-flex align-items-center justify-content-between ${
                    soc === currentSociety ? 'active bg-teal-primary text-white' : ''
                  }`}
                  onClick={() => {
                    setCurrentSociety(soc);
                    setShowSocietyDropdown(false);
                  }}
                >
                  <span className="small text-truncate me-2">{soc}</span>
                  {soc === currentSociety && <CheckCircle2 size={14} />}
                </button>
              ))}
              <div className="dropdown-divider my-1"></div>
              <button
                type="button"
                className="dropdown-item small text-teal-primary fw-medium"
                onClick={() => {
                  setShowSocietyDropdown(false);
                  navigate('/society');
                }}
              >
                + Manage Societies
              </button>
            </div>
          )}
        </div>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="header-search">
          <Search size={15} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search flats, residents, complaints..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="search-shortcut">⌘K</span>
        </form>
      </div>

      <div className="header-right">
        {/* Quick New Complaint / Action button */}
        <button
          type="button"
          className="btn btn-sm btn-outline-custom d-none d-md-flex align-items-center gap-1"
          onClick={() => navigate('/complaints')}
        >
          <PlusCircle size={15} />
          <span>New Ticket</span>
        </button>

        {/* Notifications Icon & Dropdown */}
        <div className="position-relative" ref={notifRef}>
          <button
            type="button"
            className="header-action-btn"
            onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
            title="Notifications"
          >
            <Bell size={18} />
            <span className="notification-badge"></span>
          </button>

          {showNotificationDropdown && (
            <div
              className="dropdown-menu dropdown-menu-end show shadow dropdown-entrance p-0"
              style={{ position: 'absolute', top: '100%', right: 0, width: '340px', zIndex: 1050 }}
            >
              <div className="p-3 border-bottom d-flex align-items-center justify-content-between bg-light">
                <h6 className="m-0 fw-bold text-teal-primary font-size-14">Society Broadcasts</h6>
                <span className="badge bg-danger rounded-pill">4 New</span>
              </div>
              <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                {mockNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-3 border-bottom text-decoration-none text-dark d-block hover-bg-light"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setShowNotificationDropdown(false);
                      navigate('/notifications');
                    }}
                  >
                    <div className="d-flex align-items-start gap-2">
                      {notif.urgency === 'High' ? (
                        <AlertTriangle size={16} className="text-danger flex-shrink-0 mt-1" />
                      ) : (
                        <Clock size={16} className="text-secondary flex-shrink-0 mt-1" />
                      )}
                      <div>
                        <div className="fw-semibold text-truncate font-size-13">{notif.title}</div>
                        <div className="text-muted font-size-12 line-clamp-2">{notif.message.substring(0, 75)}...</div>
                        <div className="text-muted font-size-11 mt-1">{notif.timestamp}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 text-center bg-light border-top">
                <button
                  type="button"
                  className="btn btn-link btn-sm text-teal-primary fw-medium text-decoration-none p-0"
                  onClick={() => {
                    setShowNotificationDropdown(false);
                    navigate('/notifications');
                  }}
                >
                  View All Notifications &rarr;
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="position-relative" ref={profileRef}>
          <div
            className="user-profile-menu"
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          >
            <div className="user-avatar avatar-placeholder bg-teal-light text-teal-primary font-size-13 fw-bold">
              RS
            </div>
            <div className="user-info d-none d-sm-flex">
              <span className="user-name">Rajesh Sharma</span>
              <span className="user-role">Managing Committee (Hon. Sec)</span>
            </div>
            <ChevronDown size={14} className="text-muted d-none d-sm-inline" />
          </div>

          {showProfileDropdown && (
            <div
              className="dropdown-menu dropdown-menu-end show shadow dropdown-entrance p-2"
              style={{ position: 'absolute', top: '100%', right: 0, minWidth: '220px', zIndex: 1050 }}
            >
              <div className="px-3 py-2 border-bottom mb-1">
                <div className="fw-bold font-size-13 text-dark">Rajesh Sharma</div>
                <div className="text-muted font-size-11">Apt A-101 • Secretary</div>
              </div>
              <button
                type="button"
                className="dropdown-item rounded py-2 d-flex align-items-center gap-2 font-size-13"
                onClick={() => {
                  setShowProfileDropdown(false);
                  navigate('/residents');
                }}
              >
                <User size={15} /> My Profile
              </button>
              <button
                type="button"
                className="dropdown-item rounded py-2 d-flex align-items-center gap-2 font-size-13"
                onClick={() => {
                  setShowProfileDropdown(false);
                  navigate('/settings');
                }}
              >
                <Settings size={15} /> Society Settings
              </button>
              <div className="dropdown-divider my-1"></div>
              <button
                type="button"
                className="dropdown-item rounded py-2 d-flex align-items-center gap-2 font-size-13 text-danger"
                onClick={() => {
                  setShowProfileDropdown(false);
                  navigate('/login');
                }}
              >
                <LogOut size={15} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

