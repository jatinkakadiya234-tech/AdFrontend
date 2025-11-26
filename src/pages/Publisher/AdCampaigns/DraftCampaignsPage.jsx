import React, { useState } from 'react';
import { Table, Input, Select, Button, Tag, Space, Dropdown, Modal, message, Empty, Progress } from 'antd';
import {
  Search,
  Filter,
  Edit,
  Copy,
  Trash2,
  MoreVertical,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const { Option } = Select;

const DraftCampaignsPage = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedAdType, setSelectedAdType] = useState('all');
  const [selectedRows, setSelectedRows] = useState([]);

  // Mock Draft Campaigns Data
  const [draftCampaigns, setDraftCampaigns] = useState([
    {
      id: 1,
      campaignName: 'Summer Sale 2025',
      adType: 'Banner Ads',
      createdDate: '2025-11-20',
      lastModified: '2025-11-24',
      completion: {
        basicInfo: true,
        creatives: false,
        targeting: true,
        review: false,
      },
      completionPercentage: 50,
    },
    {
      id: 2,
      campaignName: 'Black Friday Special',
      adType: 'Rewarded Ads',
      createdDate: '2025-11-18',
      lastModified: '2025-11-23',
      completion: {
        basicInfo: true,
        creatives: true,
        targeting: false,
        review: false,
      },
      completionPercentage: 50,
    },
    {
      id: 3,
      campaignName: 'Product Launch Q4',
      adType: 'Interstitial Ads',
      createdDate: '2025-11-15',
      lastModified: '2025-11-22',
      completion: {
        basicInfo: true,
        creatives: true,
        targeting: true,
        review: false,
      },
      completionPercentage: 75,
    },
    {
      id: 4,
      campaignName: 'Holiday Campaign',
      adType: 'URL Shortener',
      createdDate: '2025-11-10',
      lastModified: '2025-11-20',
      completion: {
        basicInfo: true,
        creatives: false,
        targeting: false,
        review: false,
      },
      completionPercentage: 25,
    },
    {
      id: 5,
      campaignName: 'New Year Promotion',
      adType: 'Banner Ads',
      createdDate: '2025-11-05',
      lastModified: '2025-11-19',
      completion: {
        basicInfo: false,
        creatives: false,
        targeting: false,
        review: false,
      },
      completionPercentage: 0,
    },
  ]);

  // Ad Type Badge Colors
  const adTypeBadgeColor = {
    'Banner Ads': 'purple',
    'Rewarded Ads': 'green',
    'Interstitial Ads': 'blue',
    'URL Shortener': 'orange',
  };

  // Handle Continue Editing
  const handleContinueEditing = (record) => {
    message.info(`Continuing campaign: ${record.campaignName}`);
    // Navigate to campaign wizard with pre-filled data
  };

  // Handle Duplicate
  const handleDuplicate = (record) => {
    Modal.confirm({
      title: 'Duplicate Campaign',
      content: `Are you sure you want to duplicate "${record.campaignName}"?`,
      okText: 'Duplicate',
      cancelText: 'Cancel',
      onOk: () => {
        const newCampaign = {
          ...record,
          id: draftCampaigns.length + 1,
          campaignName: `${record.campaignName} (Copy)`,
          createdDate: new Date().toISOString().split('T')[0],
          lastModified: new Date().toISOString().split('T')[0],
        };
        setDraftCampaigns([...draftCampaigns, newCampaign]);
        message.success('Campaign duplicated successfully');
      },
    });
  };

  // Handle Delete
  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Delete Draft Campaign',
      content: `Are you sure you want to delete "${record.campaignName}"? This action cannot be undone.`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        setDraftCampaigns(draftCampaigns.filter((c) => c.id !== record.id));
        message.success('Campaign deleted successfully');
      },
    });
  };

  // Bulk Delete
  const handleBulkDelete = () => {
    Modal.confirm({
      title: 'Delete Selected Campaigns',
      content: `Are you sure you want to delete ${selectedRows.length} campaign(s)? This action cannot be undone.`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        setDraftCampaigns(draftCampaigns.filter((c) => !selectedRows.includes(c.id)));
        setSelectedRows([]);
        message.success(`${selectedRows.length} campaign(s) deleted successfully`);
      },
    });
  };

  // Actions Dropdown Menu
  const getActionsMenu = (record) => ({
    items: [
      {
        key: 'edit',
        label: (
          <div className="flex items-center gap-2">
            <Edit className="w-4 h-4" />
            Continue Editing
          </div>
        ),
        onClick: () => handleContinueEditing(record),
      },
      {
        key: 'duplicate',
        label: (
          <div className="flex items-center gap-2">
            <Copy className="w-4 h-4" />
            Duplicate
          </div>
        ),
        onClick: () => handleDuplicate(record),
      },
      {
        type: 'divider',
      },
      {
        key: 'delete',
        label: (
          <div className="flex items-center gap-2 text-red-600">
            <Trash2 className="w-4 h-4" />
            Delete
          </div>
        ),
        onClick: () => handleDelete(record),
        danger: true,
      },
    ],
  });

  // Table Columns
  const columns = [
    {
      title: 'Campaign Name',
      dataIndex: 'campaignName',
      key: 'campaignName',
      fixed: 'left',
      width: 250,
      render: (text, record) => (
        <div>
          <p className="font-semibold text-gray-900">{text}</p>
          <p className="text-xs text-gray-500 mt-1">ID: {record.id}</p>
        </div>
      ),
      sorter: (a, b) => a.campaignName.localeCompare(b.campaignName),
    },
    {
      title: 'Ad Type',
      dataIndex: 'adType',
      key: 'adType',
      width: 180,
      render: (adType) => (
        <Tag color={adTypeBadgeColor[adType]} className="font-medium">
          {adType}
        </Tag>
      ),
      filters: [
        { text: 'Banner Ads', value: 'Banner Ads' },
        { text: 'Rewarded Ads', value: 'Rewarded Ads' },
        { text: 'Interstitial Ads', value: 'Interstitial Ads' },
        { text: 'URL Shortener', value: 'URL Shortener' },
      ],
      onFilter: (value, record) => record.adType === value,
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      width: 130,
      render: (date) => (
        <span className="text-sm text-gray-700">
          {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      ),
      sorter: (a, b) => new Date(a.createdDate) - new Date(b.createdDate),
    },
    {
      title: 'Last Modified',
      dataIndex: 'lastModified',
      key: 'lastModified',
      width: 130,
      render: (date) => (
        <span className="text-sm text-gray-700">
          {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      ),
      sorter: (a, b) => new Date(a.lastModified) - new Date(b.lastModified),
      defaultSortOrder: 'descend',
    },
    {
      title: 'Completion Status',
      key: 'completion',
      width: 300,
      render: (_, record) => (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Progress
              percent={record.completionPercentage}
              size="small"
              strokeColor={
                record.completionPercentage === 100
                  ? '#10b981'
                  : record.completionPercentage >= 50
                  ? '#8b5cf6'
                  : '#f59e0b'
              }
              showInfo={false}
            />
            <span className="text-xs font-semibold text-gray-700">{record.completionPercentage}%</span>
          </div>
          <div className="flex flex-wrap gap-1">
            <Tag
              icon={record.completion.basicInfo ? <FaCheckCircle /> : <FaTimesCircle />}
              color={record.completion.basicInfo ? 'success' : 'default'}
              className="text-xs"
            >
              Basic Info
            </Tag>
            <Tag
              icon={record.completion.creatives ? <FaCheckCircle /> : <FaTimesCircle />}
              color={record.completion.creatives ? 'success' : 'default'}
              className="text-xs"
            >
              Creatives
            </Tag>
            <Tag
              icon={record.completion.targeting ? <FaCheckCircle /> : <FaTimesCircle />}
              color={record.completion.targeting ? 'success' : 'default'}
              className="text-xs"
            >
              Targeting
            </Tag>
          </div>
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 180,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<Edit className="w-3.5 h-3.5" />}
            onClick={() => handleContinueEditing(record)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Continue
          </Button>
          <Dropdown menu={getActionsMenu(record)} trigger={['click']} placement="bottomRight">
            <Button size="small" icon={<MoreVertical className="w-4 h-4" />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  // Filter Data
  const filteredData = draftCampaigns.filter((campaign) => {
    const matchesSearch = campaign.campaignName.toLowerCase().includes(searchText.toLowerCase());
    const matchesAdType = selectedAdType === 'all' || campaign.adType === selectedAdType;
    return matchesSearch && matchesAdType;
  });

  // Row Selection Config
  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: (selectedRowKeys) => {
      setSelectedRows(selectedRowKeys);
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Draft Campaigns</h1>
              <p className="text-gray-600">
                Manage and continue working on your saved campaign drafts
              </p>
            </div>
            <Button
              type="primary"
              size="large"
              icon={<Plus className="w-5 h-5" />}
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => message.info('Create New Campaign clicked')}
            >
              Create New Campaign
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 uppercase">Total Drafts</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{draftCampaigns.length}</p>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 uppercase">In Progress</p>
                  <p className="text-2xl font-bold text-blue-600 mt-1">
                    {draftCampaigns.filter((c) => c.completionPercentage > 0 && c.completionPercentage < 100).length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 uppercase">Ready to Submit</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">
                    {draftCampaigns.filter((c) => c.completionPercentage === 100).length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 uppercase">Not Started</p>
                  <p className="text-2xl font-bold text-orange-600 mt-1">
                    {draftCampaigns.filter((c) => c.completionPercentage === 0).length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  size="large"
                  placeholder="Search campaigns by name..."
                  prefix={<Search className="w-4 h-4 text-gray-400" />}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  allowClear
                />
              </div>
              <div className="w-full md:w-64">
                <Select
                  size="large"
                  placeholder="Filter by Ad Type"
                  value={selectedAdType}
                  onChange={setSelectedAdType}
                  className="w-full"
                  suffixIcon={<Filter className="w-4 h-4" />}
                >
                  <Option value="all">All Ad Types</Option>
                  <Option value="Banner Ads">Banner Ads</Option>
                  <Option value="Rewarded Ads">Rewarded Ads</Option>
                  <Option value="Interstitial Ads">Interstitial Ads</Option>
                  <Option value="URL Shortener">URL Shortener</Option>
                </Select>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedRows.length > 0 && (
              <div className="mt-4 flex items-center justify-between bg-purple-50 border border-purple-200 rounded-lg p-3">
                <p className="text-sm font-medium text-purple-900">
                  {selectedRows.length} campaign(s) selected
                </p>
                <Space>
                  <Button size="small" onClick={() => setSelectedRows([])}>
                    Clear Selection
                  </Button>
                  <Button
                    size="small"
                    danger
                    icon={<Trash2 className="w-3.5 h-3.5" />}
                    onClick={handleBulkDelete}
                  >
                    Delete Selected
                  </Button>
                </Space>
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            rowSelection={rowSelection}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} campaigns`,
              pageSizeOptions: ['10', '20', '50', '100'],
            }}
            scroll={{ x: 1200 }}
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-2">No draft campaigns found</p>
                      <Button
                        type="primary"
                        icon={<Plus className="w-4 h-4" />}
                        onClick={() => message.info('Create New Campaign clicked')}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Create Your First Campaign
                      </Button>
                    </div>
                  }
                />
              ),
            }}
          />
        </div>

        {/* Info Banner */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-900 mb-1">💡 Pro Tip</p>
              <p className="text-sm text-blue-800">
                Draft campaigns are automatically saved as you progress through the campaign creation wizard.
                You can return anytime to continue where you left off.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftCampaignsPage;
