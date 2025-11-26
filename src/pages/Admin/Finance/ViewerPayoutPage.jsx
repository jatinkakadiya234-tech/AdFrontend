import React, { useState } from 'react';
import {
  Card, Table, Button, Tag, Space, Input, Select,
  DatePicker, Modal, Form, Row, Col, Statistic, Badge, Progress
} from 'antd';
import {
  Wallet, Search, Filter, Download, Plus, Clock,
  Eye, CheckCircle, AlertCircle, Users, DollarSign, CreditCard
} from 'lucide-react';

const { Option } = Select;
const { RangePicker } = DatePicker;

const ViewerPayoutsPage = () => {
  const [processModal, setProcessModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  const viewerPayouts = [
    {
      key: 1,
      viewer: 'NewsDaily Media',
      email: 'user@newsdaily.com',
      amount: 1100,
      date: '2025-11-21',
      requested: '2025-11-20',
      method: 'PayPal',
      status: 'processing',
      account: 'user@newsdaily.com',
      processingTime: '1-2 days'
    },
    {
      key: 2,
      viewer: 'TechBlog Inc',
      email: 'payments@techblog.com',
      amount: 850,
      date: '2025-11-19',
      requested: '2025-11-18',
      method: 'Bank Transfer',
      status: 'completed',
      account: '****1234',
      processingTime: 'Completed'
    },
    {
      key: 3,
      viewer: 'GameReviews Pro',
      email: 'admin@gamereviews.com',
      amount: 620,
      date: '2025-11-22',
      requested: '2025-11-21',
      method: 'PayPal',
      status: 'pending',
      account: 'admin@gamereviews.com',
      processingTime: 'Pending approval'
    },
    {
      key: 4,
      viewer: 'VideoStream Hub',
      email: 'finance@videostream.com',
      amount: 2300,
      date: '2025-11-18',
      requested: '2025-11-15',
      method: 'Wire Transfer',
      status: 'failed',
      account: '****5678',
      processingTime: 'Failed - Retry needed'
    }
  ];

  const filteredPayouts = viewerPayouts.filter(payout => 
    filterStatus === 'all' || payout.status === filterStatus
  );

  const stats = {
    totalProcessing: viewerPayouts.filter(p => p.status === 'processing').reduce((sum, p) => sum + p.amount, 0),
    totalCompleted: viewerPayouts.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0),
    totalPending: viewerPayouts.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
    totalViewers: viewerPayouts.length
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="text-green-500" size={16} />;
      case 'processing': return <Clock className="text-blue-500" size={16} />;
      case 'pending': return <Clock className="text-orange-500" size={16} />;
      case 'failed': return <AlertCircle className="text-red-500" size={16} />;
      default: return <Clock className="text-gray-500" size={16} />;
    }
  };

  const columns = [
    {
      title: 'Viewer',
      dataIndex: 'viewer',
      key: 'viewer',
      render: (name, record) => (
        <Space direction="vertical" size={0}>
          <div className="font-semibold">{name}</div>
          <div className="text-xs text-gray-500">{record.email}</div>
        </Space>
      )
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => (
        <span className="text-green-600 font-bold text-lg">
          ${amount.toLocaleString()}
        </span>
      )
    },
    {
      title: 'Requested Date',
      dataIndex: 'requested',
      key: 'requested',
      render: (date) => (
        <Space>
          <Clock size={14} className="text-gray-400" />
          {date}
        </Space>
      )
    },
    {
      title: 'Payout Date',
      dataIndex: 'date',
      key: 'date',
      render: (date, record) => (
        <Space>
          <Clock size={14} className={
            record.status === 'failed' ? 'text-red-500' : 'text-gray-400'
          } />
          <span className={record.status === 'failed' ? 'text-red-600' : ''}>
            {date}
          </span>
        </Space>
      )
    },
    {
      title: 'Method',
      dataIndex: 'method',
      key: 'method',
      render: (method) => <Tag color="blue">{method}</Tag>
    },
    {
      title: 'Account',
      dataIndex: 'account',
      key: 'account',
      render: (account) => <span className="text-gray-600">{account}</span>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusConfig = {
          completed: { color: 'green', text: 'Completed' },
          processing: { color: 'blue', text: 'Processing' },
          pending: { color: 'orange', text: 'Pending' },
          failed: { color: 'red', text: 'Failed' }
        };
        const config = statusConfig[status];
        return (
          <Space>
            {getStatusIcon(status)}
            <Badge color={config.color} text={config.text} />
          </Space>
        );
      }
    },
    {
      title: 'Processing',
      dataIndex: 'processingTime',
      key: 'processingTime',
      render: (time, record) => (
        <div className="text-xs text-gray-600">
          {time}
        </div>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="text" icon={<Eye size={16} />} size="small">
            Details
          </Button>
          {record.status === 'pending' && (
            <Button type="text" icon={<CheckCircle size={16} />} size="small">
              Approve
            </Button>
          )}
          {record.status === 'failed' && (
            <Button type="text" icon={<CheckCircle size={16} />} size="small">
              Retry
            </Button>
          )}
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
                <Wallet className="mr-3 text-purple-600" size={32} />
                Viewer Payouts
              </h1>
              <p className="text-gray-600 mt-2">
                Manage viewer earnings and payout requests
              </p>
            </div>
            <Space className="mt-4 lg:mt-0">
              <Button icon={<Download size={16} />}>
                Export
              </Button>
              <Button type="primary" icon={<Plus size={16} />} onClick={() => setProcessModal(true)}>
                Process Payouts
              </Button>
            </Space>
          </div>
        </div>

        {/* Stats */}
        <Row gutter={16} className="mb-6">
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center">
              <Statistic
                title="Processing Now"
                value={stats.totalProcessing}
                prefix={<Clock className="text-blue-500" size={20} />}
                valueStyle={{ color: '#3b82f6' }}
                formatter={value => `$${value.toLocaleString()}`}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center">
              <Statistic
                title="Completed Today"
                value={stats.totalCompleted}
                prefix={<CheckCircle className="text-green-500" size={20} />}
                valueStyle={{ color: '#10b981' }}
                formatter={value => `$${value.toLocaleString()}`}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center">
              <Statistic
                title="Pending Approval"
                value={stats.totalPending}
                prefix={<Clock className="text-orange-500" size={20} />}
                valueStyle={{ color: '#f59e0b' }}
                formatter={value => `$${value.toLocaleString()}`}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center">
              <Statistic
                title="Total Viewers"
                value={stats.totalViewers}
                prefix={<Users className="text-purple-500" size={20} />}
                valueStyle={{ color: '#8b5cf6' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Payout Progress */}
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Payout Processing Status</h3>
            <span className="text-sm text-gray-500">Updated just now</span>
          </div>
          <Row gutter={16}>
            <Col span={6}>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">12</div>
                <div className="text-sm text-gray-600">In Queue</div>
              </div>
            </Col>
            <Col span={6}>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">8</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </Col>
            <Col span={6}>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">3</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </Col>
            <Col span={6}>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">1</div>
                <div className="text-sm text-gray-600">Failed</div>
              </div>
            </Col>
          </Row>
          <Progress percent={75} strokeColor="#10b981" className="mt-4" />
        </Card>

        {/* Filters */}
        <Card className="mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <Input
              placeholder="Search viewers..."
              prefix={<Search size={16} />}
              style={{ width: 250 }}
            />
            <Select
              value={filterStatus}
              onChange={setFilterStatus}
              style={{ width: 150 }}
              suffixIcon={<Filter size={16} />}
            >
              <Option value="all">All Status</Option>
              <Option value="completed">Completed</Option>
              <Option value="processing">Processing</Option>
              <Option value="pending">Pending</Option>
              <Option value="failed">Failed</Option>
            </Select>
            <Select
              defaultValue="all"
              style={{ width: 150 }}
            >
              <Option value="all">All Methods</Option>
              <Option value="paypal">PayPal</Option>
              <Option value="bank">Bank Transfer</Option>
              <Option value="wire">Wire Transfer</Option>
            </Select>
            <RangePicker />
          </div>
        </Card>

        {/* Payouts Table */}
        <Card
          title={
            <span className="text-lg font-semibold">
              Payout Requests ({filteredPayouts.length})
            </span>
          }
        >
          <Table
            columns={columns}
            dataSource={filteredPayouts}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} payouts`,
            }}
            scroll={{ x: 1200 }}
          />
        </Card>

        {/* Process Payouts Modal */}
        <Modal
          open={processModal}
          title="Process Bulk Payouts"
          onCancel={() => setProcessModal(false)}
          footer={null}
          width={600}
        >
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded p-4">
              <div className="flex items-center">
                <CheckCircle className="text-blue-500 mr-2" size={20} />
                <div>
                  <div className="font-semibold">Ready to Process</div>
                  <div className="text-sm text-blue-600">
                    8 payout requests totaling $4,250 are ready for processing
                  </div>
                </div>
              </div>
            </div>

            <Form layout="vertical">
              <Form.Item label="Payout Method" required>
                <Select placeholder="Select payout method">
                  <Option value="paypal">PayPal Mass Pay</Option>
                  <Option value="bank">Bank Transfer Batch</Option>
                  <Option value="wire">Wire Transfer</Option>
                </Select>
              </Form.Item>
              
              <Form.Item label="Processing Date" required>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
              
              <Form.Item label="Notes">
                <Input.TextArea rows={3} placeholder="Add any notes about this payout batch..." />
              </Form.Item>
            </Form>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button onClick={() => setProcessModal(false)}>
                Cancel
              </Button>
              <Button type="primary" icon={<CheckCircle size={16} />}>
                Process Payouts
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ViewerPayoutsPage;