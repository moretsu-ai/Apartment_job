import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, hasRouteAccess } from '@/config/permissions';

export type { UserRole };

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  roleTitle: string;
  apartmentNumber: string;
  block: string;
  initials: string;
  badgeColor: string;
  designation: 'Admin' | 'Tenant' | 'Owner';
  bio?: string;
  tenancyDetails?: {
    ownerName: string;
    monthlyRent: number;
    securityDeposit: number;
    leaseExpiry: string;
    policeVerification: string;
  };
  ownershipDetails?: {
    carpetArea: number;
    parkingSlot: string;
    purchaseYear: number;
    shareCertificateNo: string;
  };
}

export interface DemoAccount {
  profile: UserProfile;
  credentials: {
    email: string;
    password: string;
    label: string;
    description: string;
  };
}

/**
 * EXACT DEMONSTRATION ACCOUNTS
 * Note: These credentials are strictly for frontend demonstration.
 * In production, real authentication and authorization must be verified by the backend API.
 */
export const DEMO_ACCOUNTS: Record<UserRole, DemoAccount> = {
  admin: {
    profile: {
      id: 'USR-ADMIN-01',
      name: 'Rajesh Sharma',
      email: 'admin@apartmentjob.demo',
      phone: '+91 98201 12345',
      role: 'admin',
      roleTitle: 'Society Admin (Hon. Secretary)',
      apartmentNumber: 'A-101',
      block: 'Tower A - Coral',
      initials: 'RS',
      badgeColor: 'bg-teal-primary text-white',
      designation: 'Admin',
      bio: 'Hon. Secretary of Emerald Heights CHS. Authorized signatory for society operations.',
    },
    credentials: {
      email: 'admin@apartmentjob.demo',
      password: 'Admin@123',
      label: 'Admin',
      description: 'Full administrative access to finances, complaints, society records, staff & settings',
    },
  },
  tenant: {
    profile: {
      id: 'USR-TENANT-02',
      name: 'Aditya Roy',
      email: 'tenant@apartmentjob.demo',
      phone: '+91 98199 44321',
      role: 'tenant',
      roleTitle: 'Verified Tenant (Lessee)',
      apartmentNumber: 'A-102',
      block: 'Tower A - Coral',
      initials: 'AR',
      badgeColor: 'bg-warning text-dark',
      designation: 'Tenant',
      bio: 'Software engineer living in Flat A-102 on registered lease agreement.',
      tenancyDetails: {
        ownerName: 'Sunita Menon',
        monthlyRent: 42000,
        securityDeposit: 200000,
        leaseExpiry: '2025-10-31',
        policeVerification: 'Completed & Stamped by NMMC Police',
      },
    },
    credentials: {
      email: 'tenant@apartmentjob.demo',
      password: 'Tenant@123',
      label: 'Tenant',
      description: 'Personal lease agreement, maintenance dues, complaint tickets & visitor passes',
    },
  },
  resident: {
    profile: {
      id: 'USR-RESIDENT-03',
      name: 'Dr. Amitav Ghosh',
      email: 'resident@apartmentjob.demo',
      phone: '+91 98202 88990',
      role: 'resident',
      roleTitle: 'Resident Flat Owner',
      apartmentNumber: 'A-201',
      block: 'Tower A - Coral',
      initials: 'AG',
      badgeColor: 'bg-success text-white',
      designation: 'Owner',
      bio: 'Cardiologist and permanent resident flat owner. Member of Health Committee.',
      ownershipDetails: {
        carpetArea: 1650,
        parkingSlot: 'P-A24',
        purchaseYear: 2018,
        shareCertificateNo: 'SH-EH-2018-042',
      },
    },
    credentials: {
      email: 'resident@apartmentjob.demo',
      password: 'Resident@123',
      label: 'Resident',
      description: 'Property ownership documents, maintenance bills, AGM voting & facility booking',
    },
  },
};

export interface AuthResult {
  success: boolean;
  error?: string;
}

interface AuthContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  loginAsDemo: (role: UserRole, rememberMe?: boolean) => void;
  loginWithCredentials: (email: string, pass: string, rememberMe?: boolean) => AuthResult;
  logout: () => void;
  canAccess: (path: string) => boolean;
  demoAccounts: Record<UserRole, DemoAccount>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'apartment_job_auth_user';
const SESSION_STORAGE_KEY = 'apartment_job_session_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      // Check query param if present for instant demo navigation / automation
      if (typeof window !== 'undefined' && window.location.search) {
        const params = new URLSearchParams(window.location.search);
        const roleParam = params.get('demoRole') as UserRole | null;
        if (roleParam && (roleParam === 'admin' || roleParam === 'tenant' || roleParam === 'resident')) {
          sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(DEMO_ACCOUNTS[roleParam].profile));
          return DEMO_ACCOUNTS[roleParam].profile;
        }
      }

      // Check session storage first, then local storage
      const sessionUser = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (sessionUser) return JSON.parse(sessionUser);

      const localUser = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (localUser) return JSON.parse(localUser);
    } catch {
      // Fallback
    }
    // Default to admin for initial seamless developer preview, but track auth state explicitly
    return DEMO_ACCOUNTS.admin.profile;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return currentUser !== null;
  });

  const clearStoredSessions = () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const persistUser = (user: UserProfile, rememberMe: boolean = true) => {
    clearStoredSessions();
    try {
      if (rememberMe) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
      } else {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
      }
    } catch {
      // ignore
    }
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const loginAsDemo = (role: UserRole, rememberMe: boolean = true) => {
    const demo = DEMO_ACCOUNTS[role];
    if (demo) {
      persistUser(demo.profile, rememberMe);
    }
  };

  const loginWithCredentials = (email: string, pass: string, rememberMe: boolean = true): AuthResult => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      return { success: false, error: 'Email or mobile number is required.' };
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return {
        success: false,
        error: 'Please enter a valid email address (e.g., admin@apartmentjob.demo)',
      };
    }

    if (!pass) {
      return { success: false, error: 'Password is required.' };
    }

    const normalized = trimmedEmail.toLowerCase();
    const foundRole = (Object.keys(DEMO_ACCOUNTS) as UserRole[]).find((r) => {
      const acct = DEMO_ACCOUNTS[r];
      return (
        acct.credentials.email.toLowerCase() === normalized &&
        acct.credentials.password === pass
      );
    });

    if (foundRole) {
      persistUser(DEMO_ACCOUNTS[foundRole].profile, rememberMe);
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid credentials. Please enter a valid demo email & password or click one of the quick Demo Login buttons.',
    };
  };

  const logout = () => {
    clearStoredSessions();
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const canAccess = (path: string): boolean => {
    if (!currentUser) return false;
    return hasRouteAccess(currentUser.role, path);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        loginAsDemo,
        loginWithCredentials,
        logout,
        canAccess,
        demoAccounts: DEMO_ACCOUNTS,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
