// === Email Campaigns Page ===
import React, { useState } from "react";
import {
  Card, Table, Button, Tag, Space, Input, Select, Modal, DatePicker,
  Statistic, Row, Col, Avatar, Tooltip, Progress, Badge, Form,
  Steps, Divider
} from "antd";
import {
  Mail, Send, Eye, Edit3, Trash2, Search, Filter, Users,
  TrendingUp, BarChart3, Clock, CheckCircle, PlayCircle
} from "lucide-react";

const { Option } = Select;
const { TextArea } = Input;

const EmailCampaignsPage = () => {
  const [createModal, setCreateModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [filterStatus, setFilterStatus] = useState("all");

  const emailCampaigns = [
    {
      key: 1,
      subject: "Welcome to Our Platform!",
      template: "Welcome Email",
      recipients: 5000,
      opened: 4200,
      clicked: 1300,
      unsubscribed: 45,
      status: "Completed",
      sentDate: "2025-11-24",
      bounceRate: 2.1,
      sender: "noreply@platform.com"
    },
    {
      key: 2,
      subject: "New Feature: Advanced Analytics",
      template: "Feature Update",
      recipients: 3200,
      opened: 2800,
      clicked: 890,
      unsubscribed: 23,
      status: "In Progress",
      sentDate: "2025-11-25",
      bounceRate: 1.8,
      sender: "updates@platform.com"
    },
    {
      key: 3,
      subject: "Monthly Performance Report",
      template: "Monthly Report",
      recipients: 1500,
      opened: 0,
      clicked: 0,
      unsubscribed: 0,
      status: "Scheduled",
      sentDate: "2025-11-28",
      bounceRate: 0,
      sender: "reports@platform.com"
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "green";
      case "In Progress": return "blue";
      case "Scheduled": return "orange";
      case "Draft": return "gray";
      default: return "gray";
    }
  };

  const columns = [
    {
      title: "Campaign",
      dataIndex: "subject",
      render: (subject, record) => (
        <Space direction="vertical" size={2}>
          <div className="font-semibold text-gray-900">{subject}</div>
          <div className="text-xs text-gray-500">Template: {record.template}</div>
        </Space>
      ),
    },
    {
      title: "Recipients",
      dataIndex: "recipients",
      render: (recipients) => (
        <div className="text-center">
          <Users size={14} className="inline text-gray-400 mr-1" />
          <span className="font-medium">{recipients.toLocaleString()}</span>
        </div>
      ),
    },
    {
      title: "Performance",
      render: (record) => (
        <Space direction="vertical" size={4} style={{ width: 120 }}>
          <div className="flex justify-between text-xs">
            <span>Open:</span>
            <span className="font-medium">{Math.round((record.opened / record.recipients) * 100)}%</span>
          </div>
          <Progress
            percent={Math.round((record.opened / record.recipients) * 100)}
            size="small"
            strokeColor="#10b981"
            showInfo={false}
          />
          <div className="flex justify-between text-xs">
            <span>Click:</span>
            <span className="font-medium">{Math.round((record.clicked / record.opened) * 100) || 0}%</span>
          </div>
          <Progress
            percent={Math.round((record.clicked / record.opened) * 100) || 0}
            size="small"
            strokeColor="#3b82f6"
            showInfo={false}
          />
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={getStatusColor(status)} className="capitalize">
          {status}
        </Tag>
      ),
    },
    {
      title: "Sent Date",
      dataIndex: "sentDate",
      render: (date) => (
        <Space>
          <Clock size={14} className="text-gray-400" />
          <span>{date}</span>
        </Space>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="View Analytics">
            <Button 
              type="text" 
              icon={<BarChart3 size={16} />}
              onClick={() => setSelectedCampaign(record)}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button type="text" icon={<Edit3 size={16} />} />
          </Tooltip>
          <Tooltip title={record.status === "Scheduled" ? "Send Now" : "Resend"}>
            <Button type="text" icon={<Send size={16} />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const steps = [
    {
      title: 'Setup',
      description: 'Campaign details',
    },
    {
      title: 'Content',
      description: 'Email content',
    },
    {
      title: 'Recipients',
      description: 'Target audience',
    },
    {
      title: 'Review',
      description: 'Final check',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Mail className="mr-3 text-purple-600" size={32} />
                Email Campaigns
              </h1>
              <p className="text-gray-600 mt-2">
                Create and manage email campaigns for your users
              </p>
            </div>
            <Button
              type="primary"
              size="large"
              icon={<Send size={18} />}
              onClick={() => setCreateModal(true)}
            >
              Create Campaign
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <Row gutter={16} className="mb-6">
          <Col span={6}>
            <Card className="text-center">
              <Statistic
                title="Total Campaigns"
                value={emailCampaigns.length}
                prefix={<Mail className="text-purple-500" size={20} />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="text-center">
              <Statistic
                title="Total Sent"
                value={emailCampaigns.reduce((sum, c) => sum + c.recipients, 0)}
                valueStyle={{ color: '#3b82f6' }}
                prefix={<Send size={20} />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="text-center">
              <Statistic
                title="Avg. Open Rate"
                value={Math.round(
                  (emailCampaigns.reduce((sum, c) => sum + c.opened, 0) / 
                   emailCampaigns.reduce((sum, c) => sum + c.recipients, 0)) * 100
                )}
                suffix="%"
                valueStyle={{ color: '#10b981' }}
                prefix={<TrendingUp size={20} />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="text-center">
              <Statistic
                title="Avg. Click Rate"
                value={Math.round(
                  (emailCampaigns.reduce((sum, c) => sum + c.clicked, 0) / 
                   emailCampaigns.reduce((sum, c) => sum + c.opened, 0)) * 100
                )}
                suffix="%"
                valueStyle={{ color: '#f59e0b' }}
                prefix={<BarChart3 size={20} />}
              />
            </Card>
          </Col>
        </Row>

        {/* Filters */}
        <Card className="mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <Input
              placeholder="Search campaigns..."
              prefix={<Search size={16} />}
              style={{ width: 300 }}
            />
            <Select
              placeholder="Filter by status"
              value={filterStatus}
              onChange={setFilterStatus}
              style={{ width: 200 }}
              suffixIcon={<Filter size={16} />}
            >
              <Option value="all">All Status</Option>
              <Option value="Completed">Completed</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Scheduled">Scheduled</Option>
              <Option value="Draft">Draft</Option>
            </Select>
            <DatePicker.RangePicker />
          </div>
        </Card>

        {/* Campaigns Table */}
        <Card 
          title={
            <span className="text-lg font-semibold">
              Email Campaigns ({emailCampaigns.length})
            </span>
          }
          className="shadow-sm"
        >
          <Table
            columns={columns}
            dataSource={emailCampaigns}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} campaigns`,
            }}
          />
        </Card>
      </div>

      {/* Create Campaign Modal */}
      <Modal
        open={createModal}
        title={
          <div>
            <div className="flex items-center mb-2">
              <Send className="mr-2" size={20} />
              Create New Email Campaign
            </div>
            <Steps
              current={currentStep}
              items={steps}
              size="small"
            />
          </div>
        }
        onCancel={() => {
          setCreateModal(false);
          setCurrentStep(0);
        }}
        footer={null}
        width={700}
      >
        <div className="mt-6">
          {currentStep === 0 && (
            <Form layout="vertical">
              <Form.Item label="Campaign Name" required>
                <Input placeholder="Enter campaign name" size="large" />
              </Form.Item>
              <Form.Item label="Email Subject" required>
                <Input placeholder="Enter email subject" size="large" />
              </Form.Item>
              <Form.Item label="Sender Email" required>
                <Select placeholder="Select sender" size="large">
                  <Option value="noreply@platform.com">noreply@platform.com</Option>
                  <Option value="updates@platform.com">updates@platform.com</Option>
                  <Option value="support@platform.com">support@platform.com</Option>
                </Select>
              </Form.Item>
            </Form>
          )}
          
          {currentStep === 1 && (
            <Form layout="vertical">
              <Form.Item label="Email Template" required>
                <Select placeholder="Select template" size="large">
                  <Option value="welcome">Welcome Email</Option>
                  <Option value="monthly-report">Monthly Report</Option>
                  <Option value="feature-update">Feature Update</Option>
                  <Option value="promotional">Promotional</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Email Content" required>
                <TextArea
                  rows={8}
                  placeholder="Write your email content here..."
                  showCount
                  maxLength={2000}
                />
              </Form.Item>
            </Form>
          )}
          
          {currentStep === 2 && (
            <Form layout="vertical">
              <Form.Item label="Target Audience" required>
                <Select mode="multiple" placeholder="Select recipients" size="large">
                  <Option value="all">All Users</Option>
                  <Option value="publishers">Publishers</Option>
                  <Option value="viewers">Viewers</Option>
                  <Option value="premium">Premium Users</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Schedule Send">
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm"
                  style={{ width: '100%' }}
                  size="large"
                  placeholder="Select send time"
                />
              </Form.Item>
              <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                <div className="text-yellow-800 text-sm">
                  <strong>Estimated Recipients:</strong> 5,240 users
                </div>
              </div>
            </Form>
          )}
          
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="bg-gray-50 border rounded p-4">
                <h4 className="font-semibold mb-2">Campaign Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Campaign Name:</span>
                    <span>Welcome Campaign</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Recipients:</span>
                    <span>5,240 users</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Scheduled:</span>
                    <span>Immediately</span>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded p-3">
                <div className="text-green-800 text-sm">
                  <CheckCircle className="inline mr-2" size={16} />
                  Everything looks good! Ready to send your campaign.
                </div>
              </div>
            </div>
          )}

          <Divider />
          
          <div className="flex justify-between">
            <Button
              disabled={currentStep === 0}
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Previous
            </Button>
            
            <Space>
              <Button onClick={() => setCreateModal(false)}>
                Cancel
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button type="primary" onClick={() => setCurrentStep(currentStep + 1)}>
                  Next
                </Button>
              ) : (
                <Button type="primary" icon={<Send size={16} />}>
                  Launch Campaign
                </Button>
              )}
            </Space>
          </div>
        </div>
      </Modal>

      {/* Campaign Analytics Modal */}
      <Modal
        open={!!selectedCampaign}
        title="Campaign Analytics"
        onCancel={() => setSelectedCampaign(null)}
        footer={[
          <Button key="close" onClick={() => setSelectedCampaign(null)}>
            Close
          </Button>,
        ]}
        width={800}
      >
        {selectedCampaign && (
          <div className="space-y-6">
            <Row gutter={16}>
              <Col span={12}>
                <Card size="small">
                  <Statistic
                    title="Open Rate"
                    value={Math.round((selectedCampaign.opened / selectedCampaign.recipients) * 100)}
                    suffix="%"
                    valueStyle={{ color: '#10b981' }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small">
                  <Statistic
                    title="Click Rate"
                    value={Math.round((selectedCampaign.clicked / selectedCampaign.opened) * 100)}
                    suffix="%"
                    valueStyle={{ color: '#3b82f6' }}
                  />
                </Card>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <div className="text-center p-3 border rounded">
                  <div className="text-2xl font-bold text-gray-900">
                    {selectedCampaign.recipients.toLocaleString()}
                  </div>
                  <div className="text-gray-600">Sent</div>
                </div>
              </Col>
              <Col span={8}>
                <div className="text-center p-3 border rounded">
                  <div className="text-2xl font-bold text-green-600">
                    {selectedCampaign.opened.toLocaleString()}
                  </div>
                  <div className="text-gray-600">Opened</div>
                </div>
              </Col>
              <Col span={8}>
                <div className="text-center p-3 border rounded">
                  <div className="text-2xl font-bold text-blue-600">
                    {selectedCampaign.clicked.toLocaleString()}
                  </div>
                  <div className="text-gray-600">Clicked</div>
                </div>
              </Col>
            </Row>

            <div>
              <h4 className="font-semibold mb-3">Performance Metrics</h4>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Open Rate</span>
                    <span>{Math.round((selectedCampaign.opened / selectedCampaign.recipients) * 100)}%</span>
                  </div>
                  <Progress
                    percent={Math.round((selectedCampaign.opened / selectedCampaign.recipients) * 100)}
                    strokeColor="#10b981"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Click Rate</span>
                    <span>{Math.round((selectedCampaign.clicked / selectedCampaign.opened) * 100)}%</span>
                  </div>
                  <Progress
                    percent={Math.round((selectedCampaign.clicked / selectedCampaign.opened) * 100)}
                    strokeColor="#3b82f6"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Bounce Rate</span>
                    <span>{selectedCampaign.bounceRate}%</span>
                  </div>
                  <Progress
                    percent={selectedCampaign.bounceRate}
                    strokeColor="#ef4444"
                  />
                </div>
              </Space>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default EmailCampaignsPage;