import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, Building2 } from 'lucide-react';
import logoImg from '@/assets/logo/logo.png';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('rajesh.sharma@emeraldheights.in');
  const [password, setPassword] = useState('SocietyAdmin2024');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 400);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-5">
          <div className="card shadow-lg border-0 overflow-hidden" style={{ borderRadius: '16px' }}>
            <div className="card-header bg-teal-primary text-center p-4 border-0">
              <div className="d-flex justify-content-center mb-2">
                <div className="bg-white p-2 rounded-3 shadow-sm d-inline-flex">
                  <img src={logoImg} alt="Apartment Job Logo" style={{ height: '52px', objectFit: 'contain' }} />
                </div>
              </div>
              <h4 className="text-white fw-bold mb-1">APARTMENT JOB</h4>
              <p className="text-white-50 small mb-0">
                Smarter Living. Better Management. Transparent Communities.
              </p>
            </div>

            <div className="card-body p-4 p-md-5">
              <div className="mb-4 text-center">
                <h5 className="fw-bold text-teal-primary mb-1">Welcome back!</h5>
                <p className="text-muted small">Sign in to access your residential society administrative dashboard</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary">
                    Registered Email or Mobile Number
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0 text-muted">
                      <Mail size={16} />
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0"
                      placeholder="e.g. name@society.in or +91 98200..."
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label className="form-label small fw-semibold text-secondary mb-0">
                      Password
                    </label>
                    <a href="#forgot" className="text-xs text-teal-primary text-decoration-none fw-medium">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0 text-muted">
                      <Lock size={16} />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control border-start-0 border-end-0"
                      placeholder="Enter your security password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="input-group-text bg-light border-start-0 text-muted"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rememberCheck"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label className="form-check-label small text-muted" htmlFor="rememberCheck">
                      Remember this terminal
                    </label>
                  </div>
                  <span className="badge bg-light text-teal-primary border">
                    <ShieldCheck size={12} className="me-1" /> SSL Protected
                  </span>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary-custom w-100 py-2 d-flex align-items-center justify-content-center gap-2 font-size-14"
                  disabled={loading}
                >
                  {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
                  {!loading && <ArrowRight size={16} />}
                </button>
              </form>

              <div className="mt-4 pt-3 border-top text-center">
                <p className="text-muted small mb-1">
                  New Society or Flat Registration?
                </p>
                <a href="#register" className="fw-semibold text-teal-primary text-decoration-none small">
                  Request Society Onboarding or Resident Access &rarr;
                </a>
              </div>
            </div>

            <div className="card-footer bg-light text-center py-3 border-0">
              <span className="text-muted font-size-12">
                Apartment Job v2.4 Enterprise • ISO 27001 Compliant Platform
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

