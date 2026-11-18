import React, { useState } from 'react';
import {
  Vote,
  Calendar,
  Search,
  Plus,
  Users,
  CheckCircle2,
  FileText,
  Clock,
  MapPin,
  CheckSquare,
  Award
} from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Modal } from '@/components/common/Modal';
import { StatusBadge } from '@/components/common/Badge';
import { mockMeetings } from '@/data/mock';
import { CommitteeMeeting } from '@/types';

export const MeetingsManagement: React.FC = () => {
  const [meetings, setMeetings] = useState<CommitteeMeeting[]>(mockMeetings);
  const [selectedMeeting, setSelectedMeeting] = useState<CommitteeMeeting | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [votedOption, setVotedOption] = useState<string | null>(null);

  // Committee Managing Body
  const committeeMembers = [
    { name: 'Dr. Amitav Ghosh', flat: 'A-201', role: 'Chairman / President', phone: '+91 98202 88990' },
    { name: 'Rajesh Sharma', flat: 'A-101', role: 'Hon. Secretary', phone: '+91 98201 12345' },
    { name: 'Harish Patel', flat: 'C-404', role: 'Treasurer', phone: '+91 98203 77112' },
    { name: 'Manoj Hegde', flat: 'B-304', role: 'Sports & Clubhouse Member', phone: '+91 98204 44556' },
    { name: 'Kavita Chawla', flat: 'A-202', role: 'Cultural & Women Representative', phone: '+91 98203 11223' },
    { name: 'Deepak Merchant', flat: 'C-501', role: 'Estate & Maintenance Member', phone: '+91 98206 99112' },
  ];

  const handleVote = (optionText: string) => {
    if (!selectedMeeting || !selectedMeeting.activePoll) return;
    setVotedOption(optionText);

    const updated = meetings.map((m) => {
      if (m.id === selectedMeeting.id && m.activePoll) {
        return {
          ...m,
          activePoll: {
            ...m.activePoll,
            options: m.activePoll.options.map((opt) =>
              opt.text === optionText ? { ...opt, votes: opt.votes + 1 } : opt
            ),
            totalVotes: m.activePoll.totalVotes + 1,
          },
        };
      }
      return m;
    });

    setMeetings(updated);
    setSelectedMeeting(updated.find((m) => m.id === selectedMeeting.id) || null);
  };

  return (
    <div className="meetings-management-page">
      <PageHeader
        title="Committee Meetings & Resident Voting"
        description="Statutory AGM, monthly Managing Committee meetings, quorums, AGM resolutions, and digital voting polls"
        breadcrumbs={[{ label: 'Community Management' }, { label: 'Meetings and Voting' }]}
        actions={
          <button
            type="button"
            className="btn btn-sm btn-primary-custom d-flex align-items-center gap-1"
            onClick={() => setIsScheduleModalOpen(true)}
          >
            <Plus size={16} />
            <span>Convene Meeting</span>
          </button>
        }
      />

      {/* Committee Office Bearers Roster */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="card-title">Managing Committee Executive Body (2023 - 2028)</h5>
          <span className="card-subtitle">Elected office bearers under Maharashtra Co-operative Societies Act</span>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {committeeMembers.map((member, idx) => (
              <div key={idx} className="col-12 col-sm-6 col-lg-4">
                <div className="p-3 border rounded bg-light d-flex align-items-center gap-3">
                  <div className="avatar-placeholder rounded-circle avatar-sm flex-shrink-0">
                    {member.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0 text-dark font-size-13">{member.name}</h6>
                    <span className="badge bg-teal-primary text-white font-size-11 my-1">
                      {member.role}
                    </span>
                    <div className="text-muted font-size-11">Flat {member.flat} • {member.phone}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Meetings Schedule & Resolutions */}
      <div className="row g-3">
        <div className="col-12 col-lg-7">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title">Convened Committee Meetings</h5>
              <span className="card-subtitle">Schedule, quorum requirements, and agenda tracking</span>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {meetings.map((meeting) => (
                  <div key={meeting.id} className="list-group-item p-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <span className="badge bg-teal-light text-teal-primary font-size-11 mb-1">
                          {meeting.type}
                        </span>
                        <h6 className="fw-bold text-dark font-size-14 mb-1">{meeting.title}</h6>
                        <div className="text-muted font-size-12 d-flex align-items-center gap-3">
                          <span>
                            <Calendar size={13} className="me-1 text-secondary" /> {meeting.date}
                          </span>
                          <span>
                            <Clock size={13} className="me-1 text-secondary" /> {meeting.time}
                          </span>
                          <span>
                            <MapPin size={13} className="me-1 text-secondary" /> {meeting.venue}
                          </span>
                        </div>
                      </div>
                      <StatusBadge status={meeting.status} />
                    </div>

                    <div className="p-2 bg-light rounded border mb-2 font-size-12">
                      <strong className="text-dark d-block mb-1">Agendas to be tabled:</strong>
                      <ul className="mb-0 ps-3">
                        {meeting.agenda.map((ag, i) => (
                          <li key={i} className="text-muted">{ag}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="d-flex justify-content-between align-items-center pt-2 font-size-12">
                      <span className="text-muted">
                        Quorum Status: <strong>{meeting.confirmedAttendees}</strong> Confirmed / {meeting.quorumRequired} Required
                      </span>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-custom"
                        onClick={() => setSelectedMeeting(meeting)}
                      >
                        Inspect Meeting Dossier
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Digital Voting Interface */}
        <div className="col-12 col-lg-5">
          <div className="card h-100">
            <div className="card-header bg-teal-primary text-white">
              <div className="d-flex align-items-center gap-2">
                <Vote size={18} className="text-warning" />
                <h6 className="card-title text-white mb-0">Active Resident Electronic Poll</h6>
              </div>
              <span className="badge bg-warning text-dark font-size-10">OPEN POLL</span>
            </div>
            <div className="card-body">
              {meetings[0]?.activePoll && (
                <div>
                  <h6 className="fw-bold text-dark mb-3 font-size-14">
                    {meetings[0].activePoll.question}
                  </h6>

                  <div className="d-flex flex-column gap-3 mb-4">
                    {meetings[0].activePoll.options.map((opt, idx) => {
                      const pct = (
                        (opt.votes / (meetings[0].activePoll?.totalVotes || 1)) *
                        100
                      ).toFixed(0);
                      return (
                        <div key={idx} className="p-3 border rounded bg-light">
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <span className="fw-semibold font-size-13 text-dark">{opt.text}</span>
                            <span className="badge bg-white text-dark border">
                              {opt.votes} Votes ({pct}%)
                            </span>
                          </div>
                          <div className="progress mb-2" style={{ height: '6px' }}>
                            <div
                              className="progress-bar bg-teal-primary"
                              style={{ width: `${pct}%` }}
                            ></div>
                          </div>
                          <button
                            type="button"
                            className={`btn btn-sm w-100 ${
                              votedOption === opt.text
                                ? 'btn-success text-white'
                                : 'btn-outline-custom'
                            }`}
                            onClick={() => handleVote(opt.text)}
                          >
                            {votedOption === opt.text ? '✓ Voted Flat A-101' : 'Cast Vote for Flat'}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-center font-size-12 text-muted">
                    Total Flat Votes Cast: <strong className="text-dark">{meetings[0].activePoll.totalVotes} Flats</strong> • One vote per flat owner.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Meeting Dossier */}
      {selectedMeeting && (
        <Modal
          isOpen={!!selectedMeeting}
          onClose={() => setSelectedMeeting(null)}
          title={`Meeting File: ${selectedMeeting.title}`}
          size="lg"
          footer={
            <button
              type="button"
              className="btn btn-sm btn-light border"
              onClick={() => setSelectedMeeting(null)}
            >
              Close
            </button>
          }
        >
          <div className="row g-3">
            <div className="col-12">
              <div className="p-3 bg-light rounded border">
                <h6 className="fw-bold text-teal-primary mb-1">{selectedMeeting.title}</h6>
                <div className="font-size-12 text-muted">
                  {selectedMeeting.date} • {selectedMeeting.time} • {selectedMeeting.venue}
                </div>
              </div>
            </div>
            <div className="col-12">
              <h6 className="fw-bold text-teal-primary mb-2">Detailed Agendas</h6>
              <ol className="font-size-13">
                {selectedMeeting.agenda.map((ag, i) => (
                  <li key={i} className="mb-1">{ag}</li>
                ))}
              </ol>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal: Schedule Meeting */}
      <Modal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        title="Convene Society Committee Meeting"
        footer={
          <>
            <button
              type="button"
              className="btn btn-sm btn-light border"
              onClick={() => setIsScheduleModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary-custom"
              onClick={() => {
                alert('Meeting notice issued to all committee members via email & SMS.');
                setIsScheduleModalOpen(false);
              }}
            >
              Issue Notice
            </button>
          </>
        }
      >
        <div className="mb-3">
          <label className="form-label small fw-semibold">Meeting Title</label>
          <input type="text" className="form-control" placeholder="e.g. Managing Committee Monthly Review" />
        </div>
        <div className="row g-2 mb-3">
          <div className="col-6">
            <label className="form-label small fw-semibold">Date</label>
            <input type="date" className="form-control" defaultValue="2024-11-24" />
          </div>
          <div className="col-6">
            <label className="form-label small fw-semibold">Time</label>
            <input type="text" className="form-control" defaultValue="10:30 AM" />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label small fw-semibold">Venue</label>
          <input type="text" className="form-control" defaultValue="Society Conference Room & Zoom" />
        </div>
      </Modal>
    </div>
  );
};

