import React, { useState } from 'react';
import {
  Card, Table, Button, Tag, Space, Input, Select,
  DatePicker, Modal, Form, Row, Col, Statistic, Badge
} from 'antd';
import {
  CreditCard, Search, Filter, Download, Plus,
  Eye, Edit, Send, Calendar, DollarSign, Users
} from 'lucide-react';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const PublisherPaymentsPage = () => {
  const [createModal, setCreateModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  const publisherPayments = [
    {
      key: 1,
      publisher: 'TechCorp Ltd',
      email: 'finance@techcorp.com',
      amount: 5200,
      date: '2025-11-10',
      dueDate: '2025-11-15',
      type: 'Monthly Invoice',
      status: 'paid',
      method: 'Bank Transfer',
      invoiceId: 'INV-2025-001'
    },
    {
      key: 2,
      publisher: 'GamePortal Inc',
      email: 'accounting@gameportal.com',
      amount: 3200,
      date: '2025-11-08',
      dueDate: '2025-11-13',
      type: 'Monthly Invoice',
      status: 'paid',
      method: 'PayPal',
      invoiceId: 'INV-2025-002'
    },
    {
      key: 3,
      publisher: 'NewsDaily Media',
      email: 'billing@newsdaily.com',
      amount: 1800,
      date: '2025-11-12',
      dueDate: '2025-11-17',
      type: 'Monthly Invoice',
      status: 'pending',
      method: 'Wire Transfer',
      invoiceId: 'INV-2025-003'
    },
    {
      key: 4,
      publisher: 'StreamHub Pro',
      email: 'payments@streamhub.com',
      amount: 4200,
      date: '2025-11-05',
      dueDate: '2025-11-10',
      type: 'Monthly Invoice',
      status: 'overdue',
      method: 'Bank Transfer',
      invoiceId: 'INV-2025-004'
    }
  ];

  const filteredPayments = publisherPayments.filter(payment => 
    filterStatus === 'all' || payment.status === filterStatus
  );

  const stats = {
    totalPaid: publisherPayments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
    totalPending: publisherPayments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
    totalOverdue: publisherPayments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0),
    totalPublishers: publisherPayments.length
  };

  const columns = [
    {
      title: 'Publisher',
      dataIndex: 'publisher',
      key: 'publisher',
      render: (name, record) => (
        <Space direction="vertical" size={0}>
          <div className="font-semibold">{name}</div>
          <div className="text-xs text-gray-500">{record.email}</div>
        </Space>
      )
    },
    {
      title: 'Invoice ID',
      dataIndex: 'invoiceId',
      key: 'invoiceId',
      render: (id) => <Tag color="blue">{id}</Tag>
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
      title: 'Payment Date',
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
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date, record) => (
        <Space>
          <Calendar size={14} className={
            record.status === 'overdue' ? 'text-red-500' : 'text-gray-400'
          } />
          <span className={record.status === 'overdue' ? 'text-red-600 font-medium' : ''}>
            {date}
          </span>
        </Space>
      )
    },
    {
      title: 'Method',
      dataIndex: 'method',
      key: 'method',
      render: (method) => <Tag color="cyan">{method}</Tag>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusConfig = {
          paid: { color: 'green', text: 'Paid' },
          pending: { color: 'orange', text: 'Pending' },
          overdue: { color: 'red', text: 'Overdue' }
        };
        const config = statusConfig[status];
        return <Badge color={config.color} text={config.text} />;
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="text" icon={<Eye size={16} />} size="small">
            View
          </Button>
          <Button type="text" icon={<Send size={16} />} size="small">
            Send
          </Button>
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
                <CreditCard className="mr-3 text-blue-600" size={32} />
                Publisher Payments
              </h1>
              <p className="text-gray-600 mt-2">
                Manage and track payments to your publishing partners
              </p>
            </div>
            <Space className="mt-4 lg:mt-0">
              <Button icon={<Download size={16} />}>
                Export
              </Button>
              <Button type="primary" icon={<Plus size={16} />} onClick={() => setCreateModal(true)}>
                New Payment
              </Button>
            </Space>
          </div>
        </div>

        {/* Stats */}
        <Row gutter={16} className="mb-6">
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center">
              <Statistic
                title="Total Paid"
                value={stats.totalPaid}
                prefix={<DollarSign className="text-green-500" size={20} />}
                valueStyle={{ color: '#10b981' }}
                formatter={value => `$${value.toLocaleString()}`}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center">
              <Statistic
                title="Pending Payments"
                value={stats.totalPending}
                prefix={<CreditCard className="text-orange-500" size={20} />}
                valueStyle={{ color: '#f59e0b' }}
                formatter={value => `$${value.toLocaleString()}`}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center">
              <Statistic
                title="Overdue"
                value={stats.totalOverdue}
                prefix={<DollarSign className="text-red-500" size={20} />}
                valueStyle={{ color: '#ef4444' }}
                formatter={value => `$${value.toLocaleString()}`}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center">
              <Statistic
                title="Active Publishers"
                value={stats.totalPublishers}
                prefix={<Users className="text-purple-500" size={20} />}
                valueStyle={{ color: '#8b5cf6' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Filters */}
        <Card className="mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <Input
              placeholder="Search publishers..."
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
              <Option value="paid">Paid</Option>
              <Option value="pending">Pending</Option>
              <Option value="overdue">Overdue</Option>
            </Select>
            <Select
              defaultValue="all"
              style={{ width: 150 }}
            >
              <Option value="all">All Methods</Option>
              <Option value="bank">Bank Transfer</Option>
              <Option value="paypal">PayPal</Option>
              <Option value="wire">Wire Transfer</Option>
            </Select>
            <RangePicker />
          </div>
        </Card>

        {/* Payments Table */}
        <Card
          title={
            <span className="text-lg font-semibold">
              Payment History ({filteredPayments.length})
            </span>
          }
        >
          <Table
            columns={columns}
            dataSource={filteredPayments}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} payments`,
            }}
            scroll={{ x: 1000 }}
          />
        </Card>

        {/* Create Payment Modal */}
        <Modal
          open={createModal}
          title="Create New Payment"
          onCancel={() => setCreateModal(false)}
          footer={null}
          width={600}
        >
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Publisher" required>
                  <Select placeholder="Select publisher">
                    <Option value="techcorp">TechCorp Ltd</Option>
                    <Option value="gameportal">GamePortal Inc</Option>
                    <Option value="newsdaily">NewsDaily Media</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Amount" required>
                  <Input prefix="$" placeholder="0.00" />
                </Form.Item>
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Payment Method" required>
                  <Select placeholder="Select method">
                    <Option value="bank">Bank Transfer</Option>
                    <Option value="paypal">PayPal</Option>
                    <Option value="wire">Wire Transfer</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Due Date" required>
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            
            <Form.Item label="Description">
              <TextArea rows={3} placeholder="Payment description..." />
            </Form.Item>
            
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button onClick={() => setCreateModal(false)}>
                Cancel
              </Button>
              <Button type="primary">
                Create Payment
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default PublisherPaymentsPage;