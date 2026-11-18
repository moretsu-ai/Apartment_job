import React, { useState } from 'react';
import {
  FileCheck,
  Search,
  Plus,
  Calendar,
  AlertTriangle,
  Upload,
  CheckCircle,
  Clock,
  Eye,
  Download,
  ShieldCheck
} from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Modal } from '@/components/common/Modal';
import { StatusBadge } from '@/components/common/Badge';
import { mockRentalAgreements } from '@/data/mock';
import { RentalAgreement } from '@/types';

export const RentalAgreements: React.FC = () => {
  const [agreements, setAgreements] = useState<RentalAgreement[]>(mockRentalAgreements);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedAgreement, setSelectedAgreement] = useState<RentalAgreement | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // New agreement upload state
  const [newAgreement, setNewAgreement] = useState<Partial<RentalAgreement>>({
    apartmentNumber: '',
    block: 'Tower A',
    ownerName: '',
    tenantName: '',
    tenantPhone: '',
    startDate: '2024-11-01',
    expiryDate: '2025-10-31',
    monthlyRent: 45000,
    securityDeposit: 200000,
    policeVerification: 'Completed',
    status: 'Active',
  });
  const [uploadedFileName, setUploadedFileName] = useState('');

  const filteredAgreements = agreements.filter((ag) => {
    const matchesSearch =
      ag.apartmentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ag.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ag.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || ag.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUploadAgreement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgreement.apartmentNumber || !newAgreement.tenantName) return;

    const created: RentalAgreement = {
      id: `RA-${Date.now()}`,
      apartmentNumber: newAgreement.apartmentNumber || '',
      block: newAgreement.block || 'Tower A',
      ownerName: newAgreement.ownerName || '',
      tenantName: newAgreement.tenantName || '',
      tenantPhone: newAgreement.tenantPhone || '',
      startDate: newAgreement.startDate || '2024-11-01',
      expiryDate: newAgreement.expiryDate || '2025-10-31',
      monthlyRent: Number(newAgreement.monthlyRent) || 40000,
      securityDeposit: Number(newAgreement.securityDeposit) || 150000,
      status: 'Active',
      documentUrl: `/docs/${uploadedFileName || 'agreement-scanned.pdf'}`,
      policeVerification: (newAgreement.policeVerification as any) || 'Completed',
    };

    setAgreements([created, ...agreements]);
    setIsUploadModalOpen(false);
    setUploadedFileName('');
  };

  return (
    <div className="rental-agreements-page">
      <PageHeader
        title="Rental Agreements & Tenancy Records"
        description="Statutory lease documents, police verifications, validity trackers, and renewal alerts"
        breadcrumbs={[{ label: 'Society Management' }, { label: 'Rental Agreements' }]}
        actions={
          <button
            type="button"
            className="btn btn-sm btn-primary-custom d-flex align-items-center gap-1"
            onClick={() => setIsUploadModalOpen(true)}
          >
            <Upload size={14} />
            <span>Upload Agreement</span>
          </button>
        }
      />

      {/* Metrics Row */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card p-3 h-100">
            <span className="text-muted font-size-12 fw-semibold text-uppercase">Total Tenancies</span>
            <h4 className="fw-bold text-teal-primary my-1">{agreements.length} Active Records</h4>
            <span className="text-muted font-size-12">Lease agreements registered</span>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card p-3 h-100">
            <span className="text-muted font-size-12 fw-semibold text-uppercase">Expiring Soon (30 Days)</span>
            <h4 className="fw-bold text-warning my-1">
              {agreements.filter((a) => a.status === 'Expiring Soon').length} Agreements
            </h4>
            <span className="text-muted font-size-12">Renewal notices issued</span>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card p-3 h-100">
            <span className="text-muted font-size-12 fw-semibold text-uppercase">Expired & Overdue</span>
            <h4 className="fw-bold text-danger my-1">
              {agreements.filter((a) => a.status === 'Expired').length} Agreements
            </h4>
            <span className="text-muted font-size-12">Action / fine applicable</span>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card p-3 h-100">
            <span className="text-muted font-size-12 fw-semibold text-uppercase">Police Verification</span>
            <h4 className="fw-bold text-success my-1">
              {agreements.filter((a) => a.policeVerification === 'Completed').length} / {agreements.length}
            </h4>
            <span className="text-muted font-size-12">NMMC police records verified</span>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
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
                  placeholder="Search flat number, tenant name or landlord name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-6 col-md-3">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Agreement Statuses</option>
                <option value="Active">Active</option>
                <option value="Expiring Soon">Expiring Soon</option>
                <option value="Expired">Expired</option>
              </select>
            </div>
            <div className="col-6 col-md-3 text-md-end">
              <span className="badge bg-light text-muted border py-2 px-3 w-100 text-center">
                {filteredAgreements.length} Records Found
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Agreements Table */}
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Registered Agreements Roster</h5>
          <span className="card-subtitle">Legally mandated tenant registry with stamp duty validity dates</span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-custom mb-0">
              <thead>
                <tr>
                  <th>Apartment</th>
                  <th>Flat Owner (Lessor)</th>
                  <th>Tenant (Lessee)</th>
                  <th>Lease Term</th>
                  <th>Monthly Rent</th>
                  <th>Police KYC</th>
                  <th>Expiry Status</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAgreements.map((agreement) => (
                  <tr key={agreement.id}>
                    <td>
                      <span className="badge bg-teal-light text-teal-primary font-size-13 fw-bold">
                        {agreement.apartmentNumber}
                      </span>
                      <div className="text-muted font-size-11">{agreement.block}</div>
                    </td>
                    <td>
                      <div className="fw-semibold text-dark font-size-13">{agreement.ownerName}</div>
                    </td>
                    <td>
                      <div className="fw-semibold text-dark font-size-13">{agreement.tenantName}</div>
                      <div className="text-muted font-size-11">{agreement.tenantPhone}</div>
                    </td>
                    <td>
                      <div className="font-size-12 text-dark">{agreement.startDate} to {agreement.expiryDate}</div>
                    </td>
                    <td>
                      <strong className="text-dark">₹{agreement.monthlyRent.toLocaleString('en-IN')}</strong>
                      <div className="text-muted font-size-11">Dep: ₹{(agreement.securityDeposit / 1000).toFixed(0)}k</div>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          agreement.policeVerification === 'Completed'
                            ? 'bg-success-subtle text-success border border-success-subtle'
                            : 'bg-danger-subtle text-danger border border-danger-subtle'
                        }`}
                      >
                        <ShieldCheck size={12} className="me-1" />
                        {agreement.policeVerification}
                      </span>
                    </td>
                    <td>
                      <StatusBadge status={agreement.status} />
                    </td>
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-custom d-inline-flex align-items-center gap-1"
                        onClick={() => {
                          setSelectedAgreement(agreement);
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

      {/* Modal: Agreement Details */}
      {selectedAgreement && (
        <Modal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          title={`Tenancy Agreement File: Flat ${selectedAgreement.apartmentNumber}`}
          size="lg"
          footer={
            <div className="d-flex justify-content-between w-100 align-items-center">
              <span className="badge bg-light text-muted border">
                Record ID: {selectedAgreement.id}
              </span>
              <button
                type="button"
                className="btn btn-sm btn-light border"
                onClick={() => setIsDetailsModalOpen(false)}
              >
                Close
              </button>
            </div>
          }
        >
          <div className="row g-3">
            <div className="col-md-6">
              <div className="p-3 bg-light rounded border">
                <h6 className="fw-bold text-teal-primary mb-2">Parties to the Agreement</h6>
                <div className="font-size-13 mb-1">
                  <strong>Flat Owner:</strong> {selectedAgreement.ownerName}
                </div>
                <div className="font-size-13 mb-1">
                  <strong>Tenant:</strong> {selectedAgreement.tenantName}
                </div>
                <div className="font-size-13 mb-1">
                  <strong>Tenant Contact:</strong> {selectedAgreement.tenantPhone}
                </div>
                <div className="font-size-13">
                  <strong>Police Verification:</strong> <span className="fw-semibold text-success">{selectedAgreement.policeVerification}</span>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 bg-light rounded border">
                <h6 className="fw-bold text-teal-primary mb-2">Terms & Commercials</h6>
                <div className="font-size-13 mb-1">
                  <strong>Start Date:</strong> {selectedAgreement.startDate}
                </div>
                <div className="font-size-13 mb-1">
                  <strong>Expiry Date:</strong> {selectedAgreement.expiryDate}
                </div>
                <div className="font-size-13 mb-1">
                  <strong>Monthly Rental:</strong> ₹{selectedAgreement.monthlyRent.toLocaleString('en-IN')}
                </div>
                <div className="font-size-13">
                  <strong>Security Deposit:</strong> ₹{selectedAgreement.securityDeposit.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="p-3 border rounded bg-white d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <FileCheck size={24} className="text-teal-primary" />
                  <div>
                    <div className="fw-bold font-size-13">Registered Agreement Copy (Scanned PDF)</div>
                    <div className="text-muted font-size-11">Verified by Sub-Registrar Office Vashi</div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-custom d-flex align-items-center gap-1"
                  onClick={() => alert('Simulated downloading legal PDF copy.')}
                >
                  <Download size={14} /> Download PDF
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal: Upload Agreement */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Registered Rental Agreement"
        size="lg"
        footer={
          <>
            <button
              type="button"
              className="btn btn-sm btn-light border"
              onClick={() => setIsUploadModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary-custom"
              onClick={handleUploadAgreement}
            >
              Save Agreement Record
            </button>
          </>
        }
      >
        <form onSubmit={handleUploadAgreement}>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Apartment Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. C-303"
                value={newAgreement.apartmentNumber}
                onChange={(e) => setNewAgreement({ ...newAgreement, apartmentNumber: e.target.value })}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Tower</label>
              <select
                className="form-select"
                value={newAgreement.block}
                onChange={(e) => setNewAgreement({ ...newAgreement, block: e.target.value })}
              >
                <option value="Tower A">Tower A</option>
                <option value="Tower B">Tower B</option>
                <option value="Tower C">Tower C</option>
                <option value="Tower D">Tower D</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Police Verification</label>
              <select
                className="form-select"
                value={newAgreement.policeVerification}
                onChange={(e) => setNewAgreement({ ...newAgreement, policeVerification: e.target.value as any })}
              >
                <option value="Completed">Completed & Verified</option>
                <option value="Pending">Pending Police Submission</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Owner (Lessor) Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Full name of flat owner"
                value={newAgreement.ownerName}
                onChange={(e) => setNewAgreement({ ...newAgreement, ownerName: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Tenant (Lessee) Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Full name of tenant"
                value={newAgreement.tenantName}
                onChange={(e) => setNewAgreement({ ...newAgreement, tenantName: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Tenant Phone</label>
              <input
                type="text"
                className="form-control"
                placeholder="+91..."
                value={newAgreement.tenantPhone}
                onChange={(e) => setNewAgreement({ ...newAgreement, tenantPhone: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-semibold">Monthly Rent (₹)</label>
              <input
                type="number"
                className="form-control"
                value={newAgreement.monthlyRent}
                onChange={(e) => setNewAgreement({ ...newAgreement, monthlyRent: Number(e.target.value) })}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-semibold">Security Deposit (₹)</label>
              <input
                type="number"
                className="form-control"
                value={newAgreement.securityDeposit}
                onChange={(e) => setNewAgreement({ ...newAgreement, securityDeposit: Number(e.target.value) })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Agreement Start Date</label>
              <input
                type="date"
                className="form-control"
                value={newAgreement.startDate}
                onChange={(e) => setNewAgreement({ ...newAgreement, startDate: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Agreement Expiry Date</label>
              <input
                type="date"
                className="form-control"
                value={newAgreement.expiryDate}
                onChange={(e) => setNewAgreement({ ...newAgreement, expiryDate: e.target.value })}
              />
            </div>

            {/* Document File Upload UI Preview */}
            <div className="col-12">
              <label className="form-label small fw-semibold">Upload Scanned Legal Agreement (PDF/DOCX)</label>
              <div className="border border-dashed p-4 rounded text-center bg-light">
                <Upload size={28} className="text-teal-primary mb-2" />
                <p className="font-size-13 text-muted mb-1">
                  Drag and drop registered stamp document here, or browse from files
                </p>
                <input
                  type="file"
                  id="agreementFileInput"
                  className="d-none"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setUploadedFileName(e.target.files[0].name);
                    }
                  }}
                />
                <button
                  type="button"
                  className="btn btn-sm btn-outline-custom mt-2"
                  onClick={() => document.getElementById('agreementFileInput')?.click()}
                >
                  Choose Document
                </button>
                {uploadedFileName && (
                  <div className="text-success small fw-semibold mt-2">
                    Selected: {uploadedFileName}
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

