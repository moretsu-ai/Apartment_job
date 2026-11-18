import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  Shield,
  DollarSign,
  Vote,
  Calendar,
  AlertCircle,
  Megaphone,
  CheckCircle2,
  Clock,
  Download,
  BookmarkCheck,
  Plus,
  Car
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
  mockMeetings,
  mockMaintenanceFees
} from '@/data/mock';

export const ResidentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [votedOption, setVotedOption] = useState<string | null>(null);

  // Resident personal data (Dr. Amitav Ghosh - Flat A-201)
  const myFeeRecord = mockMaintenanceFees.find((f) => f.apartmentNumber === 'A-201') || {
    amountDue: 6200,
    amountPaid: 6200,
    dueDate: '2024-11-10',
    paymentDate: '2024-11-01',
    transactionId: 'HDFC-NEFT-551092',
    status: 'Paid' as const,
    month: 'November 2024'
  };

  const residentComplaints = mockComplaints.filter(
    (c) => c.apartmentNumber.includes('A-201') || c.reportedBy.includes('Amitav')
  );

  const activeMeeting = mockMeetings[0];

  return (
    <div className="resident-dashboard">
      <PageHeader
        title={`Welcome, ${currentUser?.name || 'Resident Owner'}`}
        description={`Resident Owner Portal • Flat ${currentUser?.apartmentNumber || 'A-201'} (${currentUser?.block || 'Tower A'}) • ${mockSocietyInfo.name}`}
        breadcrumbs={[{ label: 'Dashboard' }, { label: 'Resident Portal' }]}
        actions={
          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-success text-white py-2 px-3 d-flex align-items-center gap-1 font-size-12 shadow-sm">
              <Home size={13} />
              <span>Role: Resident Owner</span>
            </span>
            <button
              type="button"
              className="btn btn-sm btn-primary-custom d-flex align-items-center gap-1"
              onClick={() => navigate('/bookings')}
            >
              <BookmarkCheck size={14} />
              <span>Book Common Facility</span>
            </button>
          </div>
        }
      />

      {/* Resident Quick Stat Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard
            label="My Flat Ownership"
            value="Flat A-201"
            icon={<Home size={22} />}
            iconVariant="primary"
            trend={{ text: 'Tower A • 3BHK (1650 sq.ft)', type: 'neutral' }}
            onClick={() => navigate('/apartments')}
          />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard
            label="Maintenance Status"
            value="Paid in Full"
            icon={<CheckCircle2 size={22} />}
            iconVariant="success"
            trend={{ text: `₹6,200 cleared for Nov 2024`, type: 'positive' }}
            onClick={() => navigate('/payments')}
          />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard
            label="Allocated Parking"
            value="Slot P-A24"
            icon={<Car size={22} />}
            iconVariant="info"
            trend={{ text: 'RFID Bay • Basement 1', type: 'neutral' }}
            onClick={() => navigate('/apartments')}
          />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard
            label="Active AGM Voting"
            value="1 Open Ballot"
            icon={<Vote size={22} />}
            iconVariant="warning"
            trend={{ text: 'RFID Boom barrier poll open', type: 'neutral' }}
            onClick={() => navigate('/meetings')}
          />
        </div>
      </div>

      {/* Property Details & Maintenance Row */}
      <div className="row g-3 mb-4">
        {/* Ownership Records & Share Certificate */}
        <div className="col-12 col-lg-6">
          <div className="card h-100">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <div>
                <h6 className="card-title mb-0">Property Ownership & Share Record</h6>
                <span className="card-subtitle">Permanent registered society share certificate</span>
              </div>
              <span className="badge bg-teal-primary text-white font-size-11">
                Owner Occupied
              </span>
            </div>
            <div className="card-body">
              <div className="p-3 bg-light rounded-3 mb-3 border font-size-13">
                <div className="row g-2">
                  <div className="col-6">
                    <span className="text-muted d-block font-size-11">Registered Owner:</span>
                    <strong className="text-dark">Dr. Amitav Ghosh</strong>
                  </div>
                  <div className="col-6">
                    <span className="text-muted d-block font-size-11">Share Certificate No:</span>
                    <strong className="text-dark">SH-EH-2018-042</strong>
                  </div>
                  <div className="col-6 mt-2">
                    <span className="text-muted d-block font-size-11">Flat Configuration:</span>
                    <strong className="text-dark">3BHK • 1650 sq.ft Carpet</strong>
                  </div>
                  <div className="col-6 mt-2">
                    <span className="text-muted d-block font-size-11">Floor & Wing:</span>
                    <strong className="text-dark">2nd Floor, Tower A - Coral</strong>
                  </div>
                  <div className="col-6 mt-2">
                    <span className="text-muted d-block font-size-11">Designated Parking:</span>
                    <strong className="text-dark">P-A24 (Covered Stilt)</strong>
                  </div>
                  <div className="col-6 mt-2">
                    <span className="text-muted d-block font-size-11">Society Shareholding:</span>
                    <strong className="text-success">5 Fully Paid Shares (₹250)</strong>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center pt-2">
                <span className="font-size-12 text-muted">
                  Emergency Blood Group: <strong className="text-danger">A+</strong>
                </span>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-custom"
                  onClick={() => navigate('/documents')}
                >
                  View Share Certificate &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Maintenance Billing Ledger & Receipt */}
        <div className="col-12 col-lg-6">
          <div className="card h-100">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <div>
                <h6 className="card-title mb-0">Maintenance Account & Assessment</h6>
                <span className="card-subtitle">Monthly society dues and audited contribution</span>
              </div>
              <StatusBadge status="Paid" />
            </div>
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between p-3 border rounded-3 bg-light mb-3">
                <div>
                  <div className="font-size-12 text-muted">November 2024 Bill Assessment</div>
                  <h3 className="fw-bold text-success my-1">₹6,200 (Paid)</h3>
                  <div className="font-size-11 text-muted">Cleared via HDFC NetBanking on 01 Nov 2024</div>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-custom d-flex align-items-center gap-1"
                  onClick={() => navigate('/payments')}
                >
                  <Download size={14} />
                  <span>Download Receipt</span>
                </button>
              </div>

              <h6 className="font-size-12 fw-bold text-uppercase text-muted mb-2">Assessment Breakdown</h6>
              <div className="p-2 border rounded bg-white font-size-12">
                <div className="d-flex justify-content-between py-1 border-bottom">
                  <span>General Maintenance & Security Charges</span>
                  <strong>₹4,340</strong>
                </div>
                <div className="d-flex justify-content-between py-1 border-bottom">
                  <span>Sinking Fund & Major Repair Contribution</span>
                  <strong>₹1,240</strong>
                </div>
                <div className="d-flex justify-content-between py-1">
                  <span>Elevator & 100% DG Backup Cess</span>
                  <strong>₹620</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Voting Poll & Society Activity Row */}
      <div className="row g-3">
        {/* Active Electronic Voting Poll */}
        <div className="col-12 col-lg-6">
          <div className="card h-100">
            <div className="card-header bg-teal-primary text-white d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-2">
                <Vote size={18} className="text-warning" />
                <h6 className="card-title text-white mb-0">Flat Owner Resolution Poll</h6>
              </div>
              <span className="badge bg-warning text-dark font-size-10">AGM VOTING ACTIVE</span>
            </div>
            <div className="card-body">
              {activeMeeting?.activePoll ? (
                <div>
                  <h6 className="fw-bold text-dark mb-3 font-size-13">
                    {activeMeeting.activePoll.question}
                  </h6>

                  <div className="d-flex flex-column gap-2 mb-3">
                    {activeMeeting.activePoll.options.map((opt, idx) => (
                      <div key={idx} className="p-2 border rounded bg-light d-flex justify-content-between align-items-center">
                        <span className="font-size-13 text-dark">{opt.text}</span>
                        <button
                          type="button"
                          className={`btn btn-sm ${votedOption === opt.text ? 'btn-success text-white' : 'btn-outline-custom'}`}
                          onClick={() => setVotedOption(opt.text)}
                        >
                          {votedOption === opt.text ? '✓ Voted (Flat A-201)' : 'Vote'}
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="text-center font-size-11 text-muted">
                    Total votes cast: <strong className="text-dark">{activeMeeting.activePoll.totalVotes} Flats</strong> • 1 vote per flat owner.
                  </div>
                </div>
              ) : (
                <div className="text-muted font-size-13">No voting resolutions active at this time.</div>
              )}
            </div>
          </div>
        </div>

        {/* Notices & Events */}
        <div className="col-12 col-lg-6">
          <div className="card h-100">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <div>
                <h6 className="card-title mb-0">Community Bulletins & Events</h6>
                <span className="card-subtitle">Broadcasts and upcoming festival celebrations</span>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-link text-teal-primary text-decoration-none p-0"
                onClick={() => navigate('/notifications')}
              >
                All Bulletins &rarr;
              </button>
            </div>
            <div className="card-body p-3">
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
                {mockEvents.slice(3, 4).map((evt) => (
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
                      View Details
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

