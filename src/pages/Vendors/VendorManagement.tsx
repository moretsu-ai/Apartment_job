import React, { useState } from 'react';
import {
  UserCheck,
  Search,
  Plus,
  Phone,
  Star,
  Shield,
  Wrench,
  CheckCircle2,
  Clock,
  Eye,
  Award
} from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Modal } from '@/components/common/Modal';
import { StatusBadge } from '@/components/common/Badge';
import { mockStaff } from '@/data/mock';
import { VendorStaff } from '@/types';

export const VendorManagement: React.FC = () => {
  const [staffList, setStaffList] = useState<VendorStaff[]>(mockStaff);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [selectedStaff, setSelectedStaff] = useState<VendorStaff | null>(null);
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);

  // Add staff form state
  const [newStaff, setNewStaff] = useState<Partial<VendorStaff>>({
    name: '',
    role: 'Plumber',
    agency: 'Society In-house Staff',
    phone: '',
    assignedBlock: 'All Towers',
    rating: 4.8,
  });

  const filteredStaff = staffList.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.phone.includes(searchTerm) ||
      s.agency.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || s.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.phone) return;

    const created: VendorStaff = {
      id: `STF-${Date.now()}`,
      name: newStaff.name || '',
      role: (newStaff.role as any) || 'Plumber',
      agency: newStaff.agency || 'In-house',
      phone: newStaff.phone || '',
      status: 'On Duty',
      rating: 4.8,
      assignedBlock: newStaff.assignedBlock || 'All Towers',
      workCount: 0,
    };

    setStaffList([created, ...staffList]);
    setIsAddStaffModalOpen(false);
    setNewStaff({
      name: '',
      role: 'Plumber',
      agency: 'Society In-house Staff',
      phone: '',
      assignedBlock: 'All Towers',
      rating: 4.8,
    });
  };

  return (
    <div className="vendor-management-page">
      <PageHeader
        title="Staff & Service Vendor Management"
        description="On-duty plumbers, electricians, security guards, housekeeping crew, and agency contracts"
        breadcrumbs={[{ label: 'Operations' }, { label: 'Staff and Vendors' }]}
        actions={
          <button
            type="button"
            className="btn btn-sm btn-primary-custom d-flex align-items-center gap-1"
            onClick={() => setIsAddStaffModalOpen(true)}
          >
            <Plus size={16} />
            <span>Onboard Personnel</span>
          </button>
        }
      />

      {/* Roster Metrics */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card p-3 h-100">
            <span className="text-muted font-size-12 fw-semibold text-uppercase">Total Deployment</span>
            <h3 className="fw-bold text-teal-primary my-1">{staffList.length} Personnel</h3>
            <span className="text-muted font-size-12">Security + Housekeeping + Techs</span>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card p-3 h-100">
            <span className="text-muted font-size-12 fw-semibold text-uppercase">Currently On Duty</span>
            <h3 className="fw-bold text-success my-1">
              {staffList.filter((s) => s.status === 'On Duty').length} Active
            </h3>
            <span className="text-muted font-size-12">Checked in at main security desk</span>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card p-3 h-100">
            <span className="text-muted font-size-12 fw-semibold text-uppercase">Average Resident Rating</span>
            <h3 className="fw-bold text-warning my-1">4.78 ★</h3>
            <span className="text-muted font-size-12">From 820+ completed tickets</span>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card p-3 h-100">
            <span className="text-muted font-size-12 fw-semibold text-uppercase">Contractor Agencies</span>
            <h3 className="fw-bold text-dark my-1">4 Agencies</h3>
            <span className="text-muted font-size-12">SIS, Otis, CleanPro, GreenMeadows</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-center">
            <div className="col-12 col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <Search size={16} className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search staff name, phone, contractor or agency..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-6 col-md-3">
              <select
                className="form-select"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="All">All Roles</option>
                <option value="Plumber">Plumber</option>
                <option value="Electrician">Electrician</option>
                <option value="Security Supervisor">Security Personnel</option>
                <option value="Housekeeping Lead">Housekeeping Staff</option>
                <option value="Lift Technician">Elevator Technician</option>
                <option value="Gardener">Gardener</option>
              </select>
            </div>
            <div className="col-6 col-md-3 text-md-end">
              <span className="badge bg-light text-muted border py-2 px-3 w-100 text-center">
                {filteredStaff.length} Workers Available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Staff Roster Table */}
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Staff Roster & Contractor Registry</h5>
          <span className="card-subtitle">Verified personnel contact numbers, biometric attendance and shift allocations</span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-custom mb-0">
              <thead>
                <tr>
                  <th>Personnel Name</th>
                  <th>Designation / Role</th>
                  <th>Agency / Contractor</th>
                  <th>Contact Phone</th>
                  <th>Assigned Wing</th>
                  <th>Performance Rating</th>
                  <th>Jobs Completed</th>
                  <th>Shift Status</th>
                  <th className="text-end">Dossier</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map((staff) => (
                  <tr key={staff.id}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div className="avatar-placeholder rounded-circle avatar-sm">
                          {staff.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <strong className="text-dark font-size-13">{staff.name}</strong>
                          <div className="text-muted font-size-11">ID: {staff.id}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-teal-light text-teal-primary font-size-12 fw-semibold">
                        {staff.role}
                      </span>
                    </td>
                    <td>
                      <span className="font-size-12 text-dark">{staff.agency}</span>
                    </td>
                    <td>
                      <div className="font-size-12 text-secondary font-monospace">{staff.phone}</div>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border">{staff.assignedBlock}</span>
                    </td>
                    <td>
                      <span className="text-warning fw-bold font-size-13">{staff.rating} ★</span>
                    </td>
                    <td>
                      <span className="font-size-13 text-dark fw-medium">{staff.workCount} tickets</span>
                    </td>
                    <td>
                      <StatusBadge status={staff.status} />
                    </td>
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-custom d-inline-flex align-items-center gap-1"
                        onClick={() => setSelectedStaff(staff)}
                      >
                        <Eye size={13} />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal: View Staff Profile */}
      {selectedStaff && (
        <Modal
          isOpen={!!selectedStaff}
          onClose={() => setSelectedStaff(null)}
          title={`Personnel Record: ${selectedStaff.name}`}
          footer={
            <button
              type="button"
              className="btn btn-sm btn-light border"
              onClick={() => setSelectedStaff(null)}
            >
              Close
            </button>
          }
        >
          <div className="p-3 bg-light rounded border text-center mb-3">
            <div className="avatar-placeholder rounded-circle avatar-lg mx-auto mb-2 font-size-22">
              {selectedStaff.name.substring(0, 2).toUpperCase()}
            </div>
            <h5 className="fw-bold mb-1 text-teal-primary">{selectedStaff.name}</h5>
            <span className="badge bg-teal-primary text-white me-2">{selectedStaff.role}</span>
            <StatusBadge status={selectedStaff.status} />
          </div>
          <div className="row g-3 font-size-13">
            <div className="col-6">
              <strong>Contractor / Agency:</strong> {selectedStaff.agency}
            </div>
            <div className="col-6">
              <strong>Emergency Phone:</strong> {selectedStaff.phone}
            </div>
            <div className="col-6">
              <strong>Duty Allocation:</strong> {selectedStaff.assignedBlock}
            </div>
            <div className="col-6">
              <strong>Resident Satisfaction:</strong> {selectedStaff.rating} ★ ({selectedStaff.workCount} jobs done)
            </div>
          </div>
        </Modal>
      )}

      {/* Modal: Add Staff */}
      <Modal
        isOpen={isAddStaffModalOpen}
        onClose={() => setIsAddStaffModalOpen(false)}
        title="Onboard Service Personnel / Contractor"
        size="lg"
        footer={
          <>
            <button
              type="button"
              className="btn btn-sm btn-light border"
              onClick={() => setIsAddStaffModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary-custom"
              onClick={handleAddStaff}
            >
              Save Personnel Record
            </button>
          </>
        }
      >
        <form onSubmit={handleAddStaff}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Worker Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Ramesh Patil"
                value={newStaff.name}
                onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Role / Skill</label>
              <select
                className="form-select"
                value={newStaff.role}
                onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value as any })}
              >
                <option value="Plumber">Plumber</option>
                <option value="Electrician">Electrician</option>
                <option value="Security Supervisor">Security Personnel</option>
                <option value="Housekeeping Lead">Housekeeping Lead</option>
                <option value="Lift Technician">Elevator Technician</option>
                <option value="Gardener">Gardener</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Agency / Vendor Employer</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. SIS Security India Ltd or In-house"
                value={newStaff.agency}
                onChange={(e) => setNewStaff({ ...newStaff, agency: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Contact Mobile Phone</label>
              <input
                type="text"
                className="form-control"
                placeholder="+91..."
                value={newStaff.phone}
                onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Assigned Tower / Zone</label>
              <select
                className="form-select"
                value={newStaff.assignedBlock}
                onChange={(e) => setNewStaff({ ...newStaff, assignedBlock: e.target.value })}
              >
                <option value="All Towers">All Towers (Entire Society)</option>
                <option value="Tower A & B">Tower A & B</option>
                <option value="Tower C & D">Tower C & D</option>
                <option value="Main Gate & Basements">Main Gate & Basements</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

