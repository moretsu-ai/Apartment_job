import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  Plus,
  Car,
  Clock,
  Phone,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  UserCheck,
  Truck,
  Eye,
  LogOut
} from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Modal } from '@/components/common/Modal';
import { StatusBadge } from '@/components/common/Badge';
import { mockVisitors } from '@/data/mock';
import { VisitorRecord } from '@/types';

export const VisitorManagement: React.FC = () => {
  const [visitors, setVisitors] = useState<VisitorRecord[]>(mockVisitors);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [isNewEntryModalOpen, setIsNewEntryModalOpen] = useState(false);

  // New Visitor Form State
  const [newVisitor, setNewVisitor] = useState<Partial<VisitorRecord>>({
    visitorName: '',
    phone: '',
    apartmentToVisit: '',
    visitorType: 'Guest',
    vehicleNumber: '',
    residentApprovalStatus: 'Waiting',
    securityGuardName: 'Bhopal Singh (Gate 1)',
  });

  const filteredVisitors = visitors.filter((v) => {
    const matchesSearch =
      v.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.apartmentToVisit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.phone.includes(searchTerm) ||
      (v.vehicleNumber && v.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === 'All' || v.visitorType === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleCreateEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVisitor.visitorName || !newVisitor.apartmentToVisit) return;

    const created: VisitorRecord = {
      id: `VIS-${Date.now()}`,
      visitorName: newVisitor.visitorName || '',
      phone: newVisitor.phone || '',
      apartmentToVisit: newVisitor.apartmentToVisit || '',
      visitorType: (newVisitor.visitorType as any) || 'Guest',
      vehicleNumber: newVisitor.vehicleNumber || 'Pedestrian Walk-in',
      checkInTime: new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }),
      residentApprovalStatus: 'Approved',
      securityGuardName: 'Bhopal Singh (Main Gate)',
    };

    setVisitors([created, ...visitors]);
    setIsNewEntryModalOpen(false);
    setNewVisitor({
      visitorName: '',
      phone: '',
      apartmentToVisit: '',
      visitorType: 'Guest',
      vehicleNumber: '',
      residentApprovalStatus: 'Waiting',
      securityGuardName: 'Bhopal Singh (Gate 1)',
    });
  };

  const handleCheckout = (id: string) => {
    setVisitors(
      visitors.map((v) =>
        v.id === id
          ? {
              ...v,
              checkOutTime: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
            }
          : v
      )
    );
  };

  return (
    <div className="visitor-management-page">
      <PageHeader
        title="Security Gate & Visitor Management"
        description="Gate checkpoint logging, cab & delivery tracking, RFID vehicle surveillance, and intercom approval"
        breadcrumbs={[{ label: 'Operations' }, { label: 'Visitor Management' }]}
        actions={
          <button
            type="button"
            className="btn btn-sm btn-primary-custom d-flex align-items-center gap-1"
            onClick={() => setIsNewEntryModalOpen(true)}
          >
            <Plus size={16} />
            <span>Check-In New Visitor</span>
          </button>
        }
      />

      {/* Security Gate Stats */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card p-3 h-100">
            <span className="text-muted font-size-12 fw-semibold text-uppercase">Currently On Premises</span>
            <h3 className="fw-bold text-teal-primary my-1">
              {visitors.filter((v) => !v.checkOutTime).length} Visitors
            </h3>
            <span className="text-muted font-size-12">Checked in across Gate 1 & 2</span>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card p-3 h-100">
            <span className="text-muted font-size-12 fw-semibold text-uppercase">Delivery Personnel</span>
            <h3 className="fw-bold text-warning my-1">
              {visitors.filter((v) => v.visitorType === 'Delivery').length} Logged
            </h3>
            <span className="text-muted font-size-12">Blinkit, Amazon, Swiggy, Zomato</span>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card p-3 h-100">
            <span className="text-muted font-size-12 fw-semibold text-uppercase">Pre-Approved Passes</span>
            <h3 className="fw-bold text-success my-1">
              {visitors.filter((v) => v.residentApprovalStatus === 'Pre-approved').length} Passes
            </h3>
            <span className="text-muted font-size-12">Authorized via resident app</span>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card p-3 h-100">
            <span className="text-muted font-size-12 fw-semibold text-uppercase">Checked Out</span>
            <h3 className="fw-bold text-secondary my-1">
              {visitors.filter((v) => v.checkOutTime).length} Exited
            </h3>
            <span className="text-muted font-size-12">Exit timestamps recorded</span>
          </div>
        </div>
      </div>

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
                  placeholder="Search visitor name, phone, vehicle plate (e.g. MH-43) or flat..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-6 col-md-3">
              <select
                className="form-select"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="All">All Visitor Types</option>
                <option value="Guest">Personal Guests</option>
                <option value="Delivery">Delivery Couriers</option>
                <option value="Cab / Driver">Uber / Ola Cabs</option>
                <option value="Vendor Staff">Vendor & Technicians</option>
              </select>
            </div>
            <div className="col-6 col-md-3 text-md-end">
              <span className="badge bg-light text-muted border py-2 px-3 w-100 text-center">
                {filteredVisitors.length} Gate Entries
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Visitors Gate Log Table */}
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Live Gate Security Registry</h5>
          <span className="card-subtitle">Biometric & RFID barrier integration with resident intercom confirmation</span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-custom mb-0">
              <thead>
                <tr>
                  <th>Visitor Name</th>
                  <th>Category</th>
                  <th>Destination Flat</th>
                  <th>Contact Phone</th>
                  <th>Vehicle Number</th>
                  <th>Check-In Time</th>
                  <th>Resident Approval</th>
                  <th>Check-Out Status</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredVisitors.map((v) => (
                  <tr key={v.id}>
                    <td>
                      <div className="fw-semibold text-dark font-size-13">{v.visitorName}</div>
                      <div className="text-muted font-size-11">Guard: {v.securityGuardName}</div>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border">{v.visitorType}</span>
                    </td>
                    <td>
                      <span className="badge bg-teal-light text-teal-primary font-size-12 fw-bold">
                        {v.apartmentToVisit}
                      </span>
                    </td>
                    <td>
                      <span className="font-size-12 text-secondary font-monospace">{v.phone}</span>
                    </td>
                    <td>
                      <span className="font-size-12 text-dark fw-medium">{v.vehicleNumber || 'Walk-in'}</span>
                    </td>
                    <td>
                      <span className="font-size-12 text-muted">{v.checkInTime}</span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          v.residentApprovalStatus === 'Approved' || v.residentApprovalStatus === 'Pre-approved'
                            ? 'bg-success-subtle text-success border border-success-subtle'
                            : 'bg-warning-subtle text-warning border border-warning-subtle'
                        }`}
                      >
                        {v.residentApprovalStatus}
                      </span>
                    </td>
                    <td>
                      {v.checkOutTime ? (
                        <span className="badge bg-light text-muted border">
                          Out at {v.checkOutTime}
                        </span>
                      ) : (
                        <span className="badge bg-success text-white font-size-11">
                          On Premises
                        </span>
                      )}
                    </td>
                    <td className="text-end">
                      {!v.checkOutTime ? (
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger d-inline-flex align-items-center gap-1"
                          onClick={() => handleCheckout(v.id)}
                        >
                          <LogOut size={13} />
                          <span>Exit</span>
                        </button>
                      ) : (
                        <span className="text-muted small font-size-12">Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal: New Gate Entry */}
      <Modal
        isOpen={isNewEntryModalOpen}
        onClose={() => setIsNewEntryModalOpen(false)}
        title="Security Gate: Check-In Visitor"
        size="lg"
        footer={
          <>
            <button
              type="button"
              className="btn btn-sm btn-light border"
              onClick={() => setIsNewEntryModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary-custom"
              onClick={handleCreateEntry}
            >
              Authorize Gate Entry
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateEntry}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Visitor Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Ramesh Verma (Guest) or Blinkit Delivery"
                value={newVisitor.visitorName}
                onChange={(e) => setNewVisitor({ ...newVisitor, visitorName: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Visitor Contact Phone</label>
              <input
                type="text"
                className="form-control"
                placeholder="+91..."
                value={newVisitor.phone}
                onChange={(e) => setNewVisitor({ ...newVisitor, phone: e.target.value })}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Destination Apartment</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. B-402"
                value={newVisitor.apartmentToVisit}
                onChange={(e) => setNewVisitor({ ...newVisitor, apartmentToVisit: e.target.value })}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Visitor Category</label>
              <select
                className="form-select"
                value={newVisitor.visitorType}
                onChange={(e) => setNewVisitor({ ...newVisitor, visitorType: e.target.value as any })}
              >
                <option value="Guest">Personal Guest</option>
                <option value="Delivery">Delivery Executive</option>
                <option value="Cab / Driver">Uber / Ola / Cab</option>
                <option value="Vendor Staff">Vendor / Service Technician</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Vehicle Plate (If Driving)</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. MH-43-AK-9921"
                value={newVisitor.vehicleNumber}
                onChange={(e) => setNewVisitor({ ...newVisitor, vehicleNumber: e.target.value })}
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

