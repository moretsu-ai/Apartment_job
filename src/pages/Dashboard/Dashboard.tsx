import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building,
  Home,
  Users,
  AlertCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Key,
  ShieldAlert,
  Calendar,
  ArrowUpRight,
  ChevronRight,
  CheckCircle2,
  Wrench,
  Megaphone
} from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { PriorityBadge, StatusBadge } from '@/components/common/Badge';
import { ApexChart } from '@/components/charts/ApexChart';
import {
  mockSocietyInfo,
  mockComplaints,
  mockEvents,
  mockNotifications,
  mockMaintenanceTasks,
  mockExpenses
} from '@/data/mock';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeRange, setActiveRange] = useState<'Day' | 'Week' | 'Month' | 'Year'>('Month');

  // Chart 1: Monthly Maintenance Collection (Spline Area)
  const collectionChartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'area',
      height: 310,
      toolbar: { show: false },
      sparkline: { enabled: false },
      zoom: { enabled: false },
    },
    colors: ['#173F4A', '#578391'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
      labels: { style: { colors: '#64748B', fontSize: '12px' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        formatter: (val) => `₹${(val / 1000).toFixed(0)}k`,
        style: { colors: '#64748B', fontSize: '12px' },
      },
    },
    grid: {
      borderColor: '#E2E8F0',
      strokeDashArray: 4,
    },
    tooltip: {
      y: { formatter: (val) => `₹${val.toLocaleString('en-IN')}` },
    },
    legend: { position: 'top', horizontalAlign: 'right' },
  };

  const collectionChartSeries = [
    { name: 'Collected Amount', data: [980000, 1020000, 995000, 1045000, 1080000, 1052000] },
    { name: 'Target Assessment', data: [1086000, 1086000, 1086000, 1086000, 1086000, 1086000] },
  ];

  // Chart 2: Income vs Expenses (Bar)
  const financeChartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      height: 310,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '45%',
        borderRadius: 4,
      },
    },
    dataLabels: { enabled: false },
    colors: ['#16A34A', '#DC2626'],
    xaxis: {
      categories: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
      labels: { style: { colors: '#64748B', fontSize: '12px' } },
    },
    yaxis: {
      labels: {
        formatter: (val) => `₹${(val / 1000).toFixed(0)}k`,
        style: { colors: '#64748B', fontSize: '12px' },
      },
    },
    grid: { borderColor: '#E2E8F0', strokeDashArray: 4 },
    legend: { position: 'top', horizontalAlign: 'right' },
  };

  const financeChartSeries = [
    { name: 'Total Revenue', data: [1020000, 995000, 1045000, 1080000, 1052000] },
    { name: 'Operating Expenses', data: [840000, 785000, 890000, 868000, 804000] },
  ];

  // Chart 3: Complaint Priority Breakdown (Donut)
  const complaintPriorityOptions: ApexCharts.ApexOptions = {
    chart: { type: 'donut', height: 260 },
    labels: ['P1 - Critical', 'P2 - High', 'P3 - Medium', 'P4 - Low'],
    colors: ['#DC2626', '#EA8A24', '#578391', '#94A3B8'],
    plotOptions: {
      pie: {
        donut: {
          size: '72%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Tickets',
              formatter: () => '14',
            },
          },
        },
      },
    },
    dataLabels: { enabled: false },
    legend: { position: 'bottom', horizontalAlign: 'center' },
  };

  const complaintPrioritySeries = [2, 3, 6, 3];

  return (
    <div className="dashboard-page">
      <PageHeader
        title="Administrative Overview"
        description={`Live Operations & Community Health Metrics for ${mockSocietyInfo.name}`}
        breadcrumbs={[{ label: 'Dashboard' }]}
        actions={
          <div className="d-flex align-items-center gap-2">
            <div className="btn-group btn-group-sm bg-white border rounded">
              {(['Day', 'Week', 'Month', 'Year'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  className={`btn btn-sm ${activeRange === r ? 'btn-primary-custom text-white' : 'btn-light text-muted'}`}
                  onClick={() => setActiveRange(r)}
                >
                  {r}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-sm btn-primary-custom d-flex align-items-center gap-1"
              onClick={() => navigate('/complaints')}
            >
              <span>+ Log Complaint</span>
            </button>
          </div>
        }
      />

      {/* 8 Statistics Cards Required */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard
            label="Total Apartments"
            value="224"
            icon={<Building size={22} />}
            iconVariant="primary"
            trend={{ text: '4 Towers (A, B, C, D)', type: 'neutral' }}
            onClick={() => navigate('/apartments')}
          />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard
            label="Occupied Apartments"
            value="198"
            icon={<Home size={22} />}
            iconVariant="success"
            trend={{ text: '88.4% Occupancy rate', type: 'positive' }}
            onClick={() => navigate('/apartments')}
          />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard
            label="Vacant Apartments"
            value="26"
            icon={<Key size={22} />}
            iconVariant="secondary"
            trend={{ text: '11.6% Available flats', type: 'neutral' }}
            onClick={() => navigate('/apartments')}
          />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard
            label="Registered Residents"
            value="642"
            icon={<Users size={22} />}
            iconVariant="accent"
            trend={{ text: '+12 onboarded this month', type: 'positive' }}
            onClick={() => navigate('/residents')}
          />
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard
            label="Rented Apartments"
            value="64"
            icon={<TrendingUp size={22} />}
            iconVariant="info"
            trend={{ text: '32.3% of occupied units', type: 'neutral' }}
            onClick={() => navigate('/agreements')}
          />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard
            label="Open Complaints"
            value="8"
            icon={<AlertCircle size={22} />}
            iconVariant="warning"
            trend={{ text: '6 In Progress • 2 Open', type: 'negative' }}
            onClick={() => navigate('/complaints')}
          />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard
            label="Critical Complaints (P1)"
            value="2"
            icon={<ShieldAlert size={22} />}
            iconVariant="danger"
            trend={{ text: 'SLA < 4 hrs remaining', type: 'negative' }}
            onClick={() => navigate('/complaints')}
          />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard
            label="Pending Payments"
            value="₹34,200"
            icon={<DollarSign size={22} />}
            iconVariant="warning"
            trend={{ text: '5 flats overdue', type: 'negative' }}
            onClick={() => navigate('/payments')}
          />
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="row g-3 mb-4">
        {/* Monthly Collection Spline Area Chart */}
        <div className="col-12 col-lg-8">
          <div className="card h-100">
            <div className="card-header">
              <div>
                <h6 className="card-title">Monthly Maintenance Collection</h6>
                <span className="card-subtitle">Real-time billed vs collected society dues</span>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-link text-teal-primary text-decoration-none fw-medium"
                onClick={() => navigate('/payments')}
              >
                View Ledger &rarr;
              </button>
            </div>
            <div className="card-body">
              <ApexChart
                options={collectionChartOptions}
                series={collectionChartSeries}
                type="area"
                height={300}
              />
            </div>
          </div>
        </div>

        {/* Complaint Priority Donut Chart */}
        <div className="col-12 col-lg-4">
          <div className="card h-100">
            <div className="card-header">
              <div>
                <h6 className="card-title">Complaint Priority Matrix</h6>
                <span className="card-subtitle">Severity triage and active tickets</span>
              </div>
              <span className="badge bg-danger rounded-pill">2 Critical</span>
            </div>
            <div className="card-body d-flex flex-column justify-content-center">
              <ApexChart
                options={complaintPriorityOptions}
                series={complaintPrioritySeries}
                type="donut"
                height={260}
              />
              <div className="text-center mt-2 small text-muted">
                Average resolution SLA: <strong className="text-dark">18.4 Hours</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Charts & Breakdown Row: Income vs Expenses & Recent Activities */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-lg-6">
          <div className="card h-100">
            <div className="card-header">
              <div>
                <h6 className="card-title">Income vs Operating Expenses</h6>
                <span className="card-subtitle">Monthly financial inflow vs outflow (FY 24-25)</span>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-link text-teal-primary text-decoration-none fw-medium"
                onClick={() => navigate('/finance')}
              >
                Full Balance Sheet &rarr;
              </button>
            </div>
            <div className="card-body">
              <ApexChart
                options={financeChartOptions}
                series={financeChartSeries}
                type="bar"
                height={280}
              />
            </div>
          </div>
        </div>

        {/* Pending Approvals & Quick Actions */}
        <div className="col-12 col-lg-6">
          <div className="card h-100">
            <div className="card-header">
              <div>
                <h6 className="card-title">Pending Administrative Approvals</h6>
                <span className="card-subtitle">Items requiring committee review or signature</span>
              </div>
              <span className="badge bg-warning rounded-pill">3 Action Items</span>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                <div className="list-group-item p-3 d-flex align-items-center justify-content-between">
                  <div>
                    <div className="fw-semibold font-size-13">Emergency Water Tanker Invoice (₹32,000)</div>
                    <div className="text-muted font-size-12">Sai Samarth Water Tankers • 8 Tankers delivered Nov 4</div>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-custom"
                    onClick={() => navigate('/expenses')}
                  >
                    Review & Approve
                  </button>
                </div>
                <div className="list-group-item p-3 d-flex align-items-center justify-content-between">
                  <div>
                    <div className="fw-semibold font-size-13">Tenant Verification Clearance (Pooja Iyer - D-202)</div>
                    <div className="text-muted font-size-12">Police acknowledgement certificate pending verification</div>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-custom"
                    onClick={() => navigate('/agreements')}
                  >
                    Verify KYC
                  </button>
                </div>
                <div className="list-group-item p-3 d-flex align-items-center justify-content-between">
                  <div>
                    <div className="fw-semibold font-size-13">Clubhouse Garden Venue Booking Request</div>
                    <div className="text-muted font-size-12">Harpreet Singh (B-402) • Satsang Gathering on Dec 01</div>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-custom"
                    onClick={() => navigate('/bookings')}
                  >
                    Approve Date
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Recent Activity Timeline, Upcoming Events & Maintenance Overview */}
      <div className="row g-3">
        {/* Recent Operational Activities */}
        <div className="col-12 col-lg-4">
          <div className="card h-100">
            <div className="card-header">
              <h6 className="card-title">Live Activity Stream</h6>
              <span className="badge bg-light text-muted font-size-11">Real-time</span>
            </div>
            <div className="card-body">
              <div className="timeline-feed">
                <div className="d-flex gap-3 mb-3 pb-2 border-bottom">
                  <div className="flex-shrink-0">
                    <span className="avatar-placeholder rounded-circle bg-danger text-white p-2 font-size-11">
                      P1
                    </span>
                  </div>
                  <div>
                    <div className="fw-semibold font-size-13">Elevator #2 Emergency Inspection</div>
                    <div className="text-muted font-size-12">Otis resident engineer arrived at motor room</div>
                    <div className="text-muted font-size-11 mt-1">Today 09:15 AM</div>
                  </div>
                </div>

                <div className="d-flex gap-3 mb-3 pb-2 border-bottom">
                  <div className="flex-shrink-0">
                    <span className="avatar-placeholder rounded-circle bg-success text-white p-2 font-size-11">
                      ₹
                    </span>
                  </div>
                  <div>
                    <div className="fw-semibold font-size-13">Maintenance Fee Settled: Apt D-704</div>
                    <div className="text-muted font-size-12">₹12,000 received via Credit Card gateway</div>
                    <div className="text-muted font-size-11 mt-1">Today 08:42 AM</div>
                  </div>
                </div>

                <div className="d-flex gap-3 mb-3 pb-2 border-bottom">
                  <div className="flex-shrink-0">
                    <span className="avatar-placeholder rounded-circle bg-info text-white p-2 font-size-11">
                      IN
                    </span>
                  </div>
                  <div>
                    <div className="fw-semibold font-size-13">Visitor Gate Entry Verified</div>
                    <div className="text-muted font-size-12">Blinkit delivery confirmed by B-402 via intercom</div>
                    <div className="text-muted font-size-11 mt-1">Today 08:30 AM</div>
                  </div>
                </div>

                <div className="d-flex gap-3">
                  <div className="flex-shrink-0">
                    <span className="avatar-placeholder rounded-circle bg-teal-primary text-white p-2 font-size-11">
                      MC
                    </span>
                  </div>
                  <div>
                    <div className="fw-semibold font-size-13">Water Pump Bypass Activated</div>
                    <div className="text-muted font-size-12">Plumber Santosh Kumar repaired pressure valve</div>
                    <div className="text-muted font-size-11 mt-1">Today 06:30 AM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Society Events */}
        <div className="col-12 col-lg-4">
          <div className="card h-100">
            <div className="card-header">
              <h6 className="card-title">Upcoming Society Events</h6>
              <button
                type="button"
                className="btn btn-sm btn-link text-teal-primary text-decoration-none p-0"
                onClick={() => navigate('/events')}
              >
                Calendar &rarr;
              </button>
            </div>
            <div className="card-body">
              {mockEvents.slice(2, 4).map((evt) => (
                <div key={evt.id} className="p-3 mb-3 rounded bg-light border">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <span className="badge bg-teal-primary text-white">{evt.type}</span>
                    <span className="text-muted font-size-11 fw-medium">{evt.startDate}</span>
                  </div>
                  <h6 className="fw-bold mb-1 font-size-13 text-dark">{evt.name}</h6>
                  <p className="text-muted font-size-12 mb-2">{evt.venue}</p>
                  <div className="d-flex justify-content-between small text-muted pt-2 border-top">
                    <span>Budget: ₹{(evt.budget / 1000).toFixed(0)}k</span>
                    <span className="text-teal-primary fw-medium">{evt.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Maintenance Overview */}
        <div className="col-12 col-lg-4">
          <div className="card h-100">
            <div className="card-header">
              <h6 className="card-title">Preventive Maintenance Schedule</h6>
              <button
                type="button"
                className="btn btn-sm btn-link text-teal-primary text-decoration-none p-0"
                onClick={() => navigate('/maintenance')}
              >
                All Schedules &rarr;
              </button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-custom table-sm mb-0">
                  <thead>
                    <tr>
                      <th>Task</th>
                      <th>Contractor</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockMaintenanceTasks.slice(0, 4).map((task) => (
                      <tr key={task.id}>
                        <td>
                          <div className="fw-semibold font-size-12 text-truncate" style={{ maxWidth: '140px' }}>
                            {task.title}
                          </div>
                          <div className="text-muted font-size-11">{task.scheduleDate}</div>
                        </td>
                        <td className="font-size-12 text-muted">{task.assignedContractor.split(' ')[0]}</td>
                        <td>
                          <StatusBadge status={task.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

