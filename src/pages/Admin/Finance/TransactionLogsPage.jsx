import React, { useState } from 'react';
import {
  Card, Table, Button, Tag, Space, Input, Select,
  DatePicker, Row, Col, Statistic, Badge, Modal, Descriptions
} from 'antd';
import {
  BarChart3, Search, Filter, Download, Eye, Calendar,
  TrendingUp, TrendingDown, DollarSign, FileText, RefreshCw
} from 'lucide-react';

const { Option } = Select;
const { RangePicker } = DatePicker;

const TransactionLogsPage = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [filterType, setFilterType] = useState('all');

  const transactions = [
    {
      key: 1,
      type: 'ad_revenue',
      category: 'Revenue',
      entity: 'TechCorp Ltd',
      income: 2200,
      expense: 0,
      net: 2200,
      date: '2025-11-20',
      description: 'Banner Ad Earnings - Premium Campaign',
      status: 'completed',
      reference: 'TXN-2025-001',
      paymentMethod: 'Stripe'
    },
    {
      key: 2,
      type: 'publisher_payment',
      category: 'Expense',
      entity: 'GamePortal Inc',
      income: 0,
      expense: 1500,
      net: -1500,
      date: '2025-11-19',
      description: 'Monthly Publisher Payment',
      status: 'completed',
      reference: 'PAY-2025-002',
      paymentMethod: 'Bank Transfer'
    },
    {
      key: 3,
      type: 'ad_revenue',
      category: 'Revenue',
      entity: 'NewsDaily Media',
      income: 850,
      expense: 0,
      net: 850,
      date: '2025-11-18',
      description: 'Interstitial Ad Revenue',
      status: 'completed',
      reference: 'TXN-2025-003',
      paymentMethod: 'Stripe'
    },
    {
      key: 4,
      type: 'viewer_payout',
      category: 'Expense',
      entity: 'VideoStream Hub',
      income: 0,
      expense: 2300,
      net: -2300,
      date: '2025-11-17',
      description: 'Viewer Earnings Payout',
      status: 'processing',
      reference: 'POUT-2025-004',
      paymentMethod: 'PayPal'
    },
    {
      key: 5,
      type: 'ad_revenue',
      category: 'Revenue',
      entity: 'TechBlog Inc',
      income: 1200,
      expense: 0,
      net: 1200,
      date: '2025-11-16',
      description: 'Rewarded Video Ads',
      status: 'completed',
      reference: 'TXN-2025-005',
      paymentMethod: 'Stripe'
    },
    {
      key: 6,
      type: 'refund',
      category: 'Expense',
      entity: 'Customer Support',
      income: 0,
      expense: 300,
      net: -300,
      date: '2025-11-15',
      description: 'Customer Refund - Service Issue',
      status: 'completed',
      reference: 'REF-2025-006',
      paymentMethod: 'Credit Card'
    }
  ];

  const filteredTransactions = transactions.filter(transaction => 
    filterType === 'all' || transaction.category.toLowerCase() === filterType
  );

  const stats = {
    totalRevenue: transactions.filter(t => t.income > 0).reduce((sum, t) => sum + t.income, 0),
    totalExpenses: transactions.filter(t => t.expense > 0).reduce((sum, t) => sum + t.expense, 0),
    netProfit: transactions.reduce((sum, t) => sum + t.net, 0),
    totalTransactions: transactions.length
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'ad_revenue': return 'green';
      case 'publisher_payment': return 'orange';
      case 'viewer_payout': return 'purple';
      case 'refund': return 'red';
      default: return 'blue';
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'ad_revenue': return 'Ad Revenue';
      case 'publisher_payment': return 'Publisher Payment';
      case 'viewer_payout': return 'Viewer Payout';
      case 'refund': return 'Refund';
      default: return type;
    }
  };

  const columns = [
    {
      title: 'Date',
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
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={getTypeColor(type)}>
          {getTypeText(type)}
        </Tag>
      )
    },
    {
      title: 'Entity',
      dataIndex: 'entity',
      key: 'entity',
      render: (entity) => <span className="font-medium">{entity}</span>
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
      key: 'reference',
      render: (ref) => <span className="text-gray-600 text-sm">{ref}</span>
    },
    {
      title: 'Income',
      dataIndex: 'income',
      key: 'income',
      render: (income) => income > 0 ? (
        <Space>
          <TrendingUp size={14} className="text-green-500" />
          <span className="text-green-600 font-semibold">
            +${income.toLocaleString()}
          </span>
        </Space>
      ) : null
    },
    {
      title: 'Expense',
      dataIndex: 'expense',
      key: 'expense',
      render: (expense) => expense > 0 ? (
        <Space>
          <TrendingDown size={14} className="text-red-500" />
          <span className="text-red-600 font-semibold">
            -${expense.toLocaleString()}
          </span>
        </Space>
      ) : null
    },
    {
      title: 'Net Amount',
      dataIndex: 'net',
      key: 'net',
      render: (net) => (
        <span className={`font-bold text-lg ${
          net >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {net >= 0 ? '+' : ''}${net.toLocaleString()}
        </span>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge 
          status={status === 'completed' ? 'success' : 'processing'}
          text={status.charAt(0).toUpperCase() + status.slice(1)}
        />
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button 
          type="text" 
          icon={<Eye size={16} />}
          onClick={() => setSelectedTransaction(record)}
        >
          Details
        </Button>
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
                <BarChart3 className="mr-3 text-indigo-600" size={32} />
                Transaction Logs
              </h1>
              <p className="text-gray-600 mt-2">
                Comprehensive view of all financial transactions and activities
              </p>
            </div>
            <Space className="mt-4 lg:mt-0">
              <Button icon={<RefreshCw size={16} />}>
                Refresh
              </Button>
              <Button icon={<Download size={16} />}>
                Export
              </Button>
            </Space>
          </div>
        </div>

        {/* Stats */}
        <Row gutter={16} className="mb-6">
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center">
              <Statistic
                title="Total Revenue"
                value={stats.totalRevenue}
                prefix={<TrendingUp className="text-green-500" size={20} />}
                valueStyle={{ color: '#10b981' }}
                formatter={value => `$${value.toLocaleString()}`}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center">
              <Statistic
                title="Total Expenses"
                value={stats.totalExpenses}
                prefix={<TrendingDown className="text-red-500" size={20} />}
                valueStyle={{ color: '#ef4444' }}
                formatter={value => `$${value.toLocaleString()}`}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center">
              <Statistic
                title="Net Profit"
                value={stats.netProfit}
                prefix={<DollarSign className="text-blue-500" size={20} />}
                valueStyle={{ color: '#3b82f6' }}
                formatter={value => `$${value.toLocaleString()}`}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center">
              <Statistic
                title="Total Transactions"
                value={stats.totalTransactions}
                prefix={<FileText className="text-purple-500" size={20} />}
                valueStyle={{ color: '#8b5cf6' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Filters */}
        <Card className="mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <Input
              placeholder="Search transactions..."
              prefix={<Search size={16} />}
              style={{ width: 250 }}
            />
            <Select
              value={filterType}
              onChange={setFilterType}
              style={{ width: 150 }}
              suffixIcon={<Filter size={16} />}
            >
              <Option value="all">All Types</Option>
              <Option value="revenue">Revenue</Option>
              <Option value="expense">Expense</Option>
            </Select>
            <Select
              defaultValue="all"
              style={{ width: 180 }}
            >
              <Option value="all">All Categories</Option>
              <Option value="ad_revenue">Ad Revenue</Option>
              <Option value="publisher_payment">Publisher Payments</Option>
              <Option value="viewer_payout">Viewer Payouts</Option>
              <Option value="refund">Refunds</Option>
            </Select>
            <Select
              defaultValue="all"
              style={{ width: 150 }}
            >
              <Option value="all">All Status</Option>
              <Option value="completed">Completed</Option>
              <Option value="processing">Processing</Option>
              <Option value="pending">Pending</Option>
            </Select>
            <RangePicker />
          </div>
        </Card>

        {/* Transactions Table */}
        <Card
          title={
            <span className="text-lg font-semibold">
              Transaction History ({filteredTransactions.length})
            </span>
          }
        >
          <Table
            columns={columns}
            dataSource={filteredTransactions}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} transactions`,
            }}
            scroll={{ x: 1000 }}
          />
        </Card>

        {/* Transaction Details Modal */}
        <Modal
          open={!!selectedTransaction}
          title="Transaction Details"
          onCancel={() => setSelectedTransaction(null)}
          footer={[
            <Button key="close" onClick={() => setSelectedTransaction(null)}>
              Close
            </Button>,
          ]}
          width={600}
        >
          {selectedTransaction && (
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="Reference ID">
                <Tag color="blue">{selectedTransaction.reference}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Date">
                {selectedTransaction.date}
              </Descriptions.Item>
              <Descriptions.Item label="Type">
                <Tag color={getTypeColor(selectedTransaction.type)}>
                  {getTypeText(selectedTransaction.type)}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Entity">
                {selectedTransaction.entity}
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                {selectedTransaction.description}
              </Descriptions.Item>
              <Descriptions.Item label="Income">
                {selectedTransaction.income > 0 ? (
                  <span className="text-green-600 font-semibold">
                    +${selectedTransaction.income.toLocaleString()}
                  </span>
                ) : (
                  <span className="text-gray-500">-</span>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Expense">
                {selectedTransaction.expense > 0 ? (
                  <span className="text-red-600 font-semibold">
                    -${selectedTransaction.expense.toLocaleString()}
                  </span>
                ) : (
                  <span className="text-gray-500">-</span>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Net Amount">
                <span className={`font-bold text-lg ${
                  selectedTransaction.net >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {selectedTransaction.net >= 0 ? '+' : ''}${selectedTransaction.net.toLocaleString()}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Payment Method">
                {selectedTransaction.paymentMethod}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Badge 
                  status={selectedTransaction.status === 'completed' ? 'success' : 'processing'}
                  text={selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                />
              </Descriptions.Item>
            </Descriptions>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default TransactionLogsPage;