import React, { useState } from 'react';
import {
  Card, Tabs, Descriptions, Avatar, Tag, Row, Col, Statistic,
  Table, Space, Progress, Button, Modal, Form, Input, Timeline, Select, Alert
} from 'antd';
import {
  User,
  Mail,
  Globe,
  BadgeCheck,
  Shield,
  Edit,
  Eye,
  Pause,
  CheckCircle,
  Ban,
  DollarSign,
  BarChart3,
  MessageCircle,
  CreditCard,
  Clock,
  Download
} from 'lucide-react';

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

// Mock Data
const mockViewer = {
  viewerId: 'VIEW00001',
  name: 'NewsDaily',
  email: 'owner@newsdaily.com',
  avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=newsdaily',
  status: 'active',
  registrationDate: '2024-10-21',
  platforms: [
    { name: 'newsdaily.com', type: 'Website', status: 'approved', integration: 'integrated', earnings: 5200, impressions: 124000 },
    { name: 'newsdaily-app', type: 'App', status: 'pending', integration: 'not_integrated', earnings: 1200, impressions: 14500 }
  ],
  payments: [
    { id: 'P1', date: '2024-11-01', amount: 1200, status: 'completed', method: 'Bank Transfer' },
    { id: 'P2', date: '2024-10-15', amount: 1100, status: 'completed', method: 'PayPal' }
  ],
  analytics: {
    totalEarnings: 7400,
    totalImpressions: 210000,
    totalPlatforms: 2,
    topPlatform: 'newsdaily.com',
    revenueTrend: 8.5
  },
  messages: [
    { date: '2024-11-10', type: 'notification', subject: 'Payment Processed', status: 'sent' },
    { date: '2024-10-22', type: 'support', subject: 'Integration issue', status: 'resolved' }
  ],
  activityLog: [
    { time: '2024-11-14 11:32', action: 'Platform integration added' },
    { time: '2024-11-09 12:10', action: 'Earnings threshold reached' }
  ]
};

const ViewerProfile = () => {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalMsg, setModalMsg] = useState(false);
  const [form] = Form.useForm();

  // Platform table
  const platformColumns = [
    { title: 'Name', dataIndex: 'name', render: (name, r) => <span className="font-semibold">{name}</span> },
    { title: 'Type', dataIndex: 'type', render: type => <Tag color={type === 'Website' ? 'blue' : 'purple'}>{type}</Tag> },
    { title: 'Status', dataIndex: 'status', render: s => <Tag color={s === 'approved' ? 'success' : 'warning'}>{s}</Tag> },
    { title: 'Integration', dataIndex: 'integration', render: i => i === 'integrated' ? <Tag color="success">Integrated</Tag> : <Tag>Not Integrated</Tag> },
    { title: 'Earnings', dataIndex: 'earnings', render: val => `$${val}` },
    { title: 'Impressions', dataIndex: 'impressions', render: val => val.toLocaleString() }
  ];

  // Payments table
  const paymentColumns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Date', dataIndex: 'date' },
    { title: 'Amount', dataIndex: 'amount', render: val => <span className="text-green-600">${val}</span> },
    { title: 'Status', dataIndex: 'status', render: s => <Tag color={s === 'completed' ? 'success' : 'warning'}>{s}</Tag> },
    { title: 'Method', dataIndex: 'method' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Viewer Profile</h1>
          <span className="text-gray-500">All details and performance</span>
        </div>
        <Space wrap>
          <Button icon={<Edit />} onClick={() => setModalEdit(true)}>Edit Info</Button>
          <Button icon={<MessageCircle />} onClick={() => setModalMsg(true)} type="primary">Send Message</Button>
          <Button icon={<Ban />} danger>Suspend</Button>
        </Space>
      </div>
      <Card className="mb-6">
        <div className="flex items-center gap-6 flex-wrap">
          <Avatar src={mockViewer.avatar} size={96} />
          <Descriptions column={2} size="small">
            <Descriptions.Item label="Name">{mockViewer.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{mockViewer.email}</Descriptions.Item>
            <Descriptions.Item label="Status"><Tag color={mockViewer.status === 'active' ? 'success' : 'warning'}>{mockViewer.status}</Tag></Descriptions.Item>
            <Descriptions.Item label="Viewer ID">{mockViewer.viewerId}</Descriptions.Item>
          </Descriptions>
        </div>
      </Card>
      <Row gutter={16} className="mb-6">
        <Col md={6} xs={24}><Card><Statistic title="Platforms" value={mockViewer.analytics.totalPlatforms} prefix={<Globe />} /></Card></Col>
        <Col md={6} xs={24}><Card><Statistic title="Earnings" value={`$${mockViewer.analytics.totalEarnings}`} prefix={<DollarSign />} /></Card></Col>
        <Col md={6} xs={24}><Card><Statistic title="Impressions" value={mockViewer.analytics.totalImpressions} prefix={<BarChart3 />} /></Card></Col>
        <Col md={6} xs={24}><Card>
          <Statistic title="Revenue Trend" value={mockViewer.analytics.revenueTrend} suffix="%" prefix={<CheckCircle />} valueStyle={{ color: mockViewer.analytics.revenueTrend > 0 ? '#16a34a' : '#dc2626' }} />
        </Card></Col>
      </Row>
      <Card>
        <Tabs defaultActiveKey="1" size="large">
          <TabPane tab="Overview" key="1">
            <Card title="Platforms Owned" className="mb-4" bodyStyle={{padding:0}}>
              <Table columns={platformColumns} dataSource={mockViewer.platforms} rowKey="name" pagination={false} />
            </Card>
            <Card title="Activity Log">
              <Timeline>{mockViewer.activityLog.map((a, i) =>
                <Timeline.Item key={i} color="blue">{a.action}<span className="text-xs text-gray-400 ml-2">{a.time}</span></Timeline.Item>
              )}</Timeline>
            </Card>
          </TabPane>
          <TabPane tab="Platforms" key="2">
            <Table columns={platformColumns} dataSource={mockViewer.platforms} rowKey="name" pagination={false} />
          </TabPane>
          <TabPane tab="Earnings & Payments" key="3">
            <Card title="Earnings Summary" className="mb-4">
              <Space>
                <span className="font-bold text-green-700">Total Earnings: ${mockViewer.analytics.totalEarnings}</span>
                <span className="text-gray-500">Latest Payment: ${mockViewer.payments[0].amount} on {mockViewer.payments[0].date}</span>
              </Space>
            </Card>
            <Card title="Payment Requests">
              <Table columns={paymentColumns} dataSource={mockViewer.payments} rowKey="id" pagination={false} />
            </Card>
          </TabPane>
          <TabPane tab="Analytics" key="4">
            <Row>
              <Col md={12}><Card title="Earnings Trend"><Progress percent={85} size="large" showInfo /></Card></Col>
              <Col md={12}><Card title="Top Platform"><Tag color="blue">{mockViewer.analytics.topPlatform}</Tag></Card></Col>
            </Row>
          </TabPane>
          <TabPane tab="Communications" key="5">
            <Timeline>{mockViewer.messages.map((m, i) =>
              <Timeline.Item key={i} color={m.status === 'sent' ? 'green' : 'orange'}>{m.type}: {m.subject} <span className="text-xs text-gray-400">{m.date}</span></Timeline.Item>
            )}</Timeline>
          </TabPane>
        </Tabs>
      </Card>
      <Modal open={modalEdit} title="Edit Viewer Info" onCancel={() => setModalEdit(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={() => setModalEdit(false)}>
          <Form.Item name="name" label="Name" initialValue={mockViewer.name}><Input /></Form.Item>
          <Form.Item name="email" label="Email" initialValue={mockViewer.email}><Input /></Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Save</Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal open={modalMsg} title="Send Message" onCancel={() => setModalMsg(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={() => setModalMsg(false)}>
          <Form.Item name="subject" label="Subject"><Input /></Form.Item>
          <Form.Item name="msg" label="Message"><TextArea rows={4} /></Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Send</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ViewerProfile;
