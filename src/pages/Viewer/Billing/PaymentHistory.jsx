import React, { useState } from 'react';
import {
  Table,
  Card,
  Input,
  Select,
  Button,
  Tag,
  Modal,
  Statistic,
  Row,
  Col,
  Space,
  Descriptions,
  Alert,
  Empty,
  Tooltip,
  DatePicker,
  Dropdown,
  Menu,
  Progress,
  Badge,
  Divider
} from 'antd';
import {
  SearchOutlined,
  DownloadOutlined,
  FilterOutlined,
  CalendarOutlined,
  DollarCircleOutlined,
  RiseOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MoreOutlined,
  EyeOutlined,
  ReloadOutlined,
  ExportOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;

const PaymentHistory = () => {
  const [payments, setPayments] = useState([
    {
      id: 'PAY-2025-11-001',
      date: '2025-11-15',
      amount: 1245.50,
      method: 'Bank Transfer',
      status: 'completed',
      period: 'October 2025',
      transactionId: 'TXN-ABC123XYZ',
      invoiceId: 'INV-2025-10-001',
      fee: 0,
      netAmount: 1245.50
    },
    {
      id: 'PAY-2025-10-001',
      date: '2025-10-15',
      amount: 987.30,
      method: 'PayPal',
      status: 'completed',
      period: 'September 2025',
      transactionId: 'PP-XYZ789ABC',
      invoiceId: 'INV-2025-09-001',
      fee: 28.63,
      netAmount: 958.67
    },
    {
      id: 'PAY-2025-12-001',
      date: '2025-12-15',
      amount: 456.80,
      method: 'Bank Transfer',
      status: 'pending',
      period: 'November 2025',
      transactionId: null,
      invoiceId: 'INV-2025-11-001',
      fee: 0,
      netAmount: 456.80
    },
    {
      id: 'PAY-2025-09-001',
      date: '2025-09-15',
      amount: 1532.90,
      method: 'Bank Transfer',
      status: 'failed',
      period: 'August 2025',
      transactionId: null,
      invoiceId: 'INV-2025-08-001',
      fee: 0,
      netAmount: 1532.90,
      failureReason: 'Invalid bank account number'
    },
    {
      id: 'PAY-2025-08-001',
      date: '2025-08-15',
      amount: 2103.45,
      method: 'PayPal',
      status: 'completed',
      period: 'July 2025',
      transactionId: 'PP-DEF456GHI',
      invoiceId: 'INV-2025-07-001',
      fee: 61.00,
      netAmount: 2042.45
    }
  ]);

  const [filters, setFilters] = useState({
    search: '',
    status: '',
    method: '',
    dateRange: null
  });

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);

  const statusConfig = {
    completed: {
      icon: <CheckCircleOutlined />,
      label: 'Completed',
      color: 'success',
      bgColor: '#f6ffed',
      borderColor: '#b7eb8f'
    },
    pending: {
      icon: <ClockCircleOutlined />,
      label: 'Pending',
      color: 'processing',
      bgColor: '#fffbe6',
      borderColor: '#ffe58f'
    },
    failed: {
      icon: <CloseCircleOutlined />,
      label: 'Failed',
      color: 'error',
      bgColor: '#fff2f0',
      borderColor: '#ffccc7'
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.id.toLowerCase().includes(filters.search.toLowerCase()) ||
                         payment.period.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = !filters.status || payment.status === filters.status;
    const matchesMethod = !filters.method || payment.method === filters.method;
    const matchesDateRange = !filters.dateRange || (
      dayjs(payment.date).isAfter(filters.dateRange[0]) && 
      dayjs(payment.date).isBefore(filters.dateRange[1])
    );
    
    return matchesSearch && matchesStatus && matchesMethod && matchesDateRange;
  });

  const stats = {
    totalPaid: payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.netAmount, 0),
    pending: payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
    thisYear: payments.filter(p => p.date.startsWith('2025') && p.status === 'completed').reduce((sum, p) => sum + p.netAmount, 0),
    transactionCount: payments.filter(p => p.status === 'completed').length,
    successRate: Math.round((payments.filter(p => p.status === 'completed').length / payments.length) * 100)
  };

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
    setIsDetailsModalOpen(true);
  };

  const handleDownloadInvoice = (invoiceId) => {
    Modal.info({
      title: 'Download Invoice',
      content: `Invoice ${invoiceId} is being downloaded...`,
      okText: 'OK',
      icon: <DownloadOutlined />
    });
  };

  const handleExportCSV = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Modal.success({
        title: 'Export Successful',
        content: 'Payment history has been exported to CSV successfully.',
        okText: 'OK',
        icon: <CheckCircleOutlined />
      });
    }, 1500);
  };

  const handleDateRangeChange = (dates) => {
    setFilters({ ...filters, dateRange: dates });
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      status: '',
      method: '',
      dateRange: null
    });
  };

  const handleRefreshData = () => {
    setTableLoading(true);
    // Simulate data refresh
    setTimeout(() => {
      setTableLoading(false);
    }, 1000);
  };

  const columns = [
    {
      title: 'Payment ID',
      dataIndex: 'id',
      key: 'id',
      width: 180,
      render: (id) => (
        <div className="flex items-center">
          <FileTextOutlined className="text-blue-500 mr-2" />
          <code className="text-sm font-mono bg-blue-50 px-2 py-1 rounded border border-blue-200">
            {id}
          </code>
        </div>
      )
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      render: (date) => (
        <div className="text-center">
          <div className="font-medium text-gray-900">
            {dayjs(date).format('MMM DD')}
          </div>
          <div className="text-xs text-gray-500">
            {dayjs(date).format('YYYY')}
          </div>
        </div>
      ),
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix()
    },
    {
      title: 'Period',
      dataIndex: 'period',
      key: 'period',
      width: 130,
      render: (period) => (
        <span className="font-medium text-gray-700">{period}</span>
      )
    },
    {
      title: 'Amount',
      dataIndex: 'netAmount',
      key: 'amount',
      width: 150,
      render: (netAmount, record) => (
        <div className="text-right">
          <div className="font-semibold text-gray-900 text-base">
            ${netAmount.toFixed(2)}
          </div>
          {record.fee > 0 && (
            <div className="text-xs text-gray-500">
              Fee: ${record.fee.toFixed(2)}
            </div>
          )}
          <div className="text-xs text-gray-400 mt-1">
            Gross: ${record.amount.toFixed(2)}
          </div>
        </div>
      ),
      sorter: (a, b) => a.netAmount - b.netAmount
    },
    {
      title: 'Method',
      dataIndex: 'method',
      key: 'method',
      width: 130,
      render: (method) => (
        <div className="flex items-center">
          {method === 'Bank Transfer' ? (
            <DollarCircleOutlined className="text-green-500 mr-2" />
          ) : (
            <FileTextOutlined className="text-blue-500 mr-2" />
          )}
          <Tag 
            color={method === 'Bank Transfer' ? 'green' : 'blue'} 
            className="font-medium"
          >
            {method}
          </Tag>
        </div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: (status) => {
        const config = statusConfig[status];
        return (
          <div 
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border"
            style={{ 
              backgroundColor: config.bgColor,
              borderColor: config.borderColor
            }}
          >
            {config.icon}
            <span className="font-medium text-gray-800">{config.label}</span>
          </div>
        );
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button 
              type="primary" 
              size="small"
              icon={<EyeOutlined />}
              onClick={() => handleViewDetails(record)}
            >
              View
            </Button>
          </Tooltip>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item 
                  key="download"
                  icon={<DownloadOutlined />}
                  onClick={() => handleDownloadInvoice(record.invoiceId)}
                  disabled={record.status !== 'completed'}
                >
                  Download Invoice
                </Menu.Item>
                <Menu.Item key="copy" icon={<FileTextOutlined />}>
                  Copy Payment ID
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="reprocess" icon={<ReloadOutlined />} disabled={record.status !== 'failed'}>
                  Retry Payment
                </Menu.Item>
              </Menu>
            }
            trigger={['click']}
          >
            <Button type="text" icon={<MoreOutlined />} size="small" />
          </Dropdown>
        </Space>
      )
    }
  ];

  const actionMenu = (
    <Menu>
      <Menu.Item key="export" icon={<DownloadOutlined />} onClick={handleExportCSV}>
        Export CSV
      </Menu.Item>
      <Menu.Item key="print" icon={<FileTextOutlined />}>
        Print Report
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="refresh" icon={<ReloadOutlined />} onClick={handleRefreshData}>
        Refresh Data
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{ padding: '24px', background: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div className="flex justify-between items-start">
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: 8, color: '#1e293b' }}>
                Payment History
              </h1>
              <p style={{ color: '#64748b', fontSize: '16px', marginBottom: 8 }}>
                Track all your payments and earnings over time
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>Last updated: {dayjs().format('MMM DD, YYYY [at] h:mm A')}</span>
                <Badge status="processing" text="Live Data" />
              </div>
            </div>
            <Button 
              icon={<ReloadOutlined />} 
              onClick={handleRefreshData}
              loading={tableLoading}
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} lg={6}>
            <Card className="shadow-sm border-0 hover:shadow-md transition-shadow">
              <Statistic
                title="Total Paid"
                value={stats.totalPaid}
                precision={2}
                prefix="$"
                valueStyle={{ color: '#059669' }}
                suffix="lifetime"
              />
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-600">{stats.transactionCount} transactions</span>
                <RiseOutlined className="text-green-500" />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="shadow-sm border-0 hover:shadow-md transition-shadow">
              <Statistic
                title="This Year"
                value={stats.thisYear}
                precision={2}
                prefix="$"
                valueStyle={{ color: '#3b82f6' }}
              />
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-600">2025 earnings</span>
                <CalendarOutlined className="text-blue-500" />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="shadow-sm border-0 hover:shadow-md transition-shadow">
              <Statistic
                title="Pending"
                value={stats.pending}
                precision={2}
                prefix="$"
                valueStyle={{ color: '#f59e0b' }}
              />
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-600">Processing</span>
                <ClockCircleOutlined className="text-yellow-500" />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="shadow-sm border-0 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <Statistic
                  title="Success Rate"
                  value={stats.successRate}
                  suffix="%"
                  valueStyle={{ color: '#10b981' }}
                />
                <Progress 
                  type="circle" 
                  percent={stats.successRate} 
                  width={60}
                  strokeColor="#10b981"
                />
              </div>
              <div className="text-sm text-gray-600">
                {payments.filter(p => p.status === 'completed').length} of {payments.length} successful
              </div>
            </Card>
          </Col>
        </Row>

        {/* Filters and Search */}
        <Card 
          className="shadow-sm border-0 mb-6"
          bodyStyle={{ padding: '20px' }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Filter Payments</h3>
            <Space>
              <Button onClick={handleResetFilters} icon={<ReloadOutlined />}>
                Reset
              </Button>
              <Dropdown overlay={actionMenu} placement="bottomRight">
                <Button type="primary" icon={<ExportOutlined />} loading={loading}>
                  Export
                </Button>
              </Dropdown>
            </Space>
          </div>
          
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={6}>
              <Input
                placeholder="Search by ID or period..."
                prefix={<SearchOutlined className="text-gray-400" />}
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                allowClear
                size="large"
              />
            </Col>
            <Col xs={12} sm={8} md={4}>
              <Select
                placeholder="Status"
                value={filters.status}
                onChange={(value) => setFilters({ ...filters, status: value })}
                style={{ width: '100%' }}
                allowClear
                size="large"
              >
                <Option value="completed">Completed</Option>
                <Option value="pending">Pending</Option>
                <Option value="failed">Failed</Option>
              </Select>
            </Col>
            <Col xs={12} sm={8} md={4}>
              <Select
                placeholder="Method"
                value={filters.method}
                onChange={(value) => setFilters({ ...filters, method: value })}
                style={{ width: '100%' }}
                allowClear
                size="large"
              >
                <Option value="Bank Transfer">Bank Transfer</Option>
                <Option value="PayPal">PayPal</Option>
                <Option value="Payoneer">Payoneer</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <RangePicker
                style={{ width: '100%' }}
                placeholder={['Start Date', 'End Date']}
                value={filters.dateRange}
                onChange={handleDateRangeChange}
                size="large"
                format="MMM DD, YYYY"
              />
            </Col>
          </Row>
        </Card>

        {/* Payment History Table */}
        <Card
          className="shadow-sm border-0"
          title={
            <div className="flex items-center justify-between">
              <Space>
                <FileTextOutlined className="text-blue-500" />
                <span className="text-lg font-semibold">Payment Records</span>
                <Badge count={filteredPayments.length} showZero color="#3b82f6" />
              </Space>
              <Space>
                <span className="text-sm text-gray-600">
                  Showing {filteredPayments.length} of {payments.length} payments
                </span>
              </Space>
            </div>
          }
        >
          <Table
            columns={columns}
            dataSource={filteredPayments}
            rowKey="id"
            loading={tableLoading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `Showing ${range[0]}-${range[1]} of ${total} payments`,
              size: 'default'
            }}
            scroll={{ x: 1000 }}
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <div className="text-center">
                      <div className="text-lg font-medium text-gray-900 mb-2">No payments found</div>
                      <div className="text-gray-600 mb-4">
                        Try adjusting your filters or search criteria
                      </div>
                      <Button type="primary" onClick={handleResetFilters}>
                        Clear Filters
                      </Button>
                    </div>
                  }
                />
              )
            }}
            onRow={(record) => ({
              onClick: () => handleViewDetails(record),
              style: { cursor: 'pointer' }
            })}
          />
        </Card>
      </div>

      {/* Payment Details Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <FileTextOutlined className="text-blue-500" />
            <span>Payment Details</span>
          </div>
        }
        open={isDetailsModalOpen}
        onCancel={() => setIsDetailsModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsDetailsModalOpen(false)}>
            Close
          </Button>,
          selectedPayment?.status === 'completed' && (
            <Button 
              key="download" 
              type="primary" 
              icon={<DownloadOutlined />}
              onClick={() => handleDownloadInvoice(selectedPayment.invoiceId)}
            >
              Download Invoice
            </Button>
          )
        ]}
        width={700}
        className="payment-details-modal"
      >
        {selectedPayment && (
          <div>
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-600">Payment ID</div>
                  <div className="font-mono font-semibold text-lg">{selectedPayment.id}</div>
                </div>
                <div 
                  className="px-4 py-2 rounded-full border font-medium"
                  style={{ 
                    backgroundColor: statusConfig[selectedPayment.status].bgColor,
                    borderColor: statusConfig[selectedPayment.status].borderColor
                  }}
                >
                  {statusConfig[selectedPayment.status].icon}
                  <span className="ml-2">{statusConfig[selectedPayment.status].label}</span>
                </div>
              </div>
            </div>

            <Descriptions bordered column={1} size="middle">
              <Descriptions.Item label="Period" labelStyle={{ fontWeight: 600 }}>
                {selectedPayment.period}
              </Descriptions.Item>
              <Descriptions.Item label="Payment Date" labelStyle={{ fontWeight: 600 }}>
                {dayjs(selectedPayment.date).format('dddd, MMMM DD, YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label="Gross Amount" labelStyle={{ fontWeight: 600 }}>
                <span className="font-semibold text-gray-900">
                  ${selectedPayment.amount.toFixed(2)}
                </span>
              </Descriptions.Item>
              {selectedPayment.fee > 0 && (
                <Descriptions.Item label="Processing Fee" labelStyle={{ fontWeight: 600 }}>
                  <span className="text-red-500 font-semibold">
                    -${selectedPayment.fee.toFixed(2)}
                  </span>
                </Descriptions.Item>
              )}
              <Descriptions.Item label="Net Amount" labelStyle={{ fontWeight: 600 }}>
                <span className="font-bold text-lg text-green-600">
                  ${selectedPayment.netAmount.toFixed(2)}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Payment Method" labelStyle={{ fontWeight: 600 }}>
                <Tag color="blue" className="font-medium">
                  {selectedPayment.method}
                </Tag>
              </Descriptions.Item>
              {selectedPayment.transactionId && (
                <Descriptions.Item label="Transaction ID" labelStyle={{ fontWeight: 600 }}>
                  <code className="bg-gray-100 px-2 py-1 rounded">{selectedPayment.transactionId}</code>
                </Descriptions.Item>
              )}
              <Descriptions.Item label="Invoice ID" labelStyle={{ fontWeight: 600 }}>
                <code className="bg-gray-100 px-2 py-1 rounded">{selectedPayment.invoiceId}</code>
              </Descriptions.Item>
            </Descriptions>

            {selectedPayment.status === 'failed' && selectedPayment.failureReason && (
              <Alert
                className="mt-6"
                message="Payment Failed"
                description={
                  <div>
                    <p className="mb-2">{selectedPayment.failureReason}</p>
                    <Button type="link" className="p-0 h-auto">
                      Update Payment Method
                    </Button>
                  </div>
                }
                type="error"
                showIcon
                icon={<ExclamationCircleOutlined />}
              />
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PaymentHistory;