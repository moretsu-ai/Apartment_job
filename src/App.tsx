import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { MainLayout } from '@/layouts/MainLayout';
import { AuthLayout } from '@/layouts/AuthLayout';

// Pages
import { Login } from '@/pages/Auth/Login';
import { Unauthorized } from '@/pages/Auth/Unauthorized';
import { Dashboard } from '@/pages/Dashboard/Dashboard';
import { AdminDashboard } from '@/pages/Dashboard/AdminDashboard';
import { TenantDashboard } from '@/pages/Dashboard/TenantDashboard';
import { ResidentDashboard } from '@/pages/Dashboard/ResidentDashboard';
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
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Auth Route */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Main Application Shell (Protected by RBAC) */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Dashboard routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute path="/dashboard">
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/admin"
              element={
                <ProtectedRoute path="/dashboard/admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/tenant"
              element={
                <ProtectedRoute path="/dashboard/tenant">
                  <TenantDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/resident"
              element={
                <ProtectedRoute path="/dashboard/resident">
                  <ResidentDashboard />
                </ProtectedRoute>
              }
            />

            {/* Unauthorized 403 Page */}
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Society Management (Admin Only) */}
            <Route
              path="/society"
              element={
                <ProtectedRoute path="/society">
                  <SocietyManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blocks"
              element={
                <ProtectedRoute path="/blocks">
                  <SocietyManagement />
                </ProtectedRoute>
              }
            />

            {/* Apartments (Admin, Tenant, Resident) */}
            <Route
              path="/apartments"
              element={
                <ProtectedRoute path="/apartments">
                  <ApartmentManagement />
                </ProtectedRoute>
              }
            />

            {/* Residents (Admin Only) */}
            <Route
              path="/residents"
              element={
                <ProtectedRoute path="/residents">
                  <ResidentsManagement />
                </ProtectedRoute>
              }
            />

            {/* Rental Agreements (Admin, Tenant) */}
            <Route
              path="/agreements"
              element={
                <ProtectedRoute path="/agreements">
                  <RentalAgreements />
                </ProtectedRoute>
              }
            />

            {/* Complaints (Admin, Tenant, Resident) */}
            <Route
              path="/complaints"
              element={
                <ProtectedRoute path="/complaints">
                  <ComplaintManagement />
                </ProtectedRoute>
              }
            />

            {/* Maintenance AMC (Admin Only) */}
            <Route
              path="/maintenance"
              element={
                <ProtectedRoute path="/maintenance">
                  <MaintenanceManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/utilities"
              element={
                <ProtectedRoute path="/utilities">
                  <MaintenanceManagement />
                </ProtectedRoute>
              }
            />

            {/* Staff & Vendors (Admin Only) */}
            <Route
              path="/vendors"
              element={
                <ProtectedRoute path="/vendors">
                  <VendorManagement />
                </ProtectedRoute>
              }
            />

            {/* Visitor Management (Admin Only) */}
            <Route
              path="/visitors"
              element={
                <ProtectedRoute path="/visitors">
                  <VisitorManagement />
                </ProtectedRoute>
              }
            />

            {/* Financial Management */}
            <Route
              path="/payments"
              element={
                <ProtectedRoute path="/payments">
                  <MaintenancePayments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/expenses"
              element={
                <ProtectedRoute path="/expenses">
                  <ExpenseManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reconciliation"
              element={
                <ProtectedRoute path="/reconciliation">
                  <BankReconciliation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/finance"
              element={
                <ProtectedRoute path="/finance">
                  <FinancialDashboard />
                </ProtectedRoute>
              }
            />

            {/* Community Management */}
            <Route
              path="/events"
              element={
                <ProtectedRoute path="/events">
                  <EventManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookings"
              element={
                <ProtectedRoute path="/bookings">
                  <VenueBookingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/inventory"
              element={
                <ProtectedRoute path="/inventory">
                  <InventoryManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute path="/notifications">
                  <NotificationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/announcements"
              element={
                <ProtectedRoute path="/announcements">
                  <NotificationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/meetings"
              element={
                <ProtectedRoute path="/meetings">
                  <MeetingsManagement />
                </ProtectedRoute>
              }
            />

            {/* Documents Repository (Admin, Resident) */}
            <Route
              path="/documents"
              element={
                <ProtectedRoute path="/documents">
                  <DocumentManagement />
                </ProtectedRoute>
              }
            />

            {/* Reports & Audits (Admin Only) */}
            <Route
              path="/reports"
              element={
                <ProtectedRoute path="/reports">
                  <ReportsAnalytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/audit-logs"
              element={
                <ProtectedRoute path="/audit-logs">
                  <ReportsAnalytics />
                </ProtectedRoute>
              }
            />

            {/* Settings & System (Admin Only) */}
            <Route
              path="/settings"
              element={
                <ProtectedRoute path="/settings">
                  <SettingsManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute path="/users">
                  <SettingsManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/roles"
              element={
                <ProtectedRoute path="/roles">
                  <SettingsManagement />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
