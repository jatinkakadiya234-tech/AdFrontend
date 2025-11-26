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
  Statistic,
  Avatar,
  Tooltip,
  Progress,
  message
} from 'antd';
import {
  Search,
  Download,
  Eye,
  Edit,
  Ban,
  Trash2,
  MoreVertical,
  CheckCircle,
  Clock,
  User,
  Globe,
  BadgeCheck,
  Link2,
  DollarSign
} from 'lucide-react';

const { RangePicker } = DatePicker;
const { Option } = Select;

const generateViewersData = () => Array.from({ length: 40 }, (_, i) => ({
  key: i + 1,
  viewerId: `VIEW${String(i + 1).padStart(5, '0')}`,
  name: ['NewsDaily', 'GamePortal', 'EducateNow', 'FoodiePlace', 'TravelBook'][i % 5],
  company: ['NewsDaily LLC', 'Game Portal Inc.', 'Edu Now', 'Foodie Place', 'Travel Book'][i % 5],
  email: `viewer${i + 1}@example.com`,
  registrationDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
  platforms: Math.floor(Math.random() * 5) + 1,
  verificationStatus: ['pending', 'approved', 'rejected'][Math.floor(Math.random() * 3)],
  accountStatus: ['active', 'suspended', 'banned'][Math.floor(Math.random() * 3)],
  earnings: Math.floor(Math.random() * 5000) + 250,
  totalEarnings: Math.floor(Math.random() * 12000) + 1500,
  adImpressions: Math.floor(Math.random() * 100000) + 12500,
  integrationStatus: ['integrated', 'not_integrated'][Math.floor(Math.random() * 2)],
  avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${i}`
}));

const ViewersList = () => {
  const [viewers, setViewers] = useState(generateViewersData());
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // Stat Cards
  const stats = {
    total: viewers.length,
    pending: viewers.filter(v => v.verificationStatus === 'pending').length,
    active: viewers.filter(v => v.accountStatus === 'active').length,
    platforms: viewers.reduce((sum, v) => sum + v.platforms, 0),
    earnings: viewers.reduce((sum, v) => sum + v.totalEarnings, 0)
  };

  // Helper badges
  const getVerificationBadge = status => ({
    pending: <Tag color="warning">Pending</Tag>,
    approved: <Tag color="success">Approved</Tag>,
    rejected: <Tag color="error">Rejected</Tag>
  }[status]);

  const getAccountBadge = status => ({
    active: <Tag color="success">Active</Tag>,
    suspended: <Tag color="warning">Suspended</Tag>,
    banned: <Tag color="error">Banned</Tag>
  }[status]);

  const getIntegrationBadge = status => ({
    integrated: <Tag color="success">Integrated</Tag>,
    not_integrated: <Tag color="default">Not Integrated</Tag>
  }[status]);

  // Table columns
  const columns = [
    {
      title: 'Viewer',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      width: 220,
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <Avatar src={record.avatar}>{text[0]}</Avatar>
          <div>
            <div className="font-semibold text-gray-900">{text}</div>
            <div className="text-xs text-gray-500">{record.viewerId}</div>
          </div>
        </div>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 200,
      render: email => <span className="text-gray-600">{email}</span>
    },
    {
      title: 'Reg. Date',
      dataIndex: 'registrationDate',
      width: 130
    },
    {
      title: 'Platforms',
      dataIndex: 'platforms',
      width: 100,
      render: num => <span className="font-bold text-blue-700">{num}</span>
    },
    {
      title: 'Verification',
      dataIndex: 'verificationStatus',
      width: 120,
      render: getVerificationBadge,
      filters: [
        { text: 'Pending', value: 'pending' },
        { text: 'Approved', value: 'approved' },
        { text: 'Rejected', value: 'rejected' }
      ],
      onFilter: (val, record) => record.verificationStatus === val
    },
    {
      title: 'Status',
      dataIndex: 'accountStatus',
      width: 100,
      render: getAccountBadge,
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Suspended', value: 'suspended' },
        { text: 'Banned', value: 'banned' }
      ],
      onFilter: (val, record) => record.accountStatus === val
    },
    {
      title: 'Earnings',
      key: 'earnings',
      width: 140,
      render: (_, record) => (
        <div>
          <span className="font-semibold text-green-700">${record.earnings}</span>
          <div className="text-xs text-gray-400">Total: ${record.totalEarnings}</div>
        </div>
      )
    },
    {
      title: 'Impressions',
      dataIndex: 'adImpressions',
      width: 120,
      render: val => <span className="font-semibold text-blue-600">{val.toLocaleString()}</span>
    },
    {
      title: 'Integration',
      dataIndex: 'integrationStatus',
      width: 120,
      render: getIntegrationBadge,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button 
              type="text" 
              icon={<Eye />}
              href={`/admin/viewers/${record.viewerId}`}
            />
          </Tooltip>
          <Dropdown 
            overlay={
              <Menu>
                <Menu.Item key="edit" icon={<Edit />}>Edit</Menu.Item>
                <Menu.Item key="suspend" icon={<Ban />} danger>Suspend</Menu.Item>
                <Menu.Item key="delete" icon={<Trash2 />} danger>Delete</Menu.Item>
              </Menu>
            }
          >
            <Button type="text" icon={<MoreVertical />} />
          </Dropdown>
        </Space>
      )
    }
  ];

  // Row selection
  const rowSelection = {
    selectedRowKeys,
    onChange: keys => setSelectedRowKeys(keys)
  };

  // Bulk actions handler
  const handleBulkAction = action => {
    Modal.confirm({
      title: `${action} Selected Viewers`,
      content: `Are you sure you want to ${action.toLowerCase()} ${selectedRowKeys.length} viewer(s)?`,
      onOk: () => {
        message.success(`Successfully ${action.toLowerCase()}ed ${selectedRowKeys.length} viewer(s)`);
        setSelectedRowKeys([]);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Viewer Management</h1>
        <p className="text-gray-600">Manage all website and app owners in your network</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Card><Statistic title="Total Viewers" value={stats.total} prefix={<User className="w-5 h-5 text-blue-600" />} /></Card>
        <Card><Statistic title="Pending Verifications" value={stats.pending} prefix={<Clock className="w-5 h-5 text-orange-600" />} /></Card>
        <Card><Statistic title="Active Viewers" value={stats.active} prefix={<CheckCircle className="w-5 h-5 text-green-600" />} /></Card>
        <Card><Statistic title="Total Platforms" value={stats.platforms} prefix={<Globe className="w-5 h-5 text-purple-600" />} /></Card>
        <Card><Statistic title="Total Earnings Paid" value={stats.earnings} prefix={<DollarSign className="w-5 h-5 text-green-700" />} formatter={val => `$${val}`} /></Card>
      </div>

      <Card>
        {/* Filter Bar */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input placeholder="Search by Name, Email or Platform" prefix={<Search />} />
          <Select placeholder="Verification Status" allowClear>
            <Option value="pending">Pending</Option>
            <Option value="approved">Approved</Option>
            <Option value="rejected">Rejected</Option>
          </Select>
          <Select placeholder="Platform Type" allowClear>
            <Option value="website">Website</Option>
            <Option value="app">App</Option>
          </Select>
          <RangePicker />
        </div>
        {/* Bulk Actions */}
        {selectedRowKeys.length > 0 && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex flex-wrap items-center gap-3">
            <span className="font-semibold text-blue-900">{selectedRowKeys.length} selected</span>
            <Space>
              <Button icon={<CheckCircle />} onClick={() => handleBulkAction('Approve')} className="bg-green-100 text-green-700">Approve</Button>
              <Button icon={<Ban />} onClick={() => handleBulkAction('Reject')} danger>Reject</Button>
              <Button icon={<Ban />} onClick={() => handleBulkAction('Suspend')} className="bg-orange-100 text-orange-700">Suspend</Button>
              <Button icon={<Download />}>Export</Button>
            </Space>
          </div>
        )}
        <Table
          columns={columns}
          dataSource={viewers}
          rowSelection={rowSelection}
          scroll={{ x: 1300 }}
          pagination={{ pageSize: 10 }}
          className="custom-table"
        />
      </Card>
      <style jsx>{`
        .custom-table .ant-table-thead > tr > th { background-color: #f8fafc; font-weight: 600; font-size: 0.875rem; }
        .custom-table .ant-table-tbody > tr:hover > td { background-color: #f8fafc; }
      `}</style>
    </div>
  );
};

export default ViewersList;
