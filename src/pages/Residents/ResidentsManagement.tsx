import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  Phone,
  Mail,
  Home,
  Shield,
  Car,
  Heart,
  Calendar,
  CheckCircle2,
  Clock,
  Eye
} from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Modal } from '@/components/common/Modal';
import { StatusBadge } from '@/components/common/Badge';
import { mockResidents } from '@/data/mock';
import { Resident } from '@/types';

export const ResidentsManagement: React.FC = () => {
  const [residents, setResidents] = useState<Resident[]>(mockResidents);
  const [searchTerm, setSearchTerm] = useState('');
  const [designationFilter, setDesignationFilter] = useState('All');
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New resident form
  const [newResident, setNewResident] = useState<Partial<Resident>>({
    name: '',
    apartmentNumber: '',
    block: 'Tower A',
    designation: 'Owner',
    phone: '',
    email: '',
    bloodGroup: 'O+',
    emergencyContact: '',
    moveInDate: '2024-11-01',
    status: 'Active',
    vehicles: [],
  });

  const filteredResidents = residents.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.apartmentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phone.includes(searchTerm) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDesignation =
      designationFilter === 'All' || r.designation === designationFilter;
    return matchesSearch && matchesDesignation;
  });

  const handleAddResident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResident.name || !newResident.apartmentNumber) return;

    const created: Resident = {
      id: `RES-${Date.now()}`,
      name: newResident.name || '',
      apartmentNumber: newResident.apartmentNumber || '',
      block: newResident.block || 'Tower A',
      designation: (newResident.designation as any) || 'Owner',
      phone: newResident.phone || '',
      email: newResident.email || '',
      moveInDate: newResident.moveInDate || '01-Nov-2024',
      status: (newResident.status as any) || 'Active',
      emergencyContact: newResident.emergencyContact || '',
      bloodGroup: newResident.bloodGroup || 'O+',
      vehicles: [],
    };

    setResidents([created, ...residents]);
    setIsAddModalOpen(false);
    setNewResident({
      name: '',
      apartmentNumber: '',
      block: 'Tower A',
      designation: 'Owner',
      phone: '',
      email: '',
      bloodGroup: 'O+',
      emergencyContact: '',
      moveInDate: '2024-11-01',
      status: 'Active',
      vehicles: [],
    });
  };

  return (
    <div className="residents-management-page">
      <PageHeader
        title="Residents & Tenants Directory"
        description="Verified residential roster, contact channels, ownership status, and member profiles"
        breadcrumbs={[{ label: 'Society Management' }, { label: 'Residents and Tenants' }]}
        actions={
          <button
            type="button"
            className="btn btn-sm btn-primary-custom d-flex align-items-center gap-1"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={16} />
            <span>Add Resident</span>
          </button>
        }
      />

      {/* Filter and Search Bar */}
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
                  placeholder="Search resident name, flat no (e.g. A-101), mobile or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-6 col-md-3">
              <select
                className="form-select"
                value={designationFilter}
                onChange={(e) => setDesignationFilter(e.target.value)}
              >
                <option value="All">All Designations</option>
                <option value="Owner">Owners Only</option>
                <option value="Tenant">Tenants Only</option>
                <option value="Family Member">Family Members</option>
              </select>
            </div>
            <div className="col-6 col-md-3 text-md-end">
              <span className="badge bg-light text-muted border py-2 px-3 w-100 text-center">
                {filteredResidents.length} Registered Members
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Residents Grid / Table */}
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Resident Registry</h5>
          <span className="card-subtitle">Verified directory with emergency blood groups and registered gate passes</span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-custom mb-0">
              <thead>
                <tr>
                  <th>Resident</th>
                  <th>Flat No.</th>
                  <th>Designation</th>
                  <th>Contact Info</th>
                  <th>Move-In Date</th>
                  <th>Emergency Blood Group</th>
                  <th>Verification Status</th>
                  <th className="text-end">Profile</th>
                </tr>
              </thead>
              <tbody>
                {filteredResidents.map((resident) => {
                  const initials = resident.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .substring(0, 2);
                  return (
                    <tr key={resident.id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="avatar-placeholder rounded-circle avatar-sm">
                            {initials}
                          </div>
                          <div>
                            <strong className="text-dark font-size-13">{resident.name}</strong>
                            <div className="text-muted font-size-11">ID: {resident.id}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-teal-light text-teal-primary font-size-12 fw-bold">
                          {resident.apartmentNumber}
                        </span>
                        <div className="text-muted font-size-11">{resident.block}</div>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            resident.designation === 'Owner'
                              ? 'bg-success-subtle text-success border border-success-subtle'
                              : 'bg-warning-subtle text-warning border border-warning-subtle'
                          }`}
                        >
                          {resident.designation}
                        </span>
                      </td>
                      <td>
                        <div className="font-size-12 text-dark">{resident.phone}</div>
                        <div className="font-size-11 text-muted">{resident.email}</div>
                      </td>
                      <td>
                        <span className="font-size-12 text-muted">{resident.moveInDate}</span>
                      </td>
                      <td>
                        <span className="badge bg-danger-subtle text-danger border border-danger-subtle">
                          {resident.bloodGroup}
                        </span>
                      </td>
                      <td>
                        <StatusBadge status={resident.status} />
                      </td>
                      <td className="text-end">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-custom d-inline-flex align-items-center gap-1"
                          onClick={() => {
                            setSelectedResident(resident);
                            setIsDetailsModalOpen(true);
                          }}
                        >
                          <Eye size={13} />
                          <span>Profile</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal: Resident Profile */}
      {selectedResident && (
        <Modal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          title={`Resident Profile: ${selectedResident.name}`}
          size="lg"
          footer={
            <button
              type="button"
              className="btn btn-sm btn-light border"
              onClick={() => setIsDetailsModalOpen(false)}
            >
              Close Profile
            </button>
          }
        >
          <div className="row g-3">
            <div className="col-12 text-center pb-3 border-bottom">
              <div className="avatar-placeholder rounded-circle avatar-lg mx-auto mb-2 font-size-22">
                {selectedResident.name.substring(0, 2).toUpperCase()}
              </div>
              <h5 className="fw-bold mb-1 text-teal-primary">{selectedResident.name}</h5>
              <div className="d-flex justify-content-center gap-2">
                <span className="badge bg-light text-dark border">
                  Flat {selectedResident.apartmentNumber} ({selectedResident.block})
                </span>
                <span className="badge bg-teal-primary text-white">
                  {selectedResident.designation}
                </span>
                <StatusBadge status={selectedResident.status} />
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 bg-light rounded border">
                <h6 className="fw-bold text-teal-primary mb-2">Direct Contact Information</h6>
                <div className="font-size-13 mb-1">
                  <strong>Phone:</strong> {selectedResident.phone}
                </div>
                <div className="font-size-13 mb-1">
                  <strong>Email:</strong> {selectedResident.email}
                </div>
                <div className="font-size-13 mb-1">
                  <strong>Emergency Contact:</strong> {selectedResident.emergencyContact || 'Not Specified'}
                </div>
                <div className="font-size-13">
                  <strong>Medical Blood Group:</strong> {selectedResident.bloodGroup}
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 bg-light rounded border">
                <h6 className="fw-bold text-teal-primary mb-2">Registered Vehicles & RFID Tags</h6>
                {selectedResident.vehicles.length > 0 ? (
                  <ul className="list-unstyled mb-0 font-size-13">
                    {selectedResident.vehicles.map((v, i) => (
                      <li key={i} className="d-flex align-items-center gap-2 mb-1">
                        <Car size={15} className="text-secondary" />
                        <span className="fw-medium text-dark">{v}</span>
                        <span className="badge bg-success-subtle text-success font-size-10">RFID Active</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-muted font-size-12">No personal vehicles registered for this member.</span>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal: Add Resident */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Resident or Tenant"
        size="lg"
        footer={
          <>
            <button
              type="button"
              className="btn btn-sm btn-light border"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary-custom"
              onClick={handleAddResident}
            >
              Register Member
            </button>
          </>
        }
      >
        <form onSubmit={handleAddResident}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Full Legal Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Vikramaditya Roy"
                value={newResident.name}
                onChange={(e) => setNewResident({ ...newResident, name: e.target.value })}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-semibold">Apartment Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. B-402"
                value={newResident.apartmentNumber}
                onChange={(e) => setNewResident({ ...newResident, apartmentNumber: e.target.value })}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-semibold">Designation</label>
              <select
                className="form-select"
                value={newResident.designation}
                onChange={(e) => setNewResident({ ...newResident, designation: e.target.value as any })}
              >
                <option value="Owner">Owner</option>
                <option value="Tenant">Tenant</option>
                <option value="Family Member">Family Member</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Contact Phone Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="+91 98..."
                value={newResident.phone}
                onChange={(e) => setNewResident({ ...newResident, phone: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="resident@domain.com"
                value={newResident.email}
                onChange={(e) => setNewResident({ ...newResident, email: e.target.value })}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Blood Group</label>
              <select
                className="form-select"
                value={newResident.bloodGroup}
                onChange={(e) => setNewResident({ ...newResident, bloodGroup: e.target.value })}
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Emergency Contact Phone</label>
              <input
                type="text"
                className="form-control"
                placeholder="+91..."
                value={newResident.emergencyContact}
                onChange={(e) => setNewResident({ ...newResident, emergencyContact: e.target.value })}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Move-In Date</label>
              <input
                type="date"
                className="form-control"
                value={newResident.moveInDate}
                onChange={(e) => setNewResident({ ...newResident, moveInDate: e.target.value })}
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

