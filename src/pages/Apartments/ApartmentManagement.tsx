import React, { useState } from 'react';
import {
  Home,
  Search,
  Filter,
  Plus,
  Car,
  User,
  Phone,
  DollarSign,
  Eye,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Modal } from '@/components/common/Modal';
import { StatusBadge } from '@/components/common/Badge';
import { mockApartments } from '@/data/mock';
import { Apartment } from '@/types';

export const ApartmentManagement: React.FC = () => {
  const [apartments, setApartments] = useState<Apartment[]>(mockApartments);
  const [searchTerm, setSearchTerm] = useState('');
  const [blockFilter, setBlockFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals
  const [selectedApt, setSelectedApt] = useState<Apartment | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [newApt, setNewApt] = useState<Partial<Apartment>>({
    apartmentNumber: '',
    block: 'Tower A',
    floor: 1,
    type: '2BHK',
    areaSqFt: 1150,
    ownerName: '',
    ownerContact: '',
    ownerEmail: '',
    occupancyStatus: 'Owner Occupied',
    maintenanceAmount: 4850,
    parkingSlot: 'P-A',
    dueAmount: 0,
  });

  const filteredApartments = apartments.filter((apt) => {
    const matchesSearch =
      apt.apartmentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (apt.tenantName && apt.tenantName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesBlock = blockFilter === 'All' || apt.block === blockFilter;
    const matchesStatus = statusFilter === 'All' || apt.occupancyStatus === statusFilter;
    return matchesSearch && matchesBlock && matchesStatus;
  });

  const handleAddApartment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newApt.apartmentNumber || !newApt.ownerName) return;

    const created: Apartment = {
      id: `APT-${Date.now()}`,
      apartmentNumber: newApt.apartmentNumber || '',
      block: newApt.block || 'Tower A',
      floor: Number(newApt.floor) || 1,
      type: (newApt.type as any) || '2BHK',
      areaSqFt: Number(newApt.areaSqFt) || 1200,
      ownerName: newApt.ownerName || '',
      ownerContact: newApt.ownerContact || '',
      ownerEmail: newApt.ownerEmail || '',
      occupancyStatus: (newApt.occupancyStatus as any) || 'Owner Occupied',
      maintenanceAmount: Number(newApt.maintenanceAmount) || 5000,
      parkingSlot: newApt.parkingSlot || 'Unallocated',
      dueAmount: 0,
    };

    setApartments([created, ...apartments]);
    setIsAddModalOpen(false);
    setNewApt({
      apartmentNumber: '',
      block: 'Tower A',
      floor: 1,
      type: '2BHK',
      areaSqFt: 1150,
      ownerName: '',
      ownerContact: '',
      ownerEmail: '',
      occupancyStatus: 'Owner Occupied',
      maintenanceAmount: 4850,
      parkingSlot: 'P-A',
      dueAmount: 0,
    });
  };

  return (
    <div className="apartment-management-page">
      <PageHeader
        title="Apartments Directory"
        description="Comprehensive flat inventory, ownership records, occupancy status, and allocated parking"
        breadcrumbs={[{ label: 'Society Management' }, { label: 'Apartments' }]}
        actions={
          <button
            type="button"
            className="btn btn-sm btn-primary-custom d-flex align-items-center gap-1"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={16} />
            <span>Add Apartment</span>
          </button>
        }
      />

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
                  placeholder="Search by flat no (e.g. A-101), owner or tenant..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-6 col-md-3">
              <select
                className="form-select"
                value={blockFilter}
                onChange={(e) => setBlockFilter(e.target.value)}
              >
                <option value="All">All Towers</option>
                <option value="Tower A">Tower A</option>
                <option value="Tower B">Tower B</option>
                <option value="Tower C">Tower C</option>
                <option value="Tower D">Tower D</option>
              </select>
            </div>
            <div className="col-6 col-md-3">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Owner Occupied">Owner Occupied</option>
                <option value="Tenant Occupied">Tenant Occupied</option>
                <option value="Vacant">Vacant</option>
              </select>
            </div>
            <div className="col-12 col-md-1 text-md-end">
              <span className="badge bg-light text-muted border py-2 px-3 w-100 text-center">
                {filteredApartments.length} Flats
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Apartment Directory Table */}
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Apartment Units ({filteredApartments.length})</h5>
          <span className="card-subtitle">Click 'View Details' to inspect flat ledger, parking and tenant records</span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-custom mb-0">
              <thead>
                <tr>
                  <th>Flat No.</th>
                  <th>Tower / Floor</th>
                  <th>Configuration</th>
                  <th>Owner Information</th>
                  <th>Occupancy</th>
                  <th>Parking Slot</th>
                  <th>Monthly Maint.</th>
                  <th>Dues</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredApartments.map((apt) => (
                  <tr key={apt.id}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div className="avatar-placeholder rounded bg-teal-light text-teal-primary p-2">
                          <Home size={16} />
                        </div>
                        <strong className="text-dark font-size-13">{apt.apartmentNumber}</strong>
                      </div>
                    </td>
                    <td>
                      <div>{apt.block}</div>
                      <div className="text-muted font-size-11">{apt.floor}th Floor</div>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border me-1">{apt.type}</span>
                      <span className="text-muted font-size-11">{apt.areaSqFt} sq ft</span>
                    </td>
                    <td>
                      <div className="fw-semibold text-dark font-size-13">{apt.ownerName}</div>
                      <div className="text-muted font-size-11">{apt.ownerContact}</div>
                    </td>
                    <td>
                      <StatusBadge status={apt.occupancyStatus} />
                      {apt.tenantName && (
                        <div className="text-muted font-size-11 mt-1">Tenant: {apt.tenantName}</div>
                      )}
                    </td>
                    <td>
                      <span className="d-inline-flex align-items-center gap-1 font-size-12 text-secondary">
                        <Car size={14} className="text-muted" /> {apt.parkingSlot}
                      </span>
                    </td>
                    <td>₹{apt.maintenanceAmount.toLocaleString('en-IN')}</td>
                    <td>
                      {apt.dueAmount > 0 ? (
                        <span className="badge bg-danger-subtle text-danger border border-danger-subtle">
                          ₹{apt.dueAmount.toLocaleString('en-IN')} Due
                        </span>
                      ) : (
                        <span className="text-success small fw-medium">Nil</span>
                      )}
                    </td>
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-custom d-inline-flex align-items-center gap-1"
                        onClick={() => {
                          setSelectedApt(apt);
                          setIsDetailsModalOpen(true);
                        }}
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

      {/* Modal: Apartment Details */}
      {selectedApt && (
        <Modal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          title={`Apartment File: ${selectedApt.apartmentNumber} (${selectedApt.block})`}
          size="lg"
          footer={
            <button
              type="button"
              className="btn btn-sm btn-light border"
              onClick={() => setIsDetailsModalOpen(false)}
            >
              Close
            </button>
          }
        >
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <div className="p-3 bg-light rounded border">
                <h6 className="fw-bold text-teal-primary mb-2">Flat Specifications</h6>
                <div className="font-size-13 mb-1">
                  <strong>Flat Number:</strong> {selectedApt.apartmentNumber}
                </div>
                <div className="font-size-13 mb-1">
                  <strong>Tower & Floor:</strong> {selectedApt.block}, {selectedApt.floor}th Floor
                </div>
                <div className="font-size-13 mb-1">
                  <strong>Carpet Area:</strong> {selectedApt.areaSqFt} sq. ft ({selectedApt.type})
                </div>
                <div className="font-size-13 mb-1">
                  <strong>Designated Parking:</strong> {selectedApt.parkingSlot}
                </div>
                <div className="font-size-13">
                  <strong>Current Status:</strong> <StatusBadge status={selectedApt.occupancyStatus} />
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="p-3 bg-light rounded border">
                <h6 className="fw-bold text-teal-primary mb-2">Owner & Resident Details</h6>
                <div className="font-size-13 mb-1">
                  <strong>Owner:</strong> {selectedApt.ownerName}
                </div>
                <div className="font-size-13 mb-1">
                  <strong>Contact:</strong> {selectedApt.ownerContact}
                </div>
                <div className="font-size-13 mb-1">
                  <strong>Email:</strong> {selectedApt.ownerEmail}
                </div>
                {selectedApt.tenantName && (
                  <div className="font-size-13 mb-1 text-warning-emphasis">
                    <strong>Current Tenant:</strong> {selectedApt.tenantName}
                  </div>
                )}
                <div className="font-size-13">
                  <strong>Monthly Maintenance:</strong> ₹{selectedApt.maintenanceAmount.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="p-3 border rounded">
                <h6 className="fw-bold text-teal-primary mb-2">Recent Dues & Billing Snapshot</h6>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Outstanding Society Dues:</span>
                  <span className={`fw-bold font-size-16 ${selectedApt.dueAmount > 0 ? 'text-danger' : 'text-success'}`}>
                    ₹{selectedApt.dueAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal: Add Apartment */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Apartment"
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
              onClick={handleAddApartment}
            >
              Save Apartment
            </button>
          </>
        }
      >
        <form onSubmit={handleAddApartment}>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Apartment Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. A-301"
                value={newApt.apartmentNumber}
                onChange={(e) => setNewApt({ ...newApt, apartmentNumber: e.target.value })}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Tower / Block</label>
              <select
                className="form-select"
                value={newApt.block}
                onChange={(e) => setNewApt({ ...newApt, block: e.target.value })}
              >
                <option value="Tower A">Tower A</option>
                <option value="Tower B">Tower B</option>
                <option value="Tower C">Tower C</option>
                <option value="Tower D">Tower D</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Floor Number</label>
              <input
                type="number"
                className="form-control"
                min={1}
                max={60}
                value={newApt.floor}
                onChange={(e) => setNewApt({ ...newApt, floor: Number(e.target.value) })}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Configuration</label>
              <select
                className="form-select"
                value={newApt.type}
                onChange={(e) => setNewApt({ ...newApt, type: e.target.value as any })}
              >
                <option value="1BHK">1BHK</option>
                <option value="2BHK">2BHK</option>
                <option value="3BHK">3BHK</option>
                <option value="4BHK">4BHK</option>
                <option value="Penthouse">Penthouse</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Area (Sq. Ft)</label>
              <input
                type="number"
                className="form-control"
                value={newApt.areaSqFt}
                onChange={(e) => setNewApt({ ...newApt, areaSqFt: Number(e.target.value) })}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Designated Parking Slot</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. P-A31"
                value={newApt.parkingSlot}
                onChange={(e) => setNewApt({ ...newApt, parkingSlot: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Owner Legal Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Rajiv Kapoor"
                value={newApt.ownerName}
                onChange={(e) => setNewApt({ ...newApt, ownerName: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Owner Contact Phone</label>
              <input
                type="text"
                className="form-control"
                placeholder="+91 98..."
                value={newApt.ownerContact}
                onChange={(e) => setNewApt({ ...newApt, ownerContact: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Owner Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="owner@domain.com"
                value={newApt.ownerEmail}
                onChange={(e) => setNewApt({ ...newApt, ownerEmail: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Monthly Maintenance (₹)</label>
              <input
                type="number"
                className="form-control"
                value={newApt.maintenanceAmount}
                onChange={(e) => setNewApt({ ...newApt, maintenanceAmount: Number(e.target.value) })}
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

