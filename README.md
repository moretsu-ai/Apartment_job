# APARTMENT JOB — Residential Society Management Platform
### UI/UX Development with Dastone React Admin Template

**Apartment Job** is a modern, responsive, and comprehensive residential society management SaaS platform.

> **Tagline:** *Smarter Living. Better Management. Transparent Communities.*

---

## 🎨 Brand Identity & Theme Palette

The platform UI is designed on the foundation of the **Dastone React Admin Dashboard** template, customized with the official **Apartment Job** branding:

| Color Role | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Primary Dark Teal** | `#173F4A` | Main navigation, active indicators, brand identity |
| **Secondary Blue-Gray** | `#578391` | Secondary accents, borders, and sub-elements |
| **Accent Golden Yellow** | `#F2CF72` | Highlights, badges, status callouts |
| **Main Background** | `#F7F9FB` | Soft application canvas |
| **Card Background** | `#FFFFFF` | Card containers with subtle 1px border (`#E2E8F0`) |
| **Primary Text** | `#172B35` | High-contrast readable headings & values |
| **Secondary Text** | `#64748B` | Subtitles, labels, timestamps |
| **Success / Positive** | `#16A34A` | Occupancy, cleared dues, active status |
| **Warning / Notice** | `#EA8A24` | Pending actions, expiring leases |
| **Danger / Critical** | `#DC2626` | P1 Critical alerts, overdue payments, outages |

---

## 🚀 Technology Stack

- **Framework:** React 18 (`react`, `react-dom`)
- **Language:** TypeScript (`strict: true`)
- **Routing:** React Router DOM v6 (`react-router-dom`)
- **Styling:** Bootstrap 5.3 + Sass/SCSS (`sass`, custom Dastone theme tokens)
- **Charts:** ApexCharts & `react-apexcharts` (Spline Area, Donut, Column charts)
- **Iconography:** `lucide-react`
- **Build Tool:** Vite 5 (Optimized manual chunks for fast builds)

---

## 📂 Project Architecture

```
apartment-job/
├── public/
│   └── logo.png                  # Official Apartment Job logo
├── UI/                           # Reference screenshots of Dastone & Dashbyte
├── src/
│   ├── assets/
│   │   └── logo/logo.png         # Official logo asset
│   ├── components/
│   │   ├── charts/               # ApexChart wrapper
│   │   ├── common/               # StatCard, Modal, PriorityBadge, StatusBadge
│   │   └── layout/               # Header, Sidebar, PageHeader
│   ├── data/
│   │   └── mock/                 # Structured mock data layer (Towers, Flats, Dues, Complaints)
│   ├── layouts/
│   │   ├── AuthLayout.tsx        # Authentication shell
│   │   └── MainLayout.tsx        # Responsive administrative layout (Sidebar + Header + Shell)
│   ├── pages/
│   │   ├── Apartments/           # Flat directory, occupancy, parking allocations
│   │   ├── Auth/                 # Login & authentication screen
│   │   ├── Bookings/             # Banquet hall, terrace, garden reservation desk
│   │   ├── Complaints/           # P1-P4 priority triage, worker assignment, timeline
│   │   ├── Dashboard/            # 8 KPI cards, monthly collection, priority donut, activity feed
│   │   ├── Documents/            # Registered bye-laws, audit reports, AGM minutes
│   │   ├── Events/               # Diwali, Ganesh Utsav, Holi festival budgeting & collections
│   │   ├── Expenses/             # Payment vouchers, GST invoice attachments, approval workflow
│   │   ├── Finance/              # Cash flow, operating expenses, balance sheet overview
│   │   ├── Inventory/            # Tents, chairs, PA sound equipment, issue/return tracker
│   │   ├── Maintenance/          # Preventive AMC tasks, elevator/DG schedules, completion signoffs
│   │   ├── Meetings/             # Committee meetings, quorum calculator, digital flat voting
│   │   ├── Notifications/        # Water outage notices, power cuts, SMS/broadcast circulars
│   │   ├── Payments/             # Apartment-wise fee ledger, transaction IDs, printable receipt
│   │   ├── Reconciliation/       # Bank statement auto-matching, mismatch & duplicate alerts
│   │   ├── Reports/              # Governance reports, occupancy audits, Excel/PDF export
│   │   ├── Residents/            # Verified member directory, emergency blood groups, RFID passes
│   │   ├── RentalAgreements/     # Tenancy leases, police KYC checks, expiry indicators
│   │   ├── Settings/             # RBAC roles, billing cycles, late fees, dual-signatory rules
│   │   ├── Society/              # Master profile, Tower A-D architecture, amenities
│   │   ├── Vendors/              # On-duty plumbers, electricians, security guards, ratings
│   │   └── Visitors/             # Gate logging, delivery check-ins, cab tracking, checkout
│   ├── styles/                   # SCSS system (_variables, _sidebar, _header, _layout, _animations)
│   ├── types/                    # TypeScript interfaces for all residential society entities
│   ├── App.tsx                   # Central router & 22 application routes
│   ├── main.tsx                  # Application entry point
│   └── vite-env.d.ts             # Vite & asset type declarations
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 📋 Comprehensive Page Breakdown

| # | Page Name | Route | Key Features |
| :- | :--- | :--- | :--- |
| **1** | **Login** | `/login` | Apartment Job logo, tagline, credential inputs, password toggle, remember me, SSL security badge |
| **2** | **Main Dashboard** | `/dashboard` | 8 stat cards, monthly collection spline chart, income vs expenses bar chart, complaint donut, live activity stream, upcoming events, maintenance schedule |
| **3** | **Society Management** | `/society` | Registered society banner, Tower A-D directory, floor breakdowns, occupancy progress, Add Block & Edit Profile modals |
| **4** | **Apartments** | `/apartments` | Flat roster (A-101 to D-704), carpet area, parking slot allocations, owner vs tenant filtering, inspect modal |
| **5** | **Residents & Tenants** | `/residents` | Member avatars, flat numbers, contact info, emergency blood groups, active vehicles, Add Resident modal |
| **6** | **Rental Agreements** | `/agreements` | Lease terms, police verification status, 30-day expiry warning badges, upload agreement modal |
| **7** | **Complaints** | `/complaints` | P1 (Critical - 4h SLA), P2 (High), P3 (Medium), P4 (Low), worker reassignment, step-by-step history timeline, new ticket modal |
| **8** | **Maintenance** | `/maintenance` | Preventive AMC tasks (Lifts, DG, Solar, Water tanks), contractors, cost tracking, completion signoff |
| **9** | **Financial Dashboard** | `/finance` | Income YTD, operating expenses, bank reserves, collection curve, expense category breakdown |
| **10** | **Maintenance Fees** | `/payments` | Flat dues, paid dates, transaction IDs, payment gateway modes, digital printable receipt preview |
| **11** | **Expense Management** | `/expenses` | Payment vouchers (PV), vendor GST bills, dual-signatory approvals, voucher inspector modal |
| **12** | **Bank Reconciliation** | `/reconciliation` | HDFC/ICICI statement matching, unmatched credit identification, amount mismatch alerts, duplicate entry checks |
| **13** | **Festivals & Events** | `/events` | Ganesh Chaturthi, Diwali Deepotsav, Holi, budget vs contribution progress bars, event dossier modal |
| **14** | **Venue Booking** | `/bookings` | Banquet hall, garden, rooftop lounge, multipurpose room, calendar slots, resident booking approval workflow |
| **15** | **Inventory Management** | `/inventory` | Shamiana marquee tents, chairs, sound systems, lights, available vs reserved counts, issue/return modal |
| **16** | **Broadcasts & Circulars** | `/notifications` | Urgent water shutdown bulletins, power maintenance, target audience filtering, compose broadcast modal |
| **17** | **Staff & Vendors** | `/vendors` | Plumbers, electricians, housekeeping, security supervisors, phone numbers, shift status, resident ratings |
| **18** | **Document Vault** | `/documents` | Registered bye-laws, ownership deeds, Fire NOC, CA audit reports, AGM minutes, document upload modal |
| **19** | **Meetings & Committee** | `/meetings` | Managing committee roster, AGM schedules, quorums, agendas, active electronic flat voting poll |
| **20** | **Visitor Management** | `/visitors` | Gate check-in/out, personal guests, delivery riders (Blinkit/Amazon), cabs, resident intercom clearance |
| **21** | **Reports & Analytics** | `/reports` | Multi-category KPI charts, downloadable audit workbooks (Collection, Defaulters, SLA, Maintenance) |
| **22** | **Settings & Roles** | `/settings` | Society settings, RBAC role matrix, billing cycle rules, late fee interest, dual-signatory thresholds |

---

## 🛠️ How to Run the Application

### 1. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 2. Production Build
```bash
npm run build
```
Creates an optimized, tree-shaken production bundle in `dist/`.

### 3. Production Preview
```bash
npm run preview
```
Serves the production build locally to test speed and responsiveness.

