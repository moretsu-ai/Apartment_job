import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { AuthLayout } from '@/layouts/AuthLayout';

// Pages
import { Login } from '@/pages/Auth/Login';
import { Dashboard } from '@/pages/Dashboard/Dashboard';
import { SocietyManagement } from '@/pages/Society/SocietyManagement';
import { ApartmentManagement } from '@/pages/Apartments/ApartmentManagement';
import { ResidentsManagement } from '@/pages/Residents/ResidentsManagement';
import { RentalAgreements } from '@/pages/RentalAgreements/RentalAgreements';
import { ComplaintManagement } from '@/pages/Complaints/ComplaintManagement';
import { MaintenanceManagement } from '@/pages/Maintenance/MaintenanceManagement';
import { FinancialDashboard } from '@/pages/Finance/FinancialDashboard';
import { MaintenancePayments } from '@/pages/Payments/MaintenancePayments';
import { ExpenseManagement } from '@/pages/Expenses/ExpenseManagement';
import { BankReconciliation } from '@/pages/Reconciliation/BankReconciliation';
import { EventManagement } from '@/pages/Events/EventManagement';
import { VenueBookingPage } from '@/pages/Bookings/VenueBooking';
import { InventoryManagement } from '@/pages/Inventory/InventoryManagement';
import { NotificationsPage } from '@/pages/Notifications/NotificationsPage';
import { VendorManagement } from '@/pages/Vendors/VendorManagement';
import { DocumentManagement } from '@/pages/Documents/DocumentManagement';
import { MeetingsManagement } from '@/pages/Meetings/MeetingsManagement';
import { VisitorManagement } from '@/pages/Visitors/VisitorManagement';
import { ReportsAnalytics } from '@/pages/Reports/ReportsAnalytics';
import { SettingsManagement } from '@/pages/Settings/SettingsManagement';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Route */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Protected Dashboard / Admin Shell Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/society" element={<SocietyManagement />} />
          <Route path="/blocks" element={<SocietyManagement />} />
          <Route path="/apartments" element={<ApartmentManagement />} />
          <Route path="/residents" element={<ResidentsManagement />} />
          <Route path="/agreements" element={<RentalAgreements />} />
          <Route path="/complaints" element={<ComplaintManagement />} />
          <Route path="/maintenance" element={<MaintenanceManagement />} />
          <Route path="/finance" element={<FinancialDashboard />} />
          <Route path="/payments" element={<MaintenancePayments />} />
          <Route path="/expenses" element={<ExpenseManagement />} />
          <Route path="/reconciliation" element={<BankReconciliation />} />
          <Route path="/events" element={<EventManagement />} />
          <Route path="/bookings" element={<VenueBookingPage />} />
          <Route path="/inventory" element={<InventoryManagement />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/announcements" element={<NotificationsPage />} />
          <Route path="/vendors" element={<VendorManagement />} />
          <Route path="/utilities" element={<MaintenanceManagement />} />
          <Route path="/documents" element={<DocumentManagement />} />
          <Route path="/meetings" element={<MeetingsManagement />} />
          <Route path="/visitors" element={<VisitorManagement />} />
          <Route path="/reports" element={<ReportsAnalytics />} />
          <Route path="/audit-logs" element={<ReportsAnalytics />} />
          <Route path="/settings" element={<SettingsManagement />} />
          <Route path="/users" element={<SettingsManagement />} />
          <Route path="/roles" element={<SettingsManagement />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

