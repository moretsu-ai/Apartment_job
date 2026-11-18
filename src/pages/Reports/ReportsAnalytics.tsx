import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  Calendar,
  FileSpreadsheet,
  FileText,
  TrendingUp,
  PieChart as PieIcon,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { ApexChart } from '@/components/charts/ApexChart';

export const ReportsAnalytics: React.FC = () => {
  const [selectedReportType, setSelectedReportType] = useState('All');
  const [dateRange, setDateRange] = useState('FY 2024-2025');

  // Chart: Multi-category Performance Index
  const reportChartOptions: ApexCharts.ApexOptions = {
    chart: { type: 'line', height: 320, toolbar: { show: false } },
    stroke: { curve: 'smooth', width: [3, 2, 2] },
    colors: ['#173F4A', '#16A34A', '#EA8A24'],
    xaxis: {
      categories: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
      labels: { style: { colors: '#64748B', fontSize: '12px' } },
    },
    yaxis: {
      labels: { style: { colors: '#64748B', fontSize: '12px' } },
    },
    grid: { borderColor: '#E2E8F0', strokeDashArray: 4 },
  };

  const reportChartSeries = [
    { name: 'Collection Efficiency (%)', type: 'column', data: [94, 96, 95, 98, 97, 98, 99, 98] },
    { name: 'Complaint Resolution SLA (%)', type: 'line', data: [88, 91, 89, 94, 92, 95, 96, 95] },
    { name: 'Budget Adherence (%)', type: 'line', data: [90, 89, 92, 91, 93, 90, 94, 93] },
  ];

  const statutoryReports = [
    {
      title: 'Monthly Maintenance Recovery & Defaulters Register',
      category: 'Collection',
      desc: 'Apartment-wise maintenance collection summary, overdue penalties, and aging analysis.',
      format: 'PDF & Excel',
      size: '2.4 MB',
      updated: '05-Nov-2024',
    },
    {
      title: 'Occupancy & Tenant Police Verification Audit',
      category: 'Occupancy',
      desc: 'Tower-wise owner vs tenant distribution with verified police certificates compliance.',
      format: 'PDF',
      size: '1.8 MB',
      updated: '01-Nov-2024',
    },
    {
      title: 'Complaint SLA & Vendor Performance Scorecard',
      category: 'Complaints',
      desc: 'P1-P4 turnaround metrics, vendor ratings, repeat complaint frequency by block.',
      format: 'Excel',
      size: '3.1 MB',
      updated: '04-Nov-2024',
    },
    {
      title: 'Comprehensive Annual Maintenance (AMC) Asset Audit',
      category: 'Maintenance',
      desc: 'Lifts, solar PV, diesel generator, fire hydrant inspection logs, and repair outlays.',
      format: 'PDF',
      size: '4.5 MB',
      updated: '28-Oct-2024',
    },
    {
      title: 'Annual Society Operating Expense & Cash Flow Statement',
      category: 'Expense',
      desc: 'Voucher level audited disbursements categorized according to Model Bye-laws 2014.',
      format: 'Excel & PDF',
      size: '5.2 MB',
      updated: '02-Nov-2024',
    },
    {
      title: 'Cultural Festivals & Events Comprehensive Accounts',
      category: 'Events',
      desc: 'Ganesh Chaturthi & Diwali donations collection ledger vs actual verified bills.',
      format: 'PDF',
      size: '1.5 MB',
      updated: '03-Nov-2024',
    },
  ];

  const handleDownload = (reportTitle: string) => {
    alert(`Downloading statutory report: "${reportTitle}" (Simulation)`);
  };

  const filteredReports = statutoryReports.filter(
    (r) => selectedReportType === 'All' || r.category === selectedReportType
  );

  return (
    <div className="reports-analytics-page">
      <PageHeader
        title="Reports, Audits & Operational Analytics"
        description="Comprehensive statutory reports, occupancy audits, collection reconciliations, and downloadable workbooks"
        breadcrumbs={[{ label: 'Documents and Reports' }, { label: 'Reports and Analytics' }]}
        actions={
          <div className="d-flex gap-2">
            <select
              className="form-select form-select-sm"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="FY 2024-2025">FY 2024-2025 (YTD)</option>
              <option value="FY 2023-2024">FY 2023-2024 (Audited)</option>
              <option value="Last 90 Days">Last 90 Days</option>
            </select>
            <button
              type="button"
              className="btn btn-sm btn-primary-custom d-flex align-items-center gap-1"
              onClick={() => alert('Simulated generating bulk audit archive ZIP package.')}
            >
              <Download size={14} />
              <span>Export Complete Audit Pack</span>
            </button>
          </div>
        }
      />

      {/* Analytics KPI Chart */}
      <div className="card mb-4">
        <div className="card-header">
          <div>
            <h5 className="card-title">Society Governance & Operational KPI Trajectory</h5>
            <span className="card-subtitle">Collection efficiency, SLA adherence, and budget control trends</span>
          </div>
        </div>
        <div className="card-body">
          <ApexChart
            options={reportChartOptions}
            series={reportChartSeries}
            type="line"
            height={300}
          />
        </div>
      </div>

      {/* Reports Filter Tabs */}
      <div className="card mb-4">
        <div className="card-body py-2">
          <div className="d-flex flex-wrap gap-2">
            {['All', 'Collection', 'Occupancy', 'Complaints', 'Maintenance', 'Expense', 'Events'].map(
              (cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`btn btn-sm ${
                    selectedReportType === cat ? 'btn-primary-custom' : 'btn-light text-muted border'
                  }`}
                  onClick={() => setSelectedReportType(cat)}
                >
                  {cat === 'All' ? 'All Audit Reports' : `${cat} Reports`}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="row g-3">
        {filteredReports.map((report, idx) => (
          <div key={idx} className="col-12 col-md-6">
            <div className="card h-100 card-hover-effect">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span className="badge bg-teal-light text-teal-primary font-size-12 fw-semibold">
                    {report.category}
                  </span>
                  <span className="badge bg-light text-muted border">{report.format}</span>
                </div>
                <h6 className="fw-bold text-dark font-size-14 mb-2">{report.title}</h6>
                <p className="font-size-13 text-muted mb-3">{report.desc}</p>
                <div className="d-flex justify-content-between align-items-center font-size-12 pt-2 border-top">
                  <span className="text-muted">
                    Updated: {report.updated} • {report.size}
                  </span>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-custom d-flex align-items-center gap-1"
                    onClick={() => handleDownload(report.title)}
                  >
                    <Download size={13} />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

