import React, { useState } from 'react';
import {
  BookmarkCheck,
  Calendar,
  Search,
  Plus,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  Eye,
  Building,
  DollarSign
} from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Modal } from '@/components/common/Modal';
import { StatusBadge } from '@/components/common/Badge';
import { mockVenueBookings } from '@/data/mock';
import { VenueBooking } from '@/types';

export const VenueBookingPage: React.FC = () => {
  const [bookings, setBookings] = useState<VenueBooking[]>(mockVenueBookings);
  const [venueFilter, setVenueFilter] = useState('All');
  const [selectedBooking, setSelectedBooking] = useState<VenueBooking | null>(null);
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);

  // New Booking State
  const [newBooking, setNewBooking] = useState<Partial<VenueBooking>>({
    venueName: 'Community Banquet Hall',
    bookedBy: '',
    apartmentNumber: '',
    eventDate: '2024-12-10',
    timeSlot: 'Evening (16:00 - 22:00)',
    purpose: '',
    charge: 7500,
  });

  const venuesList = [
    { name: 'Community Banquet Hall', capacity: '250 Persons', rate: '₹7,500/slot', image: 'Clubhouse Ground Floor AC' },
    { name: 'Clubhouse Garden', capacity: '400 Persons', rate: '₹6,000/slot', image: 'Lawn with Gazebo' },
    { name: 'Rooftop Lounge', capacity: '80 Persons', rate: '₹5,000/slot', image: 'Tower A 15th Terrace' },
    { name: 'Multipurpose Room', capacity: '50 Persons', rate: '₹2,500/slot', image: 'Indoor Activity Studio' },
  ];

  const filteredBookings = bookings.filter((b) => {
    return venueFilter === 'All' || b.venueName === venueFilter;
  });

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBooking.bookedBy || !newBooking.apartmentNumber) return;

    const created: VenueBooking = {
      id: `VB-${Date.now()}`,
      venueName: (newBooking.venueName as any) || 'Community Banquet Hall',
      bookedBy: newBooking.bookedBy || '',
      apartmentNumber: newBooking.apartmentNumber || '',
      eventDate: newBooking.eventDate || '2024-12-10',
      timeSlot: (newBooking.timeSlot as any) || 'Evening (16:00 - 22:00)',
      purpose: newBooking.purpose || 'Family Function',
      charge: Number(newBooking.charge) || 5000,
      status: 'Pending Approval',
    };

    setBookings([created, ...bookings]);
    setIsNewBookingModalOpen(false);
    setNewBooking({
      venueName: 'Community Banquet Hall',
      bookedBy: '',
      apartmentNumber: '',
      eventDate: '2024-12-10',
      timeSlot: 'Evening (16:00 - 22:00)',
      purpose: '',
      charge: 7500,
    });
  };

  const handleApproveBooking = (id: string) => {
    setBookings(
      bookings.map((b) => (b.id === id ? { ...b, status: 'Confirmed' as const } : b))
    );
  };

  return (
    <div className="venue-booking-page">
      <PageHeader
        title="Venue & Clubhouse Facility Booking"
        description="Community banquet hall, rooftop lounge, lawn, and multipurpose room reservation desk"
        breadcrumbs={[{ label: 'Community Management' }, { label: 'Venue Booking' }]}
        actions={
          <button
            type="button"
            className="btn btn-sm btn-primary-custom d-flex align-items-center gap-1"
            onClick={() => setIsNewBookingModalOpen(true)}
          >
            <Plus size={16} />
            <span>New Booking Request</span>
          </button>
        }
      />

      {/* 4 Venues Showcase Cards */}
      <div className="row g-3 mb-4">
        {venuesList.map((venue, idx) => (
          <div key={idx} className="col-12 col-sm-6 col-lg-3">
            <div className="card h-100 p-3 card-hover-effect">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <span className="badge bg-teal-light text-teal-primary font-size-12 fw-bold">
                  {venue.rate}
                </span>
                <span className="text-muted font-size-11">{venue.capacity}</span>
              </div>
              <h6 className="fw-bold text-dark mb-1 font-size-14">{venue.name}</h6>
              <p className="text-muted font-size-12 mb-3">{venue.image}</p>
              <button
                type="button"
                className="btn btn-sm btn-outline-custom w-100 mt-auto"
                onClick={() => {
                  setNewBooking({ ...newBooking, venueName: venue.name as any });
                  setIsNewBookingModalOpen(true);
                }}
              >
                Book This Facility
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bookings Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <h5 className="card-title">Facility Reservation Register & Requests</h5>
            <span className="card-subtitle">Review resident applications and confirm security deposit receipt</span>
          </div>
          <div className="d-flex gap-2">
            <select
              className="form-select form-select-sm"
              value={venueFilter}
              onChange={(e) => setVenueFilter(e.target.value)}
            >
              <option value="All">All Venues</option>
              <option value="Community Banquet Hall">Community Banquet Hall</option>
              <option value="Clubhouse Garden">Clubhouse Garden</option>
              <option value="Rooftop Lounge">Rooftop Lounge</option>
              <option value="Multipurpose Room">Multipurpose Room</option>
            </select>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-custom mb-0">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Facility / Venue</th>
                  <th>Reserved By</th>
                  <th>Flat No.</th>
                  <th>Date & Time Slot</th>
                  <th>Event Purpose</th>
                  <th>Facility Fee</th>
                  <th>Status</th>
                  <th className="text-end">Approval Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <span className="fw-bold text-teal-primary font-size-13">{b.id}</span>
                    </td>
                    <td>
                      <div className="fw-semibold text-dark font-size-13">{b.venueName}</div>
                    </td>
                    <td>
                      <div className="fw-semibold text-dark font-size-13">{b.bookedBy}</div>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border">{b.apartmentNumber}</span>
                    </td>
                    <td>
                      <div className="font-size-12 text-dark fw-medium">{b.eventDate}</div>
                      <div className="text-muted font-size-11">{b.timeSlot}</div>
                    </td>
                    <td style={{ maxWidth: '200px' }}>
                      <div className="font-size-12 text-muted text-truncate">{b.purpose}</div>
                    </td>
                    <td>
                      <strong className="text-dark">₹{b.charge.toLocaleString('en-IN')}</strong>
                    </td>
                    <td>
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="text-end">
                      {b.status === 'Pending Approval' ? (
                        <button
                          type="button"
                          className="btn btn-sm btn-success d-inline-flex align-items-center gap-1"
                          onClick={() => handleApproveBooking(b.id)}
                        >
                          <CheckCircle2 size={13} />
                          <span>Approve</span>
                        </button>
                      ) : (
                        <span className="text-success small fw-semibold">✓ Confirmed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal: New Booking Request */}
      <Modal
        isOpen={isNewBookingModalOpen}
        onClose={() => setIsNewBookingModalOpen(false)}
        title="Reserve Society Facility / Venue"
        size="lg"
        footer={
          <>
            <button
              type="button"
              className="btn btn-sm btn-light border"
              onClick={() => setIsNewBookingModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary-custom"
              onClick={handleCreateBooking}
            >
              Submit Booking
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateBooking}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Select Venue</label>
              <select
                className="form-select"
                value={newBooking.venueName}
                onChange={(e) => {
                  const val = e.target.value as any;
                  let charge = 5000;
                  if (val === 'Community Banquet Hall') charge = 7500;
                  if (val === 'Clubhouse Garden') charge = 6000;
                  if (val === 'Multipurpose Room') charge = 2500;
                  setNewBooking({ ...newBooking, venueName: val, charge });
                }}
              >
                <option value="Community Banquet Hall">Community Banquet Hall (₹7,500)</option>
                <option value="Clubhouse Garden">Clubhouse Garden (₹6,000)</option>
                <option value="Rooftop Lounge">Rooftop Lounge (₹5,000)</option>
                <option value="Multipurpose Room">Multipurpose Room (₹2,500)</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Resident Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Full name of applicant flat resident"
                value={newBooking.bookedBy}
                onChange={(e) => setNewBooking({ ...newBooking, bookedBy: e.target.value })}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Apartment Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. A-101"
                value={newBooking.apartmentNumber}
                onChange={(e) => setNewBooking({ ...newBooking, apartmentNumber: e.target.value })}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Event Date</label>
              <input
                type="date"
                className="form-control"
                value={newBooking.eventDate}
                onChange={(e) => setNewBooking({ ...newBooking, eventDate: e.target.value })}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Time Slot</label>
              <select
                className="form-select"
                value={newBooking.timeSlot}
                onChange={(e) => setNewBooking({ ...newBooking, timeSlot: e.target.value as any })}
              >
                <option value="Morning (09:00 - 14:00)">Morning (09:00 - 14:00)</option>
                <option value="Evening (16:00 - 22:00)">Evening (16:00 - 22:00)</option>
                <option value="Full Day">Full Day (09:00 - 22:00)</option>
              </select>
            </div>
            <div className="col-12">
              <label className="form-label small fw-semibold">Event Purpose / Nature of Function</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Birthday Party / Anniversary / Religious Puja"
                value={newBooking.purpose}
                onChange={(e) => setNewBooking({ ...newBooking, purpose: e.target.value })}
                required
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

