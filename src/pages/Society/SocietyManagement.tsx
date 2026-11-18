import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Mail,
  Phone,
  FileCheck,
  Plus,
  Edit,
  Shield,
  Layers,
  Users,
  CheckCircle2,
  Wrench
} from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Modal } from '@/components/common/Modal';
import { StatusBadge } from '@/components/common/Badge';
import { mockSocietyInfo, mockBlocks } from '@/data/mock';
import { BlockInfo, SocietyInfo } from '@/types';

export const SocietyManagement: React.FC = () => {
  const [society, setSociety] = useState<SocietyInfo>(mockSocietyInfo);
  const [blocks, setBlocks] = useState<BlockInfo[]>(mockBlocks);
  const [isEditSocietyModalOpen, setIsEditSocietyModalOpen] = useState(false);
  const [isAddBlockModalOpen, setIsAddBlockModalOpen] = useState(false);

  // Form states
  const [editForm, setEditForm] = useState({ ...society });
  const [newBlock, setNewBlock] = useState({
    name: '',
    totalFloors: 14,
    apartmentsPerFloor: 4,
    supervisor: '',
    status: 'Operational' as const,
  });

  const handleSaveSociety = (e: React.FormEvent) => {
    e.preventDefault();
    setSociety(editForm);
    setIsEditSocietyModalOpen(false);
  };

  const handleAddBlock = (e: React.FormEvent) => {
    e.preventDefault();
    const totalApartments = newBlock.totalFloors * newBlock.apartmentsPerFloor;
    const created: BlockInfo = {
      id: `BLK-${String.fromCharCode(65 + blocks.length)}`,
      name: newBlock.name,
      totalFloors: Number(newBlock.totalFloors),
      apartmentsPerFloor: Number(newBlock.apartmentsPerFloor),
      totalApartments,
      occupied: 0,
      supervisor: newBlock.supervisor || 'Unassigned',
      status: newBlock.status,
    };
    setBlocks([...blocks, created]);
    setSociety({
      ...society,
      totalBlocks: society.totalBlocks + 1,
      totalApartments: society.totalApartments + totalApartments,
      vacantApartments: society.vacantApartments + totalApartments,
    });
    setIsAddBlockModalOpen(false);
    setNewBlock({ name: '', totalFloors: 14, apartmentsPerFloor: 4, supervisor: '', status: 'Operational' });
  };

  return (
    <div className="society-management-page">
      <PageHeader
        title="Society & Buildings Profile"
        description="Master profile, registration credentials, towers, and architectural blocks"
        breadcrumbs={[{ label: 'Society Management' }, { label: 'Society Details' }]}
        actions={
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-custom d-flex align-items-center gap-1"
              onClick={() => {
                setEditForm({ ...society });
                setIsEditSocietyModalOpen(true);
              }}
            >
              <Edit size={14} />
              <span>Edit Profile</span>
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary-custom d-flex align-items-center gap-1"
              onClick={() => setIsAddBlockModalOpen(true)}
            >
              <Plus size={14} />
              <span>Add Block / Tower</span>
            </button>
          </div>
        }
      />

      {/* Society Master Information Banner */}
      <div className="card mb-4 border-0 shadow-sm" style={{ backgroundColor: '#173F4A', color: '#FFFFFF' }}>
        <div className="card-body p-4">
          <div className="row align-items-center">
            <div className="col-12 col-md-8">
              <span className="badge bg-warning text-dark font-size-11 fw-bold mb-2">
                REGISTERED CO-OPERATIVE HOUSING SOCIETY
              </span>
              <h3 className="fw-bold mb-2 text-white">{society.name}</h3>
              <p className="text-white-50 mb-3 d-flex align-items-center gap-2 font-size-13">
                <MapPin size={16} />
                <span>{society.address}, {society.city}, {society.state} - {society.pincode}</span>
              </p>
              <div className="d-flex flex-wrap gap-4 text-white font-size-13">
                <span className="d-flex align-items-center gap-1">
                  <FileCheck size={15} className="text-warning" /> Reg: <strong>{society.registrationNumber}</strong>
                </span>
                <span className="d-flex align-items-center gap-1">
                  <Mail size={15} className="text-warning" /> {society.contactEmail}
                </span>
                <span className="d-flex align-items-center gap-1">
                  <Phone size={15} className="text-warning" /> {society.contactPhone}
                </span>
              </div>
            </div>
            <div className="col-12 col-md-4 mt-3 mt-md-0 text-md-end">
              <div className="bg-white bg-opacity-10 p-3 rounded-3 text-white text-md-start">
                <div className="d-flex justify-content-between mb-1 small">
                  <span>Overall Occupancy:</span>
                  <strong>{((society.occupiedApartments / society.totalApartments) * 100).toFixed(1)}%</strong>
                </div>
                <div className="progress mb-2" style={{ height: '8px', backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  <div
                    className="progress-bar bg-warning"
                    style={{ width: `${(society.occupiedApartments / society.totalApartments) * 100}%` }}
                  ></div>
                </div>
                <div className="font-size-12 text-white-50">
                  {society.occupiedApartments} Occupied / {society.totalApartments} Total Flats
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Society Statistics Overview */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card text-center p-3 h-100">
            <span className="text-muted font-size-12 fw-semibold text-uppercase">Total Towers</span>
            <h3 className="fw-bold text-teal-primary my-1">{society.totalBlocks}</h3>
            <span className="text-muted font-size-12">Residential Wings</span>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card text-center p-3 h-100">
            <span className="text-muted font-size-12 fw-semibold text-uppercase">Owner Occupied</span>
            <h3 className="fw-bold text-success my-1">
              {society.occupiedApartments - society.rentedApartments}
            </h3>
            <span className="text-muted font-size-12">Permanent Families</span>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card text-center p-3 h-100">
            <span className="text-muted font-size-12 fw-semibold text-uppercase">Tenant Occupied</span>
            <h3 className="fw-bold text-warning my-1">{society.rentedApartments}</h3>
            <span className="text-muted font-size-12">Registered Tenants</span>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card text-center p-3 h-100">
            <span className="text-muted font-size-12 fw-semibold text-uppercase">Vacant Units</span>
            <h3 className="fw-bold text-secondary my-1">{society.vacantApartments}</h3>
            <span className="text-muted font-size-12">Available for Lease/Sale</span>
          </div>
        </div>
      </div>

      {/* Building and Block Directory */}
      <div className="row g-3 mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div>
                <h5 className="card-title">Towers & Architectural Blocks</h5>
                <span className="card-subtitle">Detailed breakdown of floors, flats, supervisors and operational statuses</span>
              </div>
              <span className="badge bg-light text-dark border">{blocks.length} Configured Blocks</span>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-custom mb-0">
                  <thead>
                    <tr>
                      <th>Tower / Block Name</th>
                      <th>Total Floors</th>
                      <th>Flats / Floor</th>
                      <th>Total Flats</th>
                      <th>Occupancy</th>
                      <th>Assigned Supervisor</th>
                      <th>Operational Status</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blocks.map((block) => {
                      const occupancyRate = ((block.occupied / block.totalApartments) * 100).toFixed(0);
                      return (
                        <tr key={block.id}>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <div className="avatar-placeholder rounded bg-teal-light text-teal-primary p-2">
                                <Building2 size={16} />
                              </div>
                              <div>
                                <strong className="text-dark font-size-13">{block.name}</strong>
                                <div className="text-muted font-size-11">Block ID: {block.id}</div>
                              </div>
                            </div>
                          </td>
                          <td>{block.totalFloors} Floors</td>
                          <td>{block.apartmentsPerFloor} Flats</td>
                          <td>
                            <strong className="text-dark">{block.totalApartments} Units</strong>
                          </td>
                          <td>
                            <div style={{ width: '120px' }}>
                              <div className="d-flex justify-content-between font-size-11 mb-1">
                                <span>{block.occupied}/{block.totalApartments}</span>
                                <span>{occupancyRate}%</span>
                              </div>
                              <div className="progress" style={{ height: '6px' }}>
                                <div
                                  className={`progress-bar ${Number(occupancyRate) > 90 ? 'bg-success' : 'bg-primary'}`}
                                  style={{ width: `${occupancyRate}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="text-dark font-size-13">{block.supervisor}</span>
                          </td>
                          <td>
                            <StatusBadge status={block.status} />
                          </td>
                          <td className="text-end">
                            <button
                              type="button"
                              className="btn btn-sm btn-link text-teal-primary text-decoration-none"
                              onClick={() => {
                                alert(`Opening block inspector for ${block.name}`);
                              }}
                            >
                              View Floors &rarr;
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
        </div>
      </div>

      {/* Society Amenities & Infrastructure Section */}
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Society Amenities & Common Infrastructure</h5>
          <span className="card-subtitle">Managed common amenities and recreational facilities</span>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {society.amenities.map((amenity, idx) => (
              <div key={idx} className="col-12 col-md-6 col-lg-3">
                <div className="p-3 border rounded-3 bg-light d-flex align-items-center gap-2">
                  <CheckCircle2 size={18} className="text-success flex-shrink-0" />
                  <span className="font-size-13 fw-semibold text-dark">{amenity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal: Edit Society Details */}
      <Modal
        isOpen={isEditSocietyModalOpen}
        onClose={() => setIsEditSocietyModalOpen(false)}
        title="Edit Society Profile"
        size="lg"
        footer={
          <>
            <button
              type="button"
              className="btn btn-sm btn-light border"
              onClick={() => setIsEditSocietyModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary-custom"
              onClick={handleSaveSociety}
            >
              Save Changes
            </button>
          </>
        }
      >
        <form onSubmit={handleSaveSociety}>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label small fw-semibold">Society Legal Registered Name</label>
              <input
                type="text"
                className="form-control"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Registration Number</label>
              <input
                type="text"
                className="form-control"
                value={editForm.registrationNumber}
                onChange={(e) => setEditForm({ ...editForm, registrationNumber: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Contact Email</label>
              <input
                type="email"
                className="form-control"
                value={editForm.contactEmail}
                onChange={(e) => setEditForm({ ...editForm, contactEmail: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Contact Phone Number</label>
              <input
                type="text"
                className="form-control"
                value={editForm.contactPhone}
                onChange={(e) => setEditForm({ ...editForm, contactPhone: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Postal Pincode</label>
              <input
                type="text"
                className="form-control"
                value={editForm.pincode}
                onChange={(e) => setEditForm({ ...editForm, pincode: e.target.value })}
                required
              />
            </div>
            <div className="col-12">
              <label className="form-label small fw-semibold">Address / Location</label>
              <textarea
                className="form-control"
                rows={2}
                value={editForm.address}
                onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                required
              ></textarea>
            </div>
          </div>
        </form>
      </Modal>

      {/* Modal: Add Block */}
      <Modal
        isOpen={isAddBlockModalOpen}
        onClose={() => setIsAddBlockModalOpen(false)}
        title="Add New Architectural Tower / Block"
        footer={
          <>
            <button
              type="button"
              className="btn btn-sm btn-light border"
              onClick={() => setIsAddBlockModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary-custom"
              onClick={handleAddBlock}
            >
              Create Block
            </button>
          </>
        }
      >
        <form onSubmit={handleAddBlock}>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label small fw-semibold">Tower Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Tower E - Ruby"
                value={newBlock.name}
                onChange={(e) => setNewBlock({ ...newBlock, name: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Number of Floors</label>
              <input
                type="number"
                className="form-control"
                min={1}
                max={60}
                value={newBlock.totalFloors}
                onChange={(e) => setNewBlock({ ...newBlock, totalFloors: Number(e.target.value) })}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Apartments Per Floor</label>
              <input
                type="number"
                className="form-control"
                min={1}
                max={16}
                value={newBlock.apartmentsPerFloor}
                onChange={(e) => setNewBlock({ ...newBlock, apartmentsPerFloor: Number(e.target.value) })}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Assigned Supervisor</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Ramesh Patil"
                value={newBlock.supervisor}
                onChange={(e) => setNewBlock({ ...newBlock, supervisor: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Status</label>
              <select
                className="form-select"
                value={newBlock.status}
                onChange={(e) => setNewBlock({ ...newBlock, status: e.target.value as any })}
              >
                <option value="Operational">Operational</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Under Audit">Under Audit</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

