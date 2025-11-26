import { useState } from 'react';
import { Table, Input, Select, DatePicker, Button, Dropdown, Tag, Checkbox, Space, Modal, message } from 'antd';
import {
  Search,
  Filter,
  Download,
  MoreVertical,
  Eye,
  Edit,
  Play,
  Pause,
  Copy,
  BarChart3,
  Code,
  Trash2,
  Plus,
  RefreshCw,
} from 'lucide-react';
import { FaCheckCircle, FaPause, FaClock, FaTimes, FaCircle } from 'react-icons/fa';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;

const AllCampaignsPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [adTypeFilter, setAdTypeFilter] = useState('All');
  const [dateRange, setDateRange] = useState(null);
  const [sortBy, setSortBy] = useState('created');

  // Mock Data
  const campaignsData = [
    {
      key: '1',
      id: 'CMP-2025-001',
      name: 'Summer Sale 2025',
      adType: 'Banner',
      status: 'Active',
      startDate: '2025-01-15',
      endDate: '2025-03-31',
      impressions: 850420,
      clicks: 12580,
      ctr: 1.48,
      earnings: 2765.50,
    },
    {
      key: '2',
      id: 'CMP-2025-002',
      name: 'Black Friday Special',
      adType: 'Interstitial',
      status: 'Active',
      startDate: '2025-01-10',
      endDate: '2025-02-28',
      impressions: 620150,
      clicks: 9820,
      ctr: 1.58,
      earnings: 2015.30,
    },
    {
      key: '3',
      id: 'CMP-2025-003',
      name: 'Product Launch Campaign',
      adType: 'Rewarded',
      status: 'Paused',
      startDate: '2025-01-05',
      endDate: '2025-04-30',
      impressions: 485200,
      clicks: 8200,
      ctr: 1.69,
      earnings: 1578.90,
    },
    {
      key: '4',
      id: 'CMP-2025-004',
      name: 'Holiday Promo',
      adType: 'Banner',
      status: 'Active',
      startDate: '2025-01-20',
      endDate: '2025-03-15',
      impressions: 395800,
      clicks: 6530,
      ctr: 1.65,
      earnings: 1285.20,
    },
    {
      key: '5',
      id: 'CMP-2025-005',
      name: 'New Year Campaign',
      adType: 'URL Shortener',
      status: 'Pending Approval',
      startDate: '2025-02-01',
      endDate: '2025-04-30',
      impressions: 0,
      clicks: 0,
      ctr: 0,
      earnings: 0,
    },
    {
      key: '6',
      id: 'CMP-2025-006',
      name: 'Winter Collection',
      adType: 'Banner',
      status: 'Rejected',
      startDate: '2025-01-12',
      endDate: '2025-02-28',
      impressions: 0,
      clicks: 0,
      ctr: 0,
      earnings: 0,
    },
    {
      key: '7',
      id: 'CMP-2024-050',
      name: 'Year End Sale',
      adType: 'Interstitial',
      status: 'Ended',
      startDate: '2024-12-01',
      endDate: '2024-12-31',
      impressions: 1250000,
      clicks: 18500,
      ctr: 1.48,
      earnings: 4075.00,
    },
  ];

  // Status Badge Configuration
  const getStatusConfig = (status) => {
    const configs = {
      'Active': { color: 'success', icon: <FaCheckCircle className="w-3 h-3" />, bgColor: 'bg-green-100', textColor: 'text-green-700' },
      'Paused': { color: 'warning', icon: <FaPause className="w-3 h-3" />, bgColor: 'bg-yellow-100', textColor: 'text-yellow-700' },
      'Pending Approval': { color: 'processing', icon: <FaClock className="w-3 h-3" />, bgColor: 'bg-blue-100', textColor: 'text-blue-700' },
      'Rejected': { color: 'error', icon: <FaTimes className="w-3 h-3" />, bgColor: 'bg-red-100', textColor: 'text-red-700' },
      'Ended': { color: 'default', icon: <FaCircle className="w-3 h-3" />, bgColor: 'bg-gray-100', textColor: 'text-gray-700' },
    };
    return configs[status] || configs['Active'];
  };

  // Ad Type Badge
  const getAdTypeBadge = (type) => {
    const colors = {
      'Banner': 'purple',
      'Rewarded': 'green',
      'Interstitial': 'blue',
      'URL Shortener': 'orange',
    };
    return <Tag color={colors[type]}>{type}</Tag>;
  };

  // Actions Menu Items
  const getActionMenuItems = (record) => {
    const items = [
      {
        key: 'view',
        label: (
          <div className="flex items-center gap-2 px-2 py-1">
            <Eye className="w-4 h-4" />
            View Details
          </div>
        ),
      },
    ];

    if (record.status === 'Paused' || record.status === 'Pending Approval') {
      items.push({
        key: 'edit',
        label: (
          <div className="flex items-center gap-2 px-2 py-1">
            <Edit className="w-4 h-4" />
            Edit
          </div>
        ),
      });
    }

    if (record.status === 'Active') {
      items.push({
        key: 'pause',
        label: (
          <div className="flex items-center gap-2 px-2 py-1">
            <Pause className="w-4 h-4" />
            Pause Campaign
          </div>
        ),
      });
    }

    if (record.status === 'Paused') {
      items.push({
        key: 'resume',
        label: (
          <div className="flex items-center gap-2 px-2 py-1">
            <Play className="w-4 h-4" />
            Resume Campaign
          </div>
        ),
      });
    }

    items.push(
      {
        key: 'duplicate',
        label: (
          <div className="flex items-center gap-2 px-2 py-1">
            <Copy className="w-4 h-4" />
            Duplicate Campaign
          </div>
        ),
      },
      {
        key: 'analytics',
        label: (
          <div className="flex items-center gap-2 px-2 py-1">
            <BarChart3 className="w-4 h-4" />
            View Analytics
          </div>
        ),
      },
      {
        key: 'code',
        label: (
          <div className="flex items-center gap-2 px-2 py-1">
            <Code className="w-4 h-4" />
            Get Ad Code
          </div>
        ),
      }
    );

    if (record.status === 'Pending Approval' || record.status === 'Rejected') {
      items.push({
        key: 'delete',
        label: (
          <div className="flex items-center gap-2 px-2 py-1 text-red-600">
            <Trash2 className="w-4 h-4" />
            Delete
          </div>
        ),
        danger: true,
      });
    }

    return items;
  };

  // Handle Action Menu Click
  const handleMenuClick = (key, record) => {
    switch (key) {
      case 'view':
        message.info(`Viewing details for: ${record.name}`);
        break;
      case 'edit':
        message.info(`Editing: ${record.name}`);
        break;
      case 'pause':
        message.success(`Campaign "${record.name}" paused`);
        break;
      case 'resume':
        message.success(`Campaign "${record.name}" resumed`);
        break;
      case 'duplicate':
        message.success(`Campaign "${record.name}" duplicated`);
        break;
      case 'analytics':
        message.info(`Opening analytics for: ${record.name}`);
        break;
      case 'code':
        message.info(`Generating ad code for: ${record.name}`);
        break;
      case 'delete':
        Modal.confirm({
          title: 'Delete Campaign',
          content: `Are you sure you want to delete "${record.name}"?`,
          okText: 'Delete',
          okType: 'danger',
          onOk() {
            message.success(`Campaign "${record.name}" deleted`);
          },
        });
        break;
      default:
        break;
    }
  };

  // Table Columns
  const columns = [
    {
      title: 'Campaign ID',
      dataIndex: 'id',
      key: 'id',
      width: 130,
      fixed: 'left',
      render: (text) => <span className="font-mono text-xs text-gray-600">{text}</span>,
    },
    {
      title: 'Campaign Name',
      dataIndex: 'name',
      key: 'name',
      width: 220,
      fixed: 'left',
      render: (text) => <span className="font-semibold text-gray-900">{text}</span>,
    },
    {
      title: 'Ad Type',
      dataIndex: 'adType',
      key: 'adType',
      width: 140,
      render: (type) => getAdTypeBadge(type),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 160,
      render: (status) => {
        const config = getStatusConfig(status);
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}>
            {config.icon}
            {status}
          </span>
        );
      },
    },
    {
      title: 'Duration',
      key: 'duration',
      width: 180,
      render: (_, record) => (
        <div className="text-xs">
          <div className="text-gray-900 font-medium">{dayjs(record.startDate).format('MMM D, YYYY')}</div>
          <div className="text-gray-500">{dayjs(record.endDate).format('MMM D, YYYY')}</div>
        </div>
      ),
    },
    {
      title: 'Impressions',
      dataIndex: 'impressions',
      key: 'impressions',
      width: 120,
      sorter: (a, b) => a.impressions - b.impressions,
      render: (value) => <span className="font-medium text-gray-900">{value.toLocaleString()}</span>,
    },
    {
      title: 'Clicks',
      dataIndex: 'clicks',
      key: 'clicks',
      width: 100,
      sorter: (a, b) => a.clicks - b.clicks,
      render: (value) => <span className="font-medium text-gray-900">{value.toLocaleString()}</span>,
    },
    {
      title: 'CTR',
      dataIndex: 'ctr',
      key: 'ctr',
      width: 90,
      sorter: (a, b) => a.ctr - b.ctr,
      render: (value) => (
        <span className={`font-semibold ${value > 1.5 ? 'text-green-600' : 'text-gray-900'}`}>
          {value.toFixed(2)}%
        </span>
      ),
    },
    {
      title: 'Earnings',
      dataIndex: 'earnings',
      key: 'earnings',
      width: 120,
      sorter: (a, b) => a.earnings - b.earnings,
      render: (value) => <span className="font-semibold text-green-600">${value.toLocaleString()}</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 80,
      fixed: 'right',
      render: (_, record) => (
        <Dropdown
          menu={{
            items: getActionMenuItems(record),
            onClick: ({ key }) => handleMenuClick(key, record),
          }}
          trigger={['click']}
        >
          <Button
            type="text"
            icon={<MoreVertical className="w-4 h-4" />}
            className="hover:bg-gray-100"
          />
        </Dropdown>
      ),
    },
  ];

  // Row Selection
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
  };

  // Bulk Actions
  const handleBulkPause = () => {
    Modal.confirm({
      title: 'Pause Selected Campaigns',
      content: `Are you sure you want to pause ${selectedRowKeys.length} campaign(s)?`,
      okText: 'Pause',
      onOk() {
        message.success(`${selectedRowKeys.length} campaign(s) paused`);
        setSelectedRowKeys([]);
      },
    });
  };

  const handleBulkResume = () => {
    message.success(`${selectedRowKeys.length} campaign(s) resumed`);
    setSelectedRowKeys([]);
  };

  const handleBulkExport = () => {
    message.success(`Exporting ${selectedRowKeys.length} campaign(s) to CSV`);
    setSelectedRowKeys([]);
  };

  // Filter Data
  const filteredData = campaignsData.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         campaign.id.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === 'All' || campaign.status === statusFilter;
    const matchesAdType = adTypeFilter === 'All' || campaign.adType === adTypeFilter;
    
    return matchesSearch && matchesStatus && matchesAdType;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">All Campaigns</h1>
              <p className="text-gray-600">Manage and monitor all your advertising campaigns</p>
            </div>
            <Button
              type="primary"
              size="large"
              icon={<Plus className="w-5 h-5" />}
              className="bg-gradient-to-r from-purple-600 to-purple-700 border-0 font-semibold hover:shadow-lg h-12"
            >
              Create New Campaign
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <p className="text-xs font-medium text-gray-600 mb-1">Total Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">{campaignsData.length}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <p className="text-xs font-medium text-gray-600 mb-1">Active</p>
              <p className="text-2xl font-bold text-green-600">
                {campaignsData.filter(c => c.status === 'Active').length}
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <p className="text-xs font-medium text-gray-600 mb-1">Paused</p>
              <p className="text-2xl font-bold text-yellow-600">
                {campaignsData.filter(c => c.status === 'Paused').length}
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <p className="text-xs font-medium text-gray-600 mb-1">Pending</p>
              <p className="text-2xl font-bold text-blue-600">
                {campaignsData.filter(c => c.status === 'Pending Approval').length}
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <p className="text-xs font-medium text-gray-600 mb-1">Ended</p>
              <p className="text-2xl font-bold text-gray-600">
                {campaignsData.filter(c => c.status === 'Ended').length}
              </p>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Filters & Search</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <Input
              placeholder="Search campaigns..."
              prefix={<Search className="w-4 h-4 text-gray-400" />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="h-10"
              allowClear
            />

            {/* Status Filter */}
            <Select
              placeholder="Filter by Status"
              value={statusFilter}
              onChange={setStatusFilter}
              className="w-full"
              size="large"
            >
              <Option value="All">All Status</Option>
              <Option value="Active">Active</Option>
              <Option value="Paused">Paused</Option>
              <Option value="Pending Approval">Pending Approval</Option>
              <Option value="Rejected">Rejected</Option>
              <Option value="Ended">Ended</Option>
            </Select>

            {/* Ad Type Filter */}
            <Select
              placeholder="Filter by Ad Type"
              value={adTypeFilter}
              onChange={setAdTypeFilter}
              className="w-full"
              size="large"
            >
              <Option value="All">All Ad Types</Option>
              <Option value="Banner">Banner</Option>
              <Option value="Rewarded">Rewarded</Option>
              <Option value="Interstitial">Interstitial</Option>
              <Option value="URL Shortener">URL Shortener</Option>
            </Select>

            {/* Date Range */}
            <RangePicker
              value={dateRange}
              onChange={setDateRange}
              className="w-full"
              size="large"
              placeholder={['Start Date', 'End Date']}
            />

            {/* Sort By */}
            <Select
              placeholder="Sort by"
              value={sortBy}
              onChange={setSortBy}
              className="w-full"
              size="large"
            >
              <Option value="created">Created Date</Option>
              <Option value="earnings">Earnings</Option>
              <Option value="impressions">Impressions</Option>
              <Option value="ctr">CTR</Option>
            </Select>
          </div>

          {/* Active Filters Display */}
          {(searchText || statusFilter !== 'All' || adTypeFilter !== 'All' || dateRange) && (
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-gray-600">Active Filters:</span>
              {searchText && (
                <Tag closable onClose={() => setSearchText('')} className="text-xs">
                  Search: {searchText}
                </Tag>
              )}
              {statusFilter !== 'All' && (
                <Tag closable onClose={() => setStatusFilter('All')} color="blue" className="text-xs">
                  Status: {statusFilter}
                </Tag>
              )}
              {adTypeFilter !== 'All' && (
                <Tag closable onClose={() => setAdTypeFilter('All')} color="purple" className="text-xs">
                  Type: {adTypeFilter}
                </Tag>
              )}
              {dateRange && (
                <Tag closable onClose={() => setDateRange(null)} color="green" className="text-xs">
                  Date Range Selected
                </Tag>
              )}
              <Button
                type="link"
                size="small"
                onClick={() => {
                  setSearchText('');
                  setStatusFilter('All');
                  setAdTypeFilter('All');
                  setDateRange(null);
                }}
                className="text-xs text-red-600 hover:text-red-700"
              >
                Clear All
              </Button>
            </div>
          )}
        </div>

        {/* Bulk Actions Bar */}
        {selectedRowKeys.length > 0 && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={selectedRowKeys.length === filteredData.length}
                indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < filteredData.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedRowKeys(filteredData.map(item => item.key));
                  } else {
                    setSelectedRowKeys([]);
                  }
                }}
              />
              <span className="text-sm font-semibold text-purple-900">
                {selectedRowKeys.length} campaign(s) selected
              </span>
            </div>
            <Space>
              <Button
                icon={<Pause className="w-4 h-4" />}
                onClick={handleBulkPause}
                className="font-medium"
              >
                Pause Selected
              </Button>
              <Button
                icon={<Play className="w-4 h-4" />}
                onClick={handleBulkResume}
                className="font-medium"
              >
                Resume Selected
              </Button>
              <Button
                icon={<Download className="w-4 h-4" />}
                onClick={handleBulkExport}
                className="font-medium"
              >
                Export to CSV
              </Button>
              <Button
                type="text"
                icon={<RefreshCw className="w-4 h-4" />}
                onClick={() => setSelectedRowKeys([])}
                className="text-gray-600 hover:text-gray-900"
              >
                Clear Selection
              </Button>
            </Space>
          </div>
        )}

        {/* Campaigns Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredData}
            pagination={{
              total: filteredData.length,
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} campaigns`,
              className: 'px-6 py-4',
            }}
            scroll={{ x: 1400 }}
            className="custom-table"
          />
        </div>
      </div>
    </div>
  );
};

export default AllCampaignsPage;
