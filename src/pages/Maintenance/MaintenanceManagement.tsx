import React, { useState } from 'react';
import {
  Wrench,
  Search,
  Plus,
  Calendar,
  CheckCircle2,
  DollarSign,
  FileCheck,
  Clock,
  Phone,
  Eye,
  AlertCircle
} from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Modal } from '@/components/common/Modal';
import { StatusBadge } from '@/components/common/Badge';
import { mockMaintenanceTasks } from '@/data/mock';
import { MaintenanceTask } from '@/types';

export const MaintenanceManagement: React.FC = () => {
  const [tasks, setTasks] = useState<MaintenanceTask[]>(mockMaintenanceTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedTask, setSelectedTask] = useState<MaintenanceTask | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  // New task form state
  const [newTask, setNewTask] = useState<Partial<MaintenanceTask>>({
    title: '',
    category: 'Electrical',
    frequency: 'Monthly',
    scheduleDate: '2024-11-15',
    assignedContractor: '',
    contactNumber: '',
    estimatedCost: 12000,
  });

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.assignedContractor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title || !newTask.assignedContractor) return;

    const created: MaintenanceTask = {
      id: `TSK-${Date.now()}`,
      taskId: `MT-${896 + tasks.length}`,
      title: newTask.title || '',
      category: newTask.category || 'General',
      scheduleDate: newTask.scheduleDate || '2024-11-15',
      frequency: (newTask.frequency as any) || 'Monthly',
      assignedContractor: newTask.assignedContractor || '',
      contactNumber: newTask.contactNumber || '+91 98...',
      status: 'Scheduled',
      estimatedCost: Number(newTask.estimatedCost) || 10000,
      actualCost: 0,
    };

    setTasks([created, ...tasks]);
    setIsScheduleModalOpen(false);
    setNewTask({
      title: '',
      category: 'Electrical',
      frequency: 'Monthly',
      scheduleDate: '2024-11-15',
      assignedContractor: '',
      contactNumber: '',
      estimatedCost: 12000,
    });
  };

  const handleCompleteTask = () => {
    if (!selectedTask) return;
    const updated = tasks.map((t) => {
      if (t.id === selectedTask.id) {
        return {
          ...t,
          status: 'Completed' as const,
          actualCost: t.estimatedCost,
          completionProofUrl: '/reports/completion-signoff.pdf',
        };
      }
      return t;
    });
    setTasks(updated);
    setSelectedTask({
      ...selectedTask,
      status: 'Completed',
      actualCost: selectedTask.estimatedCost,
      completionProofUrl: '/reports/completion-signoff.pdf',
    });
  };

  return (
    <div className="maintenance-management-page">
      <PageHeader
        title="Preventive & Asset Maintenance"
        description="Statutory AMC servicing, mechanical & electrical upkeep schedules, and contractor audit"
        breadcrumbs={[{ label: 'Operations' }, { label: 'Maintenance Management' }]}
        actions={
          <button
            type="button"
            className="btn btn-sm btn-primary-custom d-flex align-items-center gap-1"
            onClick={() => setIsScheduleModalOpen(true)}
          >
            <Plus size={16} />
            <span>Schedule AMC Service</span>
          </button>
        }
      />

      {/* Metrics Row */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card p-3 h-100">
            <span className="text-muted font-size-12 fw-semibold text-uppercase">Scheduled Upkeep</span>
            <h4 className="fw-bold text-teal-primary my-1">
              {tasks.filter((t) => t.status === 'Scheduled').length} Tasks
            </h4>
            <span className="text-muted font-size-12">Upcoming maintenance this month</span>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card p-3 h-100">
            <span className="text-muted font-size-12 fw-semibold text-uppercase">In Progress</span>
            <h4 className="fw-bold text-warning my-1">
              {tasks.filter((t) => t.status === 'In Progress').length} Active
            </h4>
            <span className="text-muted font-size-12">Contractors actively on-site</span>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card p-3 h-100">
            <span className="text-muted font-size-12 fw-semibold text-uppercase">Completed Tasks</span>
            <h4 className="fw-bold text-success my-1">
              {tasks.filter((t) => t.status === 'Completed').length} Done
            </h4>
            <span className="text-muted font-size-12">Certified with proof of work</span>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card p-3 h-100">
            <span className="text-muted font-size-12 fw-semibold text-uppercase">Total Maintenance Incurred</span>
            <h4 className="fw-bold text-dark my-1">
              ₹{tasks.reduce((sum, t) => sum + t.actualCost, 0).toLocaleString('en-IN')}
            </h4>
            <span className="text-muted font-size-12">FY 2024-25 YTD</span>
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
                  placeholder="Search maintenance task, equipment, contractor or category..."
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
                <option value="All">All Task Statuses</option>
                <option value="Scheduled">Scheduled</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="col-6 col-md-3 text-md-end">
              <span className="badge bg-light text-muted border py-2 px-3 w-100 text-center">
                {filteredTasks.length} Work Orders
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Maintenance Tasks Table */}
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Maintenance Work Orders & AMC Ledger</h5>
          <span className="card-subtitle">Click 'Details' to inspect invoice verification and completion signoff</span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-custom mb-0">
              <thead>
                <tr>
                  <th>Task ID</th>
                  <th>Maintenance Description</th>
                  <th>Category</th>
                  <th>Frequency</th>
                  <th>Contractor & Phone</th>
                  <th>Schedule Date</th>
                  <th>Est. Cost</th>
                  <th>Status</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <span className="fw-bold text-teal-primary font-size-13">{t.taskId}</span>
                    </td>
                    <td style={{ maxWidth: '280px' }}>
                      <div className="fw-semibold text-dark font-size-13 text-truncate">{t.title}</div>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border">{t.category}</span>
                    </td>
                    <td>
                      <span className="font-size-12 text-muted">{t.frequency}</span>
                    </td>
                    <td>
                      <div className="fw-semibold text-dark font-size-13">{t.assignedContractor}</div>
                      <div className="text-muted font-size-11">{t.contactNumber}</div>
                    </td>
                    <td>
                      <span className="font-size-12 text-muted">{t.scheduleDate}</span>
                    </td>
                    <td>
                      <span className="fw-medium font-size-13 text-dark">
                        ₹{t.estimatedCost.toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td>
                      <StatusBadge status={t.status} />
                    </td>
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-custom d-inline-flex align-items-center gap-1"
                        onClick={() => {
                          setSelectedTask(t);
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

      {/* Modal: Task Details */}
      {selectedTask && (
        <Modal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          title={`Work Order: ${selectedTask.taskId} - ${selectedTask.title}`}
          size="lg"
          footer={
            <div className="d-flex justify-content-between w-100 align-items-center">
              {selectedTask.status !== 'Completed' ? (
                <button
                  type="button"
                  className="btn btn-sm btn-success"
                  onClick={handleCompleteTask}
                >
                  <CheckCircle2 size={14} className="me-1" /> Mark Work Complete & Upload Signoff
                </button>
              ) : (
                <span className="text-success small fw-bold">✓ Job Completed and Certified</span>
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
                <h6 className="fw-bold text-teal-primary mb-2">Scope & Details</h6>
                <div className="font-size-13 mb-1">
                  <strong>Task:</strong> {selectedTask.title}
                </div>
                <div className="font-size-13 mb-1">
                  <strong>Category:</strong> {selectedTask.category}
                </div>
                <div className="font-size-13 mb-1">
                  <strong>Frequency:</strong> {selectedTask.frequency}
                </div>
                <div className="font-size-13">
                  <strong>Schedule Date:</strong> {selectedTask.scheduleDate}
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 bg-light rounded border">
                <h6 className="fw-bold text-teal-primary mb-2">Contractor & Costs</h6>
                <div className="font-size-13 mb-1">
                  <strong>Contractor:</strong> {selectedTask.assignedContractor}
                </div>
                <div className="font-size-13 mb-1">
                  <strong>Helpline:</strong> {selectedTask.contactNumber}
                </div>
                <div className="font-size-13 mb-1">
                  <strong>Estimated Quote:</strong> ₹{selectedTask.estimatedCost.toLocaleString('en-IN')}
                </div>
                <div className="font-size-13">
                  <strong>Actual Expense Incurred:</strong> ₹{selectedTask.actualCost.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="p-3 border rounded">
                <h6 className="fw-bold text-teal-primary mb-2">Work Completion Proof & Sign-off</h6>
                {selectedTask.completionProofUrl ? (
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="font-size-13 text-success fw-medium">
                      ✓ Service Report Signed by Estate Supervisor & Vendor Engineer
                    </span>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-custom"
                      onClick={() => alert('Simulated downloading service certificate PDF')}
                    >
                      View Report PDF
                    </button>
                  </div>
                ) : (
                  <span className="text-muted font-size-12">
                    Work order active. Job completion document will appear once vendor engineer signs off.
                  </span>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal: Schedule Maintenance */}
      <Modal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        title="Schedule Preventive Maintenance Order"
        size="lg"
        footer={
          <>
            <button
              type="button"
              className="btn btn-sm btn-light border"
              onClick={() => setIsScheduleModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary-custom"
              onClick={handleCreateTask}
            >
              Schedule Service
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateTask}>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label small fw-semibold">Task Title / Equipment</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Swimming Pool Pump Impeller Replacement"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Category</label>
              <select
                className="form-select"
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
              >
                <option value="Electrical">Electrical</option>
                <option value="Elevators">Elevator & Lift</option>
                <option value="Health & Hygiene">Health & Hygiene</option>
                <option value="Safety & Compliance">Safety & Fire Compliance</option>
                <option value="Renewable Energy">Renewable Energy / Solar</option>
                <option value="Clubhouse Maintenance">Clubhouse Maintenance</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Frequency</label>
              <select
                className="form-select"
                value={newTask.frequency}
                onChange={(e) => setNewTask({ ...newTask, frequency: e.target.value as any })}
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Annual">Annual AMC</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Assigned Vendor / Agency</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Otis Elevator Co."
                value={newTask.assignedContractor}
                onChange={(e) => setNewTask({ ...newTask, assignedContractor: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Vendor Contact Phone</label>
              <input
                type="text"
                className="form-control"
                placeholder="+91..."
                value={newTask.contactNumber}
                onChange={(e) => setNewTask({ ...newTask, contactNumber: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Service Date</label>
              <input
                type="date"
                className="form-control"
                value={newTask.scheduleDate}
                onChange={(e) => setNewTask({ ...newTask, scheduleDate: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Estimated Budget (₹)</label>
              <input
                type="number"
                className="form-control"
                value={newTask.estimatedCost}
                onChange={(e) => setNewTask({ ...newTask, estimatedCost: Number(e.target.value) })}
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

