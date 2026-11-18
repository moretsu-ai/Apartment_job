import React, { useState } from 'react';
import {
  Settings,
  Users,
  ShieldAlert,
  Bell,
  DollarSign,
  CheckCircle2,
  Lock,
  Save,
  Building,
  Key
} from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { mockSocietyInfo } from '@/data/mock';

export const SettingsManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'general' | 'roles' | 'billing' | 'notifications' | 'approvals'
  >('general');

  // Form states
  const [societySettings, setSocietySettings] = useState({
    name: mockSocietyInfo.name,
    regNo: mockSocietyInfo.registrationNumber,
    email: mockSocietyInfo.contactEmail,
    phone: mockSocietyInfo.contactPhone,
    lateFeePercentage: 18,
    gracePeriodDays: 10,
    dualSignatoryRequired: true,
    minApprovalThreshold: 25000,
    smsAlertsEmergency: true,
    emailAlertsMonthlyBills: true,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const rolesList = [
    {
      role: 'Super Administrator',
      count: 2,
      permissions: 'Full systemic control, database backups, role assignment, financial authoring',
    },
    {
      role: 'Managing Committee Member',
      count: 7,
      permissions: 'Approve vouchers, dispatch broadcasts, review complaints, view financial ledgers',
    },
    {
      role: 'Estate Supervisor',
      count: 4,
      permissions: 'Assign technicians, signoff AMC jobs, update inventory stock, view resident roster',
    },
    {
      role: 'Security Gate Personnel',
      count: 8,
      permissions: 'Visitor check-in/out logging, RFID barrier override, delivery vehicle clearance',
    },
    {
      role: 'Resident (Owner / Tenant)',
      count: 642,
      permissions: 'Pay maintenance dues, log complaints, book club facilities, cast AGM votes',
    },
  ];

  return (
    <div className="settings-management-page">
      <PageHeader
        title="Society Settings & Role Management"
        description="Configuration of billing cycles, late fees, access control roles, and dual-signatory authorizations"
        breadcrumbs={[{ label: 'System' }, { label: 'Settings' }]}
        actions={
          savedSuccess ? (
            <span className="badge bg-success text-white py-2 px-3 d-flex align-items-center gap-1 font-size-13">
              <CheckCircle2 size={16} /> Settings Saved
            </span>
          ) : (
            <button
              type="button"
              className="btn btn-sm btn-primary-custom d-flex align-items-center gap-1"
              onClick={handleSave}
            >
              <Save size={14} />
              <span>Save Configuration</span>
            </button>
          )
        }
      />

      {/* Tabs Row */}
      <div className="card mb-4">
        <div className="card-body py-2">
          <ul className="nav nav-pills gap-2">
            {[
              { id: 'general', label: 'Society Profile & General', icon: <Building size={15} /> },
              { id: 'roles', label: 'Roles & Access Control', icon: <Key size={15} /> },
              { id: 'billing', label: 'Maintenance & Billing Cycle', icon: <DollarSign size={15} /> },
              { id: 'approvals', label: 'Financial Approvals', icon: <ShieldAlert size={15} /> },
              { id: 'notifications', label: 'Notification Preferences', icon: <Bell size={15} /> },
            ].map((tab) => (
              <li key={tab.id} className="nav-item">
                <button
                  type="button"
                  className={`btn btn-sm d-flex align-items-center gap-2 ${
                    activeTab === tab.id ? 'btn-primary-custom' : 'btn-light text-muted border'
                  }`}
                  onClick={() => setActiveTab(tab.id as any)}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tab 1: General Settings */}
      {activeTab === 'general' && (
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">Society Identity & Administrative Information</h5>
            <span className="card-subtitle">Official society credentials displayed on receipts and circulars</span>
          </div>
          <div className="card-body">
            <form onSubmit={handleSave}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Society Legal Registered Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={societySettings.name}
                    onChange={(e) => setSocietySettings({ ...societySettings, name: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Statutory Registration Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={societySettings.regNo}
                    onChange={(e) => setSocietySettings({ ...societySettings, regNo: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Official Helpline Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={societySettings.email}
                    onChange={(e) => setSocietySettings({ ...societySettings, email: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Administrative Office Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    value={societySettings.phone}
                    onChange={(e) => setSocietySettings({ ...societySettings, phone: e.target.value })}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tab 2: Roles & Permissions */}
      {activeTab === 'roles' && (
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">Role-Based Access Control (RBAC) Matrix</h5>
            <span className="card-subtitle">Security privileges configured per user classification</span>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-custom mb-0">
                <thead>
                  <tr>
                    <th>Role Designation</th>
                    <th>Active Accounts</th>
                    <th>System Permissions & Access Scope</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rolesList.map((r, idx) => (
                    <tr key={idx}>
                      <td>
                        <strong className="text-teal-primary font-size-13">{r.role}</strong>
                      </td>
                      <td>
                        <span className="badge bg-light text-dark border font-size-12">
                          {r.count} Users
                        </span>
                      </td>
                      <td>
                        <span className="font-size-12 text-muted">{r.permissions}</span>
                      </td>
                      <td className="text-end">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-custom"
                          onClick={() => alert(`Configuring permission matrix for ${r.role}`)}
                        >
                          Edit Permissions
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Maintenance & Billing Cycle */}
      {activeTab === 'billing' && (
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">Maintenance Billing & Interest Configuration</h5>
            <span className="card-subtitle">Assessment billing dates, grace periods, and late payment interest rates</span>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small fw-semibold">Bill Generation Day</label>
                <select className="form-select" defaultValue="1">
                  <option value="1">1st of Every Month</option>
                  <option value="5">5th of Every Month</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-semibold">Payment Grace Period (Days)</label>
                <input
                  type="number"
                  className="form-control"
                  value={societySettings.gracePeriodDays}
                  onChange={(e) =>
                    setSocietySettings({ ...societySettings, gracePeriodDays: Number(e.target.value) })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-semibold">Late Payment Interest Rate (% p.a.)</label>
                <input
                  type="number"
                  className="form-control"
                  value={societySettings.lateFeePercentage}
                  onChange={(e) =>
                    setSocietySettings({ ...societySettings, lateFeePercentage: Number(e.target.value) })
                  }
                />
                <span className="text-muted font-size-11">
                  As approved in AGM as per Bye-law 71 (Maximum 21% p.a.)
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Financial Approvals */}
      {activeTab === 'approvals' && (
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">Financial Authorization Policy</h5>
            <span className="card-subtitle">Multi-signatory thresholds and disbursement workflows</span>
          </div>
          <div className="card-body">
            <div className="form-check form-switch mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="dualSignSwitch"
                checked={societySettings.dualSignatoryRequired}
                onChange={(e) =>
                  setSocietySettings({
                    ...societySettings,
                    dualSignatoryRequired: e.target.checked,
                  })
                }
              />
              <label className="form-check-label fw-semibold font-size-13" htmlFor="dualSignSwitch">
                Require Dual-Signatory (Treasurer + Secretary) for any payment above ₹25,000
              </label>
            </div>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small fw-semibold">Major Expense Threshold (INR ₹)</label>
                <input
                  type="number"
                  className="form-control"
                  value={societySettings.minApprovalThreshold}
                  onChange={(e) =>
                    setSocietySettings({
                      ...societySettings,
                      minApprovalThreshold: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Notification Preferences */}
      {activeTab === 'notifications' && (
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">Communication & SMS Gateway Preferences</h5>
            <span className="card-subtitle">Configure automated notifications sent to flat owners</span>
          </div>
          <div className="card-body">
            <div className="form-check form-switch mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="emergencySwitch"
                checked={societySettings.smsAlertsEmergency}
                onChange={(e) =>
                  setSocietySettings({
                    ...societySettings,
                    smsAlertsEmergency: e.target.checked,
                  })
                }
              />
              <label className="form-check-label font-size-13" htmlFor="emergencySwitch">
                Send instant SMS broadcast for water/power supply outages and urgent meetings
              </label>
            </div>
            <div className="form-check form-switch mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="billSwitch"
                checked={societySettings.emailAlertsMonthlyBills}
                onChange={(e) =>
                  setSocietySettings({
                    ...societySettings,
                    emailAlertsMonthlyBills: e.target.checked,
                  })
                }
              />
              <label className="form-check-label font-size-13" htmlFor="billSwitch">
                Email digital maintenance invoice automatically on 1st of every month
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

