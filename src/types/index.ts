// Type Definitions for APARTMENT JOB Platform

export type PriorityLevel = 'P1' | 'P2' | 'P3' | 'P4';

export interface SocietyInfo {
  id: string;
  name: string;
  registrationNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  totalBlocks: number;
  totalFloors: number;
  totalApartments: number;
  occupiedApartments: number;
  vacantApartments: number;
  rentedApartments: number;
  amenities: string[];
  contactEmail: string;
  contactPhone: string;
}

export interface BlockInfo {
  id: string;
  name: string;
  totalFloors: number;
  apartmentsPerFloor: number;
  totalApartments: number;
  occupied: number;
  supervisor: string;
  status: 'Operational' | 'Maintenance' | 'Under Audit';
}

export interface Apartment {
  id: string;
  apartmentNumber: string;
  block: string;
  floor: number;
  type: '1BHK' | '2BHK' | '3BHK' | '4BHK' | 'Penthouse';
  areaSqFt: number;
  ownerName: string;
  ownerContact: string;
  ownerEmail: string;
  occupancyStatus: 'Owner Occupied' | 'Tenant Occupied' | 'Vacant';
  tenantName?: string;
  maintenanceAmount: number;
  parkingSlot: string;
  dueAmount: number;
}

export interface Resident {
  id: string;
  name: string;
  apartmentNumber: string;
  block: string;
  designation: 'Owner' | 'Tenant' | 'Family Member';
  phone: string;
  email: string;
  avatarUrl?: string;
  moveInDate: string;
  status: 'Active' | 'Pending Verification' | 'Inactive';
  emergencyContact: string;
  bloodGroup: string;
  vehicles: string[];
}

export interface RentalAgreement {
  id: string;
  apartmentNumber: string;
  block: string;
  ownerName: string;
  tenantName: string;
  tenantPhone: string;
  startDate: string;
  expiryDate: string;
  monthlyRent: number;
  securityDeposit: number;
  status: 'Active' | 'Expiring Soon' | 'Expired' | 'Renewed';
  documentUrl: string;
  policeVerification: 'Completed' | 'Pending';
}

export interface Complaint {
  id: string;
  ticketNumber: string;
  title: string;
  category: 'Plumbing' | 'Electrical' | 'Carpentry' | 'Elevator' | 'Security' | 'Cleanliness' | 'Civil';
  description: string;
  apartmentNumber: string;
  block: string;
  priority: PriorityLevel;
  priorityLabel: 'Critical' | 'High' | 'Medium' | 'Low';
  reportedBy: string;
  reportedDate: string;
  resolutionDeadline: string;
  assignedWorker: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  timeline: {
    time: string;
    action: string;
    by: string;
  }[];
}

export interface MaintenanceTask {
  id: string;
  taskId: string;
  title: string;
  category: string;
  scheduleDate: string;
  frequency: 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly' | 'Annual';
  assignedContractor: string;
  contactNumber: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Delayed';
  estimatedCost: number;
  actualCost: number;
  completionProofUrl?: string;
}

export interface FinancialMetric {
  totalIncome: number;
  totalExpenses: number;
  recordedBalance: number;
  outstandingPayments: number;
  collectionRate: number;
}

export interface MaintenanceFeeRecord {
  id: string;
  apartmentNumber: string;
  block: string;
  residentName: string;
  month: string;
  amountDue: number;
  amountPaid: number;
  dueDate: string;
  paymentDate?: string;
  transactionId?: string;
  paymentMode?: 'UPI' | 'NetBanking' | 'Cheque' | 'Credit Card';
  status: 'Paid' | 'Pending' | 'Overdue';
}

export interface SocietyExpense {
  id: string;
  voucherNo: string;
  category: 'Security Services' | 'Electricity & Diesel' | 'Lift AMC' | 'Water Supply' | 'Gardening' | 'Repairs & Maint.' | 'Events & Celebrations';
  description: string;
  vendorName: string;
  amount: number;
  date: string;
  authorizedBy: string;
  approvalStatus: 'Approved' | 'Pending Approval' | 'Rejected';
  invoiceFile?: string;
}

export interface BankReconciliationRecord {
  id: string;
  txnDate: string;
  description: string;
  referenceNo: string;
  bankAmount: number;
  societyAmount: number;
  type: 'Credit' | 'Debit';
  status: 'Matched' | 'Unmatched' | 'Amount Mismatch' | 'Duplicate Alert';
  actionNeeded: string;
}

export interface SocietyEvent {
  id: string;
  name: string;
  type: 'Religious' | 'Cultural' | 'Sports' | 'General';
  startDate: string;
  endDate: string;
  venue: string;
  organizer: string;
  budget: number;
  collectedContributions: number;
  expensesIncurred: number;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  description: string;
}

export interface VenueBooking {
  id: string;
  venueName: 'Community Banquet Hall' | 'Rooftop Lounge' | 'Clubhouse Garden' | 'Multipurpose Room';
  bookedBy: string;
  apartmentNumber: string;
  eventDate: string;
  timeSlot: 'Morning (09:00 - 14:00)' | 'Evening (16:00 - 22:00)' | 'Full Day';
  purpose: string;
  charge: number;
  status: 'Confirmed' | 'Pending Approval' | 'Cancelled';
}

export interface InventoryItem {
  id: string;
  itemName: string;
  category: 'Tents & Canopies' | 'Audio Visual' | 'Tables & Chairs' | 'Lighting & Electrical' | 'Catering Utensils';
  totalQuantity: number;
  availableQuantity: number;
  reservedQuantity: number;
  condition: 'Good' | 'Fair' | 'Needs Repair';
  lastIssuedTo?: string;
}

export interface SocietyNotification {
  id: string;
  title: string;
  category: 'Emergency' | 'Water Supply' | 'Power Shutdown' | 'Maintenance' | 'Celebration' | 'General';
  message: string;
  targetAudience: 'All Residents' | 'Block A Only' | 'Block B Only' | 'Block C & D' | 'Owners Only';
  timestamp: string;
  urgency: 'High' | 'Normal' | 'Low';
  author: string;
}

export interface VendorStaff {
  id: string;
  name: string;
  role: 'Plumber' | 'Electrician' | 'Security Supervisor' | 'Housekeeping Lead' | 'Gardener' | 'Lift Technician';
  agency: string;
  phone: string;
  status: 'On Duty' | 'Off Duty' | 'On Leave';
  rating: number;
  assignedBlock: string;
  workCount: number;
}

export interface SocietyDocument {
  id: string;
  title: string;
  category: 'Society Bye-Laws' | 'Ownership Records' | 'AGM Minutes' | 'Audit Reports' | 'AMC Contracts' | 'Vendor Invoices';
  fileType: 'PDF' | 'DOCX' | 'XLSX' | 'SCAN';
  size: string;
  uploadedDate: string;
  uploadedBy: string;
  accessLevel: 'All Residents' | 'Committee Members Only' | 'Admin Only';
}

export interface CommitteeMeeting {
  id: string;
  title: string;
  type: 'Annual General Meeting (AGM)' | 'Managing Committee Monthly' | 'Emergency Council';
  date: string;
  time: string;
  venue: string;
  agenda: string[];
  quorumRequired: number;
  confirmedAttendees: number;
  status: 'Scheduled' | 'Completed' | 'Minutes Published';
  activePoll?: {
    question: string;
    options: { text: string; votes: number }[];
    totalVotes: number;
  };
}

export interface VisitorRecord {
  id: string;
  visitorName: string;
  phone: string;
  apartmentToVisit: string;
  visitorType: 'Guest' | 'Delivery' | 'Cab / Driver' | 'Vendor Staff' | 'Service Provider';
  vehicleNumber?: string;
  checkInTime: string;
  checkOutTime?: string;
  residentApprovalStatus: 'Approved' | 'Pre-approved' | 'Denied' | 'Waiting';
  securityGuardName: string;
}

