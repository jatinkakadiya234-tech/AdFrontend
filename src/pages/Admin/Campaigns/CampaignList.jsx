import React, { useState } from 'react';
import {
  Table,
  Input,
  Button,
  Tag,
  Space,
  Select,
  DatePicker,
  Card,
  Dropdown,
  Menu,
  Modal,
  Progress,
  Statistic,
  Avatar,
  Tooltip,
  message
} from 'antd';
import {
  Search,
  Filter,
  Download,
  Eye,
  Pause,
  Play,
  XCircle,
  Trash2,
  MoreVertical,
  Megaphone,
  Clock,
  CheckCircle,
  Ban,
  DollarSign,
  TrendingUp,
  Calendar,
  BarChart3
} from 'lucide-react';
import {
  FaCheckCircle,
  FaBan,
  FaPause,
  FaFileExport,
  FaImage,
  FaGift,
  FaExpand,
  FaLink
} from 'react-icons/fa';

const { RangePicker } = DatePicker;
const { Option } = Select;

// Mock Data Generator
const generateCampaignsData = () => {
  const adTypes = ['Banner', 'Rewarded', 'Interstitial', 'URL Shortener'];
  const statuses = ['pending', 'active', 'paused', 'rejected', 'completed'];
  const reviewStatuses = ['pending_review', 'approved', 'rejected'];
  const publishers = ['TechCorp Inc.', 'Acme Marketing', 'Digital Dynamics', 'MediaHub Network', 'BrandCo Solutions'];

  return Array.from({ length: 50 }, (_, i) => ({
    key: i + 1,
    campaignId: `CAMP${String(i + 1).padStart(5, '0')}`,
    campaignName: [
      'Summer Sale Campaign',
      'Black Friday Deals',
      'New Product Launch',
      'Brand Awareness Drive',
      'Holiday Special Offer',
      'Spring Collection 2024',
      'Clearance Sale Event'
    ][i % 7],
    publisherId: `PUB${String(Math.floor(i / 3) + 1).padStart(5, '0')}`,
    publisherName: publishers[i % publishers.length],
    publisherEmail: `publisher${i + 1}@example.com`,
    adType: adTypes[i % adTypes.length],
    status: statuses[i % statuses.length],
    reviewStatus: reviewStatuses[i % reviewStatuses.length],
    totalBudget: Math.floor(Math.random() * 50000) + 5000,
    spent: Math.floor(Math.random() * 30000) + 1000,
    startDate: '2024-11-01',
    endDate: '2024-12-31',
    impressions: Math.floor(Math.random() * 500000) + 50000,
    clicks: Math.floor(Math.random() * 15000) + 1000,
    ctr: (Math.random() * 5 + 0.5).toFixed(2),
    createdDate: new Date(2024, 10, Math.floor(Math.random() * 25) + 1).toLocaleDateString(),
    submissionDate: new Date(2024, 10, Math.floor(Math.random() * 25) + 1).toLocaleDateString()
  }));
};

const CampaignsList = () => {
  const [campaigns, setCampaigns] = useState(generateCampaignsData());
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: null,
    adType: null,
    publisher: null,
    reviewStatus: null,
    dateRange: null
  });

  // Stats calculation
  const stats = {
    total: campaigns.length,
    pendingReview: campaigns.filter(c => c.reviewStatus === 'pending_review').length,
    active: campaigns.filter(c => c.status === 'active').length,
    paused: campaigns.filter(c => c.status === 'paused').length,
    totalBudget: campaigns.reduce((sum, c) => sum + c.totalBudget, 0)
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  // Format number
  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  // Ad Type Icon and Color
  const getAdTypeConfig = (type) => {
    const config = {
      'Banner': { icon: FaImage, color: 'blue', bg: 'bg-blue-50', text: 'text-blue-600' },
      'Rewarded': { icon: FaGift, color: 'green', bg: 'bg-green-50', text: 'text-green-600' },
      'Interstitial': { icon: FaExpand, color: 'purple', bg: 'bg-purple-50', text: 'text-purple-600' },
      'URL Shortener': { icon: FaLink, color: 'orange', bg: 'bg-orange-50', text: 'text-orange-600' }
    };
    return config[type] || config['Banner'];
  };

  // Campaign Status Badge
  const getStatusBadge = (status) => {
    const config = {
      pending: { color: 'warning', text: 'Pending' },
      active: { color: 'success', text: 'Active' },
      paused: { color: 'default', text: 'Paused' },
      rejected: { color: 'error', text: 'Rejected' },
      completed: { color: 'processing', text: 'Completed' }
    };
    return <Tag color={config[status]?.color}>{config[status]?.text}</Tag>;
  };

  // Review Status Badge
  const getReviewStatusBadge = (status) => {
    const config = {
      pending_review: { color: 'warning', text: 'Pending Review', icon: Clock },
      approved: { color: 'success', text: 'Approved', icon: CheckCircle },
      rejected: { color: 'error', text: 'Rejected', icon: XCircle }
    };
    const Icon = config[status]?.icon;
    return (
      <Tag color={config[status]?.color} icon={Icon && <Icon className="w-3 h-3" />}>
        {config[status]?.text}
      </Tag>
    );
  };

  // Actions Menu
  const getActionsMenu = (record) => (
    <Menu>
      <Menu.Item key="review" icon={<Eye className="w-4 h-4" />}>
        <a href={`/admin/campaigns/${record.campaignId}/review`}>Review Campaign</a>
      </Menu.Item>
      <Menu.Item key="pause" icon={record.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}>
        {record.status === 'active' ? 'Pause Campaign' : 'Resume Campaign'}
      </Menu.Item>
      <Menu.Item key="stop" icon={<Ban className="w-4 h-4" />}>
        Stop Campaign
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="publisher" icon={<Avatar size={16} />}>
        <a href={`/admin/publishers/${record.publisherId}`}>View Publisher</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="delete" icon={<Trash2 className="w-4 h-4" />} danger>
        Delete Campaign
      </Menu.Item>
    </Menu>
  );

  // Table Columns
  const columns = [
    {
      title: 'Campaign',
      dataIndex: 'campaignName',
      key: 'campaignName',
      fixed: 'left',
      width: 250,
      render: (text, record) => {
        const adConfig = getAdTypeConfig(record.adType);
        const AdIcon = adConfig.icon;
        return (
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${adConfig.bg} flex items-center justify-center flex-shrink-0`}>
              <AdIcon className={`w-5 h-5 ${adConfig.text}`} />
            </div>
            <div>
              <div className="font-semibold text-gray-900">{text}</div>
              <div className="text-xs text-gray-500">{record.campaignId}</div>
            </div>
          </div>
        );
      }
    },
    {
      title: 'Publisher',
      dataIndex: 'publisherName',
      key: 'publisherName',
      width: 200,
      render: (text, record) => (
        <div>
          <a href={`/admin/publishers/${record.publisherId}`} className="font-medium text-blue-600 hover:text-blue-800">
            {text}
          </a>
          <div className="text-xs text-gray-500">{record.publisherId}</div>
        </div>
      )
    },
    {
      title: 'Ad Type',
      dataIndex: 'adType',
      key: 'adType',
      width: 150,
      render: (type) => {
        const config = getAdTypeConfig(type);
        return <Tag color={config.color}>{type}</Tag>;
      },
      filters: [
        { text: 'Banner', value: 'Banner' },
        { text: 'Rewarded', value: 'Rewarded' },
        { text: 'Interstitial', value: 'Interstitial' },
        { text: 'URL Shortener', value: 'URL Shortener' }
      ],
      onFilter: (value, record) => record.adType === value
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => getStatusBadge(status),
      filters: [
        { text: 'Pending', value: 'pending' },
        { text: 'Active', value: 'active' },
        { text: 'Paused', value: 'paused' },
        { text: 'Rejected', value: 'rejected' },
        { text: 'Completed', value: 'completed' }
      ],
      onFilter: (value, record) => record.status === value
    },
    {
      title: 'Review Status',
      dataIndex: 'reviewStatus',
      key: 'reviewStatus',
      width: 150,
      render: (status) => getReviewStatusBadge(status),
      filters: [
        { text: 'Pending Review', value: 'pending_review' },
        { text: 'Approved', value: 'approved' },
        { text: 'Rejected', value: 'rejected' }
      ],
      onFilter: (value, record) => record.reviewStatus === value
    },
    {
      title: 'Budget',
      key: 'budget',
      width: 180,
      render: (_, record) => {
        const remaining = record.totalBudget - record.spent;
        const percentage = (record.spent / record.totalBudget) * 100;
        return (
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Spent:</span>
              <span className="font-semibold">{formatCurrency(record.spent)}</span>
            </div>
            <Progress 
              percent={percentage} 
              size="small" 
              strokeColor={percentage > 90 ? '#ef4444' : percentage > 70 ? '#f97316' : '#22c55e'}
              showInfo={false}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Total: {formatCurrency(record.totalBudget)}</span>
              <span>Remaining: {formatCurrency(remaining)}</span>
            </div>
          </div>
        );
      },
      sorter: (a, b) => a.totalBudget - b.totalBudget
    },
    {
      title: 'Schedule',
      key: 'schedule',
      width: 150,
      render: (_, record) => (
        <div className="text-sm">
          <div className="flex items-center gap-1 text-gray-900">
            <Calendar className="w-3 h-3" />
            <span>{record.startDate}</span>
          </div>
          <div className="text-gray-500 ml-4">to {record.endDate}</div>
        </div>
      )
    },
    {
      title: 'Performance',
      key: 'performance',
      width: 150,
      render: (_, record) => (
        <div className="text-sm">
          <div className="flex items-center gap-1">
            <BarChart3 className="w-3 h-3 text-blue-600" />
            <span className="font-semibold text-gray-900">{formatNumber(record.impressions)}</span>
            <span className="text-gray-500">imp</span>
          </div>
          <div className="text-gray-600 ml-4">{formatNumber(record.clicks)} clicks</div>
          <div className="text-xs text-green-600 ml-4">CTR: {record.ctr}%</div>
        </div>
      )
    },
    {
      title: 'Created',
      dataIndex: 'createdDate',
      key: 'createdDate',
      width: 120,
      sorter: (a, b) => new Date(a.createdDate) - new Date(b.createdDate)
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <Space>
          <Tooltip title="Review Campaign">
            <Button
              type="text"
              icon={<Eye className="w-4 h-4" />}
              href={`/admin/campaigns/${record.campaignId}/review`}
            />
          </Tooltip>
          <Dropdown overlay={getActionsMenu(record)} trigger={['click']}>
            <Button type="text" icon={<MoreVertical className="w-4 h-4" />} />
          </Dropdown>
        </Space>
      )
    }
  ];

  // Row Selection
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys)
  };

  // Bulk Actions
  const handleBulkAction = (action) => {
    Modal.confirm({
      title: `${action} Selected Campaigns`,
      content: `Are you sure you want to ${action.toLowerCase()} ${selectedRowKeys.length} campaign(s)?`,
      onOk: () => {
        message.success(`Successfully ${action.toLowerCase()}ed ${selectedRowKeys.length} campaign(s)`);
        setSelectedRowKeys([]);
      }
    });
  };

  // Filter Pending Review
  const filterPendingReview = () => {
    setFilters({ ...filters, reviewStatus: 'pending_review' });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Campaign Management</h1>
        <p className="text-gray-600">Review, approve, and manage all advertising campaigns</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Card className="hover:shadow-md transition-shadow">
          <Statistic
            title="Total Campaigns"
            value={stats.total}
            prefix={<Megaphone className="w-5 h-5 text-blue-600" />}
            valueStyle={{ color: '#2563eb', fontWeight: 'bold' }}
          />
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <Statistic
            title="Pending Review"
            value={stats.pendingReview}
            prefix={<Clock className="w-5 h-5 text-orange-600" />}
            valueStyle={{ color: '#ea580c', fontWeight: 'bold' }}
          />
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <Statistic
            title="Active Campaigns"
            value={stats.active}
            prefix={<CheckCircle className="w-5 h-5 text-green-600" />}
            valueStyle={{ color: '#16a34a', fontWeight: 'bold' }}
          />
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <Statistic
            title="Paused"
            value={stats.paused}
            prefix={<Pause className="w-5 h-5 text-gray-600" />}
            valueStyle={{ color: '#64748b', fontWeight: 'bold' }}
          />
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <Statistic
            title="Total Budget"
            value={stats.totalBudget}
            prefix={<DollarSign className="w-5 h-5 text-purple-600" />}
            valueStyle={{ color: '#9333ea', fontWeight: 'bold' }}
            formatter={(value) => formatCurrency(value)}
          />
        </Card>
      </div>

      {/* Main Content Card */}
      <Card>
        {/* Top Action Bar */}
        <div className="mb-6 flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Button
              type="primary"
              icon={<Clock className="w-4 h-4" />}
              onClick={filterPendingReview}
              className="bg-orange-500 hover:bg-orange-600 border-orange-500"
            >
              Pending Review ({stats.pendingReview})
            </Button>
            <Button icon={<Download className="w-4 h-4" />}>
              Export to CSV
            </Button>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            placeholder="Search by Campaign or Publisher"
            prefix={<Search className="w-4 h-4 text-gray-400" />}
            allowClear
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          <Select
            placeholder="Filter by Status"
            allowClear
            onChange={(value) => setFilters({ ...filters, status: value })}
            className="w-full"
          >
            <Option value="pending">Pending</Option>
            <Option value="active">Active</Option>
            <Option value="paused">Paused</Option>
            <Option value="rejected">Rejected</Option>
            <Option value="completed">Completed</Option>
          </Select>
          <Select
            placeholder="Filter by Ad Type"
            allowClear
            onChange={(value) => setFilters({ ...filters, adType: value })}
            className="w-full"
          >
            <Option value="Banner">Banner Ads</Option>
            <Option value="Rewarded">Rewarded Ads</Option>
            <Option value="Interstitial">Interstitial Ads</Option>
            <Option value="URL Shortener">URL Shortener</Option>
          </Select>
          <Select
            placeholder="Filter by Review Status"
            allowClear
            onChange={(value) => setFilters({ ...filters, reviewStatus: value })}
            className="w-full"
          >
            <Option value="pending_review">Pending Review</Option>
            <Option value="approved">Approved</Option>
            <Option value="rejected">Rejected</Option>
          </Select>
        </div>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <RangePicker
            className="w-full"
            placeholder={['Start Date', 'End Date']}
            onChange={(dates) => setFilters({ ...filters, dateRange: dates })}
          />
          <Select
            placeholder="Filter by Performance"
            allowClear
            className="w-full"
          >
            <Option value="high">High Performing (CTR &gt; 3%)</Option>
            <Option value="medium">Medium Performing (1-3%)</Option>
            <Option value="low">Low Performing (&lt; 1%)</Option>
          </Select>
        </div>

        {/* Bulk Actions */}
        {selectedRowKeys.length > 0 && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex flex-wrap items-center gap-3">
            <span className="font-semibold text-blue-900">
              {selectedRowKeys.length} selected
            </span>
            <Space wrap>
              <Button
                icon={<FaCheckCircle />}
                onClick={() => handleBulkAction('Approve')}
                className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
              >
                Approve Selected
              </Button>
              <Button
                icon={<XCircle className="w-4 h-4" />}
                onClick={() => handleBulkAction('Reject')}
                danger
              >
                Reject Selected
              </Button>
              <Button
                icon={<FaPause />}
                onClick={() => handleBulkAction('Pause')}
                className="bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100"
              >
                Pause Selected
              </Button>
              <Button icon={<FaFileExport />}>
                Export Selected
              </Button>
            </Space>
          </div>
        )}

        {/* Table */}
        <Table
          columns={columns}
          dataSource={campaigns}
          rowSelection={rowSelection}
          loading={loading}
          scroll={{ x: 1800 }}
          pagination={{
            total: campaigns.length,
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} campaigns`,
            pageSizeOptions: ['10', '20', '50', '100']
          }}
          className="custom-table"
        />
      </Card>

      {/* Custom Styles */}
      <style jsx>{`
        .custom-table .ant-table-thead > tr > th {
          background-color: #f8fafc;
          font-weight: 600;
          color: #475569;
          font-size: 0.875rem;
        }
        .custom-table .ant-table-tbody > tr:hover > td {
          background-color: #f8fafc;
        }
      `}</style>
    </div>
  );
};

export default CampaignsList;
