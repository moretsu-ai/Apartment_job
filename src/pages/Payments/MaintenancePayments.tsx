import React, { useState } from 'react';
import {
  CreditCard,
  Search,
  Filter,
  DollarSign,
  Download,
  Printer,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Receipt,
  Eye,
  FileText
} from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Modal } from '@/components/common/Modal';
import { StatusBadge } from '@/components/common/Badge';
import { mockMaintenanceFees, mockSocietyInfo } from '@/data/mock';
import { MaintenanceFeeRecord } from '@/types';

export const MaintenancePayments: React.FC = () => {
  const [fees, setFees] = useState<MaintenanceFeeRecord[]>(mockMaintenanceFees);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedFee, setSelectedFee] = useState<MaintenanceFeeRecord | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  const filteredFees = fees.filter((f) => {
    const matchesSearch =
      f.apartmentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.residentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (f.transactionId && f.transactionId.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || f.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCollected = fees.reduce((sum, f) => sum + f.amountPaid, 0);
  const totalPending = fees.reduce(
    (sum, f) => sum + (f.status !== 'Paid' ? f.amountDue : 0),
    0
  );

  return (
    <div className="maintenance-payments-page">
      <PageHeader
        title="Maintenance Fees & Payment Roster"
        description="Apartment-wise maintenance collection records, payment methods, dues, and digital receipts"
        breadcrumbs={[{ label: 'Financial Management' }, { label: 'Maintenance Fees' }]}
        actions={
          <button
            type="button"
            className="btn btn-sm btn-outline-custom d-flex align-items-center gap-1"
            onClick={() => alert('Simulated generating bulk maintenance debit demand notice for all flats.')}
          >
            <Receipt size={14} />
            <span>Generate Monthly Bills</span>
          </button>
        }
      />

      {/* Summary Stat Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card p-3 h-100">
            <span className="text-muted font-size-12 fw-semibold text-uppercase">Total Realized (Nov 24)</span>
            <h3 className="fw-bold text-success my-1">₹{totalCollected.toLocaleString('en-IN')}</h3>
            <span className="text-muted font-size-12">
              {fees.filter((f) => f.status === 'Paid').length} Flats settled
            </span>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card p-3 h-100">
            <span className="text-muted font-size-12 fw-semibold text-uppercase">Outstanding Dues</span>
            <h3 className="fw-bold text-danger my-1">₹{totalPending.toLocaleString('en-IN')}</h3>
            <span className="text-muted font-size-12">
              {fees.filter((f) => f.status !== 'Paid').length} Flats pending payment
            </span>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card p-3 h-100">
            <span className="text-muted font-size-12 fw-semibold text-uppercase">Due Date Threshold</span>
            <h3 className="fw-bold text-teal-primary my-1">10th Nov 2024</h3>
            <span className="text-muted font-size-12">Grace period before 18% late fee</span>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card p-3 h-100">
            <span className="text-muted font-size-12 fw-semibold text-uppercase">Digital Collection Rate</span>
            <h3 className="fw-bold text-primary my-1">94.8%</h3>
            <span className="text-muted font-size-12">Via UPI & NetBanking gateway</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
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
                  placeholder="Search apartment number, resident name, or transaction ID..."
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
                <option value="All">All Payment Statuses</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
            <div className="col-6 col-md-3 text-md-end">
              <span className="badge bg-light text-muted border py-2 px-3 w-100 text-center">
                {filteredFees.length} Flat Records
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Fees Table */}
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Apartment Maintenance Ledger</h5>
          <span className="card-subtitle">Click 'Receipt' to view and print official society fee voucher</span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-custom mb-0">
              <thead>
                <tr>
                  <th>Apartment</th>
                  <th>Resident Name</th>
                  <th>Assessment Month</th>
                  <th>Amount Due</th>
                  <th>Amount Paid</th>
                  <th>Due Date</th>
                  <th>Payment Date</th>
                  <th>Transaction ID</th>
                  <th>Status</th>
                  <th className="text-end">Voucher</th>
                </tr>
              </thead>
              <tbody>
                {filteredFees.map((fee) => (
                  <tr key={fee.id}>
                    <td>
                      <span className="badge bg-teal-light text-teal-primary font-size-13 fw-bold">
                        {fee.apartmentNumber}
                      </span>
                      <div className="text-muted font-size-11">{fee.block}</div>
                    </td>
                    <td>
                      <div className="fw-semibold text-dark font-size-13">{fee.residentName}</div>
                    </td>
                    <td>
                      <span className="font-size-12 text-muted">{fee.month}</span>
                    </td>
                    <td>
                      <strong className="text-dark">₹{fee.amountDue.toLocaleString('en-IN')}</strong>
                    </td>
                    <td>
                      <strong className={fee.amountPaid > 0 ? 'text-success' : 'text-muted'}>
                        ₹{fee.amountPaid.toLocaleString('en-IN')}
                      </strong>
                    </td>
                    <td>
                      <span className="font-size-12 text-muted">{fee.dueDate}</span>
                    </td>
                    <td>
                      <span className="font-size-12 text-muted">{fee.paymentDate || '—'}</span>
                    </td>
                    <td>
                      <span className="font-size-11 text-secondary font-monospace">
                        {fee.transactionId || 'Awaiting Payment'}
                      </span>
                    </td>
                    <td>
                      <StatusBadge status={fee.status} />
                    </td>
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-custom d-inline-flex align-items-center gap-1"
                        onClick={() => {
                          setSelectedFee(fee);
                          setIsReceiptModalOpen(true);
                        }}
                      >
                        <FileText size={13} />
                        <span>Receipt</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal: Digital Receipt Preview */}
      {selectedFee && (
        <Modal
          isOpen={isReceiptModalOpen}
          onClose={() => setIsReceiptModalOpen(false)}
          title="Digital Maintenance Fee Receipt"
          size="lg"
          footer={
            <div className="d-flex justify-content-between w-100 align-items-center">
              <span className="text-muted small font-monospace">
                Receipt #RCPT-2024-{selectedFee.id}
              </span>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-custom d-flex align-items-center gap-1"
                  onClick={() => alert('Simulated printing receipt')}
                >
                  <Printer size={14} /> Print
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-primary-custom d-flex align-items-center gap-1"
                  onClick={() => alert('Simulated PDF download')}
                >
                  <Download size={14} /> Download PDF
                </button>
              </div>
            </div>
          }
        >
          {/* Printable Official Receipt Body */}
          <div className="p-4 border rounded bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
            <div className="text-center pb-3 border-bottom mb-3">
              <h5 className="fw-bold text-teal-primary mb-1">{mockSocietyInfo.name}</h5>
              <div className="text-muted font-size-12">
                Reg No: {mockSocietyInfo.registrationNumber} • {mockSocietyInfo.address}, {mockSocietyInfo.city}
              </div>
              <div className="badge bg-light text-dark border mt-2">
                OFFICIAL APARTMENT MAINTENANCE RECEIPT
              </div>
            </div>

            <div className="row g-3 mb-3 font-size-13">
              <div className="col-6">
                <div><strong>Flat Number:</strong> {selectedFee.apartmentNumber} ({selectedFee.block})</div>
                <div><strong>Received From:</strong> {selectedFee.residentName}</div>
                <div><strong>Billing Month:</strong> {selectedFee.month}</div>
              </div>
              <div className="col-6 text-end">
                <div><strong>Date of Receipt:</strong> {selectedFee.paymentDate || 'Pending'}</div>
                <div><strong>Transaction Ref:</strong> {selectedFee.transactionId || 'N/A'}</div>
                <div><strong>Payment Mode:</strong> {selectedFee.paymentMode || 'NetBanking / Gate'}</div>
              </div>
            </div>

            <div className="table-responsive mb-3">
              <table className="table table-bordered table-sm mb-0 font-size-13">
                <thead className="bg-light">
                  <tr>
                    <th>Particulars</th>
                    <th className="text-end">Amount (INR)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>General Society Maintenance & Common Utility Service Charges</td>
                    <td className="text-end">₹{(selectedFee.amountDue * 0.7).toFixed(0)}</td>
                  </tr>
                  <tr>
                    <td>Sinking Fund & Major Repair Reserve Contribution</td>
                    <td className="text-end">₹{(selectedFee.amountDue * 0.2).toFixed(0)}</td>
                  </tr>
                  <tr>
                    <td>Elevator & DG Power Back-up AMC Cess</td>
                    <td className="text-end">₹{(selectedFee.amountDue * 0.1).toFixed(0)}</td>
                  </tr>
                  <tr className="fw-bold bg-light">
                    <td>TOTAL BILLED DUE</td>
                    <td className="text-end">₹{selectedFee.amountDue.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr className="fw-bold text-success">
                    <td>AMOUNT REALIZED</td>
                    <td className="text-end">₹{selectedFee.amountPaid.toLocaleString('en-IN')}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between align-items-center pt-3 border-top font-size-12 text-muted">
              <div>
                Status: <StatusBadge status={selectedFee.status} />
              </div>
              <div className="text-end">
                <div className="fw-semibold text-dark">For Emerald Heights CHS Ltd</div>
                <div className="font-size-11">Authorized Signatory / Hon. Treasurer</div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

