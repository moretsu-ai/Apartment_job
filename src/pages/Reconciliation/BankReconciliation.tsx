import React, { useState } from 'react';
import {
  Scale,
  Search,
  Upload,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Download,
  AlertOctagon,
  Copy,
  FileSpreadsheet
} from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Modal } from '@/components/common/Modal';
import { StatusBadge } from '@/components/common/Badge';
import { mockReconciliation } from '@/data/mock';
import { BankReconciliationRecord } from '@/types';

export const BankReconciliation: React.FC = () => {
  const [records, setRecords] = useState<BankReconciliationRecord[]>(mockReconciliation);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importedFileName, setImportedFileName] = useState('');

  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.referenceNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const matchedCount = records.filter((r) => r.status === 'Matched').length;
  const unmatchedCount = records.filter((r) => r.status === 'Unmatched').length;
  const mismatchCount = records.filter((r) => r.status === 'Amount Mismatch').length;
  const duplicateCount = records.filter((r) => r.status === 'Duplicate Alert').length;

  const handleImportStatement = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Simulated bank statement parsing: 6 transactions processed.');
    setIsImportModalOpen(false);
    setImportedFileName('');
  };

  const handleResolve = (id: string) => {
    setRecords(
      records.map((r) =>
        r.id === id ? { ...r, status: 'Matched' as const, actionNeeded: 'Reconciled & Posted' } : r
      )
    );
  };

  return (
    <div className="bank-reconciliation-page">
      <PageHeader
        title="Bank Statement Reconciliation"
        description="Automated matching of HDFC/ICICI bank feed against society maintenance ledgers"
        breadcrumbs={[{ label: 'Financial Management' }, { label: 'Bank Reconciliation' }]}
        actions={
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-custom d-flex align-items-center gap-1"
              onClick={() => alert('Simulated generating Monthly Reconciliation Audit Report')}
            >
              <Download size={14} /> Monthly Report
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary-custom d-flex align-items-center gap-1"
              onClick={() => setIsImportModalOpen(true)}
            >
              <Upload size={14} /> Import Statement (.CSV)
            </button>
          </div>
        }
      />

      {/* 4 Reconciliation Status Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card p-3 h-100">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="text-muted font-size-12 fw-semibold text-uppercase">Matched Transactions</span>
              <CheckCircle2 size={18} className="text-success" />
            </div>
            <h3 className="fw-bold text-success my-1">{matchedCount}</h3>
            <span className="text-muted font-size-12">100% Verified against books</span>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card p-3 h-100">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="text-muted font-size-12 fw-semibold text-uppercase">Unmatched Entries</span>
              <AlertTriangle size={18} className="text-warning" />
            </div>
            <h3 className="fw-bold text-warning my-1">{unmatchedCount}</h3>
            <span className="text-muted font-size-12">Credits without flat association</span>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card p-3 h-100">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="text-muted font-size-12 fw-semibold text-uppercase">Amount Mismatches</span>
              <AlertOctagon size={18} className="text-danger" />
            </div>
            <h3 className="fw-bold text-danger my-1">{mismatchCount}</h3>
            <span className="text-muted font-size-12">Difference between bank & voucher</span>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card p-3 h-100">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="text-muted font-size-12 fw-semibold text-uppercase">Duplicate Indicators</span>
              <Copy size={18} className="text-secondary" />
            </div>
            <h3 className="fw-bold text-secondary my-1">{duplicateCount}</h3>
            <span className="text-muted font-size-12">Flagged for potential double-entry</span>
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
                  placeholder="Search transaction description or reference ID..."
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
                <option value="All">All Reconciliation States</option>
                <option value="Matched">Matched</option>
                <option value="Unmatched">Unmatched</option>
                <option value="Amount Mismatch">Amount Mismatch</option>
                <option value="Duplicate Alert">Duplicate Alert</option>
              </select>
            </div>
            <div className="col-6 col-md-3 text-md-end">
              <span className="badge bg-light text-muted border py-2 px-3 w-100 text-center">
                {filteredRecords.length} Statements Feed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Reconciliation Table */}
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Bank Statement vs Society Ledger Entries</h5>
          <span className="card-subtitle">Live statement feed with difference highlighting and reconciliation action</span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-custom mb-0">
              <thead>
                <tr>
                  <th>Value Date</th>
                  <th>Transaction Narration</th>
                  <th>Reference #</th>
                  <th>Bank Statement Amount</th>
                  <th>Society Ledger Amount</th>
                  <th>Difference</th>
                  <th>Reconciliation Status</th>
                  <th>Action Required</th>
                  <th className="text-end">Resolve</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((r) => {
                  const diff = Math.abs(r.bankAmount - r.societyAmount);
                  return (
                    <tr key={r.id}>
                      <td>
                        <span className="font-size-12 text-muted">{r.txnDate}</span>
                      </td>
                      <td style={{ maxWidth: '260px' }}>
                        <div className="fw-semibold text-dark font-size-13 text-truncate">{r.description}</div>
                        <span className={`badge ${r.type === 'Credit' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
                          {r.type}
                        </span>
                      </td>
                      <td>
                        <span className="font-monospace font-size-11 text-secondary">{r.referenceNo}</span>
                      </td>
                      <td>
                        <strong className="text-dark font-size-13">₹{r.bankAmount.toLocaleString('en-IN')}</strong>
                      </td>
                      <td>
                        <strong className="text-dark font-size-13">₹{r.societyAmount.toLocaleString('en-IN')}</strong>
                      </td>
                      <td>
                        {diff > 0 ? (
                          <span className="badge bg-danger-subtle text-danger font-size-12 fw-bold">
                            ₹{diff.toLocaleString('en-IN')} Diff
                          </span>
                        ) : (
                          <span className="text-success small fw-medium">Zero (Balanced)</span>
                        )}
                      </td>
                      <td>
                        <StatusBadge status={r.status} />
                      </td>
                      <td>
                        <span className="font-size-12 text-muted">{r.actionNeeded}</span>
                      </td>
                      <td className="text-end">
                        {r.status !== 'Matched' ? (
                          <button
                            type="button"
                            className="btn btn-sm btn-primary-custom"
                            onClick={() => handleResolve(r.id)}
                          >
                            Reconcile
                          </button>
                        ) : (
                          <span className="text-success small fw-semibold">✓ Cleared</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal: Import Statement */}
      <Modal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="Import Official Bank Statement Feed"
        footer={
          <>
            <button
              type="button"
              className="btn btn-sm btn-light border"
              onClick={() => setIsImportModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary-custom"
              onClick={handleImportStatement}
            >
              Import & Auto-Match
            </button>
          </>
        }
      >
        <form onSubmit={handleImportStatement}>
          <div className="mb-3">
            <label className="form-label small fw-semibold">Select Bank Account</label>
            <select className="form-select">
              <option>HDFC Bank - Current A/c #50200028919102 (Society Main)</option>
              <option>ICICI Bank - Sinking Fund A/c #001205004128</option>
              <option>State Bank of India - Reserve Fund A/c #3819001928</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label small fw-semibold">Upload CSV / MT940 / Excel Statement</label>
            <div className="border border-dashed p-4 rounded text-center bg-light">
              <FileSpreadsheet size={28} className="text-teal-primary mb-2" />
              <p className="font-size-13 text-muted mb-1">
                Upload internet banking statement exported in CSV or Excel format
              </p>
              <input
                type="file"
                id="statementFileInput"
                className="d-none"
                accept=".csv,.xlsx,.xls"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImportedFileName(e.target.files[0].name);
                  }
                }}
              />
              <button
                type="button"
                className="btn btn-sm btn-outline-custom mt-2"
                onClick={() => document.getElementById('statementFileInput')?.click()}
              >
                Browse Files
              </button>
              {importedFileName && (
                <div className="text-success small fw-semibold mt-2">
                  Selected: {importedFileName}
                </div>
              )}
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

