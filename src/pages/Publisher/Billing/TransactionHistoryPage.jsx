import React, { useState } from 'react';
import {
  Table,
  Input,
  Select,
  Button,
  Tag,
  DatePicker,
  Dropdown,
  Modal,
  Card,
  Divider,
  Space,
} from 'antd';
import {
  Search,
  Filter,
  Download,
  FileText,
  ArrowUpCircle,
  ArrowDownCircle,
  RefreshCw,
  Eye,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react';
import { FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';

const { RangePicker } = DatePicker;
const { Option } = Select;

const TransactionHistoryPage = () => {
  const [searchText, setSearchText] = useState('');
  const [transactionType, setTransactionType] = useState('all');
  const [transactionStatus, setTransactionStatus] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Mock Transaction Data
  const transactions = [
    {
      key: 1,
      date: '2025-05-15',
      time: '10:30 AM',
      transactionId: 'TXN123456',
      type: 'Payout',
      description: 'Bank Transfer',
      amount: -4500.0,
      status: 'Completed',
      paymentMethod: 'Bank Transfer',
      bank: 'Chase Bank',
      account: '****1234',
      processingTime: '3 days',
    },
    {
      key: 2,
      date: '2025-05-10',
      time: '03:45 PM',
      transactionId: 'TXN123455',
      type: 'Earning',
      description: 'Campaign: Summer Sale',
      amount: 120.5,
      status: 'Completed',
      campaign: 'Summer Sale 2025',
    },
    {
      key: 3,
      date: '2025-05-09',
      time: '11:20 AM',
      transactionId: 'TXN123454',
      type: 'Earning',
      description: 'Campaign: Black Friday',
      amount: 89.3,
      status: 'Completed',
      campaign: 'Black Friday Special',
    },
    {
      key: 4,
      date: '2025-05-05',
      time: '09:15 AM',
      transactionId: 'TXN123453',
      type: 'Adjustment',
      description: 'Refund for invalid clicks',
      amount: -15.0,
      status: 'Completed',
      reason: 'Invalid traffic detected',
    },
    {
      key: 5,
      date: '2025-05-01',
      time: '02:30 PM',
      transactionId: 'TXN123452',
      type: 'Payout',
      description: 'PayPal Transfer',
      amount: -1000.0,
      status: 'Pending',
      paymentMethod: 'PayPal',
      email: 'user@example.com',
      processingTime: '1-2 days',
    },
    {
      key: 6,
      date: '2025-04-28',
      time: '04:50 PM',
      transactionId: 'TXN123451',
      type: 'Earning',
      description: 'Campaign: Product Launch',
      amount: 234.75,
      status: 'Completed',
      campaign: 'Product Launch Q2',
    },
  ];

  // Transaction Type Badge Config
  const typeConfig = {
    Payout: { color: 'purple', icon: <ArrowDownCircle className="w-4 h-4" /> },
    Earning: { color: 'green', icon: <ArrowUpCircle className="w-4 h-4" /> },
    Adjustment: { color: 'orange', icon: <RefreshCw className="w-4 h-4" /> },
    Refund: { color: 'red', icon: <RefreshCw className="w-4 h-4" /> },
  };

  // Status Badge Config
  const statusConfig = {
    Completed: { color: 'success', icon: <FaCheckCircle /> },
    Pending: { color: 'warning', icon: <FaClock /> },
    Failed: { color: 'error', icon: <FaTimesCircle /> },
  };

  // View Transaction Details
  const handleViewDetails = (record) => {
    setSelectedTransaction(record);
    setIsDetailModalOpen(true);
  };

  // Export Menu
  const exportMenu = {
    items: [
      {
        key: 'csv',
        label: (
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Export to CSV
          </div>
        ),
      },
      {
        key: 'excel',
        label: (
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Export to Excel
          </div>
        ),
      },
    ],
  };

  // Table Columns
  const columns = [
    {
      title: 'Date & Time',
      dataIndex: 'date',
      key: 'date',
      render: (date, record) => (
        <div>
          <p className="font-semibold text-gray-900">
            {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
          <p className="text-xs text-gray-500">{record.time}</p>
        </div>
      ),
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      defaultSortOrder: 'descend',
    },
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      key: 'transactionId',
      render: (text) => <span className="font-mono text-sm text-gray-700">{text}</span>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={typeConfig[type].color} icon={typeConfig[type].icon} className="font-medium">
          {type}
        </Tag>
      ),
      filters: [
        { text: 'Earnings', value: 'Earning' },
        { text: 'Payouts', value: 'Payout' },
        { text: 'Adjustments', value: 'Adjustment' },
        { text: 'Refunds', value: 'Refund' },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => <span className="text-gray-700">{text}</span>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => (
        <span
          className={`font-bold ${
            amount >= 0 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {amount >= 0 ? '+' : ''}${Math.abs(amount).toFixed(2)}
        </span>
      ),
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={statusConfig[status].color} icon={statusConfig[status].icon} className="font-medium">
          {status}
        </Tag>
      ),
      filters: [
        { text: 'Completed', value: 'Completed' },
        { text: 'Pending', value: 'Pending' },
        { text: 'Failed', value: 'Failed' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Invoice/Receipt',
      key: 'actions',
      render: (_, record) => (
        <Space>
          {record.type === 'Payout' && record.status === 'Completed' && (
            <Button size="small" icon={<Download className="w-3.5 h-3.5" />}>
              Download
            </Button>
          )}
          <Button
            type="link"
            size="small"
            icon={<Eye className="w-3.5 h-3.5" />}
            onClick={() => handleViewDetails(record)}
          >
            Details
          </Button>
        </Space>
      ),
    },
  ];

  // Filter Data
  const filteredData = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.transactionId.toLowerCase().includes(searchText.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesType = transactionType === 'all' || transaction.type === transactionType;
    const matchesStatus = transactionStatus === 'all' || transaction.status === transactionStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Calculate Summary
  const summary = {
    totalEarnings: transactions.filter((t) => t.type === 'Earning').reduce((sum, t) => sum + t.amount, 0),
    totalPayouts: Math.abs(
      transactions.filter((t) => t.type === 'Payout').reduce((sum, t) => sum + t.amount, 0)
    ),
    pendingAmount: Math.abs(
      transactions.filter((t) => t.status === 'Pending').reduce((sum, t) => sum + t.amount, 0)
    ),
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Transaction History</h1>
          <p className="text-gray-600">View and manage all your earnings and payout transactions</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
                <p className="text-2xl font-bold text-green-600">+${summary.totalEarnings.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <ArrowUpCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Payouts</p>
                <p className="text-2xl font-bold text-purple-600">-${summary.totalPayouts.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <ArrowDownCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Amount</p>
                <p className="text-2xl font-bold text-orange-600">${summary.pendingAmount.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Input
              placeholder="Search by ID or description..."
              prefix={<Search className="w-4 h-4 text-gray-400" />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
              className="lg:col-span-2"
            />
            <Select
              placeholder="Transaction Type"
              value={transactionType}
              onChange={setTransactionType}
              className="w-full"
              suffixIcon={<Filter className="w-4 h-4" />}
            >
              <Option value="all">All Types</Option>
              <Option value="Earning">Earnings</Option>
              <Option value="Payout">Payouts</Option>
              <Option value="Adjustment">Adjustments</Option>
              <Option value="Refund">Refunds</Option>
            </Select>
            <Select
              placeholder="Status"
              value={transactionStatus}
              onChange={setTransactionStatus}
              className="w-full"
            >
              <Option value="all">All Statuses</Option>
              <Option value="Completed">Completed</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Failed">Failed</Option>
            </Select>
            <Dropdown menu={exportMenu} trigger={['click']}>
              <Button icon={<Download className="w-4 h-4" />} className="w-full">
                Export
              </Button>
            </Dropdown>
          </div>
        </Card>

        {/* Transactions Table */}
        <Card>
          <Table
            dataSource={filteredData}
            columns={columns}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} transactions`,
            }}
            scroll={{ x: 1200 }}
          />
        </Card>
      </div>

      {/* Transaction Detail Modal */}
      <Modal
        title="Transaction Details"
        open={isDetailModalOpen}
        onCancel={() => setIsDetailModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsDetailModalOpen(false)}>
            Close
          </Button>,
          selectedTransaction?.type === 'Payout' && selectedTransaction?.status === 'Completed' && (
            <Button
              key="download"
              type="primary"
              icon={<Download className="w-4 h-4" />}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Download Receipt
            </Button>
          ),
        ]}
        width={600}
      >
        {selectedTransaction && (
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Transaction ID</p>
                <p className="font-mono font-semibold text-gray-900">{selectedTransaction.transactionId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Date & Time</p>
                <p className="font-semibold text-gray-900">
                  {new Date(selectedTransaction.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                  , {selectedTransaction.time}
                </p>
              </div>
            </div>

            <Divider />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Type</p>
                <Tag
                  color={typeConfig[selectedTransaction.type].color}
                  icon={typeConfig[selectedTransaction.type].icon}
                >
                  {selectedTransaction.type}
                </Tag>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <Tag
                  color={statusConfig[selectedTransaction.status].color}
                  icon={statusConfig[selectedTransaction.status].icon}
                >
                  {selectedTransaction.status}
                </Tag>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Amount</p>
              <p
                className={`text-3xl font-bold ${
                  selectedTransaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {selectedTransaction.amount >= 0 ? '+' : ''}${Math.abs(selectedTransaction.amount).toFixed(2)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Description</p>
              <p className="font-semibold text-gray-900">{selectedTransaction.description}</p>
            </div>

            {selectedTransaction.type === 'Payout' && (
              <>
                <Divider />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                    <p className="font-semibold text-gray-900">{selectedTransaction.paymentMethod}</p>
                  </div>
                  {selectedTransaction.bank && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Bank</p>
                      <p className="font-semibold text-gray-900">{selectedTransaction.bank}</p>
                    </div>
                  )}
                  {selectedTransaction.account && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Account</p>
                      <p className="font-mono font-semibold text-gray-900">{selectedTransaction.account}</p>
                    </div>
                  )}
                  {selectedTransaction.processingTime && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Processing Time</p>
                      <p className="font-semibold text-gray-900">{selectedTransaction.processingTime}</p>
                    </div>
                  )}
                </div>
              </>
            )}

            {selectedTransaction.campaign && (
              <>
                <Divider />
                <div>
                  <p className="text-sm text-gray-600 mb-1">Campaign</p>
                  <p className="font-semibold text-gray-900">{selectedTransaction.campaign}</p>
                </div>
              </>
            )}

            {selectedTransaction.reason && (
              <>
                <Divider />
                <div>
                  <p className="text-sm text-gray-600 mb-1">Reason</p>
                  <p className="font-semibold text-gray-900">{selectedTransaction.reason}</p>
                </div>
              </>
            )}

            <Divider />

            <Button type="link" icon={<Eye className="w-4 h-4" />} className="px-0">
              Contact Support if there's an issue
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TransactionHistoryPage;
