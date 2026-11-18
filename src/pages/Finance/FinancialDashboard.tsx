import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Scale,
  CreditCard,
  Download,
  Calendar,
  PieChart as PieIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { ApexChart } from '@/components/charts/ApexChart';
import { mockExpenses, mockMaintenanceFees } from '@/data/mock';

export const FinancialDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFiscalYear, setSelectedFiscalYear] = useState('FY 2024-2025');

  // Chart 1: Monthly Maintenance Collection Trends
  const collectionChartOptions: ApexCharts.ApexOptions = {
    chart: { type: 'area', height: 320, toolbar: { show: false } },
    colors: ['#173F4A', '#F2CF72'],
    stroke: { curve: 'smooth', width: 2 },
    dataLabels: { enabled: false },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.05,
        stops: [0, 95, 100],
      },
    },
    xaxis: {
      categories: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
      labels: { style: { colors: '#64748B', fontSize: '12px' } },
    },
    yaxis: {
      labels: {
        formatter: (val) => `₹${(val / 1000).toFixed(0)}k`,
        style: { colors: '#64748B', fontSize: '12px' },
      },
    },
    grid: { borderColor: '#E2E8F0', strokeDashArray: 4 },
    tooltip: { y: { formatter: (val) => `₹${val.toLocaleString('en-IN')}` } },
  };

  const collectionChartSeries = [
    { name: 'Collection Realized', data: [940000, 970000, 980000, 1020000, 995000, 1045000, 1080000, 1052000] },
    { name: 'Sinking & Reserve Allocation', data: [210000, 210000, 210000, 210000, 210000, 210000, 210000, 210000] },
  ];

  // Chart 2: Income vs Operating Expenses
  const barOptions: ApexCharts.ApexOptions = {
    chart: { type: 'bar', height: 320, toolbar: { show: false } },
    plotOptions: { bar: { columnWidth: '40%', borderRadius: 4 } },
    colors: ['#16A34A', '#DC2626'],
    dataLabels: { enabled: false },
    xaxis: {
      categories: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
      labels: { style: { colors: '#64748B', fontSize: '12px' } },
    },
    yaxis: {
      labels: {
        formatter: (val) => `₹${(val / 1000).toFixed(0)}k`,
        style: { colors: '#64748B', fontSize: '12px' },
      },
    },
    grid: { borderColor: '#E2E8F0', strokeDashArray: 4 },
  };

  const barSeries = [
    { name: 'Total Revenue', data: [980000, 1020000, 995000, 1045000, 1080000, 1052000] },
    { name: 'Operating Expenditure', data: [810000, 840000, 785000, 890000, 868000, 804000] },
  ];

  // Chart 3: Expense Category Breakdown (Donut)
  const expenseBreakdownOptions: ApexCharts.ApexOptions = {
    chart: { type: 'donut', height: 280 },
    labels: ['Security Services', 'Electricity & Diesel', 'Lift AMC', 'Events & Celebrations', 'Water & Garden', 'Repairs & Misc'],
    colors: ['#173F4A', '#578391', '#F2CF72', '#EA8A24', '#16A34A', '#94A3B8'],
    plotOptions: { pie: { donut: { size: '70%' } } },
    dataLabels: { enabled: false },
    legend: { position: 'bottom', horizontalAlign: 'center' },
  };

  const expenseBreakdownSeries = [385000, 218400, 144000, 65000, 56500, 42000];

  return (
    <div className="financial-dashboard-page">
      <PageHeader
        title="Financial Health & Society Ledger"
        description="Comprehensive accounting overview, cash reserves, collection ratios, and budget vs actuals"
        breadcrumbs={[{ label: 'Financial Management' }, { label: 'Financial Reports' }]}
        actions={
          <div className="d-flex gap-2">
            <select
              className="form-select form-select-sm"
              value={selectedFiscalYear}
              onChange={(e) => setSelectedFiscalYear(e.target.value)}
            >
              <option value="FY 2024-2025">FY 2024-2025 (Current)</option>
              <option value="FY 2023-2024">FY 2023-2024 (Audited)</option>
            </select>
            <button
              type="button"
              className="btn btn-sm btn-outline-custom d-flex align-items-center gap-1"
              onClick={() => alert('Simulated downloading statutory balance sheet summary (Excel)')}
            >
              <Download size={14} /> Export Balance Sheet
            </button>
          </div>
        }
      />

      {/* 4 Primary Financial Stat Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            label="Total Income (YTD)"
            value="₹84,22,000"
            icon={<TrendingUp size={22} />}
            iconVariant="success"
            trend={{ text: '+6.2% vs budget forecast', type: 'positive' }}
            onClick={() => navigate('/payments')}
          />
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            label="Total Operating Expenses"
            value="₹65,42,000"
            icon={<TrendingDown size={22} />}
            iconVariant="danger"
            trend={{ text: 'Within 77% sanctioned limits', type: 'positive' }}
            onClick={() => navigate('/expenses')}
          />
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            label="Bank Balance & Reserves"
            value="₹1,42,80,000"
            icon={<Scale size={22} />}
            iconVariant="primary"
            trend={{ text: 'Incl. Sinking & Reserve Funds', type: 'neutral' }}
            onClick={() => navigate('/reconciliation')}
          />
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            label="Outstanding Dues"
            value="₹34,200"
            icon={<DollarSign size={22} />}
            iconVariant="warning"
            trend={{ text: '97.2% overall recovery rate', type: 'positive' }}
            onClick={() => navigate('/payments')}
          />
        </div>
      </div>

      {/* Main Financial Visualizations */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-lg-8">
          <div className="card h-100">
            <div className="card-header">
              <div>
                <h6 className="card-title">Maintenance Collection Curve</h6>
                <span className="card-subtitle">Realized cash collection vs monthly reserve target</span>
              </div>
              <span className="badge bg-success-subtle text-success border border-success-subtle">
                98.4% Collection Efficiency
              </span>
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

        <div className="col-12 col-lg-4">
          <div className="card h-100">
            <div className="card-header">
              <div>
                <h6 className="card-title">Expense Category Distribution</h6>
                <span className="card-subtitle">Breakdown of operational spend</span>
              </div>
            </div>
            <div className="card-body d-flex flex-column justify-content-center">
              <ApexChart
                options={expenseBreakdownOptions}
                series={expenseBreakdownSeries}
                type="donut"
                height={260}
              />
              <div className="text-center font-size-12 text-muted mt-2">
                Top outlay: <strong className="text-dark">Security (43%) & MSEDCL Power (24%)</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inflow vs Outflow Bar Chart & Recent Society Financial Transactions */}
      <div className="row g-3">
        <div className="col-12 col-lg-6">
          <div className="card h-100">
            <div className="card-header">
              <div>
                <h6 className="card-title">Income vs Operational Expenditure</h6>
                <span className="card-subtitle">Month-on-month fiscal balance comparison</span>
              </div>
            </div>
            <div className="card-body">
              <ApexChart
                options={barOptions}
                series={barSeries}
                type="bar"
                height={290}
              />
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card h-100">
            <div className="card-header">
              <div>
                <h6 className="card-title">Recent Transactions & Vouchers</h6>
                <span className="card-subtitle">Audited journal entries across payment gateways and bank</span>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-link text-teal-primary text-decoration-none p-0"
                onClick={() => navigate('/payments')}
              >
                All Ledgers &rarr;
              </button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-custom table-sm mb-0">
                  <thead>
                    <tr>
                      <th>Ref / Voucher</th>
                      <th>Entity & Description</th>
                      <th>Type</th>
                      <th className="text-end">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockMaintenanceFees.slice(0, 3).map((f) => (
                      <tr key={f.id}>
                        <td>
                          <div className="fw-bold font-size-12 text-teal-primary">{f.transactionId || 'PENDING'}</div>
                          <div className="text-muted font-size-11">{f.paymentDate || 'Due Nov 10'}</div>
                        </td>
                        <td>
                          <div className="fw-semibold font-size-12 text-dark">{f.residentName}</div>
                          <div className="text-muted font-size-11">{f.apartmentNumber} Maintenance</div>
                        </td>
                        <td>
                          <span className="badge bg-success-subtle text-success">Credit</span>
                        </td>
                        <td className="text-end">
                          <strong className="text-success font-size-13">+₹{f.amountPaid.toLocaleString('en-IN')}</strong>
                        </td>
                      </tr>
                    ))}
                    {mockExpenses.slice(0, 2).map((exp) => (
                      <tr key={exp.id}>
                        <td>
                          <div className="fw-bold font-size-12 text-danger">{exp.voucherNo}</div>
                          <div className="text-muted font-size-11">{exp.date}</div>
                        </td>
                        <td>
                          <div className="fw-semibold font-size-12 text-dark">{exp.vendorName}</div>
                          <div className="text-muted font-size-11 text-truncate" style={{ maxWidth: '160px' }}>
                            {exp.description}
                          </div>
                        </td>
                        <td>
                          <span className="badge bg-danger-subtle text-danger">Debit</span>
                        </td>
                        <td className="text-end">
                          <strong className="text-danger font-size-13">-₹{exp.amount.toLocaleString('en-IN')}</strong>
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

