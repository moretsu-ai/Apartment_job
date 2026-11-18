import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Plus,
  Calendar,
  DollarSign,
  Users,
  MapPin,
  CheckCircle2,
  Clock,
  Eye,
  Gift
} from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Modal } from '@/components/common/Modal';
import { StatusBadge } from '@/components/common/Badge';
import { mockEvents } from '@/data/mock';
import { SocietyEvent } from '@/types';

export const EventManagement: React.FC = () => {
  const [events, setEvents] = useState<SocietyEvent[]>(mockEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState<SocietyEvent | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);

  // New Event Form State
  const [newEvent, setNewEvent] = useState<Partial<SocietyEvent>>({
    name: '',
    type: 'Cultural',
    startDate: '2025-03-14',
    endDate: '2025-03-14',
    venue: 'Central Lawn & Amphitheatre',
    organizer: 'Holi Celebrations Committee',
    budget: 120000,
    collectedContributions: 0,
    expensesIncurred: 0,
    description: '',
  });

  const filteredEvents = events.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.venue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || e.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.name) return;

    const created: SocietyEvent = {
      id: `EVT-${Date.now()}`,
      name: newEvent.name || '',
      type: (newEvent.type as any) || 'Cultural',
      startDate: newEvent.startDate || '2025-03-14',
      endDate: newEvent.endDate || '2025-03-14',
      venue: newEvent.venue || 'Central Garden Lawn',
      organizer: newEvent.organizer || 'Cultural Committee',
      budget: Number(newEvent.budget) || 100000,
      collectedContributions: Number(newEvent.collectedContributions) || 0,
      expensesIncurred: 0,
      status: 'Upcoming',
      description: newEvent.description || '',
    };

    setEvents([created, ...events]);
    setIsAddEventModalOpen(false);
    setNewEvent({
      name: '',
      type: 'Cultural',
      startDate: '2025-03-14',
      endDate: '2025-03-14',
      venue: 'Central Lawn & Amphitheatre',
      organizer: 'Holi Celebrations Committee',
      budget: 120000,
      collectedContributions: 0,
      expensesIncurred: 0,
      description: '',
    });
  };

  return (
    <div className="event-management-page">
      <PageHeader
        title="Festivals & Community Events"
        description="Ganesh Utsav, Diwali Deepotsav, Durga Puja, Holi celebrations, and youth tournaments"
        breadcrumbs={[{ label: 'Community Management' }, { label: 'Festivals and Events' }]}
        actions={
          <button
            type="button"
            className="btn btn-sm btn-primary-custom d-flex align-items-center gap-1"
            onClick={() => setIsAddEventModalOpen(true)}
          >
            <Plus size={16} />
            <span>Create Society Event</span>
          </button>
        }
      />

      {/* Event Cards Showcase */}
      <div className="row g-3 mb-4">
        {filteredEvents.map((evt) => {
          const collectionPct = ((evt.collectedContributions / evt.budget) * 100).toFixed(0);
          return (
            <div key={evt.id} className="col-12 col-md-6 col-lg-6">
              <div className="card h-100 card-hover-effect">
                <div className="card-header bg-teal-primary text-white d-flex justify-content-between align-items-center">
                  <div>
                    <span className="badge bg-warning text-dark me-2">{evt.type}</span>
                    <strong className="font-size-14">{evt.name}</strong>
                  </div>
                  <StatusBadge status={evt.status} />
                </div>
                <div className="card-body">
                  <p className="text-muted font-size-13 mb-3">{evt.description}</p>
                  <div className="row g-2 font-size-12 mb-3">
                    <div className="col-6">
                      <span className="text-muted d-block">Dates:</span>
                      <strong className="text-dark">
                        <Calendar size={13} className="me-1 text-secondary" /> {evt.startDate} to {evt.endDate}
                      </strong>
                    </div>
                    <div className="col-6">
                      <span className="text-muted d-block">Venue:</span>
                      <strong className="text-dark">
                        <MapPin size={13} className="me-1 text-secondary" /> {evt.venue}
                      </strong>
                    </div>
                    <div className="col-6">
                      <span className="text-muted d-block">Organized By:</span>
                      <strong className="text-dark">
                        <Users size={13} className="me-1 text-secondary" /> {evt.organizer}
                      </strong>
                    </div>
                    <div className="col-6">
                      <span className="text-muted d-block">Sanctioned Budget:</span>
                      <strong className="text-dark">
                        ₹{evt.budget.toLocaleString('en-IN')}
                      </strong>
                    </div>
                  </div>

                  {/* Contribution Tracker Bar */}
                  <div className="mb-2">
                    <div className="d-flex justify-content-between font-size-11 mb-1">
                      <span className="text-muted">Voluntary Flat Contributions Collected:</span>
                      <strong>₹{evt.collectedContributions.toLocaleString('en-IN')} ({collectionPct}%)</strong>
                    </div>
                    <div className="progress" style={{ height: '7px' }}>
                      <div
                        className="progress-bar bg-success"
                        style={{ width: `${Math.min(Number(collectionPct), 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="card-footer bg-light d-flex justify-content-between align-items-center">
                  <span className="font-size-12 text-muted">
                    Expenses Incurred: <strong>₹{evt.expensesIncurred.toLocaleString('en-IN')}</strong>
                  </span>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-custom d-flex align-items-center gap-1"
                    onClick={() => {
                      setSelectedEvent(evt);
                      setIsDetailsModalOpen(true);
                    }}
                  >
                    <Eye size={13} />
                    <span>View Financials & Photos</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Event Details */}
      {selectedEvent && (
        <Modal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          title={`Festival Dossier: ${selectedEvent.name}`}
          size="lg"
          footer={
            <button
              type="button"
              className="btn btn-sm btn-light border"
              onClick={() => setIsDetailsModalOpen(false)}
            >
              Close Dossier
            </button>
          }
        >
          <div className="row g-3">
            <div className="col-12">
              <div className="p-3 bg-light rounded border">
                <h6 className="fw-bold text-teal-primary mb-2">{selectedEvent.name}</h6>
                <p className="font-size-13 text-muted mb-2">{selectedEvent.description}</p>
                <div className="d-flex flex-wrap gap-3 font-size-13">
                  <span><strong>Dates:</strong> {selectedEvent.startDate} to {selectedEvent.endDate}</span>
                  <span><strong>Location:</strong> {selectedEvent.venue}</span>
                  <span><strong>Lead:</strong> {selectedEvent.organizer}</span>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-3 border rounded text-center">
                <span className="text-muted font-size-12 fw-semibold text-uppercase">Budget</span>
                <h4 className="fw-bold text-dark my-1">₹{selectedEvent.budget.toLocaleString('en-IN')}</h4>
                <span className="text-muted font-size-11">Approved by committee</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 border rounded text-center">
                <span className="text-muted font-size-12 fw-semibold text-uppercase">Contributions</span>
                <h4 className="fw-bold text-success my-1">
                  ₹{selectedEvent.collectedContributions.toLocaleString('en-IN')}
                </h4>
                <span className="text-muted font-size-11">Resident flat subscriptions</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 border rounded text-center">
                <span className="text-muted font-size-12 fw-semibold text-uppercase">Actual Incurred</span>
                <h4 className="fw-bold text-danger my-1">
                  ₹{selectedEvent.expensesIncurred.toLocaleString('en-IN')}
                </h4>
                <span className="text-muted font-size-11">Vouchers cleared</span>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal: Create Event */}
      <Modal
        isOpen={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        title="Schedule Society Festival or Event"
        size="lg"
        footer={
          <>
            <button
              type="button"
              className="btn btn-sm btn-light border"
              onClick={() => setIsAddEventModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary-custom"
              onClick={handleCreateEvent}
            >
              Announce & Schedule
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateEvent}>
          <div className="row g-3">
            <div className="col-md-8">
              <label className="form-label small fw-semibold">Event Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Holi Dhuleti Colors & Thandai Gathering 2025"
                value={newEvent.name}
                onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Event Category</label>
              <select
                className="form-select"
                value={newEvent.type}
                onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as any })}
              >
                <option value="Religious">Religious Festival</option>
                <option value="Cultural">Cultural Celebration</option>
                <option value="Sports">Sports & Tournaments</option>
                <option value="General">Health Camp / General Gathering</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Start Date</label>
              <input
                type="date"
                className="form-control"
                value={newEvent.startDate}
                onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">End Date</label>
              <input
                type="date"
                className="form-control"
                value={newEvent.endDate}
                onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Venue</label>
              <input
                type="text"
                className="form-control"
                value={newEvent.venue}
                onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Organizing Committee / Lead</label>
              <input
                type="text"
                className="form-control"
                value={newEvent.organizer}
                onChange={(e) => setNewEvent({ ...newEvent, organizer: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Sanctioned Budget (₹)</label>
              <input
                type="number"
                className="form-control"
                value={newEvent.budget}
                onChange={(e) => setNewEvent({ ...newEvent, budget: Number(e.target.value) })}
              />
            </div>
            <div className="col-12">
              <label className="form-label small fw-semibold">Event Description & Programs</label>
              <textarea
                className="form-control"
                rows={2}
                placeholder="Mention timings, food arrangements, voluntary contributions per flat..."
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              ></textarea>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

