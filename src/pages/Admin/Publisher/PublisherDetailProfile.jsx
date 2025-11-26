import React, { useState } from 'react';
import {
  Card,
  Tabs,
  Descriptions,
  Avatar,
  Tag,
  Button,
  Space,
  Table,
  Statistic,
  Timeline,
  Empty,
  Switch,
  Modal,
  Form,
  Input,
  Select,
  Image,
  Progress,
  Row,
  Col,
  Alert,
  Badge,
  message,
  Divider
} from 'antd';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Ban,
  CheckCircle,
  XCircle,
  DollarSign,
  TrendingUp,
  Activity,
  FileText,
  MessageSquare,
  Bell,
  Shield,
  Megaphone,
  BarChart3,
  CreditCard,
  Clock,
  Eye,
  Download
} from 'lucide-react';
import {
  FaChartLine,
  FaChartPie,
  FaEnvelope,
  FaTicketAlt
} from 'react-icons/fa';

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

// Mock Publisher Profile Data
const mockPublisherProfile = {
  publisherId: 'PUB00001',
  name: 'TechCorp Inc.',
  email: 'contact@techcorp.com',
  phone: '+1 555-123-4567',
  avatar: 'https://ui-avatars.com/api/?name=TechCorp&background=random&size=200',
  registrationDate: '2024-10-15',
  lastLogin: '2024-11-20 14:30',
  kycStatus: 'approved',
  accountStatus: 'active',
  address: '123 Tech Street, Silicon Valley, CA 94102, USA',
  
  stats: {
    totalCampaigns: 45,
    activeCampaigns: 12,
    totalSpend: 125000,
    balance: 25000,
    impressions: 5400000,
    clicks: 125000,
    ctr: 2.31
  },
  
  campaigns: Array.from({ length: 15 }, (_, i) => ({
    key: i + 1,
    id: `CAMP${String(i + 1).padStart(5, '0')}`,
    name: `Campaign ${i + 1}`,
    type: ['Banner', 'Interstitial', 'Rewarded', 'URL Shortener'][i % 4],
    status: ['active', 'paused', 'completed', 'pending'][i % 4],
    budget: Math.floor(Math.random() * 10000) + 1000,
    spent: Math.floor(Math.random() * 8000) + 500,
    impressions: Math.floor(Math.random() * 100000) + 10000,
    clicks: Math.floor(Math.random() * 5000) + 100,
    startDate: '2024-10-01',
    endDate: '2024-12-31'
  })),
  
  transactions: Array.from({ length: 20 }, (_, i) => ({
    key: i + 1,
    id: `TXN${String(i + 1).padStart(6, '0')}`,
    type: ['Fund Addition', 'Campaign Spend', 'Refund', 'Adjustment'][i % 4],
    amount: Math.floor(Math.random() * 5000) + 100,
    status: ['completed', 'pending', 'failed'][i % 3],
    date: new Date(2024, 10, Math.floor(Math.random() * 25) + 1).toLocaleDateString(),
    description: ['Initial deposit', 'Campaign budget allocation', 'Refund processed', 'Manual adjustment'][i % 4]
  })),
  
  communications: [
    { id: 1, type: 'email', subject: 'KYC Approved', date: '2024-10-16', status: 'sent' },
    { id: 2, type: 'notification', subject: 'Campaign approved', date: '2024-10-20', status: 'sent' },
    { id: 3, type: 'ticket', subject: 'Payment inquiry', date: '2024-11-01', status: 'resolved' },
    { id: 4, type: 'email', subject: 'Monthly report', date: '2024-11-15', status: 'sent' }
  ],
  
  activityLog: [
    { date: '2024-11-20 14:30', action: 'Logged in', details: 'IP: 192.168.1.100', type: 'login' },
    { date: '2024-11-20 14:35', action: 'Created campaign', details: 'Summer Sale Campaign', type: 'campaign' },
    { date: '2024-11-19 10:20', action: 'Added funds', details: '$5,000 added', type: 'payment' },
    { date: '2024-11-18 16:45', action: 'Updated profile', details: 'Changed phone number', type: 'profile' },
    { date: '2024-11-17 09:15', action: 'Paused campaign', details: 'Winter Promo', type: 'campaign' }
  ]
};

const PublisherDetailProfile = () => {
  const [publisher] = useState(mockPublisherProfile);
  const [accountStatus, setAccountStatus] = useState(publisher.accountStatus === 'active');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [form] = Form.useForm();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  // Campaign Status Badge
  const getCampaignStatusBadge = (status) => {
    const config = {
      active: { color: 'success', text: 'Active' },
      paused: { color: 'warning', text: 'Paused' },
      completed: { color: 'default', text: 'Completed' },
      pending: { color: 'processing', text: 'Pending' }
    };
    return <Tag color={config[status]?.color}>{config[status]?.text}</Tag>;
  };

  // Transaction Status Badge
  const getTransactionStatusBadge = (status) => {
    const config = {
      completed: { color: 'success', text: 'Completed' },
      pending: { color: 'processing', text: 'Pending' },
      failed: { color: 'error', text: 'Failed' }
    };
    return <Tag color={config[status]?.color}>{config[status]?.text}</Tag>;
  };

  // Handle Account Status Toggle
  const handleAccountStatusChange = (checked) => {
    Modal.confirm({
      title: checked ? 'Activate Account' : 'Suspend Account',
      content: `Are you sure you want to ${checked ? 'activate' : 'suspend'} this publisher account?`,
      onOk: () => {
        setAccountStatus(checked);
        message.success(`Account ${checked ? 'activated' : 'suspended'} successfully`);
      }
    });
  };

  // Send Message
  const handleSendMessage = (values) => {
    message.success('Message sent successfully');
    setMessageModalVisible(false);
    form.resetFields();
  };

  // Campaign Columns
  const campaignColumns = [
    {
      title: 'Campaign',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <div className="font-semibold text-gray-900">{text}</div>
          <div className="text-xs text-gray-500">{record.id}</div>
        </div>
      )
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => <Tag color="blue">{type}</Tag>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getCampaignStatusBadge(status)
    },
    {
      title: 'Budget',
      dataIndex: 'budget',
      key: 'budget',
      render: (value) => formatCurrency(value)
    },
    {
      title: 'Spent',
      dataIndex: 'spent',
      key: 'spent',
      render: (value, record) => (
        <div>
          <div>{formatCurrency(value)}</div>
          <Progress 
            percent={Math.round((value / record.budget) * 100)} 
            size="small" 
            showInfo={false}
          />
        </div>
      )
    },
    {
      title: 'Performance',
      key: 'performance',
      render: (_, record) => (
        <div className="text-sm">
          <div>{formatNumber(record.impressions)} imp</div>
          <div className="text-gray-500">{formatNumber(record.clicks)} clicks</div>
        </div>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button size="small" type="link">View</Button>
          <Button size="small" type="link">Edit</Button>
        </Space>
      )
    }
  ];

  // Transaction Columns
  const transactionColumns = [
    {
      title: 'Transaction ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <span className="font-mono text-sm">{text}</span>
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        const colors = {
          'Fund Addition': 'green',
          'Campaign Spend': 'blue',
          'Refund': 'orange',
          'Adjustment': 'purple'
        };
        return <Tag color={colors[type]}>{type}</Tag>;
      }
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (value, record) => {
        const isDebit = record.type === 'Campaign Spend';
        return (
          <span className={isDebit ? 'text-red-600' : 'text-green-600'}>
            {isDebit ? '-' : '+'}{formatCurrency(value)}
          </span>
        );
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getTransactionStatusBadge(status)
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => <span className="text-gray-600">{text}</span>
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <Button type="link" className="mb-2 pl-0">
          ← Back to Publishers List
        </Button>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Publisher Profile</h1>
            <p className="text-gray-600">Detailed information and activity for {publisher.name}</p>
          </div>
          <Space wrap>
            <Button icon={<Edit className="w-4 h-4" />} onClick={() => setEditModalVisible(true)}>
              Edit Profile
            </Button>
            <Button icon={<MessageSquare className="w-4 h-4" />} type="primary" onClick={() => setMessageModalVisible(true)}>
              Send Message
            </Button>
            <Button icon={<Ban className="w-4 h-4" />} danger>
              Suspend Account
            </Button>
          </Space>
        </div>
      </div>

      {/* Profile Summary Card */}
      <Card className="mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6">
          <Avatar src={publisher.avatar} size={120} />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{publisher.name}</h2>
              <Tag color={publisher.kycStatus === 'approved' ? 'success' : 'warning'}>
                KYC {publisher.kycStatus}
              </Tag>
              <Tag color={accountStatus ? 'success' : 'error'}>
                {accountStatus ? 'Active' : 'Suspended'}
              </Tag>
            </div>
            
            <Row gutter={[24, 16]}>
              <Col xs={24} sm={12} md={8}>
                <Space direction="vertical" size={0}>
                  <span className="text-gray-500 text-sm flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Email
                  </span>
                  <span className="font-medium">{publisher.email}</span>
                </Space>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Space direction="vertical" size={0}>
                  <span className="text-gray-500 text-sm flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Phone
                  </span>
                  <span className="font-medium">{publisher.phone}</span>
                </Space>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Space direction="vertical" size={0}>
                  <span className="text-gray-500 text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Member Since
                  </span>
                  <span className="font-medium">{publisher.registrationDate}</span>
                </Space>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Space direction="vertical" size={0}>
                  <span className="text-gray-500 text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Location
                  </span>
                  <span className="font-medium">{publisher.address}</span>
                </Space>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Space direction="vertical" size={0}>
                  <span className="text-gray-500 text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Last Login
                  </span>
                  <span className="font-medium">{publisher.lastLogin}</span>
                </Space>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Space direction="vertical" size={0}>
                  <span className="text-gray-500 text-sm">Publisher ID</span>
                  <span className="font-medium font-mono">{publisher.publisherId}</span>
                </Space>
              </Col>
            </Row>
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={12} sm={12} md={6}>
          <Card className="text-center hover:shadow-md transition-shadow">
            <Statistic
              title="Total Campaigns"
              value={publisher.stats.totalCampaigns}
              prefix={<Megaphone className="w-5 h-5 text-blue-600" />}
              valueStyle={{ color: '#2563eb', fontSize: '1.5rem' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Card className="text-center hover:shadow-md transition-shadow">
            <Statistic
              title="Total Spend"
              value={publisher.stats.totalSpend}
              prefix={<DollarSign className="w-5 h-5 text-green-600" />}
              valueStyle={{ color: '#16a34a', fontSize: '1.5rem' }}
              formatter={(value) => formatCurrency(value)}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Card className="text-center hover:shadow-md transition-shadow">
            <Statistic
              title="Balance"
              value={publisher.stats.balance}
              prefix={<CreditCard className="w-5 h-5 text-purple-600" />}
              valueStyle={{ color: '#9333ea', fontSize: '1.5rem' }}
              formatter={(value) => formatCurrency(value)}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Card className="text-center hover:shadow-md transition-shadow">
            <Statistic
              title="Active Campaigns"
              value={publisher.stats.activeCampaigns}
              prefix={<Activity className="w-5 h-5 text-orange-600" />}
              valueStyle={{ color: '#ea580c', fontSize: '1.5rem' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Tabs Section */}
      <Card className="shadow-sm">
        <Tabs defaultActiveKey="1" size="large">
          {/* Overview Tab */}
          <TabPane
            tab={
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Overview
              </span>
            }
            key="1"
          >
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                <Card title="Account Controls" className="h-full">
                  <Space direction="vertical" className="w-full" size="large">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900">Account Status</div>
                        <div className="text-sm text-gray-500">
                          {accountStatus ? 'Account is active' : 'Account is suspended'}
                        </div>
                      </div>
                      <Switch
                        checked={accountStatus}
                        onChange={handleAccountStatusChange}
                        checkedChildren="Active"
                        unCheckedChildren="Suspended"
                      />
                    </div>
                    <Divider className="my-2" />
                    <Button block icon={<Edit className="w-4 h-4" />}>
                      Edit Profile Information
                    </Button>
                    <Button block icon={<Shield className="w-4 h-4" />}>
                      <a href={`/admin/publishers/${publisher.publisherId}/kyc-review`}>
                        Review KYC Documents
                      </a>
                    </Button>
                    <Button block danger icon={<Ban className="w-4 h-4" />}>
                      Ban Publisher Permanently
                    </Button>
                  </Space>
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title="Performance Metrics" className="h-full">
                  <Space direction="vertical" className="w-full" size="middle">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Total Impressions</span>
                        <span className="font-bold text-blue-600">
                          {formatNumber(publisher.stats.impressions)}
                        </span>
                      </div>
                      <Progress percent={85} strokeColor="#3b82f6" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Total Clicks</span>
                        <span className="font-bold text-green-600">
                          {formatNumber(publisher.stats.clicks)}
                        </span>
                      </div>
                      <Progress percent={65} strokeColor="#22c55e" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Click-Through Rate</span>
                        <span className="font-bold text-purple-600">
                          {publisher.stats.ctr}%
                        </span>
                      </div>
                      <Progress percent={publisher.stats.ctr * 10} strokeColor="#9333ea" />
                    </div>
                  </Space>
                </Card>
              </Col>
            </Row>

            <Card title="Recent Activity" className="mt-6">
              <Timeline>
                {publisher.activityLog.map((activity, index) => (
                  <Timeline.Item
                    key={index}
                    color={
                      activity.type === 'login' ? 'blue' :
                      activity.type === 'campaign' ? 'green' :
                      activity.type === 'payment' ? 'orange' : 'purple'
                    }
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.details}</p>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                        {activity.date}
                      </span>
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </Card>
          </TabPane>

          {/* KYC Documents Tab */}
          <TabPane
            tab={
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                KYC Documents
              </span>
            }
            key="2"
          >
            <Alert
              message="KYC Status: Approved"
              description="All documents have been verified and approved on 2024-10-16"
              type="success"
              showIcon
              className="mb-6"
              action={
                <Button size="small" type="primary">
                  <a href={`/admin/publishers/${publisher.publisherId}/kyc-review`}>
                    Re-review
                  </a>
                </Button>
              }
            />

            <Row gutter={[16, 16]}>
              {[
                'Company Registration',
                'Tax Documents',
                'Bank Verification',
                'ID Proof',
                'Address Proof',
                'Platform Screenshots'
              ].map((doc, index) => (
                <Col xs={24} sm={12} md={8} key={index}>
                  <Card className="hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{doc}</div>
                        <Tag color="success" className="mt-1">Verified</Tag>
                      </div>
                    </div>
                    <Space>
                      <Button size="small" icon={<Eye className="w-3 h-3" />}>
                        View
                      </Button>
                      <Button size="small" icon={<Download className="w-3 h-3" />}>
                        Download
                      </Button>
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>

            <Card title="Verification History" className="mt-6">
              <Timeline>
                <Timeline.Item color="green">
                  <p className="font-semibold">KYC Approved</p>
                  <p className="text-sm text-gray-500">Approved by Admin John - 2024-10-16</p>
                </Timeline.Item>
                <Timeline.Item color="blue">
                  <p className="font-semibold">Documents Submitted</p>
                  <p className="text-sm text-gray-500">All required documents uploaded - 2024-10-15</p>
                </Timeline.Item>
                <Timeline.Item color="gray">
                  <p className="font-semibold">KYC Initiated</p>
                  <p className="text-sm text-gray-500">Publisher started KYC process - 2024-10-15</p>
                </Timeline.Item>
              </Timeline>
            </Card>
          </TabPane>

          {/* Campaigns Tab */}
          <TabPane
            tab={
              <span className="flex items-center gap-2">
                <Megaphone className="w-4 h-4" />
                Campaigns ({publisher.campaigns.length})
              </span>
            }
            key="3"
          >
            <Table
              columns={campaignColumns}
              dataSource={publisher.campaigns}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 800 }}
            />
          </TabPane>

          {/* Transactions Tab */}
          <TabPane
            tab={
              <span className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Transactions
              </span>
            }
            key="4"
          >
            <Table
              columns={transactionColumns}
              dataSource={publisher.transactions}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 800 }}
            />
          </TabPane>

          {/* Analytics Tab */}
          <TabPane
            tab={
              <span className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Analytics
              </span>
            }
            key="5"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <Card title={<span className="flex items-center gap-2"><FaChartLine /> Performance Trends</span>}>
                  <div className="h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                    <div className="text-center">
                      <FaChartLine className="w-12 h-12 mx-auto mb-2" />
                      <p>Performance Chart</p>
                      <p className="text-sm opacity-80">Real-time analytics data</p>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title={<span className="flex items-center gap-2"><FaChartPie /> Campaign Distribution</span>}>
                  <div className="h-64 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center text-white">
                    <div className="text-center">
                      <FaChartPie className="w-12 h-12 mx-auto mb-2" />
                      <p>Distribution Chart</p>
                      <p className="text-sm opacity-80">Campaign breakdown</p>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]} className="mt-4">
              <Col xs={24} sm={12} md={6}>
                <Card>
                  <Statistic
                    title="Best Performing Campaign"
                    value="Summer Sale"
                    valueStyle={{ fontSize: '1rem', color: '#16a34a' }}
                    prefix={<TrendingUp className="w-4 h-4" />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card>
                  <Statistic
                    title="Avg. ROI"
                    value={245}
                    suffix="%"
                    valueStyle={{ fontSize: '1rem', color: '#2563eb' }}
                    prefix={<BarChart3 className="w-4 h-4" />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card>
                  <Statistic
                    title="Conversion Rate"
                    value={3.87}
                    suffix="%"
                    precision={2}
                    valueStyle={{ fontSize: '1rem', color: '#9333ea' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card>
                  <Statistic
                    title="Avg. CPC"
                    value={0.85}
                    prefix="$"
                    precision={2}
                    valueStyle={{ fontSize: '1rem', color: '#ea580c' }}
                  />
                </Card>
              </Col>
            </Row>
          </TabPane>

          {/* Communications Tab */}
          <TabPane
            tab={
              <span className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Communications
              </span>
            }
            key="6"
          >
            <Card 
              title="Communication History"
              extra={
                <Button type="primary" icon={<FaEnvelope />} onClick={() => setMessageModalVisible(true)}>
                  Send Message
                </Button>
              }
            >
              <Timeline>
                {publisher.communications.map((comm) => (
                  <Timeline.Item
                    key={comm.id}
                    color={
                      comm.type === 'email' ? 'blue' :
                      comm.type === 'notification' ? 'green' :
                      'orange'
                    }
                    dot={
                      comm.type === 'email' ? <FaEnvelope className="text-blue-600" /> :
                      comm.type === 'notification' ? <Bell className="w-4 h-4 text-green-600" /> :
                      <FaTicketAlt className="text-orange-600" />
                    }
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">{comm.subject}</p>
                        <Space size="small" className="mt-1">
                          <Tag>{comm.type}</Tag>
                          <Tag color={comm.status === 'sent' ? 'success' : 'processing'}>
                            {comm.status}
                          </Tag>
                        </Space>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                        {comm.date}
                      </span>
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </Card>

            <Row gutter={[16, 16]} className="mt-6">
              <Col xs={24} sm={8}>
                <Card>
                  <Statistic
                    title="Emails Sent"
                    value={45}
                    prefix={<FaEnvelope />}
                    valueStyle={{ color: '#2563eb' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card>
                  <Statistic
                    title="Notifications"
                    value={128}
                    prefix={<Bell className="w-4 h-4" />}
                    valueStyle={{ color: '#16a34a' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card>
                  <Statistic
                    title="Support Tickets"
                    value={7}
                    prefix={<FaTicketAlt />}
                    valueStyle={{ color: '#ea580c' }}
                  />
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Card>

      {/* Send Message Modal */}
      <Modal
        title="Send Message to Publisher"
        open={messageModalVisible}
        onCancel={() => setMessageModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form form={form} onFinish={handleSendMessage} layout="vertical">
          <Form.Item
            name="type"
            label="Message Type"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select message type">
              <Option value="email">Email</Option>
              <Option value="notification">In-App Notification</Option>
              <Option value="both">Both</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true, message: 'Please enter subject' }]}
          >
            <Input placeholder="Enter message subject" />
          </Form.Item>
          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: 'Please enter message' }]}
          >
            <TextArea rows={6} placeholder="Type your message here..." />
          </Form.Item>
          <Form.Item>
            <Space className="w-full justify-end">
              <Button onClick={() => setMessageModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Send Message
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PublisherDetailProfile;
