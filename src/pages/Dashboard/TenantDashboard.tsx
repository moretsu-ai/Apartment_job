import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  FileCheck,
  DollarSign,
  AlertCircle,
  Megaphone,
  Calendar,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Phone,
  User,
  Plus
} from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { StatusBadge, PriorityBadge } from '@/components/common/Badge';
import { useAuth } from '@/context/AuthContext';
import {
  mockSocietyInfo,
  mockComplaints,
  mockNotifications,
  mockEvents,
  mockMaintenanceFees
} from '@/data/mock';

export const TenantDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Tenant personal data (Aditya Roy - Flat A-102)
  const tenantComplaints = mockComplaints.filter(
    (c) => c.apartmentNumber.includes('A-102') || c.apartmentNumber.includes('Tower B')
  );
  const myFeeRecord = mockMaintenanceFees.find((f) => f.apartmentNumber === 'A-102') || {
    amountDue: 4850,
    amountPaid: 0,
    dueDate: '2024-11-10',
    status: 'Pending' as const,
    month: 'November 2024'
  };

  return (
    <div className="tenant-dashboard">
      <PageHeader
        title={`Welcome, ${currentUser?.name || 'Tenant'}`}
        description={`Tenant Portal • Flat ${currentUser?.apartmentNumber || 'A-102'} (${currentUser?.block || 'Tower A'}) • ${mockSocietyInfo.name}`}
        breadcrumbs={[{ label: 'Dashboard' }, { label: 'Tenant Portal' }]}
        actions={
          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-warning text-dark py-2 px-3 d-flex align-items-center gap-1 font-size-12 shadow-sm">
              <KeyRound size={13} />
              <span>Role: Verified Tenant</span>
            </span>
            <button
              type="button"
              className="btn btn-sm btn-primary-custom d-flex align-items-center gap-1"
              onClick={() => navigate('/complaints')}
            >
              <Plus size={14} />
              <span>Submit Service Request</span>
            </button>
          </div>
        }
      />

      {/* Tenant Quick Stat Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard
            label="My Apartment"
            value="Flat A-102"
            icon={<Home size={22} />}
            iconVariant="primary"
            trend={{ text: 'Tower A • 2BHK (1150 sq.ft)', type: 'neutral' }}
            onClick={() => navigate('/apartments')}
          />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard
            label="Current Maintenance"
            value={`₹${myFeeRecord.amountDue.toLocaleString('en-IN')}`}
            icon={<DollarSign size={22} />}
            iconVariant="warning"
            trend={{ text: `Due by ${myFeeRecord.dueDate}`, type: 'negative' }}
            onClick={() => navigate('/payments')}
          />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard
            label="Lease Status"
            value="Active (11 Mo)"
            icon={<FileCheck size={22} />}
            iconVariant="success"
            trend={{ text: 'Expiring Oct 31, 2025', type: 'positive' }}
            onClick={() => navigate('/agreements')}
          />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard
            label="Open Service Requests"
            value="1 Active"
            icon={<AlertCircle size={22} />}
            iconVariant="info"
            trend={{ text: 'Elevator inspection in progress', type: 'neutral' }}
            onClick={() => navigate('/complaints')}
          />
        </div>
      </div>

      {/* Tenancy & Payment Row */}
      <div className="row g-3 mb-4">
        {/* Rental Agreement & Landlord Card */}
        <div className="col-12 col-lg-6">
          <div className="card h-100">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <div>
                <h6 className="card-title mb-0">My Registered Tenancy Agreement</h6>
                <span className="card-subtitle">Official verified lease documentation</span>
              </div>
              <span className="badge bg-success-subtle text-success border border-success-subtle">
                <ShieldCheck size={12} className="me-1" />
                KYC Verified
              </span>
            </div>
            <div className="card-body">
              <div className="p-3 bg-light rounded-3 mb-3 border">
                <div className="row g-2 font-size-13">
                  <div className="col-6">
                    <span className="text-muted d-block font-size-11">Flat Landlord (Lessor):</span>
                    <strong className="text-dark">Sunita Menon</strong>
                  </div>
                  <div className="col-6">
                    <span className="text-muted d-block font-size-11">Landlord Phone:</span>
                    <strong className="text-dark">+91 98201 54321</strong>
                  </div>
                  <div className="col-6 mt-2">
                    <span className="text-muted d-block font-size-11">Monthly Rent:</span>
                    <strong className="text-dark">₹42,000 / month</strong>
                  </div>
                  <div className="col-6 mt-2">
                    <span className="text-muted d-block font-size-11">Security Deposit:</span>
                    <strong className="text-dark">₹2,00,000 (Refundable)</strong>
                  </div>
                  <div className="col-6 mt-2">
                    <span className="text-muted d-block font-size-11">Lease Tenure:</span>
                    <strong className="text-dark">01 Nov 2024 – 31 Oct 2025</strong>
                  </div>
                  <div className="col-6 mt-2">
                    <span className="text-muted d-block font-size-11">Police Verification:</span>
                    <span className="badge bg-success text-white font-size-11">Verified by NMMC</span>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center pt-2">
                <span className="font-size-12 text-muted">
                  Agreement File: <strong className="text-dark">agreement-a102.pdf</strong>
                </span>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-custom"
                  onClick={() => navigate('/agreements')}
                >
                  View Full Agreement &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Maintenance Dues & Receipts */}
        <div className="col-12 col-lg-6">
          <div className="card h-100">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <div>
                <h6 className="card-title mb-0">Maintenance Charges & Due Status</h6>
                <span className="card-subtitle">Society common services & elevator assessment</span>
              </div>
              <StatusBadge status={myFeeRecord.status} />
            </div>
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between p-3 border rounded-3 bg-light mb-3">
                <div>
                  <div className="font-size-12 text-muted">Current Month Bill (November 2024)</div>
                  <h3 className="fw-bold text-dark my-1">₹4,850</h3>
                  <div className="font-size-11 text-danger">Due Date: 10th Nov 2024 (Grace period active)</div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary-custom"
                  onClick={() => navigate('/payments')}
                >
                  Pay via UPI / Card &rarr;
                </button>
              </div>

              <h6 className="font-size-12 fw-bold text-uppercase text-muted mb-2">Previous Payments History</h6>
              <div className="table-responsive">
                <table className="table table-sm table-custom mb-0 font-size-12">
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Amount</th>
                      <th>Transaction ID</th>
                      <th>Receipt</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>October 2024</td>
                      <td>₹4,850</td>
                      <td><span className="font-monospace text-muted">UPI-RAZ-891021</span></td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-sm btn-link text-teal-primary p-0 text-decoration-none"
                          onClick={() => navigate('/payments')}
                        >
                          View Receipt
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>September 2024</td>
                      <td>₹4,850</td>
                      <td><span className="font-monospace text-muted">HDFC-IMPS-77192</span></td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-sm btn-link text-teal-primary p-0 text-decoration-none"
                          onClick={() => navigate('/payments')}
                        >
                          View Receipt
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Requests & Community Notices Row */}
      <div className="row g-3">
        {/* My Complaints / Requests */}
        <div className="col-12 col-lg-6">
          <div className="card h-100">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <div>
                <h6 className="card-title mb-0">My Service Requests & Complaints</h6>
                <span className="card-subtitle">Track repairs and technician turnaround</span>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-outline-custom"
                onClick={() => navigate('/complaints')}
              >
                + New Ticket
              </button>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {tenantComplaints.map((c) => (
                  <div key={c.id} className="list-group-item p-3">
                    <div className="d-flex justify-content-between align-items-start mb-1">
                      <div>
                        <strong className="text-dark font-size-13">{c.title}</strong>
                        <div className="text-muted font-size-11">
                          Ticket {c.ticketNumber} • {c.reportedDate}
                        </div>
                      </div>
                      <StatusBadge status={c.status} />
                    </div>
                    <p className="font-size-12 text-secondary mb-2">{c.description}</p>
                    <div className="d-flex justify-content-between align-items-center font-size-11 text-muted pt-1 border-top">
                      <span>Assigned: <strong className="text-dark">{c.assignedWorker}</strong></span>
                      <PriorityBadge priority={c.priority} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Notices & Upcoming Events */}
        <div className="col-12 col-lg-6">
          <div className="card h-100">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <div>
                <h6 className="card-title mb-0">Society Circulars & Upcoming Events</h6>
                <span className="card-subtitle">Notices relevant to Tower A residents</span>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-link text-teal-primary text-decoration-none p-0"
                onClick={() => navigate('/notifications')}
              >
                All Notices &rarr;
              </button>
            </div>
            <div className="card-body p-3">
              {/* Urgent notice */}
              {mockNotifications.slice(0, 2).map((notif) => (
                <div key={notif.id} className="p-3 mb-2 rounded bg-light border-start border-3 border-teal-primary">
                  <div className="d-flex justify-content-between align-items-start mb-1">
                    <strong className="font-size-13 text-dark">{notif.title}</strong>
                    <span className="badge bg-light text-muted border font-size-10">{notif.timestamp}</span>
                  </div>
                  <p className="font-size-12 text-muted mb-0 line-clamp-2">{notif.message}</p>
                </div>
              ))}

              <div className="pt-2">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="font-size-12 fw-bold text-uppercase text-muted">Upcoming Festival</span>
                  <button
                    type="button"
                    className="btn btn-sm btn-link text-teal-primary text-decoration-none p-0 font-size-11"
                    onClick={() => navigate('/events')}
                  >
                    View Calendar &rarr;
                  </button>
                </div>
                {mockEvents.slice(2, 3).map((evt) => (
                  <div key={evt.id} className="p-2 border rounded d-flex justify-content-between align-items-center">
                    <div>
                      <div className="fw-semibold font-size-13 text-dark">{evt.name}</div>
                      <div className="text-muted font-size-11">{evt.startDate} • {evt.venue}</div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-custom font-size-11"
                      onClick={() => navigate('/events')}
                    >
                      Join Event
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

