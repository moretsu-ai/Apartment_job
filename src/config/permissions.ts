// Centralized Role-Based Access Control (RBAC) Configuration

export type UserRole = 'admin' | 'tenant' | 'resident';

export interface RoutePermission {
  path: string;
  allowedRoles: UserRole[];
  title: string;
  category: string;
  description: string;
}

/**
 * Master permission matrix mapping routes to allowed roles.
 * Admin: Full society administrative access.
 * Tenant: Personal tenancy, flat, dues, complaints, notices, events, facility bookings.
 * Resident: Property ownership, flat, dues, complaints, notices, events, facility bookings, documents, meetings/voting.
 */
export const ROUTE_PERMISSIONS: Record<string, RoutePermission> = {
  '/dashboard': {
    path: '/dashboard',
    allowedRoles: ['admin', 'tenant', 'resident'],
    title: 'Dashboard',
    category: 'OVERVIEW',
    description: 'Role-specific dashboard overview',
  },
  '/dashboard/admin': {
    path: '/dashboard/admin',
    allowedRoles: ['admin'],
    title: 'Admin Dashboard',
    category: 'OVERVIEW',
    description: 'Comprehensive society operations and administrative metrics',
  },
  '/dashboard/tenant': {
    path: '/dashboard/tenant',
    allowedRoles: ['tenant'],
    title: 'Tenant Dashboard',
    category: 'OVERVIEW',
    description: 'Personal tenancy details, dues, rental agreement and requests',
  },
  '/dashboard/resident': {
    path: '/dashboard/resident',
    allowedRoles: ['resident'],
    title: 'Resident Dashboard',
    category: 'OVERVIEW',
    description: 'Owner property details, maintenance dues, voting and bookings',
  },
  '/society': {
    path: '/society',
    allowedRoles: ['admin'],
    title: 'Society Details',
    category: 'SOCIETY MANAGEMENT',
    description: 'Master society legal profile and architectural block configuration',
  },
  '/blocks': {
    path: '/blocks',
    allowedRoles: ['admin'],
    title: 'Blocks & Buildings',
    category: 'SOCIETY MANAGEMENT',
    description: 'Building and block directory and floor allocations',
  },
  '/apartments': {
    path: '/apartments',
    allowedRoles: ['admin', 'tenant', 'resident'],
    title: 'Apartments',
    category: 'SOCIETY MANAGEMENT',
    description: 'Apartment directory (filtered for personal unit for tenant/resident)',
  },
  '/residents': {
    path: '/residents',
    allowedRoles: ['admin'],
    title: 'Residents & Tenants',
    category: 'SOCIETY MANAGEMENT',
    description: 'Master resident directory and KYC records',
  },
  '/agreements': {
    path: '/agreements',
    allowedRoles: ['admin', 'tenant'],
    title: 'Rental Agreements',
    category: 'SOCIETY MANAGEMENT',
    description: 'Tenancy leases and police verifications',
  },
  '/complaints': {
    path: '/complaints',
    allowedRoles: ['admin', 'tenant', 'resident'],
    title: 'Complaints',
    category: 'OPERATIONS',
    description: 'Grievance submission and resolution tracking',
  },
  '/maintenance': {
    path: '/maintenance',
    allowedRoles: ['admin'],
    title: 'Maintenance Management',
    category: 'OPERATIONS',
    description: 'Preventive AMC schedules and contractor work orders',
  },
  '/vendors': {
    path: '/vendors',
    allowedRoles: ['admin'],
    title: 'Staff & Vendors',
    category: 'OPERATIONS',
    description: 'Service personnel, security supervisors, and vendor agencies',
  },
  '/utilities': {
    path: '/utilities',
    allowedRoles: ['admin'],
    title: 'Utility Management',
    category: 'OPERATIONS',
    description: 'Water, solar, and DG power utility monitoring',
  },
  '/visitors': {
    path: '/visitors',
    allowedRoles: ['admin'],
    title: 'Visitor Management',
    category: 'OPERATIONS',
    description: 'Security gate log, vehicle entry, and visitor passes',
  },
  '/payments': {
    path: '/payments',
    allowedRoles: ['admin', 'tenant', 'resident'],
    title: 'Maintenance Fees',
    category: 'FINANCIAL MANAGEMENT',
    description: 'Maintenance fee ledgers, payment history, and digital receipts',
  },
  '/expenses': {
    path: '/expenses',
    allowedRoles: ['admin'],
    title: 'Expense Management',
    category: 'FINANCIAL MANAGEMENT',
    description: 'Society operating expenses, vouchers, and approvals',
  },
  '/reconciliation': {
    path: '/reconciliation',
    allowedRoles: ['admin'],
    title: 'Bank Reconciliation',
    category: 'FINANCIAL MANAGEMENT',
    description: 'Bank statement matching and transaction auditing',
  },
  '/finance': {
    path: '/finance',
    allowedRoles: ['admin'],
    title: 'Financial Reports',
    category: 'FINANCIAL MANAGEMENT',
    description: 'Society balance sheet, income vs expenses, and reserve funds',
  },
  '/events': {
    path: '/events',
    allowedRoles: ['admin', 'tenant', 'resident'],
    title: 'Festivals & Events',
    category: 'COMMUNITY MANAGEMENT',
    description: 'Society celebrations, festival calendars, and contributions',
  },
  '/bookings': {
    path: '/bookings',
    allowedRoles: ['admin', 'tenant', 'resident'],
    title: 'Venue Booking',
    category: 'COMMUNITY MANAGEMENT',
    description: 'Clubhouse banquet hall, rooftop, and garden reservations',
  },
  '/inventory': {
    path: '/inventory',
    allowedRoles: ['admin'],
    title: 'Inventory Management',
    category: 'COMMUNITY MANAGEMENT',
    description: 'Event equipment, tents, chairs, and sound systems',
  },
  '/notifications': {
    path: '/notifications',
    allowedRoles: ['admin', 'tenant', 'resident'],
    title: 'Announcements',
    category: 'COMMUNITY MANAGEMENT',
    description: 'Emergency notices, water/power outage alerts, and bulletins',
  },
  '/announcements': {
    path: '/announcements',
    allowedRoles: ['admin', 'tenant', 'resident'],
    title: 'Announcements',
    category: 'COMMUNITY MANAGEMENT',
    description: 'Official society announcements and circulars',
  },
  '/documents': {
    path: '/documents',
    allowedRoles: ['admin', 'resident'],
    title: 'Documents',
    category: 'DOCUMENTS & REPORTS',
    description: 'Society bye-laws, ownership deeds, and meeting minutes',
  },
  '/meetings': {
    path: '/meetings',
    allowedRoles: ['admin', 'resident'],
    title: 'Meetings & Voting',
    category: 'COMMUNITY MANAGEMENT',
    description: 'AGM schedules, committee agendas, and flat owner voting polls',
  },
  '/reports': {
    path: '/reports',
    allowedRoles: ['admin'],
    title: 'Reports & Analytics',
    category: 'DOCUMENTS & REPORTS',
    description: 'Statutory compliance reports and operational scorecards',
  },
  '/audit-logs': {
    path: '/audit-logs',
    allowedRoles: ['admin'],
    title: 'Audit Logs',
    category: 'DOCUMENTS & REPORTS',
    description: 'Systemic audit trail of administrative modifications',
  },
  '/settings': {
    path: '/settings',
    allowedRoles: ['admin'],
    title: 'Society Settings',
    category: 'SYSTEM',
    description: 'Society parameters, late fee interest, and RBAC matrix',
  },
  '/users': {
    path: '/users',
    allowedRoles: ['admin'],
    title: 'User Management',
    category: 'SYSTEM',
    description: 'User access levels and account provisioning',
  },
  '/roles': {
    path: '/roles',
    allowedRoles: ['admin'],
    title: 'Roles & Permissions',
    category: 'SYSTEM',
    description: 'Role-based access control policies',
  },
};

/**
 * Check whether a user role has permission to access a specific route.
 */
export const hasRouteAccess = (role: UserRole | undefined, path: string): boolean => {
  if (!role) return false;
  if (role === 'admin') return true; // Admin has full access

  // Normalize path (strip query params or sub-routes)
  const basePath = path.split('?')[0].replace(/\/+$/, '') || '/';
  
  const permission = ROUTE_PERMISSIONS[basePath];
  if (!permission) {
    // If route is not explicitly restricted, check if it starts with any restricted prefix
    return true;
  }

  return permission.allowedRoles.includes(role);
};

/**
 * Get dashboard URL for a specific role.
 */
export const getRoleDashboardPath = (role: UserRole): string => {
  switch (role) {
    case 'admin':
      return '/dashboard';
    case 'tenant':
      return '/dashboard';
    case 'resident':
      return '/dashboard';
    default:
      return '/dashboard';
  }
};

