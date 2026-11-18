import React, { useState } from 'react';
import {
  FolderOpen,
  Search,
  Upload,
  FileText,
  Download,
  Filter,
  Lock,
  Eye,
  CheckCircle2,
  FileCheck,
  ShieldAlert
} from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Modal } from '@/components/common/Modal';
import { mockDocuments } from '@/data/mock';
import { SocietyDocument } from '@/types';

export const DocumentManagement: React.FC = () => {
  const [documents, setDocuments] = useState<SocietyDocument[]>(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Upload Form State
  const [newDoc, setNewDoc] = useState<Partial<SocietyDocument>>({
    title: '',
    category: 'Society Bye-Laws',
    accessLevel: 'All Residents',
  });
  const [selectedFileName, setSelectedFileName] = useState('');

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'All' || doc.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleUploadDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoc.title) return;

    const created: SocietyDocument = {
      id: `DOC-${Date.now()}`,
      title: newDoc.title || '',
      category: (newDoc.category as any) || 'Society Bye-Laws',
      fileType: 'PDF',
      size: '2.4 MB',
      uploadedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      uploadedBy: 'Rajesh Sharma (Secretary)',
      accessLevel: (newDoc.accessLevel as any) || 'All Residents',
    };

    setDocuments([created, ...documents]);
    setIsUploadModalOpen(false);
    setNewDoc({ title: '', category: 'Society Bye-Laws', accessLevel: 'All Residents' });
    setSelectedFileName('');
  };

  return (
    <div className="document-management-page">
      <PageHeader
        title="Document Vault & Statutory Records"
        description="Encrypted repository of registered bye-laws, share certificates, AGM minutes, and fire compliance certificates"
        breadcrumbs={[{ label: 'Documents and Reports' }, { label: 'Documents' }]}
        actions={
          <button
            type="button"
            className="btn btn-sm btn-primary-custom d-flex align-items-center gap-1"
            onClick={() => setIsUploadModalOpen(true)}
          >
            <Upload size={14} />
            <span>Upload Document</span>
          </button>
        }
      />

      {/* Category Folders Quick Access */}
      <div className="row g-3 mb-4">
        {[
          { name: 'Society Bye-Laws', count: 1, icon: '🏛️' },
          { name: 'Ownership Records', count: 1, icon: '📜' },
          { name: 'AGM Minutes', count: 1, icon: '📋' },
          { name: 'Audit Reports', count: 1, icon: '📊' },
        ].map((folder, idx) => (
          <div key={idx} className="col-6 col-md-3">
            <div
              className="card p-3 card-hover-effect cursor-pointer h-100"
              onClick={() => setCategoryFilter(folder.name)}
            >
              <div className="d-flex align-items-center gap-3">
                <span style={{ fontSize: '1.75rem' }}>{folder.icon}</span>
                <div>
                  <h6 className="fw-bold mb-0 text-dark font-size-13">{folder.name}</h6>
                  <span className="text-muted font-size-11">{folder.count} Official File(s)</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
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
                  placeholder="Search document title, audit year, or uploader..."
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
                <option value="All">All Document Classes</option>
                <option value="Society Bye-Laws">Society Bye-Laws</option>
                <option value="Ownership Records">Ownership Records</option>
                <option value="AGM Minutes">AGM Minutes of Meeting</option>
                <option value="Audit Reports">Statutory Audit Reports</option>
                <option value="AMC Contracts">Vendor AMC Contracts</option>
              </select>
            </div>
            <div className="col-6 col-md-3 text-md-end">
              <span className="badge bg-light text-muted border py-2 px-3 w-100 text-center">
                {filteredDocs.length} Documents Listed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Society Archive Repository</h5>
          <span className="card-subtitle">Digitally stamped documents accessible according to committee clearance</span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-custom mb-0">
              <thead>
                <tr>
                  <th>Document Title</th>
                  <th>Classification</th>
                  <th>Format / Size</th>
                  <th>Upload Date</th>
                  <th>Uploader</th>
                  <th>Access Permission</th>
                  <th className="text-end">Download</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocs.map((doc) => (
                  <tr key={doc.id}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <FileText size={18} className="text-teal-primary flex-shrink-0" />
                        <div>
                          <strong className="text-dark font-size-13">{doc.title}</strong>
                          <div className="text-muted font-size-11">Document ID: {doc.id}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border">{doc.category}</span>
                    </td>
                    <td>
                      <span className="badge bg-danger-subtle text-danger me-1">{doc.fileType}</span>
                      <span className="text-muted font-size-11">{doc.size}</span>
                    </td>
                    <td>
                      <span className="font-size-12 text-muted">{doc.uploadedDate}</span>
                    </td>
                    <td>
                      <span className="font-size-12 text-dark">{doc.uploadedBy}</span>
                    </td>
                    <td>
                      <span className="badge bg-teal-light text-teal-primary">
                        {doc.accessLevel}
                      </span>
                    </td>
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-custom d-inline-flex align-items-center gap-1"
                        onClick={() => alert(`Simulated downloading official document: ${doc.title}`)}
                      >
                        <Download size={13} />
                        <span>Download</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal: Upload Document */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Document to Society Vault"
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
              onClick={handleUploadDocument}
            >
              Upload & Secure
            </button>
          </>
        }
      >
        <form onSubmit={handleUploadDocument}>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label small fw-semibold">Document Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Lift Safety Inspection Certificate 2024-25"
                value={newDoc.title}
                onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Classification Category</label>
              <select
                className="form-select"
                value={newDoc.category}
                onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value as any })}
              >
                <option value="Society Bye-Laws">Society Bye-Laws</option>
                <option value="Ownership Records">Ownership Records</option>
                <option value="AGM Minutes">AGM Minutes</option>
                <option value="Audit Reports">Audit Reports</option>
                <option value="AMC Contracts">AMC Contracts</option>
                <option value="Vendor Invoices">Vendor Invoices</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Access Permissions</label>
              <select
                className="form-select"
                value={newDoc.accessLevel}
                onChange={(e) => setNewDoc({ ...newDoc, accessLevel: e.target.value as any })}
              >
                <option value="All Residents">All Residents (Public)</option>
                <option value="Committee Members Only">Committee Members Only</option>
                <option value="Admin Only">Admin Only (Confidential)</option>
              </select>
            </div>
            <div className="col-12">
              <label className="form-label small fw-semibold">Attach Document File (PDF, DOCX, XLSX)</label>
              <div className="border border-dashed p-4 rounded text-center bg-light">
                <Upload size={28} className="text-teal-primary mb-2" />
                <p className="font-size-13 text-muted mb-1">
                  Drag and drop digitally signed document or scan copy
                </p>
                <input
                  type="file"
                  id="vaultFileInput"
                  className="d-none"
                  accept=".pdf,.docx,.xlsx"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFileName(e.target.files[0].name);
                    }
                  }}
                />
                <button
                  type="button"
                  className="btn btn-sm btn-outline-custom mt-2"
                  onClick={() => document.getElementById('vaultFileInput')?.click()}
                >
                  Choose Document File
                </button>
                {selectedFileName && (
                  <div className="text-success small fw-semibold mt-2">
                    Selected: {selectedFileName}
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

