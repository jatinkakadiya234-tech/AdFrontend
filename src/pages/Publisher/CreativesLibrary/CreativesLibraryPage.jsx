import React, { useState } from 'react';
import {
  Table,
  Input,
  Select,
  Button,
  Tag,
  Space,
  Dropdown,
  Modal,
  message,
  Empty,
  Card,
  Upload,
  DatePicker,
  Checkbox,
  Radio,
  Tooltip,
} from 'antd';
import {
  Search,
  Filter,
  Grid3x3,
  List,
  Upload as UploadIcon,
  Edit,
  Trash2,
  Download,
  MoreVertical,
  Plus,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Image as ImageIcon,
  Video,
  Code,
  Tag as TagIcon,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

const { Option } = Select;
const { RangePicker } = DatePicker;

const CreativesLibraryPage = () => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchText, setSearchText] = useState('');
  const [selectedAdType, setSelectedAdType] = useState('all');
  const [selectedBannerSize, setSelectedBannerSize] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRows, setSelectedRows] = useState([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Mock Creatives Data
  const [creatives, setCreatives] = useState([
    {
      id: 1,
      name: 'Summer Sale Banner',
      type: 'Banner',
      size: '300x250',
      uploadedDate: '2025-11-22',
      status: 'Approved',
      usedInCampaigns: 3,
      previewUrl: 'https://via.placeholder.com/300x250/8b5cf6/ffffff?text=Summer+Sale',
      fileSize: '245 KB',
      dimensions: '300x250',
    },
    {
      id: 2,
      name: 'Black Friday Video',
      type: 'Video',
      size: 'N/A',
      uploadedDate: '2025-11-20',
      status: 'Approved',
      usedInCampaigns: 5,
      previewUrl: 'https://via.placeholder.com/400x300/10b981/ffffff?text=Video+Ad',
      fileSize: '12.5 MB',
      dimensions: '1920x1080',
    },
    {
      id: 3,
      name: 'Holiday Leaderboard',
      type: 'Banner',
      size: '728x90',
      uploadedDate: '2025-11-18',
      status: 'Pending',
      usedInCampaigns: 0,
      previewUrl: 'https://via.placeholder.com/728x90/3b82f6/ffffff?text=Holiday+Leaderboard',
      fileSize: '180 KB',
      dimensions: '728x90',
    },
    {
      id: 4,
      name: 'Interactive HTML5 Ad',
      type: 'HTML5',
      size: 'N/A',
      uploadedDate: '2025-11-15',
      status: 'Approved',
      usedInCampaigns: 2,
      previewUrl: 'https://via.placeholder.com/300x250/f59e0b/ffffff?text=HTML5',
      fileSize: '850 KB',
      dimensions: '300x250',
    },
    {
      id: 5,
      name: 'Product Launch Banner',
      type: 'Banner',
      size: '300x600',
      uploadedDate: '2025-11-10',
      status: 'Rejected',
      usedInCampaigns: 0,
      previewUrl: 'https://via.placeholder.com/300x600/ef4444/ffffff?text=Rejected',
      fileSize: '320 KB',
      dimensions: '300x600',
    },
    {
      id: 6,
      name: 'Mobile Banner Ad',
      type: 'Banner',
      size: '320x50',
      uploadedDate: '2025-11-08',
      status: 'Approved',
      usedInCampaigns: 7,
      previewUrl: 'https://via.placeholder.com/320x50/8b5cf6/ffffff?text=Mobile',
      fileSize: '95 KB',
      dimensions: '320x50',
    },
  ]);

  // Status Badge Config
  const statusConfig = {
    Approved: { color: 'success', icon: <FaCheckCircle /> },
    Rejected: { color: 'error', icon: <FaTimesCircle /> },
    Pending: { color: 'warning', icon: <FaClock /> },
  };

  // Ad Type Badge Colors
  const adTypeColor = {
    Banner: 'purple',
    Video: 'green',
    HTML5: 'blue',
  };

  // Ad Type Icons
  const adTypeIcons = {
    Banner: <ImageIcon className="w-4 h-4" />,
    Video: <Video className="w-4 h-4" />,
    HTML5: <Code className="w-4 h-4" />,
  };

  // Handle View Creative
  const handleViewCreative = (record) => {
    Modal.info({
      title: record.name,
      width: 800,
      content: (
        <div className="space-y-4">
          <img src={record.previewUrl} alt={record.name} className="w-full rounded-lg" />
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Type:</p>
              <p className="font-semibold">{record.type}</p>
            </div>
            <div>
              <p className="text-gray-600">Dimensions:</p>
              <p className="font-semibold">{record.dimensions}</p>
            </div>
            <div>
              <p className="text-gray-600">File Size:</p>
              <p className="font-semibold">{record.fileSize}</p>
            </div>
            <div>
              <p className="text-gray-600">Status:</p>
              <Tag color={statusConfig[record.status].color}>{record.status}</Tag>
            </div>
          </div>
        </div>
      ),
    });
  };

  // Handle Edit Creative
  const handleEditCreative = (record) => {
    message.info(`Editing: ${record.name}`);
  };

  // Handle Download Creative
  const handleDownloadCreative = (record) => {
    message.success(`Downloading: ${record.name}`);
  };

  // Handle Delete Creative
  const handleDeleteCreative = (record) => {
    Modal.confirm({
      title: 'Delete Creative',
      content: `Are you sure you want to delete "${record.name}"? This action cannot be undone.`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        setCreatives(creatives.filter((c) => c.id !== record.id));
        message.success('Creative deleted successfully');
      },
    });
  };

  // Bulk Delete
  const handleBulkDelete = () => {
    Modal.confirm({
      title: 'Delete Selected Creatives',
      content: `Are you sure you want to delete ${selectedRows.length} creative(s)? This action cannot be undone.`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        setCreatives(creatives.filter((c) => !selectedRows.includes(c.id)));
        setSelectedRows([]);
        message.success(`${selectedRows.length} creative(s) deleted successfully`);
      },
    });
  };

  // Bulk Download
  const handleBulkDownload = () => {
    message.success(`Downloading ${selectedRows.length} creative(s)`);
  };

  // Actions Dropdown Menu
  const getActionsMenu = (record) => ({
    items: [
      {
        key: 'view',
        label: (
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            View Details
          </div>
        ),
        onClick: () => handleViewCreative(record),
      },
      {
        key: 'edit',
        label: (
          <div className="flex items-center gap-2">
            <Edit className="w-4 h-4" />
            Edit
          </div>
        ),
        onClick: () => handleEditCreative(record),
      },
      {
        key: 'download',
        label: (
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download
          </div>
        ),
        onClick: () => handleDownloadCreative(record),
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
        onClick: () => handleDeleteCreative(record),
        danger: true,
      },
    ],
  });

  // Table Columns
  const columns = [
    {
      title: 'Preview',
      dataIndex: 'previewUrl',
      key: 'preview',
      width: 120,
      render: (url, record) => (
        <div
          className="w-20 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer"
          onClick={() => handleViewCreative(record)}
        >
          <img src={url} alt={record.name} className="w-full h-full object-cover" />
        </div>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <p className="font-semibold text-gray-900">{text}</p>
          <p className="text-xs text-gray-500 mt-1">
            {record.fileSize} • {record.dimensions}
          </p>
        </div>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 150,
      render: (type, record) => (
        <Tag color={adTypeColor[type]} icon={adTypeIcons[type]} className="font-medium">
          {type} {record.size !== 'N/A' && `(${record.size})`}
        </Tag>
      ),
      filters: [
        { text: 'Banner', value: 'Banner' },
        { text: 'Video', value: 'Video' },
        { text: 'HTML5', value: 'HTML5' },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: 'Uploaded',
      dataIndex: 'uploadedDate',
      key: 'uploadedDate',
      width: 130,
      render: (date) => (
        <span className="text-sm text-gray-700">
          {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      ),
      sorter: (a, b) => new Date(a.uploadedDate) - new Date(b.uploadedDate),
      defaultSortOrder: 'descend',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: (status) => (
        <Tag color={statusConfig[status].color} icon={statusConfig[status].icon} className="font-medium">
          {status}
        </Tag>
      ),
      filters: [
        { text: 'Approved', value: 'Approved' },
        { text: 'Pending', value: 'Pending' },
        { text: 'Rejected', value: 'Rejected' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Used In',
      dataIndex: 'usedInCampaigns',
      key: 'usedInCampaigns',
      width: 100,
      render: (count) => (
        <span className="text-sm font-semibold text-purple-600">
          {count} {count === 1 ? 'campaign' : 'campaigns'}
        </span>
      ),
      sorter: (a, b) => a.usedInCampaigns - b.usedInCampaigns,
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Button size="small" icon={<Eye className="w-3.5 h-3.5" />} onClick={() => handleViewCreative(record)}>
            View
          </Button>
          <Button
            size="small"
            icon={<Download className="w-3.5 h-3.5" />}
            onClick={() => handleDownloadCreative(record)}
          />
          <Dropdown menu={getActionsMenu(record)} trigger={['click']} placement="bottomRight">
            <Button size="small" icon={<MoreVertical className="w-4 h-4" />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  // Filter Data
  const filteredData = creatives.filter((creative) => {
    const matchesSearch = creative.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesAdType = selectedAdType === 'all' || creative.type === selectedAdType;
    const matchesBannerSize = selectedBannerSize === 'all' || creative.size === selectedBannerSize;
    const matchesStatus = selectedStatus === 'all' || creative.status === selectedStatus;
    return matchesSearch && matchesAdType && matchesBannerSize && matchesStatus;
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Creatives Library</h1>
              <p className="text-gray-600">Centralized repository for all your ad creatives</p>
            </div>
            <Button
              type="primary"
              size="large"
              icon={<Plus className="w-5 h-5" />}
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => setIsUploadModalOpen(true)}
            >
              Upload New Creative
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 uppercase">Total Creatives</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{creatives.length}</p>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 uppercase">Approved</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">
                    {creatives.filter((c) => c.status === 'Approved').length}
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
                  <p className="text-xs font-medium text-gray-600 uppercase">Pending</p>
                  <p className="text-2xl font-bold text-orange-600 mt-1">
                    {creatives.filter((c) => c.status === 'Pending').length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 uppercase">Rejected</p>
                  <p className="text-2xl font-bold text-red-600 mt-1">
                    {creatives.filter((c) => c.status === 'Rejected').length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters & View Toggle */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex flex-col gap-4">
              {/* Search and View Toggle */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    size="large"
                    placeholder="Search creatives by name..."
                    prefix={<Search className="w-4 h-4 text-gray-400" />}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    allowClear
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Radio.Group value={viewMode} onChange={(e) => setViewMode(e.target.value)} buttonStyle="solid">
                    <Radio.Button value="grid">
                      <Grid3x3 className="w-4 h-4" />
                    </Radio.Button>
                    <Radio.Button value="list">
                      <List className="w-4 h-4" />
                    </Radio.Button>
                  </Radio.Group>
                </div>
              </div>

              {/* Advanced Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select
                  size="large"
                  placeholder="All Ad Types"
                  value={selectedAdType}
                  onChange={setSelectedAdType}
                  className="w-full"
                  suffixIcon={<Filter className="w-4 h-4" />}
                >
                  <Option value="all">All Ad Types</Option>
                  <Option value="Banner">Banner</Option>
                  <Option value="Video">Video</Option>
                  <Option value="HTML5">HTML5</Option>
                </Select>

                <Select
                  size="large"
                  placeholder="All Banner Sizes"
                  value={selectedBannerSize}
                  onChange={setSelectedBannerSize}
                  className="w-full"
                  disabled={selectedAdType !== 'all' && selectedAdType !== 'Banner'}
                >
                  <Option value="all">All Sizes</Option>
                  <Option value="300x250">300×250</Option>
                  <Option value="728x90">728×90</Option>
                  <Option value="320x50">320×50</Option>
                  <Option value="300x600">300×600</Option>
                </Select>

                <Select
                  size="large"
                  placeholder="All Statuses"
                  value={selectedStatus}
                  onChange={setSelectedStatus}
                  className="w-full"
                >
                  <Option value="all">All Statuses</Option>
                  <Option value="Approved">Approved</Option>
                  <Option value="Pending">Pending</Option>
                  <Option value="Rejected">Rejected</Option>
                </Select>

                <Button size="large" icon={<Calendar className="w-4 h-4" />} className="w-full">
                  Date Range
                </Button>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedRows.length > 0 && (
              <div className="mt-4 flex items-center justify-between bg-purple-50 border border-purple-200 rounded-lg p-3">
                <p className="text-sm font-medium text-purple-900">{selectedRows.length} creative(s) selected</p>
                <Space>
                  <Button size="small" onClick={() => setSelectedRows([])}>
                    Clear Selection
                  </Button>
                  <Button
                    size="small"
                    icon={<Download className="w-3.5 h-3.5" />}
                    onClick={handleBulkDownload}
                  >
                    Download
                  </Button>
                  <Button
                    size="small"
                    icon={<TagIcon className="w-3.5 h-3.5" />}
                    onClick={() => message.info('Tagging feature coming soon')}
                  >
                    Tag
                  </Button>
                  <Button
                    size="small"
                    danger
                    icon={<Trash2 className="w-3.5 h-3.5" />}
                    onClick={handleBulkDelete}
                  >
                    Delete
                  </Button>
                </Space>
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        {viewMode === 'grid' ? (
          // Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData.map((creative) => (
              <Card
                key={creative.id}
                hoverable
                className="overflow-hidden"
                cover={
                  <div className="relative">
                    <Checkbox
                      checked={selectedRows.includes(creative.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRows([...selectedRows, creative.id]);
                        } else {
                          setSelectedRows(selectedRows.filter((id) => id !== creative.id));
                        }
                      }}
                      className="absolute top-2 left-2 z-10 bg-white rounded"
                    />
                    <div
                      className="h-48 bg-gray-100 flex items-center justify-center cursor-pointer"
                      onClick={() => handleViewCreative(creative)}
                    >
                      <img src={creative.previewUrl} alt={creative.name} className="w-full h-full object-cover" />
                    </div>
                    <Tag
                      color={statusConfig[creative.status].color}
                      icon={statusConfig[creative.status].icon}
                      className="absolute top-2 right-2 font-medium"
                    >
                      {creative.status}
                    </Tag>
                  </div>
                }
              >
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 truncate">{creative.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Tag color={adTypeColor[creative.type]} icon={adTypeIcons[creative.type]} className="text-xs">
                        {creative.type}
                      </Tag>
                      {creative.size !== 'N/A' && <span className="text-xs text-gray-500">{creative.size}</span>}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>{creative.fileSize}</span>
                    <span>{creative.dimensions}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">
                      {new Date(creative.uploadedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <span className="font-semibold text-purple-600">
                      Used in {creative.usedInCampaigns} {creative.usedInCampaigns === 1 ? 'campaign' : 'campaigns'}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-gray-200">
                    <Button
                      size="small"
                      icon={<Eye className="w-3.5 h-3.5" />}
                      onClick={() => handleViewCreative(creative)}
                      className="flex-1"
                    >
                      View
                    </Button>
                    <Button
                      size="small"
                      icon={<Download className="w-3.5 h-3.5" />}
                      onClick={() => handleDownloadCreative(creative)}
                    />
                    <Dropdown menu={getActionsMenu(creative)} trigger={['click']} placement="bottomRight">
                      <Button size="small" icon={<MoreVertical className="w-4 h-4" />} />
                    </Dropdown>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          // List View (Table)
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <Table
              columns={columns}
              dataSource={filteredData}
              rowKey="id"
              rowSelection={rowSelection}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} creatives`,
                pageSizeOptions: ['10', '20', '50', '100'],
              }}
              scroll={{ x: 1200 }}
              locale={{
                emptyText: (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                      <div className="text-center py-8">
                        <p className="text-gray-600 mb-2">No creatives found</p>
                        <Button
                          type="primary"
                          icon={<Plus className="w-4 h-4" />}
                          onClick={() => setIsUploadModalOpen(true)}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          Upload Your First Creative
                        </Button>
                      </div>
                    }
                  />
                ),
              }}
            />
          </div>
        )}

        {/* Info Banner */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-900 mb-1">💡 Pro Tip</p>
              <p className="text-sm text-blue-800">
                Organize your creatives with tags and use them across multiple campaigns. Approved creatives are
                instantly ready for use in new campaigns.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <Modal
        title="Upload New Creative"
        open={isUploadModalOpen}
        onCancel={() => setIsUploadModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsUploadModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => {
              message.success('Creative uploaded successfully');
              setIsUploadModalOpen(false);
            }}
          >
            Upload Creative
          </Button>,
        ]}
        width={600}
      >
        <div className="space-y-4 py-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Creative Name</label>
            <Input size="large" placeholder="Enter creative name" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ad Type</label>
            <Select size="large" placeholder="Select ad type" className="w-full">
              <Option value="banner">Banner</Option>
              <Option value="video">Video</Option>
              <Option value="html5">HTML5</Option>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Upload File</label>
            <Upload.Dragger>
              <p className="ant-upload-drag-icon">
                <UploadIcon className="w-12 h-12 text-gray-400 mx-auto" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for JPG, PNG, GIF, MP4, WebM, HTML5 (ZIP)</p>
            </Upload.Dragger>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tags (Optional)</label>
            <Select
              mode="tags"
              size="large"
              placeholder="Add tags"
              className="w-full"
              tokenSeparators={[',']}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreativesLibraryPage;
