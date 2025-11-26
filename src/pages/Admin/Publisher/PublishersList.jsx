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
  message,
  Statistic,
  Avatar,
  Tooltip
} from 'antd';
import {
  Search,
  Filter,
  Download,
  UserPlus,
  Eye,
  Edit,
  Ban,
  Trash2,
  MoreVertical,
  Users,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { 
  FaFileExport, 
  FaCheckCircle, 
  FaBan 
} from 'react-icons/fa';

const { RangePicker } = DatePicker;
const { Option } = Select;

// Mock Data Generator
const generatePublishersData = () => {
  return Array.from({ length: 50 }, (_, i) => ({
    key: i + 1,
    publisherId: `PUB${String(i + 1).padStart(5, '0')}`,
    name: ['TechCorp Inc.', 'Acme Marketing', 'Digital Dynamics', 'MediaHub Network', 'BrandCo Solutions'][i % 5],
    email: `publisher${i + 1}@example.com`,
    phone: `+1 ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
    registrationDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
    kycStatus: ['pending', 'approved', 'rejected', 'under_review'][Math.floor(Math.random() * 4)],
    accountStatus: ['active', 'suspended', 'banned'][Math.floor(Math.random() * 3)],
    totalCampaigns: Math.floor(Math.random() * 50),
    totalSpend: Math.floor(Math.random() * 100000),
    balance: Math.floor(Math.random() * 50000),
    avatar: `https://ui-avatars.com/api/?name=${['TechCorp', 'Acme', 'Digital', 'MediaHub', 'BrandCo'][i % 5]}&background=random`
  }));
};

const PublishersList = () => {
  const [publishers, setPublishers] = useState(generatePublishersData());
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    kycStatus: null,
    accountStatus: null,
    dateRange: null,
    spendRange: null
  });

  // Stats calculation
  const stats = {
    total: publishers.length,
    pending: publishers.filter(p => p.kycStatus === 'pending').length,
    active: publishers.filter(p => p.accountStatus === 'active').length,
    suspended: publishers.filter(p => p.accountStatus === 'suspended').length
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  // KYC Status Badge
  const getKYCStatusBadge = (status) => {
    const config = {
      pending: { color: 'warning', text: 'Pending' },
      approved: { color: 'success', text: 'Approved' },
      rejected: { color: 'error', text: 'Rejected' },
      under_review: { color: 'processing', text: 'Under Review' }
    };
    return <Tag color={config[status]?.color}>{config[status]?.text}</Tag>;
  };

  // Account Status Badge
  const getAccountStatusBadge = (status) => {
    const config = {
      active: { color: 'success', text: 'Active' },
      suspended: { color: 'warning', text: 'Suspended' },
      banned: { color: 'error', text: 'Banned' }
    };
    return <Tag color={config[status]?.color}>{config[status]?.text}</Tag>;
  };

  // Actions Menu
  const getActionsMenu = (record) => (
    <Menu>
      <Menu.Item key="view" icon={<Eye className="w-4 h-4" />}>
        <a href={`/admin/publishers/${record.publisherId}`}>View Details</a>
      </Menu.Item>
      <Menu.Item key="edit" icon={<Edit className="w-4 h-4" />}>
        Edit Publisher
      </Menu.Item>
      <Menu.Item key="kyc" icon={<CheckCircle className="w-4 h-4" />}>
        <a href={`/admin/publishers/${record.publisherId}/kyc-review`}>Review KYC</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="suspend" icon={<Ban className="w-4 h-4" />} danger>
        Suspend Account
      </Menu.Item>
      <Menu.Item key="delete" icon={<Trash2 className="w-4 h-4" />} danger>
        Delete Publisher
      </Menu.Item>
    </Menu>
  );

  // Table Columns
  const columns = [
    {
      title: 'Publisher',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      width: 250,
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <Avatar src={record.avatar} size={40}>{text[0]}</Avatar>
          <div>
            <div className="font-semibold text-gray-900">{text}</div>
            <div className="text-xs text-gray-500">{record.publisherId}</div>
          </div>
        </div>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      render: (text) => <span className="text-gray-600">{text}</span>
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
      render: (text) => <span className="text-gray-600">{text}</span>
    },
    {
      title: 'Registration Date',
      dataIndex: 'registrationDate',
      key: 'registrationDate',
      width: 150,
      sorter: (a, b) => new Date(a.registrationDate) - new Date(b.registrationDate)
    },
    {
      title: 'KYC Status',
      dataIndex: 'kycStatus',
      key: 'kycStatus',
      width: 150,
      render: (status) => getKYCStatusBadge(status),
      filters: [
        { text: 'Pending', value: 'pending' },
        { text: 'Approved', value: 'approved' },
        { text: 'Rejected', value: 'rejected' },
        { text: 'Under Review', value: 'under_review' }
      ],
      onFilter: (value, record) => record.kycStatus === value
    },
    {
      title: 'Account Status',
      dataIndex: 'accountStatus',
      key: 'accountStatus',
      width: 150,
      render: (status) => getAccountStatusBadge(status),
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Suspended', value: 'suspended' },
        { text: 'Banned', value: 'banned' }
      ],
      onFilter: (value, record) => record.accountStatus === value
    },
    {
      title: 'Campaigns',
      dataIndex: 'totalCampaigns',
      key: 'totalCampaigns',
      width: 120,
      sorter: (a, b) => a.totalCampaigns - b.totalCampaigns,
      render: (value) => <span className="font-semibold text-gray-900">{value}</span>
    },
    {
      title: 'Total Spend',
      dataIndex: 'totalSpend',
      key: 'totalSpend',
      width: 150,
      sorter: (a, b) => a.totalSpend - b.totalSpend,
      render: (value) => <span className="font-semibold text-green-600">{formatCurrency(value)}</span>
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      width: 150,
      sorter: (a, b) => a.balance - b.balance,
      render: (value) => <span className="font-semibold text-blue-600">{formatCurrency(value)}</span>
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button 
              type="text" 
              icon={<Eye className="w-4 h-4" />}
              href={`/admin/publishers/${record.publisherId}`}
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
    onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
  };

  // Bulk Actions
  const handleBulkAction = (action) => {
    Modal.confirm({
      title: `${action} Selected Publishers`,
      content: `Are you sure you want to ${action.toLowerCase()} ${selectedRowKeys.length} publisher(s)?`,
      onOk: () => {
        message.success(`Successfully ${action.toLowerCase()}ed ${selectedRowKeys.length} publisher(s)`);
        setSelectedRowKeys([]);
      }
    });
  };

  // Export to CSV
  const handleExport = () => {
    message.success('Exporting publishers data...');
  };

  // Filter by Pending KYC
  const filterPendingKYC = () => {
    setFilters({ ...filters, kycStatus: 'pending' });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Publisher Management</h1>
        <p className="text-gray-600">Manage and monitor all publishers on your platform</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="hover:shadow-md transition-shadow">
          <Statistic
            title="Total Publishers"
            value={stats.total}
            prefix={<Users className="w-5 h-5 text-blue-600" />}
            valueStyle={{ color: '#2563eb', fontWeight: 'bold' }}
          />
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <Statistic
            title="Pending Approvals"
            value={stats.pending}
            prefix={<Clock className="w-5 h-5 text-orange-600" />}
            valueStyle={{ color: '#ea580c', fontWeight: 'bold' }}
          />
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <Statistic
            title="Active Publishers"
            value={stats.active}
            prefix={<CheckCircle className="w-5 h-5 text-green-600" />}
            valueStyle={{ color: '#16a34a', fontWeight: 'bold' }}
          />
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <Statistic
            title="Suspended"
            value={stats.suspended}
            prefix={<XCircle className="w-5 h-5 text-red-600" />}
            valueStyle={{ color: '#dc2626', fontWeight: 'bold' }}
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
              onClick={filterPendingKYC}
              className="bg-orange-500 hover:bg-orange-600 border-orange-500"
            >
              Pending KYC ({stats.pending})
            </Button>
            <Button
              icon={<Download className="w-4 h-4" />}
              onClick={handleExport}
            >
              Export to CSV
            </Button>
            <Button
              type="primary"
              icon={<UserPlus className="w-4 h-4" />}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Add Publisher
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            placeholder="Search by Name, Email or ID"
            prefix={<Search className="w-4 h-4 text-gray-400" />}
            allowClear
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full"
          />
          <Select
            placeholder="KYC Status"
            allowClear
            onChange={(value) => setFilters({ ...filters, kycStatus: value })}
            className="w-full"
          >
            <Option value="pending">Pending</Option>
            <Option value="approved">Approved</Option>
            <Option value="rejected">Rejected</Option>
            <Option value="under_review">Under Review</Option>
          </Select>
          <Select
            placeholder="Account Status"
            allowClear
            onChange={(value) => setFilters({ ...filters, accountStatus: value })}
            className="w-full"
          >
            <Option value="active">Active</Option>
            <Option value="suspended">Suspended</Option>
            <Option value="banned">Banned</Option>
          </Select>
          <RangePicker 
            className="w-full"
            onChange={(dates) => setFilters({ ...filters, dateRange: dates })}
          />
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
                icon={<FaBan />}
                onClick={() => handleBulkAction('Suspend')}
                className="bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100"
              >
                Suspend Selected
              </Button>
              <Button
                icon={<FaFileExport />}
                onClick={handleExport}
              >
                Export Selected
              </Button>
            </Space>
          </div>
        )}

        {/* Table */}
        <Table
          columns={columns}
          dataSource={publishers}
          rowSelection={rowSelection}
          loading={loading}
          scroll={{ x: 1500 }}
          pagination={{
            total: publishers.length,
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} publishers`,
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

export default PublishersList;
