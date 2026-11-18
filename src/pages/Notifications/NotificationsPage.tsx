import React, { useState } from 'react';
import {
  Megaphone,
  Search,
  Plus,
  Bell,
  AlertTriangle,
  Clock,
  Droplet,
  Zap,
  Wrench,
  Sparkles,
  Users,
  Send,
  Eye
} from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Modal } from '@/components/common/Modal';
import { mockNotifications } from '@/data/mock';
import { SocietyNotification } from '@/types';

export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<SocietyNotification[]>(mockNotifications);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedNotif, setSelectedNotif] = useState<SocietyNotification | null>(null);
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);

  // Compose Broadcast State
  const [newNotice, setNewNotice] = useState<Partial<SocietyNotification>>({
    title: '',
    category: 'Water Supply',
    message: '',
    targetAudience: 'All Residents',
    urgency: 'Normal',
    author: 'Hon. Secretary',
  });

  const filteredNotifs = notifications.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'All' || n.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleSendNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.message) return;

    const created: SocietyNotification = {
      id: `NOTIF-${Date.now()}`,
      title: newNotice.title || '',
      category: (newNotice.category as any) || 'General',
      message: newNotice.message || '',
      targetAudience: (newNotice.targetAudience as any) || 'All Residents',
      timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      urgency: (newNotice.urgency as any) || 'Normal',
      author: newNotice.author || 'Society Admin Desk',
    };

    setNotifications([created, ...notifications]);
    setIsComposeModalOpen(false);
    setNewNotice({
      title: '',
      category: 'Water Supply',
      message: '',
      targetAudience: 'All Residents',
      urgency: 'Normal',
      author: 'Hon. Secretary',
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Water Supply':
        return <Droplet size={18} className="text-info" />;
      case 'Power Shutdown':
        return <Zap size={18} className="text-warning" />;
      case 'Maintenance':
        return <Wrench size={18} className="text-secondary" />;
      case 'Celebration':
        return <Sparkles size={18} className="text-accent-yellow" />;
      default:
        return <Megaphone size={18} className="text-teal-primary" />;
    }
  };

  return (
    <div className="notifications-page">
      <PageHeader
        title="Broadcasts & Official Society Circulars"
        description="Emergency water & power outage bulletins, festival updates, statutory circulars, and SMS broadcast center"
        breadcrumbs={[{ label: 'Community Management' }, { label: 'Announcements' }]}
        actions={
          <button
            type="button"
            className="btn btn-sm btn-primary-custom d-flex align-items-center gap-1"
            onClick={() => setIsComposeModalOpen(true)}
          >
            <Send size={14} />
            <span>Broadcast New Circular</span>
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
                  placeholder="Search announcements by headline, message text, or sender..."
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
                <option value="Water Supply">Water Supply Outages</option>
                <option value="Power Shutdown">Electricity Maintenance</option>
                <option value="Maintenance">Lift & Common Repairs</option>
                <option value="Celebration">Festival & Celebrations</option>
                <option value="Emergency">Emergency Police/Legal</option>
              </select>
            </div>
            <div className="col-6 col-md-3 text-md-end">
              <span className="badge bg-light text-muted border py-2 px-3 w-100 text-center">
                {filteredNotifs.length} Published Notices
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Announcements Stream */}
      <div className="row g-3">
        {filteredNotifs.map((notif) => (
          <div key={notif.id} className="col-12">
            <div className={`card mb-2 card-hover-effect border-start border-4 ${notif.urgency === 'High' ? 'border-start-danger' : 'border-start-primary'}`}>
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-start mb-2 flex-wrap gap-2">
                  <div className="d-flex align-items-center gap-2">
                    <div className="p-2 bg-light rounded-circle flex-shrink-0">
                      {getCategoryIcon(notif.category)}
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0 font-size-14 text-dark">{notif.title}</h6>
                      <div className="text-muted font-size-11">
                        Issued by: <strong>{notif.author}</strong> • Audience: <span className="badge bg-light text-dark border">{notif.targetAudience}</span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className={`badge ${notif.urgency === 'High' ? 'bg-danger text-white' : 'bg-light text-muted border'}`}>
                      {notif.urgency === 'High' ? 'URGENT FLASH' : 'NORMAL'}
                    </span>
                    <span className="text-muted font-size-12">{notif.timestamp}</span>
                  </div>
                </div>

                <p className="font-size-13 text-secondary mb-2 ps-md-5">
                  {notif.message}
                </p>

                <div className="d-flex justify-content-end ps-md-5">
                  <button
                    type="button"
                    className="btn btn-sm btn-link text-teal-primary text-decoration-none font-size-12 p-0"
                    onClick={() => setSelectedNotif(notif)}
                  >
                    View Official Circular Notice &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: View Full Circular */}
      {selectedNotif && (
        <Modal
          isOpen={!!selectedNotif}
          onClose={() => setSelectedNotif(null)}
          title={`Circular Bulletin: ${selectedNotif.title}`}
          footer={
            <button
              type="button"
              className="btn btn-sm btn-light border"
              onClick={() => setSelectedNotif(null)}
            >
              Close
            </button>
          }
        >
          <div className="p-3 bg-light rounded border mb-3">
            <div className="d-flex justify-content-between font-size-12 mb-2">
              <span><strong>Category:</strong> {selectedNotif.category}</span>
              <span><strong>Timestamp:</strong> {selectedNotif.timestamp}</span>
            </div>
            <div className="d-flex justify-content-between font-size-12">
              <span><strong>Targeted Flats:</strong> {selectedNotif.targetAudience}</span>
              <span><strong>Signatory:</strong> {selectedNotif.author}</span>
            </div>
          </div>
          <div className="p-3 border rounded bg-white">
            <h6 className="fw-bold text-teal-primary mb-2">{selectedNotif.title}</h6>
            <p className="font-size-13 text-dark mb-0 line-height-base">{selectedNotif.message}</p>
          </div>
        </Modal>
      )}

      {/* Modal: Compose Circular */}
      <Modal
        isOpen={isComposeModalOpen}
        onClose={() => setIsComposeModalOpen(false)}
        title="Broadcast Official Society Circular"
        size="lg"
        footer={
          <>
            <button
              type="button"
              className="btn btn-sm btn-light border"
              onClick={() => setIsComposeModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary-custom"
              onClick={handleSendNotice}
            >
              Publish & Push Alert
            </button>
          </>
        }
      >
        <form onSubmit={handleSendNotice}>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label small fw-semibold">Circular Headline</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Overhead Tank Cleaning & Water Supply Suspension"
                value={newNotice.title}
                onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Category</label>
              <select
                className="form-select"
                value={newNotice.category}
                onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value as any })}
              >
                <option value="Water Supply">Water Supply Outage</option>
                <option value="Power Shutdown">Electricity Shutdown</option>
                <option value="Maintenance">Maintenance Announcement</option>
                <option value="Celebration">Festival / Social Gathering</option>
                <option value="Emergency">Urgent Notice / Police Alert</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Target Audience</label>
              <select
                className="form-select"
                value={newNotice.targetAudience}
                onChange={(e) => setNewNotice({ ...newNotice, targetAudience: e.target.value as any })}
              >
                <option value="All Residents">All Towers (Entire Society)</option>
                <option value="Block A Only">Tower A Residents Only</option>
                <option value="Block B Only">Tower B Residents Only</option>
                <option value="Block C & D">Towers C & D Only</option>
                <option value="Owners Only">Registered Flat Owners Only</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Urgency Level</label>
              <select
                className="form-select"
                value={newNotice.urgency}
                onChange={(e) => setNewNotice({ ...newNotice, urgency: e.target.value as any })}
              >
                <option value="Normal">Normal Informational</option>
                <option value="High">Urgent (Push Notification + SMS)</option>
                <option value="Low">General Community Note</option>
              </select>
            </div>
            <div className="col-12">
              <label className="form-label small fw-semibold">Full Bulletin Text</label>
              <textarea
                className="form-control"
                rows={4}
                placeholder="Write the comprehensive circular, timing, instructions for residents..."
                value={newNotice.message}
                onChange={(e) => setNewNotice({ ...newNotice, message: e.target.value })}
                required
              ></textarea>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

