import React, { useState } from 'react';
import {
  Card, Statistic, Tabs, Badge, Table, Button, Tag, Space, Tooltip, Progress,
  Row, Col, Dropdown, Menu, Avatar, List, Select, DatePicker, Input
} from 'antd';
import {
  Clock, UserCheck, Megaphone, Globe, DollarSign, CheckCircle, XCircle, Eye, Timer,
  AlertTriangle, Download, MoreVertical, Filter, Search, TrendingUp, Users,
  FileCheck, Shield, CreditCard, Zap, Calendar, ArrowRight
} from 'lucide-react';

const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;

// Utility to get waiting/priority
const getPriority = (waitDays) => waitDays > 5 ? 'urgent' : waitDays >= 3 ? 'high' : 'normal';
const getPriorityColor = (waitDays) => {
  if (waitDays > 5) return '#ef4444';
  if (waitDays >= 3) return '#f59e0b';
  return '#6b7280';
};
const getPriorityTag = (waitDays) => {
  if (waitDays > 5) return <Tag color="red" icon={<AlertTriangle size={12} />}>Urgent</Tag>;
  if (waitDays >= 3) return <Tag color="orange" icon={<Zap size={12} />}>High</Tag>;
  return <Tag color="blue" icon={<Clock size={12} />}>Normal</Tag>;
};

const ApprovalQueueDashboard = () => {
  const [dateRange, setDateRange] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock stats
  const stats = {
    total: 62,
    avgReview: '17h 21m',
    approvedToday: 14,
    rejectedToday: 2,
    completionRate: 78
  };

  // Mock approval data
  const publisherKyc = [
    { 
      key: 1, 
      name: "TechCorp Inc.", 
      email: "admin@techcorp.com",
      date: "2025-11-19", 
      wait: 7,
      type: "Enterprise",
      documents: 3,
      status: "pending"
    },
    { 
      key: 2, 
      name: "Digital Dynamics", 
      email: "finance@digitaldyn.com",
      date: "2025-11-23", 
      wait: 2,
      type: "Agency",
      documents: 2,
      status: "pending"
    },
    { 
      key: 3, 
      name: "Acme Marketing", 
      email: "kyc@acmemarketing.com",
      date: "2025-11-22", 
      wait: 4,
      type: "Small Business",
      documents: 4,
      status: "pending"
    }
  ];

  const campaigns = [
    { 
      key: 1, 
      name: "Winter Sale 2025", 
      publisher: "TechCorp Inc.", 
      adType: "Banner", 
      budget: 4500, 
      wait: 3,
      impressions: "2.5M",
      duration: "30 days"
    },
    { 
      key: 2, 
      name: "Rewarded Bonus", 
      publisher: "MediaHub", 
      adType: "Rewarded", 
      budget: 9000, 
      wait: 6,
      impressions: "5.2M",
      duration: "45 days"
    }
  ];

  const platforms = [
    { 
      key: 1, 
      platform: "newsdaily.com", 
      viewer: "NewsDaily", 
      type: "Website", 
      date: "2025-11-24", 
      wait: 1,
      traffic: "1.2M/month",
      category: "News"
    },
    { 
      key: 2, 
      platform: "game-portal", 
      viewer: "GamePortal", 
      type: "App", 
      date: "2025-11-20", 
      wait: 5,
      traffic: "850K/month",
      category: "Gaming"
    }
  ];

  const payments = [
    { 
      key: 1, 
      viewer: "NewsDaily", 
      email: "payments@newsdaily.com",
      amount: 1100, 
      method: "PayPal", 
      date: "2025-11-25",
      previousPayouts: 12,
      status: "verified"
    },
    { 
      key: 2, 
      viewer: "GamePortal", 
      email: "finance@gameportal.com",
      amount: 850, 
      method: "Bank Transfer", 
      date: "2025-11-25",
      previousPayouts: 8,
      status: "verified"
    }
  ];

  const actionMenu = (record) => (
    <Menu
      items={[
        {
          key: 'view',
          label: 'View Details',
          icon: <Eye size={14} />,
        },
        {
          key: 'approve',
          label: 'Approve',
          icon: <CheckCircle size={14} />,
        },
        {
          key: 'reject',
          label: 'Reject',
          icon: <XCircle size={14} />,
        },
        {
          key: 'request-info',
          label: 'Request More Info',
          icon: <FileCheck size={14} />,
        },
      ]}
    />
  );

  const kycColumns = [
    {
      title: 'Publisher',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <Space>
          <Avatar size="small" style={{ backgroundColor: '#3b82f6' }}>
            {name.charAt(0)}
          </Avatar>
          <div>
            <div className="font-semibold">{name}</div>
            <div className="text-xs text-gray-500">{record.email}</div>
          </div>
        </Space>
      )
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => <Tag color="blue">{type}</Tag>
    },
    {
      title: 'Submission Date',
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
      title: 'Documents',
      dataIndex: 'documents',
      key: 'documents',
      render: (docs) => (
        <Badge count={docs} showZero style={{ backgroundColor: '#6b7280' }} />
      )
    },
    {
      title: 'Waiting Time',
      dataIndex: 'wait',
      key: 'wait',
      render: (days, record) => (
        <Space direction="vertical" size={2}>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-gray-400" />
            <span className="font-medium">{days} days</span>
          </div>
          <Progress 
            percent={Math.min(days * 15, 100)} 
            size="small" 
            strokeColor={getPriorityColor(days)}
            showInfo={false}
          />
        </Space>
      )
    },
    {
      title: 'Priority',
      dataIndex: 'wait',
      key: 'priority',
      render: (days) => getPriorityTag(days)
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="Approve">
            <Button 
              type="primary" 
              size="small" 
              icon={<CheckCircle size={14} />}
              className="bg-green-600 border-green-600"
            >
              Approve
            </Button>
          </Tooltip>
          <Tooltip title="Reject">
            <Button 
              danger 
              size="small" 
              icon={<XCircle size={14} />}
            >
              Reject
            </Button>
          </Tooltip>
          <Dropdown overlay={actionMenu(record)} placement="bottomRight">
            <Button type="text" icon={<MoreVertical size={14} />} />
          </Dropdown>
        </Space>
      )
    }
  ];

  const campaignColumns = [
    {
      title: 'Campaign',
      dataIndex: 'name',
      key: 'name',
      render: (name) => <span className="font-semibold">{name}</span>
    },
    {
      title: 'Publisher',
      dataIndex: 'publisher',
      key: 'publisher'
    },
    {
      title: 'Ad Type',
      dataIndex: 'adType',
      key: 'adType',
      render: (type) => <Tag color="purple">{type}</Tag>
    },
    {
      title: 'Budget',
      dataIndex: 'budget',
      key: 'budget',
      render: (budget) => (
        <span className="font-bold text-blue-700">${budget.toLocaleString()}</span>
      )
    },
    {
      title: 'Impressions',
      dataIndex: 'impressions',
      key: 'impressions'
    },
    {
      title: 'Priority',
      dataIndex: 'wait',
      key: 'priority',
      render: (days) => getPriorityTag(days)
    },
    {
      title: 'Review',
      key: 'review',
      render: (_, record) => (
        <Button 
          type="primary" 
          size="small" 
          icon={<Eye size={14} />}
          className="flex items-center gap-1"
        >
          Review
          <ArrowRight size={12} />
        </Button>
      )
    }
  ];

  const platformColumns = [
    {
      title: 'Platform',
      dataIndex: 'platform',
      key: 'platform',
      render: (platform) => <span className="font-semibold">{platform}</span>
    },
    {
      title: 'Viewer',
      dataIndex: 'viewer',
      key: 'viewer'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === "Website" ? "blue" : "purple"}>{type}</Tag>
      )
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category'
    },
    {
      title: 'Traffic',
      dataIndex: 'traffic',
      key: 'traffic'
    },
    {
      title: 'Priority',
      dataIndex: 'wait',
      key: 'priority',
      render: (days) => getPriorityTag(days)
    },
    {
      title: 'Review',
      key: 'review',
      render: (_, record) => (
        <Button 
          type="primary" 
          size="small" 
          icon={<Eye size={14} />}
          className="flex items-center gap-1"
        >
          Review
          <ArrowRight size={12} />
        </Button>
      )
    }
  ];

  const paymentColumns = [
    {
      title: 'Viewer',
      dataIndex: 'viewer',
      key: 'viewer',
      render: (viewer, record) => (
        <Space>
          <Avatar size="small" style={{ backgroundColor: '#10b981' }}>
            {viewer.charAt(0)}
          </Avatar>
          <div>
            <div className="font-semibold">{viewer}</div>
            <div className="text-xs text-gray-500">{record.email}</div>
          </div>
        </Space>
      )
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => (
        <span className="font-bold text-green-700 text-lg">${amount.toLocaleString()}</span>
      )
    },
    {
      title: 'Method',
      dataIndex: 'method',
      key: 'method',
      render: (method) => <Tag color="cyan">{method}</Tag>
    },
    {
      title: 'Previous Payouts',
      dataIndex: 'previousPayouts',
      key: 'previousPayouts',
      render: (count) => (
        <Badge count={count} style={{ backgroundColor: '#6b7280' }} />
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color="green" icon={<Shield size={12} />}>
          Verified
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="Approve Payment">
            <Button 
              type="primary" 
              size="small" 
              icon={<CheckCircle size={14} />}
              className="bg-green-600 border-green-600"
            >
              Approve
            </Button>
          </Tooltip>
          <Tooltip title="Reject Payment">
            <Button 
              danger 
              size="small" 
              icon={<XCircle size={14} />}
            >
              Reject
            </Button>
          </Tooltip>
        </Space>
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
                <FileCheck className="mr-3 text-indigo-600" size={32} />
                Approval Queue Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Manage and review pending approvals across all platform categories
              </p>
            </div>
            <Space className="mt-4 lg:mt-0">
              <Button icon={<Download size={16} />}>
                Export Queue
              </Button>
            </Space>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <Row gutter={16} className="mb-8">
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
              <Statistic
                title="Total Pending Items"
                value={stats.total}
                prefix={<FileCheck className="text-blue-500" size={24} />}
                valueStyle={{ color: '#3b82f6' }}
              />
              <div className="text-sm text-gray-600 mt-2">
                Across all categories
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
              <Statistic
                title="Avg. Review Time"
                value={stats.avgReview}
                prefix={<Timer className="text-orange-500" size={24} />}
                valueStyle={{ color: '#f59e0b' }}
              />
              <div className="text-sm text-gray-600 mt-2">
                Current cycle
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
              <Statistic
                title="Today's Approvals"
                value={stats.approvedToday}
                prefix={<CheckCircle className="text-green-500" size={24} />}
                valueStyle={{ color: '#10b981' }}
              />
              <div className="text-sm text-green-600 mt-2">
                <TrendingUp size={14} className="inline mr-1" />
                12% faster than yesterday
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
              <Statistic
                title="Completion Rate"
                value={stats.completionRate}
                suffix="%"
                prefix={<TrendingUp className="text-red-500" size={24} />}
                valueStyle={{ color: '#ef4444' }}
              />
              <Progress percent={stats.completionRate} size="small" className="mt-2" />
            </Card>
          </Col>
        </Row>

        {/* Filters */}
        <Card className="mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <Input
              placeholder="Search across all queues..."
              prefix={<Search size={16} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: 300 }}
            />
            <Select
              defaultValue="all"
              style={{ width: 150 }}
              suffixIcon={<Filter size={16} />}
            >
              <Option value="all">All Priorities</Option>
              <Option value="urgent">Urgent Only</Option>
              <Option value="high">High Priority</Option>
              <Option value="normal">Normal</Option>
            </Select>
            <RangePicker />
          </div>
        </Card>

        {/* Enhanced Tabbed Queue */}
        <Card 
          className="shadow-sm border-0"
          bodyStyle={{ padding: 0 }}
        >
          <Tabs 
            defaultActiveKey="1" 
            type="card" 
            size="large"
            tabBarStyle={{ padding: '0 24px', marginBottom: 0 }}
          >
            {/* Publisher KYC Approvals */}
            <TabPane
              tab={
                <span className="flex items-center">
                  <UserCheck size={18} className="mr-2" />
                  Publisher KYC
                  <Badge count={publisherKyc.length} style={{ marginLeft: 8 }} />
                </span>
              }
              key="1"
            >
              <div className="p-6">
                <Table
                  rowKey="key"
                  dataSource={publisherKyc}
                  columns={kycColumns}
                  pagination={false}
                  scroll={{ x: 1000 }}
                />
              </div>
            </TabPane>

            {/* Campaign Approvals */}
            <TabPane
              tab={
                <span className="flex items-center">
                  <Megaphone size={18} className="mr-2" />
                  Campaigns
                  <Badge count={campaigns.length} style={{ marginLeft: 8 }} />
                </span>
              }
              key="2"
            >
              <div className="p-6">
                <Table
                  rowKey="key"
                  dataSource={campaigns}
                  columns={campaignColumns}
                  pagination={false}
                  scroll={{ x: 1000 }}
                />
              </div>
            </TabPane>

            {/* Viewer Platform Approvals */}
            <TabPane
              tab={
                <span className="flex items-center">
                  <Globe size={18} className="mr-2" />
                  Platforms
                  <Badge count={platforms.length} style={{ marginLeft: 8 }} />
                </span>
              }
              key="3"
            >
              <div className="p-6">
                <Table
                  rowKey="key"
                  dataSource={platforms}
                  columns={platformColumns}
                  pagination={false}
                  scroll={{ x: 1000 }}
                />
              </div>
            </TabPane>

            {/* Payment Requests */}
            <TabPane
              tab={
                <span className="flex items-center">
                  <CreditCard size={18} className="mr-2" />
                  Payment Requests
                  <Badge count={payments.length} style={{ marginLeft: 8 }} />
                </span>
              }
              key="4"
            >
              <div className="p-6">
                <Table
                  rowKey="key"
                  dataSource={payments}
                  columns={paymentColumns}
                  pagination={false}
                  scroll={{ x: 1000 }}
                />
              </div>
            </TabPane>
          </Tabs>
        </Card>

      </div>
    </div>
  );
};

export default ApprovalQueueDashboard;