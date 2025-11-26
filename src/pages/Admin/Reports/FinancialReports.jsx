import React, { useState } from 'react';
import {
  Card, Row, Col, Statistic, Table, DatePicker, Button,
  Space, Tag, Select, Progress, Divider, List, Badge, Tooltip
} from 'antd';
import {
  DollarSign, CreditCard, Download, FileText, TrendingUp,
  TrendingDown, PieChart, BarChart3, Calendar, Filter,
  Eye, Share2, Printer, Mail
} from 'lucide-react';

const { Option } = Select;
const { RangePicker } = DatePicker;

const FinancialReportsPage = () => {
  const [dateRange, setDateRange] = useState(null);
  const [reportType, setReportType] = useState('all');

  // Mock data
  const financialStats = {
    revenueMTD: 48000,
    commissionMTD: 5600,
    payoutsMTD: 14800,
    netProfit: 27600,
    growthRate: 12.4,
    taxLiability: 3200
  };

  const revenueBreakdown = [
    { category: 'Banner Ads', amount: 25200, percentage: 52.5, trend: 'up' },
    { category: 'Interstitial', amount: 14400, percentage: 30.0, trend: 'up' },
    { category: 'Rewarded Video', amount: 6000, percentage: 12.5, trend: 'up' },
    { category: 'Other', amount: 2400, percentage: 5.0, trend: 'down' }
  ];

  const expenseBreakdown = [
    { category: 'Publisher Payments', amount: 24800, percentage: 62, color: '#3b82f6' },
    { category: 'Viewer Payouts', amount: 9800, percentage: 24.5, color: '#8b5cf6' },
    { category: 'Platform Costs', amount: 3200, percentage: 8, color: '#10b981' },
    { category: 'Marketing', amount: 2200, percentage: 5.5, color: '#f59e0b' }
  ];

  const taxReports = [
    {
      key: 1,
      report: 'Q3 2025 Tax Report',
      period: 'Jul - Sep 2025',
      type: 'Quarterly',
      amount: 2200,
      status: 'filed',
      dueDate: '2025-10-15',
      filedDate: '2025-10-10'
    },
    {
      key: 2,
      report: 'Q2 2025 Tax Report',
      period: 'Apr - Jun 2025',
      type: 'Quarterly',
      amount: 1800,
      status: 'filed',
      dueDate: '2025-07-15',
      filedDate: '2025-07-12'
    },
    {
      key: 3,
      report: 'Q1 2025 Tax Report',
      period: 'Jan - Mar 2025',
      type: 'Quarterly',
      amount: 1500,
      status: 'filed',
      dueDate: '2025-04-15',
      filedDate: '2025-04-10'
    },
    {
      key: 4,
      report: 'Annual 2024',
      period: 'Jan - Dec 2024',
      type: 'Annual',
      amount: 8200,
      status: 'filed',
      dueDate: '2025-03-15',
      filedDate: '2025-03-01'
    }
  ];

  const recentTransactions = [
    {
      key: 1,
      date: '2025-11-20',
      description: 'Ad Revenue - TechCorp Ltd',
      amount: 2200,
      type: 'revenue',
      category: 'Banner Ads'
    },
    {
      key: 2,
      date: '2025-11-19',
      description: 'Publisher Payment - GamePortal Inc',
      amount: -1500,
      type: 'expense',
      category: 'Payouts'
    },
    {
      key: 3,
      date: '2025-11-18',
      description: 'Ad Revenue - NewsDaily Media',
      amount: 850,
      type: 'revenue',
      category: 'Interstitial'
    },
    {
      key: 4,
      date: '2025-11-17',
      description: 'Viewer Payout - VideoStream Hub',
      amount: -2300,
      type: 'expense',
      category: 'Payouts'
    }
  ];

  const taxColumns = [
    {
      title: 'Report',
      dataIndex: 'report',
      key: 'report',
      render: (report) => (
        <Space>
          <FileText size={16} className="text-blue-500" />
          <span className="font-semibold">{report}</span>
        </Space>
      )
    },
    {
      title: 'Period',
      dataIndex: 'period',
      key: 'period'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => <Tag color={type === 'Quarterly' ? 'blue' : 'purple'}>{type}</Tag>
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => (
        <span className="font-bold text-red-600">${amount.toLocaleString()}</span>
      )
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge status="success" text="Filed" />
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="View Report">
            <Button type="text" icon={<Eye size={16} />} size="small" />
          </Tooltip>
          <Tooltip title="Download PDF">
            <Button type="text" icon={<Download size={16} />} size="small" />
          </Tooltip>
          <Tooltip title="Share">
            <Button type="text" icon={<Share2 size={16} />} size="small" />
          </Tooltip>
        </Space>
      )
    }
  ];

  const transactionColumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => (
        <Space>
          <Calendar size={14} className="text-gray-400" />
          {date}
        </Space>
      )
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => <Tag color="blue">{category}</Tag>
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => (
        <span className={`font-bold text-lg ${
          amount > 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {amount > 0 ? '+' : ''}${Math.abs(amount).toLocaleString()}
        </span>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <DollarSign className="mr-3 text-green-600" size={32} />
                Financial Reports & Tax Center
              </h1>
              <p className="text-gray-600 mt-2">
                Comprehensive financial overview, tax reporting, and revenue analytics
              </p>
            </div>
            <Space className="mt-4 lg:mt-0">
              <RangePicker onChange={setDateRange} />
              <Button type="primary" icon={<Download size={16} />}>
                Export Financials
              </Button>
            </Space>
          </div>
        </div>

        {/* Key Financial Metrics */}
        <Row gutter={16} className="mb-6">
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center h-full">
              <Statistic
                title="Revenue (MTD)"
                value={financialStats.revenueMTD}
                prefix={<DollarSign className="text-green-500" size={20} />}
                valueStyle={{ color: '#10b981' }}
                formatter={value => `$${value.toLocaleString()}`}
              />
              <div className="text-sm text-green-600 mt-2">
                <TrendingUp size={14} className="inline mr-1" />
                {financialStats.growthRate}% growth
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center h-full">
              <Statistic
                title="Commission (MTD)"
                value={financialStats.commissionMTD}
                prefix={<CreditCard className="text-blue-500" size={20} />}
                valueStyle={{ color: '#3b82f6' }}
                formatter={value => `$${value.toLocaleString()}`}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center h-full">
              <Statistic
                title="Payouts (MTD)"
                value={financialStats.payoutsMTD}
                prefix={<DollarSign className="text-orange-500" size={20} />}
                valueStyle={{ color: '#f59e0b' }}
                formatter={value => `$${value.toLocaleString()}`}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center h-full">
              <Statistic
                title="Net Profit"
                value={financialStats.netProfit}
                prefix={<TrendingUp className="text-purple-500" size={20} />}
                valueStyle={{ color: '#8b5cf6' }}
                formatter={value => `$${value.toLocaleString()}`}
              />
            </Card>
          </Col>
        </Row>

        {/* Revenue and Expense Breakdown */}
        <Row gutter={16} className="mb-6">
          <Col xs={24} lg={12}>
            <Card 
              title={
                <span className="flex items-center">
                  <BarChart3 size={18} className="mr-2" />
                  Revenue Breakdown
                </span>
              }
            >
              <div className="space-y-4">
                {revenueBreakdown.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <span className="font-medium">{item.category}</span>
                        {item.trend === 'up' ? (
                          <TrendingUp size={14} className="text-green-500 ml-2" />
                        ) : (
                          <TrendingDown size={14} className="text-red-500 ml-2" />
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${item.amount.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">{item.percentage}%</div>
                      </div>
                    </div>
                    <Progress
                      percent={item.percentage}
                      strokeColor={index === 0 ? '#10b981' : index === 1 ? '#3b82f6' : index === 2 ? '#f59e0b' : '#6b7280'}
                      showInfo={false}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card 
              title={
                <span className="flex items-center">
                  <PieChart size={18} className="mr-2" />
                  Expense Breakdown
                </span>
              }
            >
              <div className="space-y-4">
                {expenseBreakdown.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{item.category}</span>
                      <div className="text-right">
                        <div className="font-semibold">${item.amount.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">{item.percentage}%</div>
                      </div>
                    </div>
                    <Progress
                      percent={item.percentage}
                      strokeColor={item.color}
                      showInfo={false}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>

        {/* Tax Reports Section */}
        <Card 
          title={
            <span className="flex items-center">
              <FileText size={18} className="mr-2" />
              Tax Reports & Documents
            </span>
          }
          className="mb-6"
          extra={
            <Space>
              <Select value={reportType} onChange={setReportType} style={{ width: 120 }}>
                <Option value="all">All Reports</Option>
                <Option value="quarterly">Quarterly</Option>
                <Option value="annual">Annual</Option>
              </Select>
              <Button icon={<Download size={16} />}>
                Export All
              </Button>
            </Space>
          }
        >
          <Table
            columns={taxColumns}
            dataSource={taxReports.filter(report => 
              reportType === 'all' || report.type.toLowerCase() === reportType
            )}
            pagination={false}
          />
        </Card>

        {/* Recent Transactions */}
        <Card
          title={
            <span className="flex items-center">
              <CreditCard size={18} className="mr-2" />
              Recent Financial Transactions
            </span>
          }
          extra={
            <Button type="link">View All Transactions</Button>
          }
        >
          <Table
            columns={transactionColumns}
            dataSource={recentTransactions}
            pagination={false}
            size="middle"
          />
        </Card>

        {/* Action Buttons */}
        <Card className="mt-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button type="primary" icon={<Download size={16} />} size="large">
              Download Full Report
            </Button>
            <Button icon={<Printer size={16} />} size="large">
              Print Reports
            </Button>
            <Button icon={<Mail size={16} />} size="large">
              Email to Accountant
            </Button>
            <Button icon={<Share2 size={16} />} size="large">
              Share with Team
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FinancialReportsPage;