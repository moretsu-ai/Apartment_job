import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  Shield,
  KeyRound,
  Home,
  UserCheck,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import logoImg from '@/assets/logo/logo.png';
import { useAuth, UserRole } from '@/context/AuthContext';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { loginAsDemo, loginWithCredentials, demoAccounts } = useAuth();

  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [identifier, setIdentifier] = useState(demoAccounts.admin.credentials.email);
  const [password, setPassword] = useState(demoAccounts.admin.credentials.password);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSelectRole = (role: UserRole) => {
    setSelectedRole(role);
    setIdentifier(demoAccounts[role].credentials.email);
    setPassword(demoAccounts[role].credentials.password);
    setErrorMessage(null);
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    handleSelectRole(role);
    setErrorMessage(null);
    setLoading(true);
    loginAsDemo(role, rememberMe);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 250);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    const result = loginWithCredentials(identifier, password, rememberMe);
    if (!result.success) {
      setLoading(false);
      setErrorMessage(result.error || 'Authentication failed. Please verify your credentials.');
      return;
    }

    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 250);
  };

  const roleMeta: Record<UserRole, { icon: React.ReactNode; badgeClass: string; title: string }> = {
    admin: {
      icon: <Shield size={18} className="text-teal-primary" />,
      badgeClass: 'badge-priority-p3',
      title: 'Administrator',
    },
    tenant: {
      icon: <KeyRound size={18} className="text-warning" />,
      badgeClass: 'badge-priority-p2',
      title: 'Tenant (Lessee)',
    },
    resident: {
      icon: <Home size={18} className="text-success" />,
      badgeClass: 'badge-status-active',
      title: 'Resident (Owner)',
    },
  };

  return (
    <div className="container py-4 py-md-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-9">
          <div className="card shadow-lg border-0 overflow-hidden" style={{ borderRadius: '16px' }}>
            <div className="card-header bg-teal-primary text-center p-4 border-0">
              <div className="d-flex justify-content-center mb-2">
                <div className="bg-white p-2 rounded-3 shadow-sm d-inline-flex">
                  <img src={logoImg} alt="Apartment Job Logo" style={{ height: '48px', objectFit: 'contain' }} />
                </div>
              </div>
              <h4 className="text-white fw-bold mb-1">APARTMENT JOB</h4>
              <p className="text-white-50 small mb-0">
                Smarter Living. Better Management. Transparent Communities.
              </p>
            </div>

            <div className="card-body p-4 p-md-5">
              {/* Demo Login Header */}
              <div className="mb-4">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div className="d-flex align-items-center gap-2">
                    <Sparkles size={16} className="text-warning" />
                    <span className="fw-bold font-size-13 text-dark text-uppercase letter-spacing-1">
                      Demo Login — Select Persona
                    </span>
                  </div>
                  <span className="badge bg-light text-muted border font-size-11">
                    Instant 1-Click Access
                  </span>
                </div>

                {/* 3 Distinguishable Demo Login Cards */}
                <div className="row g-2">
                  {(['admin', 'tenant', 'resident'] as UserRole[]).map((role) => {
                    const acct = demoAccounts[role];
                    const meta = roleMeta[role];
                    const isSelected = selectedRole === role;
                    return (
                      <div key={role} className="col-12 col-md-4">
                        <div
                          className={`p-3 rounded-3 border transition-all h-100 ${
                            isSelected
                              ? 'border-2 border-teal-primary bg-teal-light shadow-sm'
                              : 'bg-light hover-bg-white border-light-subtle'
                          }`}
                          style={{ cursor: 'pointer', transition: 'all 180ms ease' }}
                          onClick={() => handleSelectRole(role)}
                        >
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div className="d-flex align-items-center gap-2">
                              <div className="avatar-placeholder rounded-circle avatar-sm fw-bold">
                                {acct.profile.initials}
                              </div>
                              <div>
                                <div className="fw-bold font-size-13 text-dark text-truncate" style={{ maxWidth: '120px' }}>
                                  {acct.profile.name}
                                </div>
                                <div className="font-size-11 text-muted">
                                  {acct.profile.apartmentNumber}
                                </div>
                              </div>
                            </div>
                            <span className={`badge ${meta.badgeClass} font-size-10`}>
                              {meta.title}
                            </span>
                          </div>

                          <div className="font-size-11 text-muted mb-2 line-clamp-2" style={{ minHeight: '32px' }}>
                            {acct.credentials.description}
                          </div>

                          {/* Clearly Distinguishable Action Button */}
                          <button
                            type="button"
                            className={`btn btn-sm w-100 font-size-12 d-flex align-items-center justify-content-center gap-1 ${
                              isSelected ? 'btn-primary-custom' : 'btn-outline-custom'
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuickDemoLogin(role);
                            }}
                          >
                            <UserCheck size={13} />
                            <span>Login as {acct.credentials.label}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="position-relative my-4 text-center">
                <hr className="text-muted opacity-25" />
                <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 font-size-12 text-muted fw-semibold">
                  OR SIGN IN WITH DEMO CREDENTIALS
                </span>
              </div>

              {/* Validation Error Message Alert */}
              {errorMessage && (
                <div className="alert alert-danger py-2 px-3 d-flex align-items-center gap-2 font-size-13 mb-3 border-danger-subtle">
                  <AlertCircle size={16} className="text-danger flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Form with input validation */}
              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold text-secondary">
                      Email or Mobile Number
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0 text-muted">
                        <Mail size={16} />
                      </span>
                      <input
                        type="email"
                        className="form-control border-start-0 font-size-13"
                        placeholder="e.g. admin@apartmentjob.demo"
                        value={identifier}
                        onChange={(e) => {
                          setIdentifier(e.target.value);
                          if (errorMessage) setErrorMessage(null);
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <label className="form-label small fw-semibold text-secondary mb-0">
                        Password
                      </label>
                      <a href="#forgot" className="text-xs text-teal-primary text-decoration-none fw-medium">
                        Forgot?
                      </a>
                    </div>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0 text-muted">
                        <Lock size={16} />
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control border-start-0 border-end-0 font-size-13"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (errorMessage) setErrorMessage(null);
                        }}
                        required
                      />
                      <button
                        type="button"
                        className="input-group-text bg-light border-start-0 text-muted"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="col-12 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="rememberCheck"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label className="form-check-label small text-muted" htmlFor="rememberCheck">
                        Remember active role across browser sessions
                      </label>
                    </div>
                    <span className="badge bg-light text-teal-primary border">
                      <ShieldCheck size={12} className="me-1" /> RBAC Protected
                    </span>
                  </div>

                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary-custom w-100 py-2 d-flex align-items-center justify-content-center gap-2 font-size-14"
                      disabled={loading}
                    >
                      {loading ? 'Authenticating...' : `Sign In as ${demoAccounts[selectedRole]?.credentials.label || 'User'}`}
                      {!loading && <ArrowRight size={16} />}
                    </button>
                  </div>
                </div>
              </form>

              <div className="mt-4 pt-3 border-top text-center">
                <span className="text-muted font-size-12 fw-semibold">
                  Official Demonstration Credentials:
                </span>
                <div className="d-flex flex-wrap justify-content-center gap-3 mt-1 font-size-11 font-monospace text-secondary">
                  <span><strong>Admin:</strong> admin@apartmentjob.demo / Admin@123</span>
                  <span>•</span>
                  <span><strong>Tenant:</strong> tenant@apartmentjob.demo / Tenant@123</span>
                  <span>•</span>
                  <span><strong>Resident:</strong> resident@apartmentjob.demo / Resident@123</span>
                </div>
              </div>
            </div>

            <div className="card-footer bg-light text-center py-2 border-0">
              <span className="text-muted font-size-11">
                Apartment Job v2.4 Enterprise • Frontend Demonstration Authentication
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
