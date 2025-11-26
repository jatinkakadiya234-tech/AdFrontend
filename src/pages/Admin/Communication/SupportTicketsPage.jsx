// === Support Tickets Page ===
import React, { useState } from "react";
import {
  Card, Table, Button, Tag, Space, Input, Select, Modal, DatePicker,
  Statistic, Row, Col, Avatar, Tooltip, Progress, Badge, Form,
  Timeline, List
} from "antd";
import {
  MessageCircle, User, Clock, Search, Filter, Plus,
  Eye, Edit3, Trash2, CheckCircle, AlertCircle, 
  ArrowUp, Users, Phone, Mail
} from "lucide-react";

const { Option } = Select;
const { TextArea } = Input;

const SupportTicketsPage = () => {
  const [createModal, setCreateModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  const supportTickets = [
    {
      key: 1,
      user: { name: "TechCorp Ltd", email: "contact@techcorp.com", type: "Publisher" },
      subject: "Cannot upload creative assets",
      description: "Getting error when trying to upload new banner creatives. Error code: 502",
      created: "2025-11-23 14:30",
      priority: "high",
      assigned: "Alex Johnson",
      status: "Open",
      category: "Technical Issue",
      lastUpdated: "2025-11-23 16:45"
    },
    {
      key: 2,
      user: { name: "GamePortal Inc", email: "support@gameportal.com", type: "Publisher" },
      subject: "Payout not received for November",
      description: "Haven't received payment for November earnings. Expected date was 15th.",
      created: "2025-11-21 09:15",
      priority: "urgent",
      assigned: "",
      status: "In Progress",
      category: "Payment Issue",
      lastUpdated: "2025-11-23 10:20"
    },
    {
      key: 3,
      user: { name: "NewsDaily Media", email: "admin@newsdaily.com", type: "Viewer" },
      subject: "Account verification problem",
      description: "Unable to verify email address. Verification link expires immediately.",
      created: "2025-11-22 11:00",
      priority: "medium",
      assigned: "Sarah Miller",
      status: "Resolved",
      category: "Account Issue",
      lastUpdated: "2025-11-23 08:30"
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent": return "red";
      case "high": return "orange";
      case "medium": return "blue";
      case "low": return "gray";
      default: return "gray";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Open": return "red";
      case "In Progress": return "orange";
      case "Resolved": return "green";
      case "Closed": return "gray";
      default: return "gray";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "urgent": return <AlertCircle className="text-red-500" size={14} />;
      case "high": return <ArrowUp className="text-orange-500" size={14} />;
      default: return <Clock className="text-blue-500" size={14} />;
    }
  };

  const columns = [
    {
      title: "Ticket",
      dataIndex: "subject",
      render: (subject, record) => (
        <Space direction="vertical" size={2}>
          <div className="font-semibold text-gray-900">{subject}</div>
          <div className="text-xs text-gray-500">{record.description}</div>
          <Tag size="small" color="blue">{record.category}</Tag>
        </Space>
      ),
    },
    {
      title: "User",
      dataIndex: "user",
      render: (user) => (
        <Space>
          <Avatar icon={<User size={14} />} size="small" />
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-xs text-gray-500">{user.type}</div>
          </div>
        </Space>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      render: (priority) => (
        <Space>
          {getPriorityIcon(priority)}
          <Tag color={getPriorityColor(priority)} className="capitalize">
            {priority}
          </Tag>
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
      title: "Assigned To",
      dataIndex: "assigned",
      render: (assigned) => 
        assigned ? (
          <Tag color="green" icon={<User size={12} />}>
            {assigned}
          </Tag>
        ) : (
          <Tag color="gray">Unassigned</Tag>
        ),
    },
    {
      title: "Created",
      dataIndex: "created",
      render: (created) => (
        <Space>
          <Clock size={14} className="text-gray-400" />
          <span className="text-sm">{created.split(' ')[0]}</span>
        </Space>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="View Ticket">
            <Button 
              type="text" 
              icon={<Eye size={16} />}
              onClick={() => setSelectedTicket(record)}
            />
          </Tooltip>
          <Tooltip title="Assign to me">
            <Button type="text" icon={<User size={16} />} />
          </Tooltip>
          <Tooltip title="Mark as Resolved">
            <Button type="text" icon={<CheckCircle size={16} />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const ticketActivities = [
    {
      time: "2025-11-23 16:45",
      action: "Comment added",
      user: "Alex Johnson",
      content: "I've identified the issue with the file upload service. Working on a fix."
    },
    {
      time: "2025-11-23 15:20",
      action: "Status updated",
      user: "System",
      content: "Ticket assigned to Alex Johnson"
    },
    {
      time: "2025-11-23 14:30",
      action: "Ticket created",
      user: "TechCorp Ltd",
      content: "User reported issue with creative upload"
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
                <MessageCircle className="mr-3 text-green-600" size={32} />
                Support Tickets
              </h1>
              <p className="text-gray-600 mt-2">
                Manage and resolve customer support tickets efficiently
              </p>
            </div>
            <Button
              type="primary"
              size="large"
              icon={<Plus size={18} />}
              onClick={() => setCreateModal(true)}
            >
              New Ticket
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <Row gutter={16} className="mb-6">
          <Col span={6}>
            <Card className="text-center">
              <Statistic
                title="Total Tickets"
                value={supportTickets.length}
                prefix={<MessageCircle className="text-green-500" size={20} />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="text-center">
              <Statistic
                title="Open Tickets"
                value={supportTickets.filter(t => t.status === "Open").length}
                valueStyle={{ color: '#ef4444' }}
                prefix={<AlertCircle size={20} />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="text-center">
              <Statistic
                title="In Progress"
                value={supportTickets.filter(t => t.status === "In Progress").length}
                valueStyle={{ color: '#f59e0b' }}
                prefix={<Clock size={20} />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="text-center">
              <Statistic
                title="Resolved Today"
                value={supportTickets.filter(t => t.status === "Resolved").length}
                valueStyle={{ color: '#10b981' }}
                prefix={<CheckCircle size={20} />}
              />
            </Card>
          </Col>
        </Row>

        {/* Filters */}
        <Card className="mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <Input
              placeholder="Search tickets..."
              prefix={<Search size={16} />}
              style={{ width: 300 }}
            />
            <Select
              placeholder="Filter by status"
              value={filterStatus}
              onChange={setFilterStatus}
              style={{ width: 150 }}
              suffixIcon={<Filter size={16} />}
            >
              <Option value="all">All Status</Option>
              <Option value="Open">Open</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Resolved">Resolved</Option>
            </Select>
            <Select
              placeholder="Filter by priority"
              value={filterPriority}
              onChange={setFilterPriority}
              style={{ width: 150 }}
            >
              <Option value="all">All Priority</Option>
              <Option value="urgent">Urgent</Option>
              <Option value="high">High</Option>
              <Option value="medium">Medium</Option>
              <Option value="low">Low</Option>
            </Select>
            <Select
              placeholder="Category"
              style={{ width: 150 }}
            >
              <Option value="all">All Categories</Option>
              <Option value="technical">Technical</Option>
              <Option value="payment">Payment</Option>
              <Option value="account">Account</Option>
            </Select>
          </div>
        </Card>

        {/* Tickets Table */}
        <Card 
          title={
            <span className="text-lg font-semibold">
              Recent Support Tickets ({supportTickets.length})
            </span>
          }
          className="shadow-sm"
        >
          <Table
            columns={columns}
            dataSource={supportTickets}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} tickets`,
            }}
          />
        </Card>
      </div>

      {/* Create Ticket Modal */}
      <Modal
        open={createModal}
        title={
          <span className="flex items-center">
            <Plus className="mr-2" size={20} />
            Create New Support Ticket
          </span>
        }
        onCancel={() => setCreateModal(false)}
        footer={null}
        width={600}
      >
        <Form layout="vertical">
          <Form.Item label="Subject" required>
            <Input placeholder="Enter ticket subject" size="large" />
          </Form.Item>
          
          <Form.Item label="Description" required>
            <TextArea
              rows={4}
              placeholder="Describe the issue in detail..."
              showCount
              maxLength={1000}
            />
          </Form.Item>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Priority" required>
                <Select placeholder="Select priority" size="large">
                  <Option value="low">Low</Option>
                  <Option value="medium">Medium</Option>
                  <Option value="high">High</Option>
                  <Option value="urgent">Urgent</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Category" required>
                <Select placeholder="Select category" size="large">
                  <Option value="technical">Technical Issue</Option>
                  <Option value="payment">Payment Issue</Option>
                  <Option value="account">Account Issue</Option>
                  <Option value="feature">Feature Request</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item label="Assign To">
            <Select placeholder="Assign to team member" size="large">
              <Option value="alex">Alex Johnson</Option>
              <Option value="sarah">Sarah Miller</Option>
              <Option value="mike">Mike Chen</Option>
            </Select>
          </Form.Item>
          
          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button onClick={() => setCreateModal(false)}>
              Cancel
            </Button>
            <Button type="primary">
              Create Ticket
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Ticket Details Modal */}
      <Modal
        open={!!selectedTicket}
        title="Ticket Details"
        onCancel={() => setSelectedTicket(null)}
        footer={null}
        width={800}
      >
        {selectedTicket && (
          <div className="space-y-6">
            {/* Ticket Header */}
            <div className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{selectedTicket.subject}</h3>
                  <p className="text-gray-600 mt-1">{selectedTicket.description}</p>
                </div>
                <Space>
                  <Tag color={getPriorityColor(selectedTicket.priority)}>
                    {selectedTicket.priority.toUpperCase()}
                  </Tag>
                  <Tag color={getStatusColor(selectedTicket.status)}>
                    {selectedTicket.status}
                  </Tag>
                </Space>
              </div>
              
              <Row gutter={16} className="mt-4">
                <Col span={8}>
                  <div className="text-sm">
                    <div className="text-gray-500">Created</div>
                    <div className="font-medium">{selectedTicket.created}</div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="text-sm">
                    <div className="text-gray-500">Category</div>
                    <div className="font-medium">{selectedTicket.category}</div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="text-sm">
                    <div className="text-gray-500">Assigned To</div>
                    <div className="font-medium">
                      {selectedTicket.assigned || "Unassigned"}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>

            {/* User Info */}
            <Card size="small" title="User Information">
              <Space>
                <Avatar icon={<User />} />
                <div>
                  <div className="font-semibold">{selectedTicket.user.name}</div>
                  <div className="text-gray-600">{selectedTicket.user.email}</div>
                  <Tag size="small">{selectedTicket.user.type}</Tag>
                </div>
              </Space>
            </Card>

            {/* Activity Timeline */}
            <Card size="small" title="Activity Timeline">
              <Timeline>
                {ticketActivities.map((activity, index) => (
                  <Timeline.Item key={index} color="blue">
                    <div className="flex justify-between">
                      <span className="font-medium">{activity.action}</span>
                      <span className="text-gray-500 text-sm">{activity.time}</span>
                    </div>
                    <div className="text-gray-600 text-sm">By: {activity.user}</div>
                    {activity.content && (
                      <div className="mt-1 text-gray-700">{activity.content}</div>
                    )}
                  </Timeline.Item>
                ))}
              </Timeline>
            </Card>

            {/* Response Area */}
            <Card size="small" title="Add Response">
              <Form layout="vertical">
                <Form.Item>
                  <TextArea
                    rows={4}
                    placeholder="Type your response here..."
                  />
                </Form.Item>
                <div className="flex justify-between">
                  <Space>
                    <Button>Add Internal Note</Button>
                    <Button>Request More Info</Button>
                  </Space>
                  <Space>
                    <Button>Save Draft</Button>
                    <Button type="primary">Send Response</Button>
                  </Space>
                </div>
              </Form>
            </Card>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SupportTicketsPage;