import React, { useState } from 'react';
import {
  AlertCircle,
  Search,
  Plus,
  Filter,
  Clock,
  UserCheck,
  CheckCircle,
  XCircle,
  ArrowRight,
  ShieldAlert,
  Flame,
  Wrench,
  Eye,
  Send
} from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Modal } from '@/components/common/Modal';
import { PriorityBadge, StatusBadge } from '@/components/common/Badge';
import { mockComplaints, mockStaff } from '@/data/mock';
import { Complaint, PriorityLevel } from '@/types';

export const ComplaintManagement: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Modals
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  // New Ticket State
  const [newTicket, setNewTicket] = useState<Partial<Complaint>>({
    title: '',
    category: 'Plumbing',
    description: '',
    apartmentNumber: '',
    block: 'Tower A',
    priority: 'P2',
    reportedBy: 'Rajesh Sharma',
    assignedWorker: 'Society Plumber (Santosh Kumar)',
  });

  const [reassignWorkerName, setReassignWorkerName] = useState('');

  const filteredComplaints = complaints.filter((c) => {
    const matchesSearch =
      c.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.apartmentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.assignedWorker.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'All' || c.priority === priorityFilter;
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicket.title || !newTicket.apartmentNumber) return;

    const p = newTicket.priority || 'P3';
    const pLabelMap: Record<PriorityLevel, 'Critical' | 'High' | 'Medium' | 'Low'> = {
      P1: 'Critical',
      P2: 'High',
      P3: 'Medium',
      P4: 'Low',
    };

    const created: Complaint = {
      id: `CMP-${Date.now()}`,
      ticketNumber: `#${1080 + complaints.length + 1}`,
      title: newTicket.title || '',
      category: (newTicket.category as any) || 'Plumbing',
      description: newTicket.description || '',
      apartmentNumber: newTicket.apartmentNumber || '',
      block: newTicket.block || 'Tower A',
      priority: p as PriorityLevel,
      priorityLabel: pLabelMap[p as PriorityLevel],
      reportedBy: newTicket.reportedBy || 'Resident Desk',
      reportedDate: new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }),
      resolutionDeadline: p === 'P1' ? '4 Hours (Critical SLA)' : '24-48 Hours',
      assignedWorker: newTicket.assignedWorker || 'Duty Supervisor',
      status: 'Open',
      timeline: [
        {
          time: 'Just now',
          action: 'Complaint ticket created and dispatched',
          by: newTicket.reportedBy || 'Desk Admin',
        },
      ],
    };

    setComplaints([created, ...complaints]);
    setIsNewTicketModalOpen(false);
    setNewTicket({
      title: '',
      category: 'Plumbing',
      description: '',
      apartmentNumber: '',
      block: 'Tower A',
      priority: 'P2',
      reportedBy: 'Rajesh Sharma',
      assignedWorker: 'Society Plumber (Santosh Kumar)',
    });
  };

  const handleReassignWorker = () => {
    if (!selectedComplaint || !reassignWorkerName) return;

    const updated = complaints.map((c) => {
      if (c.id === selectedComplaint.id) {
        return {
          ...c,
          assignedWorker: reassignWorkerName,
          status: 'In Progress' as const,
          timeline: [
            ...c.timeline,
            {
              time: 'Just now',
              action: `Reassigned to ${reassignWorkerName}`,
              by: 'Managing Committee Admin',
            },
          ],
        };
      }
      return c;
    });

    setComplaints(updated);
    const updatedSelected = updated.find((c) => c.id === selectedComplaint.id) || null;
    setSelectedComplaint(updatedSelected);
    setIsAssignModalOpen(false);
  };

  const handleUpdateStatus = (status: 'In Progress' | 'Resolved' | 'Closed') => {
    if (!selectedComplaint) return;
    const updated = complaints.map((c) => {
      if (c.id === selectedComplaint.id) {
        return {
          ...c,
          status,
          timeline: [
            ...c.timeline,
            {
              time: 'Just now',
              action: `Ticket marked as ${status}`,
              by: 'Rajesh Sharma (Admin)',
            },
          ],
        };
      }
      return c;
    });
    setComplaints(updated);
    const updatedSelected = updated.find((c) => c.id === selectedComplaint.id) || null;
    setSelectedComplaint(updatedSelected);
  };

  return (
    <div className="complaint-management-page">
      <PageHeader
        title="Complaints & Grievance Redressal"
        description="4-tier priority SLA triage system with worker assignment and audit history"
        breadcrumbs={[{ label: 'Operations' }, { label: 'Complaints' }]}
        actions={
          <button
            type="button"
            className="btn btn-sm btn-primary-custom d-flex align-items-center gap-1"
            onClick={() => setIsNewTicketModalOpen(true)}
          >
            <Plus size={16} />
            <span>Submit Complaint Ticket</span>
          </button>
        }
      />

      {/* SLA & Priority Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div
            className={`card p-3 h-100 cursor-pointer ${priorityFilter === 'P1' ? 'border-danger bg-danger-subtle' : ''}`}
            onClick={() => setPriorityFilter(priorityFilter === 'P1' ? 'All' : 'P1')}
          >
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="badge badge-priority-p1 px-2 py-1">P1 - Critical</span>
              <Flame size={18} className="text-danger" />
            </div>
            <h3 className="fw-bold text-danger my-1">
              {complaints.filter((c) => c.priority === 'P1').length}
            </h3>
            <span className="text-muted font-size-12">SLA &lt; 4 Hours (Elevator/Main Seepage)</span>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div
            className={`card p-3 h-100 cursor-pointer ${priorityFilter === 'P2' ? 'border-warning bg-warning-subtle' : ''}`}
            onClick={() => setPriorityFilter(priorityFilter === 'P2' ? 'All' : 'P2')}
          >
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="badge badge-priority-p2 px-2 py-1">P2 - High</span>
              <AlertCircle size={18} className="text-warning" />
            </div>
            <h3 className="fw-bold text-warning my-1">
              {complaints.filter((c) => c.priority === 'P2').length}
            </h3>
            <span className="text-muted font-size-12">SLA &lt; 24 Hours (Security/Sensors)</span>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div
            className={`card p-3 h-100 cursor-pointer ${priorityFilter === 'P3' ? 'border-primary bg-light' : ''}`}
            onClick={() => setPriorityFilter(priorityFilter === 'P3' ? 'All' : 'P3')}
          >
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="badge badge-priority-p3 px-2 py-1">P3 - Medium</span>
              <Clock size={18} className="text-teal-primary" />
            </div>
            <h3 className="fw-bold text-teal-primary my-1">
              {complaints.filter((c) => c.priority === 'P3').length}
            </h3>
            <span className="text-muted font-size-12">SLA &lt; 48 Hours (Corridors/Lighting)</span>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div
            className={`card p-3 h-100 cursor-pointer ${priorityFilter === 'P4' ? 'border-secondary bg-light' : ''}`}
            onClick={() => setPriorityFilter(priorityFilter === 'P4' ? 'All' : 'P4')}
          >
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="badge badge-priority-p4 px-2 py-1">P4 - Low</span>
              <Wrench size={18} className="text-secondary" />
            </div>
            <h3 className="fw-bold text-secondary my-1">
              {complaints.filter((c) => c.priority === 'P4').length}
            </h3>
            <span className="text-muted font-size-12">SLA &lt; 5 Days (Minor cosmetic repairs)</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-center">
            <div className="col-12 col-md-5">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <Search size={16} className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search by ticket #, flat no, keyword or assigned worker..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="col-6 col-md-3">
              <select
                className="form-select"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="All">All Priority Levels</option>
                <option value="P1">P1 - Critical</option>
                <option value="P2">P2 - High</option>
                <option value="P3">P3 - Medium</option>
                <option value="P4">P4 - Low</option>
              </select>
            </div>

            <div className="col-6 col-md-3">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div className="col-12 col-md-1 text-md-end">
              <button
                type="button"
                className="btn btn-sm btn-light border w-100"
                onClick={() => {
                  setSearchTerm('');
                  setPriorityFilter('All');
                  setStatusFilter('All');
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Complaints List Table */}
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Complaint Register ({filteredComplaints.length})</h5>
          <span className="card-subtitle">Select any ticket to view execution timeline or reassign technicians</span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-custom mb-0">
              <thead>
                <tr>
                  <th>Ticket</th>
                  <th>Title & Description</th>
                  <th>Location</th>
                  <th>Priority</th>
                  <th>Assigned Technician</th>
                  <th>Logged Date</th>
                  <th>SLA Deadline</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <span className="fw-bold text-teal-primary font-size-13">{c.ticketNumber}</span>
                      <div className="text-muted font-size-11">{c.category}</div>
                    </td>
                    <td style={{ maxWidth: '280px' }}>
                      <div className="fw-semibold text-dark font-size-13 text-truncate">{c.title}</div>
                      <div className="text-muted font-size-11 text-truncate">{c.description}</div>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border">{c.apartmentNumber}</span>
                    </td>
                    <td>
                      <PriorityBadge priority={c.priority} />
                    </td>
                    <td>
                      <div className="font-size-12 text-dark fw-medium">{c.assignedWorker}</div>
                    </td>
                    <td>
                      <span className="font-size-12 text-muted">{c.reportedDate}</span>
                    </td>
                    <td>
                      <span className={`font-size-12 fw-medium ${c.priority === 'P1' ? 'text-danger' : 'text-muted'}`}>
                        {c.resolutionDeadline}
                      </span>
                    </td>
                    <td>
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-custom d-inline-flex align-items-center gap-1"
                        onClick={() => {
                          setSelectedComplaint(c);
                          setIsDetailsModalOpen(true);
                        }}
                      >
                        <Eye size={13} />
                        <span>Manage</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal: Complaint Details & Timeline */}
      {selectedComplaint && (
        <Modal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          title={`Complaint File: ${selectedComplaint.ticketNumber} - ${selectedComplaint.title}`}
          size="lg"
          footer={
            <div className="d-flex justify-content-between w-100 align-items-center flex-wrap gap-2">
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-custom"
                  onClick={() => setIsAssignModalOpen(true)}
                >
                  <UserCheck size={14} className="me-1" /> Reassign Tech
                </button>
                {selectedComplaint.status !== 'Resolved' && (
                  <button
                    type="button"
                    className="btn btn-sm btn-success"
                    onClick={() => handleUpdateStatus('Resolved')}
                  >
                    Mark Resolved
                  </button>
                )}
                {selectedComplaint.status === 'Resolved' && (
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleUpdateStatus('Closed')}
                  >
                    Close Ticket
                  </button>
                )}
              </div>
              <button
                type="button"
                className="btn btn-sm btn-light border"
                onClick={() => setIsDetailsModalOpen(false)}
              >
                Close Window
              </button>
            </div>
          }
        >
          <div className="row g-3">
            {/* Ticket Metadata Header */}
            <div className="col-12">
              <div className="p-3 bg-light rounded border d-flex justify-content-between align-items-center flex-wrap gap-2">
                <div>
                  <span className="text-muted small">Category: </span>
                  <span className="fw-bold text-dark font-size-13 me-3">{selectedComplaint.category}</span>
                  <span className="text-muted small">Location: </span>
                  <span className="badge bg-white text-dark border me-3">{selectedComplaint.apartmentNumber}</span>
                  <span className="text-muted small">Reported By: </span>
                  <span className="fw-medium text-dark font-size-13">{selectedComplaint.reportedBy}</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <PriorityBadge priority={selectedComplaint.priority} />
                  <StatusBadge status={selectedComplaint.status} />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="col-12">
              <label className="form-label small fw-bold text-secondary mb-1">Incident Description</label>
              <div className="p-3 border rounded bg-white font-size-13 text-dark">
                {selectedComplaint.description}
              </div>
            </div>

            {/* Assignment & SLA Info */}
            <div className="col-md-6">
              <div className="p-3 bg-light rounded border">
                <h6 className="fw-bold text-teal-primary mb-2">Technician Assignment</h6>
                <div className="font-size-13 mb-1">
                  <strong>Assigned Worker:</strong> {selectedComplaint.assignedWorker}
                </div>
                <div className="font-size-13">
                  <strong>SLA Target:</strong> {selectedComplaint.resolutionDeadline}
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 bg-light rounded border">
                <h6 className="fw-bold text-teal-primary mb-2">Timestamps</h6>
                <div className="font-size-13 mb-1">
                  <strong>Logged:</strong> {selectedComplaint.reportedDate}
                </div>
                <div className="font-size-13">
                  <strong>Current Status:</strong> <span className="fw-semibold">{selectedComplaint.status}</span>
                </div>
              </div>
            </div>

            {/* History Timeline */}
            <div className="col-12">
              <h6 className="fw-bold text-teal-primary mb-3">Audit & Resolution Timeline</h6>
              <div className="ps-3 border-start border-2 border-teal-primary ms-2">
                {selectedComplaint.timeline.map((item, idx) => (
                  <div key={idx} className="mb-3 position-relative ps-3">
                    <div
                      className="position-absolute rounded-circle bg-teal-primary"
                      style={{ width: '8px', height: '8px', left: '-19px', top: '5px' }}
                    ></div>
                    <div className="d-flex justify-content-between align-items-center">
                      <strong className="text-dark font-size-13">{item.action}</strong>
                      <span className="text-muted font-size-11">{item.time}</span>
                    </div>
                    <div className="text-muted font-size-11">Actor: {item.by}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal: Reassign Worker */}
      <Modal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        title="Reassign Technician or Vendor"
        footer={
          <>
            <button
              type="button"
              className="btn btn-sm btn-light border"
              onClick={() => setIsAssignModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary-custom"
              onClick={handleReassignWorker}
            >
              Confirm Assignment
            </button>
          </>
        }
      >
        <div className="mb-3">
          <label className="form-label small fw-semibold">Select Field Technician</label>
          <select
            className="form-select"
            value={reassignWorkerName}
            onChange={(e) => setReassignWorkerName(e.target.value)}
          >
            <option value="">-- Choose on-duty staff --</option>
            {mockStaff.map((staff) => (
              <option key={staff.id} value={`${staff.name} (${staff.role})`}>
                {staff.name} - {staff.role} ({staff.assignedBlock} • Rating {staff.rating}★)
              </option>
            ))}
          </select>
        </div>
      </Modal>

      {/* Modal: New Ticket Submission Form */}
      <Modal
        isOpen={isNewTicketModalOpen}
        onClose={() => setIsNewTicketModalOpen(false)}
        title="Log Society Complaint Ticket"
        size="lg"
        footer={
          <>
            <button
              type="button"
              className="btn btn-sm btn-light border"
              onClick={() => setIsNewTicketModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary-custom"
              onClick={handleCreateTicket}
            >
              Submit Ticket
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateTicket}>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label small fw-semibold">Complaint Title / Summary</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Water Seepage from ceiling / Elevator alarm beeping"
                value={newTicket.title}
                onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Category</label>
              <select
                className="form-select"
                value={newTicket.category}
                onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value as any })}
              >
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Elevator">Elevator</option>
                <option value="Carpentry">Carpentry</option>
                <option value="Security">Security</option>
                <option value="Cleanliness">Cleanliness</option>
                <option value="Civil">Civil / Structural</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Apartment or Location</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. B-402 or Tower C 5th floor"
                value={newTicket.apartmentNumber}
                onChange={(e) => setNewTicket({ ...newTicket, apartmentNumber: e.target.value })}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Priority Level (SLA)</label>
              <select
                className="form-select"
                value={newTicket.priority}
                onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value as any })}
              >
                <option value="P1">P1 - Critical (4h SLA)</option>
                <option value="P2">P2 - High (24h SLA)</option>
                <option value="P3">P3 - Medium (48h SLA)</option>
                <option value="P4">P4 - Low (5-day SLA)</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Reported By</label>
              <input
                type="text"
                className="form-control"
                value={newTicket.reportedBy}
                onChange={(e) => setNewTicket({ ...newTicket, reportedBy: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Assign Technician Immediately</label>
              <select
                className="form-select"
                value={newTicket.assignedWorker}
                onChange={(e) => setNewTicket({ ...newTicket, assignedWorker: e.target.value })}
              >
                {mockStaff.map((s) => (
                  <option key={s.id} value={`${s.name} (${s.role})`}>
                    {s.name} - {s.role}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-12">
              <label className="form-label small fw-semibold">Detailed Description</label>
              <textarea
                className="form-control"
                rows={3}
                placeholder="Describe the issue, exact symptoms, and urgency..."
                value={newTicket.description}
                onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                required
              ></textarea>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

