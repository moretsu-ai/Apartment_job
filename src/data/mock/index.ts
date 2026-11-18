import {
  SocietyInfo,
  BlockInfo,
  Apartment,
  Resident,
  RentalAgreement,
  Complaint,
  MaintenanceTask,
  MaintenanceFeeRecord,
  SocietyExpense,
  BankReconciliationRecord,
  SocietyEvent,
  VenueBooking,
  InventoryItem,
  SocietyNotification,
  VendorStaff,
  SocietyDocument,
  CommitteeMeeting,
  VisitorRecord,
} from '@/types';

export const mockSocietyInfo: SocietyInfo = {
  id: 'SOC-2024-EH',
  name: 'Emerald Heights Co-operative Housing Society',
  registrationNumber: 'BOM/HSG/TC/14298/2018',
  address: 'Plot 42, Sector 18, Palm Beach Road, Vashi',
  city: 'Navi Mumbai',
  state: 'Maharashtra',
  pincode: '400705',
  totalBlocks: 4,
  totalFloors: 14,
  totalApartments: 224,
  occupiedApartments: 198,
  vacantApartments: 26,
  rentedApartments: 64,
  amenities: [
    'Clubhouse & Gymnasium',
    'Swimming Pool & Kid Pool',
    'Amphitheatre & Garden Lawn',
    'Multipurpose Sports Court',
    '24/7 CCTV & RFID Gate Security',
    'Solar Water & 100% DG Backup',
    'Rainwater Harvesting Plant',
    'EV Charging Bays'
  ],
  contactEmail: 'committee@emeraldheights.in',
  contactPhone: '+91 22 2789 4400',
};

export const mockBlocks: BlockInfo[] = [
  { id: 'BLK-A', name: 'Tower A - Coral', totalFloors: 14, apartmentsPerFloor: 4, totalApartments: 56, occupied: 52, supervisor: 'Ramesh Patil', status: 'Operational' },
  { id: 'BLK-B', name: 'Tower B - Pearl', totalFloors: 14, apartmentsPerFloor: 4, totalApartments: 56, occupied: 50, supervisor: 'Suresh Deshmukh', status: 'Operational' },
  { id: 'BLK-C', name: 'Tower C - Sapphire', totalFloors: 14, apartmentsPerFloor: 4, totalApartments: 56, occupied: 48, supervisor: 'Anil Kulkarni', status: 'Operational' },
  { id: 'BLK-D', name: 'Tower D - Emerald', totalFloors: 14, apartmentsPerFloor: 4, totalApartments: 56, occupied: 48, supervisor: 'Vikram Joshi', status: 'Maintenance' },
];

export const mockApartments: Apartment[] = [
  { id: 'APT-A101', apartmentNumber: 'A-101', block: 'Tower A', floor: 1, type: '2BHK', areaSqFt: 1150, ownerName: 'Rajesh Sharma', ownerContact: '+91 98201 12345', ownerEmail: 'rajesh.sharma@gmail.com', occupancyStatus: 'Owner Occupied', maintenanceAmount: 4850, parkingSlot: 'P-A12', dueAmount: 0 },
  { id: 'APT-A102', apartmentNumber: 'A-102', block: 'Tower A', floor: 1, type: '2BHK', areaSqFt: 1150, ownerName: 'Sunita Menon', ownerContact: '+91 98201 54321', ownerEmail: 'sunita.menon@outlook.com', occupancyStatus: 'Tenant Occupied', tenantName: 'Aditya Roy', maintenanceAmount: 4850, parkingSlot: 'P-A13', dueAmount: 4850 },
  { id: 'APT-A201', apartmentNumber: 'A-201', block: 'Tower A', floor: 2, type: '3BHK', areaSqFt: 1650, ownerName: 'Dr. Amitav Ghosh', ownerContact: '+91 98202 88990', ownerEmail: 'dr.amitav@ghoshclinic.org', occupancyStatus: 'Owner Occupied', maintenanceAmount: 6200, parkingSlot: 'P-A24', dueAmount: 0 },
  { id: 'APT-A202', apartmentNumber: 'A-202', block: 'Tower A', floor: 2, type: '3BHK', areaSqFt: 1650, ownerName: 'Kavita Chawla', ownerContact: '+91 98203 11223', ownerEmail: 'kavita.c@gmail.com', occupancyStatus: 'Vacant', maintenanceAmount: 6200, parkingSlot: 'P-A25', dueAmount: 12400 },
  { id: 'APT-B304', apartmentNumber: 'B-304', block: 'Tower B', floor: 3, type: '2BHK', areaSqFt: 1200, ownerName: 'Manoj Hegde', ownerContact: '+91 98204 44556', ownerEmail: 'manoj.hegde@infosys.com', occupancyStatus: 'Owner Occupied', maintenanceAmount: 5100, parkingSlot: 'P-B18', dueAmount: 0 },
  { id: 'APT-B402', apartmentNumber: 'B-402', block: 'Tower B', floor: 4, type: '3BHK', areaSqFt: 1680, ownerName: 'Harpreet Singh', ownerContact: '+91 98205 77889', ownerEmail: 'hsingh@punjabauto.com', occupancyStatus: 'Tenant Occupied', tenantName: 'Karan Mehra', maintenanceAmount: 6350, parkingSlot: 'P-B30', dueAmount: 0 },
  { id: 'APT-C501', apartmentNumber: 'C-501', block: 'Tower C', floor: 5, type: '4BHK', areaSqFt: 2250, ownerName: 'Deepak Merchant', ownerContact: '+91 98206 99112', ownerEmail: 'dmerchant@exportcorp.in', occupancyStatus: 'Owner Occupied', maintenanceAmount: 8500, parkingSlot: 'P-C01', dueAmount: 0 },
  { id: 'APT-D704', apartmentNumber: 'D-704', block: 'Tower D', floor: 7, type: 'Penthouse', areaSqFt: 3100, ownerName: 'Ananya Singhania', ownerContact: '+91 98207 33445', ownerEmail: 'ananya@singhaniagroup.com', occupancyStatus: 'Owner Occupied', maintenanceAmount: 12000, parkingSlot: 'P-D05', dueAmount: 0 },
];

export const mockResidents: Resident[] = [
  { id: 'RES-101', name: 'Rajesh Sharma', apartmentNumber: 'A-101', block: 'Tower A', designation: 'Owner', phone: '+91 98201 12345', email: 'rajesh.sharma@gmail.com', moveInDate: '15-Mar-2019', status: 'Active', emergencyContact: '+91 98201 99999', bloodGroup: 'B+', vehicles: ['MH-43-AK-2020', 'MH-43-BB-8811'] },
  { id: 'RES-102', name: 'Aditya Roy', apartmentNumber: 'A-102', block: 'Tower A', designation: 'Tenant', phone: '+91 98199 44321', email: 'aditya.roy@techmail.com', moveInDate: '01-Nov-2023', status: 'Active', emergencyContact: '+91 98199 00000', bloodGroup: 'O+', vehicles: ['MH-02-DZ-4112'] },
  { id: 'RES-103', name: 'Dr. Amitav Ghosh', apartmentNumber: 'A-201', block: 'Tower A', designation: 'Owner', phone: '+91 98202 88990', email: 'dr.amitav@ghoshclinic.org', moveInDate: '20-Dec-2018', status: 'Active', emergencyContact: '+91 98202 77777', bloodGroup: 'A+', vehicles: ['MH-43-CL-1100'] },
  { id: 'RES-104', name: 'Karan Mehra', apartmentNumber: 'B-402', block: 'Tower B', designation: 'Tenant', phone: '+91 98205 33441', email: 'karan.mehra@adagency.com', moveInDate: '10-Jan-2024', status: 'Active', emergencyContact: '+91 98205 22111', bloodGroup: 'AB+', vehicles: ['MH-03-EB-9090'] },
  { id: 'RES-105', name: 'Manoj Hegde', apartmentNumber: 'B-304', block: 'Tower B', designation: 'Owner', phone: '+91 98204 44556', email: 'manoj.hegde@infosys.com', moveInDate: '05-Jul-2020', status: 'Active', emergencyContact: '+91 98204 11111', bloodGroup: 'O-', vehicles: ['MH-43-BQ-7744'] },
  { id: 'RES-106', name: 'Deepak Merchant', apartmentNumber: 'C-501', block: 'Tower C', designation: 'Owner', phone: '+91 98206 99112', email: 'dmerchant@exportcorp.in', moveInDate: '12-Feb-2019', status: 'Active', emergencyContact: '+91 98206 66666', bloodGroup: 'B+', vehicles: ['MH-43-ZZ-0001', 'MH-43-ZZ-0002'] },
  { id: 'RES-107', name: 'Pooja Iyer', apartmentNumber: 'D-202', block: 'Tower D', designation: 'Tenant', phone: '+91 98333 55667', email: 'pooja.iyer@fintech.io', moveInDate: '15-Oct-2024', status: 'Pending Verification', emergencyContact: '+91 98333 11223', bloodGroup: 'A-', vehicles: ['MH-43-AV-6543'] },
];

export const mockRentalAgreements: RentalAgreement[] = [
  { id: 'RA-2024-001', apartmentNumber: 'A-102', block: 'Tower A', ownerName: 'Sunita Menon', tenantName: 'Aditya Roy', tenantPhone: '+91 98199 44321', startDate: '2023-11-01', expiryDate: '2024-10-31', monthlyRent: 42000, securityDeposit: 200000, status: 'Expiring Soon', documentUrl: '/docs/agreement-a102.pdf', policeVerification: 'Completed' },
  { id: 'RA-2024-002', apartmentNumber: 'B-402', block: 'Tower B', ownerName: 'Harpreet Singh', tenantName: 'Karan Mehra', tenantPhone: '+91 98205 33441', startDate: '2024-01-10', expiryDate: '2025-12-31', monthlyRent: 55000, securityDeposit: 250000, status: 'Active', documentUrl: '/docs/agreement-b402.pdf', policeVerification: 'Completed' },
  { id: 'RA-2024-003', apartmentNumber: 'C-303', block: 'Tower C', ownerName: 'Naveen Poddar', tenantName: 'Shalini Verma', tenantPhone: '+91 98701 22334', startDate: '2023-08-15', expiryDate: '2024-07-14', monthlyRent: 48000, securityDeposit: 200000, status: 'Expired', documentUrl: '/docs/agreement-c303.pdf', policeVerification: 'Completed' },
  { id: 'RA-2024-004', apartmentNumber: 'D-202', block: 'Tower D', ownerName: 'Vikramaditya Roy', tenantName: 'Pooja Iyer', tenantPhone: '+91 98333 55667', startDate: '2024-10-15', expiryDate: '2025-09-30', monthlyRent: 50000, securityDeposit: 225000, status: 'Active', documentUrl: '/docs/agreement-d202.pdf', policeVerification: 'Pending' },
];

export const mockComplaints: Complaint[] = [
  {
    id: 'CMP-2024-1081',
    ticketNumber: '#1081',
    title: 'Tower B Passenger Elevator #2 Stoppage with Jerk',
    category: 'Elevator',
    description: 'Elevator stopped abruptly between 8th and 9th floor with slight vibration. Otis technicians must inspect safety brake sensors.',
    apartmentNumber: 'Tower B Common',
    block: 'Tower B',
    priority: 'P1',
    priorityLabel: 'Critical',
    reportedBy: 'Karan Mehra (B-402)',
    reportedDate: '2024-11-05 08:30 AM',
    resolutionDeadline: '2024-11-05 12:30 PM (4h SLA)',
    assignedWorker: 'Otis Resident Engineer (Mahesh S.)',
    status: 'In Progress',
    timeline: [
      { time: '08:30 AM', action: 'Ticket logged by resident', by: 'Karan Mehra' },
      { time: '08:45 AM', action: 'Elevator auto-lock applied and barricaded', by: 'Security Guard' },
      { time: '09:15 AM', action: 'Otis on-call technician arrived at motor room', by: 'Mahesh S.' }
    ]
  },
  {
    id: 'CMP-2024-1080',
    ticketNumber: '#1080',
    title: 'Main Overhead Tank Pipeline Valve Leakage',
    category: 'Plumbing',
    description: 'High pressure seepage near water pump outlet valve causing overflow in basement chamber 2.',
    apartmentNumber: 'Basement Pumphouse',
    block: 'Tower A',
    priority: 'P1',
    priorityLabel: 'Critical',
    reportedBy: 'Estate Supervisor (Ramesh Patil)',
    reportedDate: '2024-11-05 06:15 AM',
    resolutionDeadline: '2024-11-05 10:15 AM',
    assignedWorker: 'Society Plumber (Santosh Kumar)',
    status: 'Open',
    timeline: [
      { time: '06:15 AM', action: 'Detected during morning water pumping', by: 'Ramesh Patil' },
      { time: '06:30 AM', action: 'Bypass manifold activated to protect pump', by: 'Santosh Kumar' }
    ]
  },
  {
    id: 'CMP-2024-1079',
    ticketNumber: '#1079',
    title: 'CCTV Blindspot Near Tower C Basement Exit 3',
    category: 'Security',
    description: 'Camera #14 feed intermittently flickering on monitor 2; possible RJ45 connector rust.',
    apartmentNumber: 'Basement-C',
    block: 'Tower C',
    priority: 'P2',
    priorityLabel: 'High',
    reportedBy: 'Head Security (Bhopal Singh)',
    reportedDate: '2024-11-04 04:00 PM',
    resolutionDeadline: '2024-11-06 04:00 PM (24h SLA)',
    assignedWorker: 'Zicom CCTV Technician (Prakash Rao)',
    status: 'In Progress',
    timeline: [
      { time: '04:00 PM', action: 'Reported during daily camera check', by: 'Bhopal Singh' },
      { time: '05:30 PM', action: 'Service ticket dispatched to Zicom', by: 'Admin Desk' }
    ]
  },
  {
    id: 'CMP-2024-1075',
    ticketNumber: '#1075',
    title: 'Intermittent Corridor Light Sensor Failure (Floor 4)',
    category: 'Electrical',
    description: 'Motion sensor delayed by 40 seconds before switching on corridor illumination.',
    apartmentNumber: 'A-401 to A-404 Corridor',
    block: 'Tower A',
    priority: 'P3',
    priorityLabel: 'Medium',
    reportedBy: 'Kavita Chawla',
    reportedDate: '2024-11-03 07:20 PM',
    resolutionDeadline: '2024-11-07 06:00 PM',
    assignedWorker: 'Society Electrician (Mohan Lal)',
    status: 'In Progress',
    timeline: [
      { time: '07:20 PM', action: 'Complaint filed via resident portal', by: 'Kavita Chawla' },
      { time: '09:00 AM (Nov 4)', action: 'PIR sensor replacement scheduled', by: 'Mohan Lal' }
    ]
  },
  {
    id: 'CMP-2024-1070',
    ticketNumber: '#1070',
    title: 'Clubhouse Table Tennis Net Tension Screw Replaced',
    category: 'Carpentry',
    description: 'Table #1 side clamp screw stripped and clamp bent.',
    apartmentNumber: 'Clubhouse 1st Floor',
    block: 'Common Area',
    priority: 'P4',
    priorityLabel: 'Low',
    reportedBy: 'Dr. Amitav Ghosh',
    reportedDate: '2024-11-01 11:00 AM',
    resolutionDeadline: '2024-11-08 06:00 PM',
    assignedWorker: 'Estate Carpenter (Dinesh)',
    status: 'Resolved',
    timeline: [
      { time: '11:00 AM', action: 'Reported after weekend match', by: 'Dr. Amitav Ghosh' },
      { time: '02:30 PM (Nov 2)', action: 'New clamp and tensioner fitted', by: 'Dinesh' },
      { time: '03:00 PM (Nov 2)', action: 'Verified & closed', by: 'Estate Manager' }
    ]
  }
];

export const mockMaintenanceTasks: MaintenanceTask[] = [
  { id: 'TSK-201', taskId: 'MT-0891', title: 'Diesel Generator 250kVA Routine Load Test & Fuel Filter Clean', category: 'Electrical', scheduleDate: '2024-11-08', frequency: 'Monthly', assignedContractor: 'Cummins India Field Service', contactNumber: '+91 98200 44112', status: 'Scheduled', estimatedCost: 18500, actualCost: 0 },
  { id: 'TSK-202', taskId: 'MT-0892', title: 'Solar Roof Cells Wash & Inverter Efficiency Calibration', category: 'Renewable Energy', scheduleDate: '2024-11-06', frequency: 'Monthly', assignedContractor: 'SunPower Cleantech', contactNumber: '+91 98200 55223', status: 'In Progress', estimatedCost: 8200, actualCost: 8200 },
  { id: 'TSK-203', taskId: 'MT-0893', title: 'Underground Water Reservoir Sump Chlorination & Scrubbing', category: 'Health & Hygiene', scheduleDate: '2024-11-02', frequency: 'Quarterly', assignedContractor: 'AquaClean Tanks Ltd', contactNumber: '+91 98200 66334', status: 'Completed', estimatedCost: 28000, actualCost: 27500, completionProofUrl: '/reports/water-test-cert.pdf' },
  { id: 'TSK-204', taskId: 'MT-0894', title: 'Fire Hydrant Pressure Gauge Recalibration & Hose Check', category: 'Safety & Compliance', scheduleDate: '2024-11-10', frequency: 'Quarterly', assignedContractor: 'Ceasefire Industries', contactNumber: '+91 98200 77445', status: 'Scheduled', estimatedCost: 14500, actualCost: 0 },
  { id: 'TSK-205', taskId: 'MT-0895', title: 'Swimming Pool Sand Filter Backwash & pH Balance Treatment', category: 'Clubhouse Maintenance', scheduleDate: '2024-11-05', frequency: 'Weekly', assignedContractor: 'BlueWave Pools', contactNumber: '+91 98200 88556', status: 'Completed', estimatedCost: 6500, actualCost: 6500 }
];

export const mockMaintenanceFees: MaintenanceFeeRecord[] = [
  { id: 'FEE-101', apartmentNumber: 'A-101', block: 'Tower A', residentName: 'Rajesh Sharma', month: 'November 2024', amountDue: 4850, amountPaid: 4850, dueDate: '2024-11-10', paymentDate: '2024-11-02', transactionId: 'UPI-RAZ-9812401', paymentMode: 'UPI', status: 'Paid' },
  { id: 'FEE-102', apartmentNumber: 'A-102', block: 'Tower A', residentName: 'Sunita Menon (Aditya Roy)', month: 'November 2024', amountDue: 4850, amountPaid: 0, dueDate: '2024-11-10', status: 'Pending' },
  { id: 'FEE-103', apartmentNumber: 'A-201', block: 'Tower A', residentName: 'Dr. Amitav Ghosh', month: 'November 2024', amountDue: 6200, amountPaid: 6200, dueDate: '2024-11-10', paymentDate: '2024-11-01', transactionId: 'HDFC-NEFT-551092', paymentMode: 'NetBanking', status: 'Paid' },
  { id: 'FEE-104', apartmentNumber: 'A-202', block: 'Tower A', residentName: 'Kavita Chawla', month: 'November 2024', amountDue: 6200, amountPaid: 0, dueDate: '2024-10-10', status: 'Overdue' },
  { id: 'FEE-105', apartmentNumber: 'B-304', block: 'Tower B', residentName: 'Manoj Hegde', month: 'November 2024', amountDue: 5100, amountPaid: 5100, dueDate: '2024-11-10', paymentDate: '2024-11-03', transactionId: 'ICICI-IMPS-887102', paymentMode: 'NetBanking', status: 'Paid' },
  { id: 'FEE-106', apartmentNumber: 'B-402', block: 'Tower B', residentName: 'Harpreet Singh (Karan)', month: 'November 2024', amountDue: 6350, amountPaid: 6350, dueDate: '2024-11-10', paymentDate: '2024-11-04', transactionId: 'UPI-GPAY-776109', paymentMode: 'UPI', status: 'Paid' },
  { id: 'FEE-107', apartmentNumber: 'C-501', block: 'Tower C', residentName: 'Deepak Merchant', month: 'November 2024', amountDue: 8500, amountPaid: 8500, dueDate: '2024-11-10', paymentDate: '2024-11-01', transactionId: 'KOTAK-CHQ-104882', paymentMode: 'Cheque', status: 'Paid' },
  { id: 'FEE-108', apartmentNumber: 'D-704', block: 'Tower D', residentName: 'Ananya Singhania', month: 'November 2024', amountDue: 12000, amountPaid: 12000, dueDate: '2024-11-10', paymentDate: '2024-11-02', transactionId: 'AXIS-CORP-99120', paymentMode: 'Credit Card', status: 'Paid' }
];

export const mockExpenses: SocietyExpense[] = [
  { id: 'EXP-501', voucherNo: 'PV-2024-11-01', category: 'Security Services', description: 'Monthly security personnel charges (14 guards + 2 supervisors)', vendorName: 'SIS Security India Ltd', amount: 385000, date: '2024-11-02', authorizedBy: 'Treasurer (Harish Patel)', approvalStatus: 'Approved' },
  { id: 'EXP-502', voucherNo: 'PV-2024-11-02', category: 'Electricity & Diesel', description: 'MSEDCL Common lighting & elevator meter bill (Oct consumption)', vendorName: 'MSEDCL Vashi Sub-division', amount: 218400, date: '2024-11-03', authorizedBy: 'Secretary (Rajesh Sharma)', approvalStatus: 'Approved' },
  { id: 'EXP-503', voucherNo: 'PV-2024-11-03', category: 'Lift AMC', description: 'Otis Elevator comprehensive quarterly AMC fee (8 elevators)', vendorName: 'Otis Elevator Co India Ltd', amount: 144000, date: '2024-11-04', authorizedBy: 'Treasurer (Harish Patel)', approvalStatus: 'Approved' },
  { id: 'EXP-504', voucherNo: 'PV-2024-11-04', category: 'Water Supply', description: 'Emergency 8 tanker supply during municipal pipeline shutdown', vendorName: 'Sai Samarth Water Tankers', amount: 32000, date: '2024-11-04', authorizedBy: 'Chairman (Dr. Ghosh)', approvalStatus: 'Pending Approval' },
  { id: 'EXP-505', voucherNo: 'PV-2024-11-05', category: 'Gardening', description: 'Lawn seasonal fertilizer, pruning tools & lawnmower maintenance', vendorName: 'Green Meadows Horticulture', amount: 24500, date: '2024-11-05', authorizedBy: 'Estate Supervisor', approvalStatus: 'Approved' },
  { id: 'EXP-506', voucherNo: 'PV-2024-11-06', category: 'Events & Celebrations', description: 'Diwali illumination fairy lights & lobby rangoli artist fees', vendorName: 'Shree Radhe Event Decorators', amount: 65000, date: '2024-11-01', authorizedBy: 'Cultural Committee Head', approvalStatus: 'Approved' }
];

export const mockReconciliation: BankReconciliationRecord[] = [
  { id: 'REC-01', txnDate: '2024-11-04', description: 'HDFC Gateway NetSettlement - Maintenance Coll.', referenceNo: 'HDFC-STL-88912', bankAmount: 142500, societyAmount: 142500, type: 'Credit', status: 'Matched', actionNeeded: 'Reconciled' },
  { id: 'REC-02', txnDate: '2024-11-03', description: 'Direct NEFT - Apt D-402 Maintenance', referenceNo: 'AXIS-N308191', bankAmount: 6200, societyAmount: 6200, type: 'Credit', status: 'Matched', actionNeeded: 'Reconciled' },
  { id: 'REC-03', txnDate: '2024-11-02', description: 'Chq Cleared - MSEDCL Electricity Bill', referenceNo: 'CHQ-002481', bankAmount: 218400, societyAmount: 218400, type: 'Debit', status: 'Matched', actionNeeded: 'Reconciled' },
  { id: 'REC-04', txnDate: '2024-11-01', description: 'UPI Pmt Ref: 9812401992 - Unknown Flat', referenceNo: 'UPI-CR-9921', bankAmount: 4850, societyAmount: 0, type: 'Credit', status: 'Unmatched', actionNeeded: 'Identify apartment resident payer' },
  { id: 'REC-05', txnDate: '2024-10-31', description: 'Sai Water Tankers Invoice Diff', referenceNo: 'NEFT-SWT-11', bankAmount: 34000, societyAmount: 32000, type: 'Debit', status: 'Amount Mismatch', actionNeeded: 'Verify additional tanker voucher with security' },
  { id: 'REC-06', txnDate: '2024-10-29', description: 'Duplicate UPI Entry Attempt Apt B-101', referenceNo: 'UPI-DUP-771', bankAmount: 5100, societyAmount: 5100, type: 'Credit', status: 'Duplicate Alert', actionNeeded: 'Check if double credit posted on ledger' }
];

export const mockEvents: SocietyEvent[] = [
  { id: 'EVT-01', name: 'Grand Diwali Mela & Deepotsav 2024', type: 'Cultural', startDate: '2024-11-01', endDate: '2024-11-03', venue: 'Central Garden Lawn & Clubhouse', organizer: 'Cultural & Youth Committee', budget: 180000, collectedContributions: 195000, expensesIncurred: 172000, status: 'Completed', description: '3-day celebration with diyas, live orchestra, food kiosks, children fancy dress, and eco-friendly fireworks.' },
  { id: 'EVT-02', name: 'Ganesh Chaturthi Utsav (10 Days)', type: 'Religious', startDate: '2024-09-07', endDate: '2024-09-17', venue: 'Amphitheatre Ground', organizer: 'Sarvajanik Ganeshotsav Mandal', budget: 350000, collectedContributions: 385000, expensesIncurred: 348000, status: 'Completed', description: 'Eco-friendly clay idol, daily mahaprasad, evening bhajans, and eco immersion tank arrangement on society premises.' },
  { id: 'EVT-03', name: 'Annual Society Winter Cricket & Badminton League', type: 'Sports', startDate: '2024-12-14', endDate: '2024-12-22', venue: 'Multipurpose Sports Turf', organizer: 'Sports Committee (Manoj Hegde)', budget: 95000, collectedContributions: 82000, expensesIncurred: 35000, status: 'Upcoming', description: 'Inter-tower cricket matches, men & women singles/doubles badminton tournament, and awards gala.' },
  { id: 'EVT-04', name: 'Free Cardiac & Eye Screening Health Camp', type: 'General', startDate: '2024-11-24', endDate: '2024-11-24', venue: 'Clubhouse Banquet Hall', organizer: 'Dr. Amitav Ghosh & Apollo Hospitals', budget: 25000, collectedContributions: 25000, expensesIncurred: 12000, status: 'Upcoming', description: 'Complimentary ECG, BP, Sugar, and Cataract screening for all residents and senior citizens.' }
];

export const mockVenueBookings: VenueBooking[] = [
  { id: 'VB-101', venueName: 'Community Banquet Hall', bookedBy: 'Rajesh Sharma', apartmentNumber: 'A-101', eventDate: '2024-11-17', timeSlot: 'Evening (16:00 - 22:00)', purpose: 'Daughter 16th Birthday Celebration', charge: 7500, status: 'Confirmed' },
  { id: 'VB-102', venueName: 'Rooftop Lounge', bookedBy: 'Deepak Merchant', apartmentNumber: 'C-501', eventDate: '2024-11-22', timeSlot: 'Evening (16:00 - 22:00)', purpose: 'Family Anniversary Dinner', charge: 5000, status: 'Confirmed' },
  { id: 'VB-103', venueName: 'Clubhouse Garden', bookedBy: 'Harpreet Singh', apartmentNumber: 'B-402', eventDate: '2024-12-01', timeSlot: 'Morning (09:00 - 14:00)', purpose: 'Satsang and Kirtan Gathering', charge: 6000, status: 'Pending Approval' },
  { id: 'VB-104', venueName: 'Multipurpose Room', bookedBy: 'Pooja Iyer', apartmentNumber: 'D-202', eventDate: '2024-11-12', timeSlot: 'Morning (09:00 - 14:00)', purpose: 'Weekend Yoga Workshop', charge: 2500, status: 'Confirmed' }
];

export const mockInventory: InventoryItem[] = [
  { id: 'INV-01', itemName: 'Waterproof Marquee Tent (20x40 ft)', category: 'Tents & Canopies', totalQuantity: 6, availableQuantity: 4, reservedQuantity: 2, condition: 'Good', lastIssuedTo: 'Diwali Mela Lawn Setup' },
  { id: 'INV-02', itemName: 'JBL 1000W PA Sound System & Wireless Mics', category: 'Audio Visual', totalQuantity: 3, availableQuantity: 2, reservedQuantity: 1, condition: 'Good', lastIssuedTo: 'Clubhouse Hall (A-101 Booking)' },
  { id: 'INV-03', itemName: 'Stackable Banquet Chairs (Cushioned)', category: 'Tables & Chairs', totalQuantity: 350, availableQuantity: 280, reservedQuantity: 70, condition: 'Good', lastIssuedTo: 'Tower A Birthday' },
  { id: 'INV-04', itemName: 'Folding Heavy-Duty Buffet Tables (6 ft)', category: 'Tables & Chairs', totalQuantity: 40, availableQuantity: 32, reservedQuantity: 8, condition: 'Good', lastIssuedTo: 'Diwali Committee' },
  { id: 'INV-05', itemName: 'LED Floodlight Halogen Stands (100W)', category: 'Lighting & Electrical', totalQuantity: 24, availableQuantity: 18, reservedQuantity: 6, condition: 'Fair', lastIssuedTo: 'Garden Pathways' },
  { id: 'INV-06', itemName: 'High-Capacity Chafing Dishes (Stainless Steel)', category: 'Catering Utensils', totalQuantity: 30, availableQuantity: 22, reservedQuantity: 8, condition: 'Good', lastIssuedTo: 'Banquet Hall' }
];

export const mockNotifications: SocietyNotification[] = [
  { id: 'NOTIF-01', title: 'Municipal Water Shutdown Notice (NMMC Line Maintenance)', category: 'Water Supply', message: 'NMMC has announced scheduled pipe maintenance on Palm Beach supply main on Thursday (Nov 07) between 09:00 AM and 05:00 PM. Water will be supplied from society overhead reserve tanks at restricted pressure. Please store adequate water.', targetAudience: 'All Residents', timestamp: '2024-11-05 10:00 AM', urgency: 'High', author: 'Managing Committee Desk' },
  { id: 'NOTIF-02', title: 'Tower D Elevator Routine Servicing Schedule', category: 'Maintenance', message: 'Tower D Passenger Lift #1 will undergo safety sensor overhaul on Wednesday Nov 06 between 11:00 AM and 02:00 PM. Service lift will remain fully functional.', targetAudience: 'Block C & D', timestamp: '2024-11-04 03:30 PM', urgency: 'Normal', author: 'Estate Supervisor' },
  { id: 'NOTIF-03', title: 'Diwali Cleanliness Drive & Tree Plantation Wrap-up', category: 'Celebration', message: 'Heartfelt gratitude to 85+ residents and children who participated in our green clean campus initiative. Over 40 native flowering saplings were planted in the peripheral walkway.', targetAudience: 'All Residents', timestamp: '2024-11-03 06:00 PM', urgency: 'Low', author: 'Environment Committee' },
  { id: 'NOTIF-04', title: 'Mandatory Tenant Police Verification Form Submission', category: 'Emergency', message: 'All flat owners leasing out premises must ensure updated tenant police verification and agreement copies are uploaded to the society portal before Nov 15 as mandated by Navi Mumbai Police Commissionerate.', targetAudience: 'Owners Only', timestamp: '2024-11-02 11:15 AM', urgency: 'High', author: 'Hon. Secretary' }
];

export const mockStaff: VendorStaff[] = [
  { id: 'STF-01', name: 'Santosh Kumar', role: 'Plumber', agency: 'Society In-house Staff', phone: '+91 98334 11229', status: 'On Duty', rating: 4.8, assignedBlock: 'All Towers', workCount: 142 },
  { id: 'STF-02', name: 'Mohan Lal Sharma', role: 'Electrician', agency: 'Society In-house Staff', phone: '+91 98334 22330', status: 'On Duty', rating: 4.9, assignedBlock: 'All Towers', workCount: 188 },
  { id: 'STF-03', name: 'Bhopal Singh', role: 'Security Supervisor', agency: 'SIS Security India Ltd', phone: '+91 98334 33441', status: 'On Duty', rating: 4.7, assignedBlock: 'Main Gate & Basements', workCount: 94 },
  { id: 'STF-04', name: 'Sunita Devi', role: 'Housekeeping Lead', agency: 'CleanPro Facility Management', phone: '+91 98334 44552', status: 'On Duty', rating: 4.6, assignedBlock: 'Tower A & B Common', workCount: 210 },
  { id: 'STF-05', name: 'Mahesh Sawant', role: 'Lift Technician', agency: 'Otis Elevator Co India', phone: '+91 98334 55663', status: 'On Duty', rating: 4.9, assignedBlock: 'Tower B & C Elevators', workCount: 65 },
  { id: 'STF-06', name: 'Ganesh Shinde', role: 'Gardener', agency: 'Green Meadows Care', phone: '+91 98334 66774', status: 'Off Duty', rating: 4.5, assignedBlock: 'Lawn & Podium Gardens', workCount: 78 }
];

export const mockDocuments: SocietyDocument[] = [
  { id: 'DOC-01', title: 'Emerald Heights Society Registered Bye-Laws (Model 2014 Format)', category: 'Society Bye-Laws', fileType: 'PDF', size: '4.8 MB', uploadedDate: '15-Jan-2019', uploadedBy: 'Secretary', accessLevel: 'All Residents' },
  { id: 'DOC-02', title: 'Fire NOC Certificate 2024-2025 Renewal from NMMC Fire Dept', category: 'AMC Contracts', fileType: 'PDF', size: '2.1 MB', uploadedDate: '10-Jul-2024', uploadedBy: 'Admin Desk', accessLevel: 'All Residents' },
  { id: 'DOC-03', title: 'Statutory Annual Audit Report FY 2023-2024 by CA S. Mehta & Co.', category: 'Audit Reports', fileType: 'PDF', size: '8.4 MB', uploadedDate: '28-Aug-2024', uploadedBy: 'Treasurer', accessLevel: 'All Residents' },
  { id: 'DOC-04', title: 'Special AGM Minutes of Meeting dated 15-Sep-2024', category: 'AGM Minutes', fileType: 'PDF', size: '1.6 MB', uploadedDate: '20-Sep-2024', uploadedBy: 'Secretary', accessLevel: 'All Residents' },
  { id: 'DOC-05', title: 'Otis Elevators Master Comprehensive AMC Contract 2024-2027', category: 'AMC Contracts', fileType: 'PDF', size: '3.2 MB', uploadedDate: '01-Apr-2024', uploadedBy: 'Treasurer', accessLevel: 'Committee Members Only' },
  { id: 'DOC-06', title: 'Solar Rooftop 120kWp Grid-Tie Subsidy & Approval Sanction Letter', category: 'Ownership Records', fileType: 'PDF', size: '1.9 MB', uploadedDate: '12-Feb-2023', uploadedBy: 'Chairman', accessLevel: 'Committee Members Only' }
];

export const mockMeetings: CommitteeMeeting[] = [
  {
    id: 'MTG-01',
    title: 'Managing Committee Monthly Review (November 2024)',
    type: 'Managing Committee Monthly',
    date: '2024-11-17',
    time: '10:30 AM - 12:30 PM',
    venue: 'Society Conference Room & Video Link',
    agenda: [
      'Basement seepage remedial structural waterproofing quotations review',
      'EV charging bay tariff structure and sub-metering policy',
      'Review of pending maintenance dues exceeding 3 months',
      'Festival accounts closure: Diwali & Ganesh Utsav final balance transfer'
    ],
    quorumRequired: 7,
    confirmedAttendees: 9,
    status: 'Scheduled',
    activePoll: {
      question: 'Should the society install RFID boom barriers with automatic ANPR number plate scanning?',
      options: [
        { text: 'Yes, proceed with ANPR system (Est. cost ₹1.8L)', votes: 42 },
        { text: 'Keep existing RFID stickers only', votes: 18 },
        { text: 'Review alternative vendor quotes first', votes: 12 }
      ],
      totalVotes: 72
    }
  },
  {
    id: 'MTG-02',
    title: 'Special General Body Meeting - Solar Phase II Expansion',
    type: 'Annual General Meeting (AGM)',
    date: '2024-10-13',
    time: '05:00 PM - 07:30 PM',
    venue: 'Clubhouse Banquet Hall',
    agenda: [
      'Presentation of Phase 2 Solar PV proposal for Tower C and D rooftops',
      'Sanction of ₹14.5 Lakhs capital expense from Sinking Fund',
      'Approval of vendor selection tender criteria'
    ],
    quorumRequired: 50,
    confirmedAttendees: 74,
    status: 'Minutes Published'
  }
];

export const mockVisitors: VisitorRecord[] = [
  { id: 'VIS-901', visitorName: 'Sunil Ghadge', phone: '+91 98210 55441', apartmentToVisit: 'A-101', visitorType: 'Guest', vehicleNumber: 'MH-04-ER-9912', checkInTime: '2024-11-05 11:20 AM', residentApprovalStatus: 'Approved', securityGuardName: 'Bhopal Singh' },
  { id: 'VIS-902', visitorName: 'Deepak (Blinkit Delivery)', phone: '+91 98211 44332', apartmentToVisit: 'B-402', visitorType: 'Delivery', vehicleNumber: 'MH-43-AK-1029', checkInTime: '2024-11-05 11:42 AM', checkOutTime: '2024-11-05 11:54 AM', residentApprovalStatus: 'Pre-approved', securityGuardName: 'Ram Avatar' },
  { id: 'VIS-903', visitorName: 'Mahesh Sawant (Otis)', phone: '+91 98334 55663', apartmentToVisit: 'Tower B Lift', visitorType: 'Vendor Staff', vehicleNumber: 'MH-43-BV-4411', checkInTime: '2024-11-05 09:15 AM', residentApprovalStatus: 'Approved', securityGuardName: 'Bhopal Singh' },
  { id: 'VIS-904', visitorName: 'Akash (Uber Cab)', phone: '+91 98212 99001', apartmentToVisit: 'C-501', visitorType: 'Cab / Driver', vehicleNumber: 'MH-03-CB-7811', checkInTime: '2024-11-05 11:58 AM', residentApprovalStatus: 'Approved', securityGuardName: 'Ram Avatar' },
  { id: 'VIS-905', visitorName: 'Rohan Deshmukh', phone: '+91 98213 11223', apartmentToVisit: 'A-202', visitorType: 'Guest', vehicleNumber: 'MH-43-Q-1144', checkInTime: '2024-11-05 12:05 PM', residentApprovalStatus: 'Waiting', securityGuardName: 'Bhopal Singh' },
  { id: 'VIS-906', visitorName: 'Kunal (Amazon Courier)', phone: '+91 98214 77889', apartmentToVisit: 'D-704', visitorType: 'Delivery', vehicleNumber: 'MH-43-W-9900', checkInTime: '2024-11-05 10:10 AM', checkOutTime: '2024-11-05 10:28 AM', residentApprovalStatus: 'Pre-approved', securityGuardName: 'Ram Avatar' }
];

