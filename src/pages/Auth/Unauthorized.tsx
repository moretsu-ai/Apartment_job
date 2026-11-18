import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, UserCheck, LogOut, Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { PageHeader } from '@/components/layout/PageHeader';

export const Unauthorized: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  const attemptedPath = (location.state as any)?.from || location.pathname;

  return (
    <div className="unauthorized-page py-4">
      <PageHeader
        title="Access Restricted"
        description="Role-Based Access Control (RBAC) security boundary active"
        breadcrumbs={[{ label: 'Security' }, { label: '403 Access Denied' }]}
      />

      <div className="row justify-content-center mt-3">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm border border-danger-subtle text-center p-4 p-md-5">
            <div className="avatar-placeholder rounded-circle mx-auto mb-3 p-3 bg-danger-subtle text-danger" style={{ width: '72px', height: '72px' }}>
              <ShieldAlert size={36} />
            </div>

            <span className="badge bg-danger text-white font-size-12 px-3 py-1 mb-2 d-inline-block mx-auto">
              HTTP 403 • ACCESS DENIED
            </span>

            <h4 className="fw-bold text-dark mb-2">Insufficient Permissions</h4>

            <p className="text-secondary font-size-14 mb-4">
              You are currently signed in as{' '}
              <strong className="text-dark">{currentUser?.name || 'Guest'}</strong> (
              <span className="badge bg-light text-dark border">
                {currentUser?.roleTitle || 'Unassigned'}
              </span>
              ). Your assigned role does not grant privileges to access the requested module:{' '}
              <code className="text-danger fw-semibold">{attemptedPath}</code>.
            </p>

            <div className="p-3 bg-light rounded-3 text-start font-size-12 mb-4 border">
              <div className="d-flex align-items-center gap-2 mb-2 text-danger fw-bold">
                <Lock size={14} />
                <span>RBAC Security Policy Enforced</span>
              </div>
              <ul className="mb-0 text-muted ps-3">
                <li>Administrative financial ledgers, audit reports, and society settings are strictly restricted to the <strong>Admin</strong> persona.</li>
                <li>Tenants and Residents maintain segregated access to their personal apartments, complaints, and billing ledgers.</li>
                <li>To inspect administrative pages, switch to the <strong>Admin demo account</strong>.</li>
              </ul>
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-2">
              <button
                type="button"
                className="btn btn-primary-custom d-flex align-items-center gap-2"
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft size={16} />
                <span>Return to My Dashboard</span>
              </button>

              <button
                type="button"
                className="btn btn-outline-custom d-flex align-items-center gap-2"
                onClick={() => navigate('/login')}
              >
                <UserCheck size={16} />
                <span>Switch Demo Account</span>
              </button>

              <button
                type="button"
                className="btn btn-light border text-danger d-flex align-items-center gap-2"
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

