import React, { useState } from 'react';
import {
  Receipt,
  Search,
  Plus,
  Upload,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  DollarSign,
  FileText,
  Filter
} from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Modal } from '@/components/common/Modal';
import { StatusBadge } from '@/components/common/Badge';
import { mockExpenses } from '@/data/mock';
import { SocietyExpense } from '@/types';

export const ExpenseManagement: React.FC = () => {
  const [expenses, setExpenses] = useState<SocietyExpense[]>(mockExpenses);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals
  const [selectedExpense, setSelectedExpense] = useState<SocietyExpense | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);

  // New Expense Form State
  const [newExp, setNewExp] = useState<Partial<SocietyExpense>>({
    voucherNo: '',
    category: 'Security Services',
    description: '',
    vendorName: '',
    amount: 15000,
    date: '2024-11-06',
    authorizedBy: 'Treasurer (Harish Patel)',
    approvalStatus: 'Pending Approval',
  });
  const [invoiceFileName, setInvoiceFileName] = useState('');

  const filteredExpenses = expenses.filter((e) => {
    const matchesSearch =
      e.voucherNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || e.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || e.approvalStatus === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalExpenseOutlay = expenses.reduce((sum, e) => sum + e.amount, 0);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExp.vendorName || !newExp.amount) return;

    const created: SocietyExpense = {
      id: `EXP-${Date.now()}`,
      voucherNo: `PV-2024-11-${String(expenses.length + 1).padStart(2, '0')}`,
      category: (newExp.category as any) || 'Repairs & Maint.',
      description: newExp.description || '',
      vendorName: newExp.vendorName || '',
      amount: Number(newExp.amount) || 0,
      date: newExp.date || '2024-11-06',
      authorizedBy: newExp.authorizedBy || 'Committee Desk',
      approvalStatus: 'Pending Approval',
      invoiceFile: invoiceFileName || 'vendor-tax-invoice.pdf',
    };

    setExpenses([created, ...expenses]);
    setIsAddExpenseModalOpen(false);
    setNewExp({
      voucherNo: '',
      category: 'Security Services',
      description: '',
      vendorName: '',
      amount: 15000,
      date: '2024-11-06',
      authorizedBy: 'Treasurer (Harish Patel)',
      approvalStatus: 'Pending Approval',
    });
    setInvoiceFileName('');
  };

  const handleApprove = (expId: string) => {
    const updated = expenses.map((e) =>
      e.id === expId ? { ...e, approvalStatus: 'Approved' as const } : e
    );
    setExpenses(updated);
    if (selectedExpense && selectedExpense.id === expId) {
      setSelectedExpense({ ...selectedExpense, approvalStatus: 'Approved' });
    }
  };

  return (
    <div className="expense-management-page">
      <PageHeader
        title="Operating Expense & Vendor Vouchers"
        description="Dual-signatory approval workflow, invoice receipts, and ledger disbursements"
        breadcrumbs={[{ label: 'Financial Management' }, { label: 'Expenses' }]}
        actions={
          <button
            type="button"
            className="btn btn-sm btn-primary-custom d-flex align-items-center gap-1"
            onClick={() => setIsAddExpenseModalOpen(true)}
          >
            <Plus size={16} />
            <span>Record Payment Voucher</span>
          </button>
        }
      />

      {/* Metrics Row */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card p-3 h-100">
            <span className="text-muted font-size-12 fw-semibold text-uppercase">Month Operating Outlay</span>
            <h3 className="fw-bold text-danger my-1">₹{totalExpenseOutlay.toLocaleString('en-IN')}</h3>
            <span className="text-muted font-size-12">Total audited vouchers</span>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card p-3 h-100">
            <span className="text-muted font-size-12 fw-semibold text-uppercase">Approved Vouchers</span>
            <h3 className="fw-bold text-success my-1">
              {expenses.filter((e) => e.approvalStatus === 'Approved').length}
            </h3>
            <span className="text-muted font-size-12">Disbursed via bank transfer</span>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card p-3 h-100">
            <span className="text-muted font-size-12 fw-semibold text-uppercase">Pending Committee Sign</span>
            <h3 className="fw-bold text-warning my-1">
              {expenses.filter((e) => e.approvalStatus === 'Pending Approval').length}
            </h3>
            <span className="text-muted font-size-12">Awaiting Treasurer/Secretary check</span>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card p-3 h-100">
            <span className="text-muted font-size-12 fw-semibold text-uppercase">Invoice Verification</span>
            <h3 className="fw-bold text-teal-primary my-1">100% Attached</h3>
            <span className="text-muted font-size-12">GST invoices filed with vouchers</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
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
                  placeholder="Search voucher #, vendor name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-6 col-md-3">
              <select
                className="form-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Security Services">Security Services</option>
                <option value="Electricity & Diesel">Electricity & Diesel</option>
                <option value="Lift AMC">Lift AMC</option>
                <option value="Water Supply">Water Supply</option>
                <option value="Gardening">Gardening</option>
                <option value="Events & Celebrations">Events & Celebrations</option>
              </select>
            </div>
            <div className="col-6 col-md-3">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Approval Statuses</option>
                <option value="Approved">Approved</option>
                <option value="Pending Approval">Pending Approval</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="col-12 col-md-1 text-md-end">
              <span className="badge bg-light text-muted border py-2 px-3 w-100 text-center">
                {filteredExpenses.length} Vouchers
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Expense Payment Vouchers</h5>
          <span className="card-subtitle">Detailed vendor payouts with statutory authorization</span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-custom mb-0">
              <thead>
                <tr>
                  <th>Voucher #</th>
                  <th>Category</th>
                  <th>Vendor & Description</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Authorized Signatory</th>
                  <th>Approval Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((exp) => (
                  <tr key={exp.id}>
                    <td>
                      <span className="fw-bold text-teal-primary font-size-13">{exp.voucherNo}</span>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border">{exp.category}</span>
                    </td>
                    <td style={{ maxWidth: '280px' }}>
                      <div className="fw-semibold text-dark font-size-13">{exp.vendorName}</div>
                      <div className="text-muted font-size-11 text-truncate">{exp.description}</div>
                    </td>
                    <td>
                      <span className="font-size-12 text-muted">{exp.date}</span>
                    </td>
                    <td>
                      <strong className="text-dark font-size-13">₹{exp.amount.toLocaleString('en-IN')}</strong>
                    </td>
                    <td>
                      <span className="font-size-12 text-muted">{exp.authorizedBy}</span>
                    </td>
                    <td>
                      <StatusBadge status={exp.approvalStatus} />
                    </td>
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-1">
                        {exp.approvalStatus === 'Pending Approval' && (
                          <button
                            type="button"
                            className="btn btn-sm btn-success d-inline-flex align-items-center gap-1"
                            onClick={() => handleApprove(exp.id)}
                            title="Approve Voucher"
                          >
                            <CheckCircle2 size={13} />
                            <span>Approve</span>
                          </button>
                        )}
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-custom d-inline-flex align-items-center gap-1"
                          onClick={() => {
                            setSelectedExpense(exp);
                            setIsDetailsModalOpen(true);
                          }}
                        >
                          <Eye size={13} />
                          <span>Inspect</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal: Expense Details */}
      {selectedExpense && (
        <Modal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          title={`Payment Voucher: ${selectedExpense.voucherNo}`}
          size="lg"
          footer={
            <div className="d-flex justify-content-between w-100 align-items-center">
              {selectedExpense.approvalStatus === 'Pending Approval' ? (
                <button
                  type="button"
                  className="btn btn-sm btn-success"
                  onClick={() => handleApprove(selectedExpense.id)}
                >
                  <CheckCircle2 size={14} className="me-1" /> Approve Voucher for Bank Disbursement
                </button>
              ) : (
                <span className="text-success small fw-semibold">✓ Voucher Approved and Cleared</span>
              )}
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
                <h6 className="fw-bold text-teal-primary mb-2">Voucher Specifics</h6>
                <div className="font-size-13 mb-1">
                  <strong>Voucher Number:</strong> {selectedExpense.voucherNo}
                </div>
                <div className="font-size-13 mb-1">
                  <strong>Expense Category:</strong> {selectedExpense.category}
                </div>
                <div className="font-size-13 mb-1">
                  <strong>Voucher Date:</strong> {selectedExpense.date}
                </div>
                <div className="font-size-13">
                  <strong>Authorized Signatory:</strong> {selectedExpense.authorizedBy}
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 bg-light rounded border">
                <h6 className="fw-bold text-teal-primary mb-2">Vendor & Settlement</h6>
                <div className="font-size-13 mb-1">
                  <strong>Beneficiary Vendor:</strong> {selectedExpense.vendorName}
                </div>
                <div className="font-size-13 mb-1">
                  <strong>Disbursement Amount:</strong> <strong className="text-danger">₹{selectedExpense.amount.toLocaleString('en-IN')}</strong>
                </div>
                <div className="font-size-13">
                  <strong>Current Status:</strong> <StatusBadge status={selectedExpense.approvalStatus} />
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="p-3 border rounded bg-white">
                <h6 className="fw-bold text-teal-primary mb-2">Expense Description & Justification</h6>
                <p className="font-size-13 text-dark mb-0">{selectedExpense.description}</p>
              </div>
            </div>

            <div className="col-12">
              <div className="p-3 border rounded bg-light d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <FileText size={22} className="text-teal-primary" />
                  <div>
                    <div className="fw-semibold font-size-13">Attached GST Tax Invoice</div>
                    <div className="text-muted font-size-11">Scanned vendor bill verified with stamp</div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-custom"
                  onClick={() => alert('Simulated downloading vendor tax invoice PDF')}
                >
                  View Invoice
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal: Record Payment Voucher */}
      <Modal
        isOpen={isAddExpenseModalOpen}
        onClose={() => setIsAddExpenseModalOpen(false)}
        title="Record Society Payment Voucher"
        size="lg"
        footer={
          <>
            <button
              type="button"
              className="btn btn-sm btn-light border"
              onClick={() => setIsAddExpenseModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary-custom"
              onClick={handleAddExpense}
            >
              Record Voucher
            </button>
          </>
        }
      >
        <form onSubmit={handleAddExpense}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Expense Category</label>
              <select
                className="form-select"
                value={newExp.category}
                onChange={(e) => setNewExp({ ...newExp, category: e.target.value as any })}
              >
                <option value="Security Services">Security Services</option>
                <option value="Electricity & Diesel">Electricity & Diesel</option>
                <option value="Lift AMC">Lift AMC</option>
                <option value="Water Supply">Water Supply</option>
                <option value="Gardening">Gardening</option>
                <option value="Repairs & Maint.">Repairs & Maintenance</option>
                <option value="Events & Celebrations">Events & Celebrations</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Vendor / Service Provider Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Cummins Diesel Generator Service"
                value={newExp.vendorName}
                onChange={(e) => setNewExp({ ...newExp, vendorName: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Amount (INR ₹)</label>
              <input
                type="number"
                className="form-control"
                value={newExp.amount}
                onChange={(e) => setNewExp({ ...newExp, amount: Number(e.target.value) })}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Voucher Date</label>
              <input
                type="date"
                className="form-control"
                value={newExp.date}
                onChange={(e) => setNewExp({ ...newExp, date: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Authorized By</label>
              <input
                type="text"
                className="form-control"
                value={newExp.authorizedBy}
                onChange={(e) => setNewExp({ ...newExp, authorizedBy: e.target.value })}
              />
            </div>
            <div className="col-12">
              <label className="form-label small fw-semibold">Purpose & Description</label>
              <textarea
                className="form-control"
                rows={2}
                placeholder="Provide details of services rendered or goods supplied..."
                value={newExp.description}
                onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
                required
              ></textarea>
            </div>

            {/* Invoice File Upload UI */}
            <div className="col-12">
              <label className="form-label small fw-semibold">Upload Vendor Tax Invoice (PDF/JPG)</label>
              <div className="border border-dashed p-3 rounded text-center bg-light">
                <Upload size={22} className="text-teal-primary mb-1" />
                <p className="font-size-12 text-muted mb-1">
                  Upload vendor invoice with GSTIN breakdown
                </p>
                <input
                  type="file"
                  id="invoiceFileInput"
                  className="d-none"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setInvoiceFileName(e.target.files[0].name);
                    }
                  }}
                />
                <button
                  type="button"
                  className="btn btn-sm btn-outline-custom"
                  onClick={() => document.getElementById('invoiceFileInput')?.click()}
                >
                  Select Invoice File
                </button>
                {invoiceFileName && (
                  <div className="text-success small fw-semibold mt-2">
                    Attached: {invoiceFileName}
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

