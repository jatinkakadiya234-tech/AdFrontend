// === Announcements Page ===
import React, { useState } from "react";
import {
  Card, Table, Button, Tag, Space, Input, Select, Modal, DatePicker,
  Statistic, Row, Col, Avatar, Tooltip, Progress, Badge, Form
} from "antd";
import {
  Megaphone, Calendar, Users, Eye, Edit3, Trash2, Search,
  Filter, Bell, CheckCircle, Clock, AlertCircle
} from "lucide-react";

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const AnnouncementsPage = () => {
  const [createModal, setCreateModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const announcements = [
    {
      key: 1,
      title: "System Maintenance Scheduled",
      content: "We'll be performing system maintenance on December 1st from 2:00 AM to 4:00 AM UTC.",
      group: "All Users",
      date: "2025-12-01",
      status: "Scheduled",
      priority: "medium",
      createdBy: "Admin User",
      views: 1247
    },
    {
      key: 2,
      title: "New Feature Launch - Advanced Analytics",
      group: "Publishers",
      content: "We're excited to announce our new advanced analytics dashboard with real-time insights.",
      date: "2025-11-27",
      status: "Active",
      priority: "high",
      createdBy: "Product Team",
      views: 892
    },
    {
      key: 3,
      title: "Payment Processing Update",
      group: "Publishers",
      content: "Important updates to our payment processing system starting next week.",
      date: "2025-11-20",
      status: "Completed",
      priority: "high",
      createdBy: "Finance Team",
      views: 1563
    },
  ];

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || announcement.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "Active": return <CheckCircle className="text-green-500" size={16} />;
      case "Scheduled": return <Clock className="text-blue-500" size={16} />;
      case "Completed": return <CheckCircle className="text-gray-500" size={16} />;
      default: return <AlertCircle className="text-orange-500" size={16} />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "red";
      case "medium": return "orange";
      case "low": return "blue";
      default: return "gray";
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (title, record) => (
        <Space direction="vertical" size={2}>
          <div className="font-semibold text-gray-900">{title}</div>
          <div className="text-xs text-gray-500 truncate max-w-xs">{record.content}</div>
        </Space>
      ),
    },
    {
      title: "Target Group",
      dataIndex: "group",
      render: (group) => (
        <Tag color="blue" icon={<Users size={12} />}>
          {group}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Space>
          {getStatusIcon(status)}
          <Tag color={status === "Active" ? "green" : status === "Scheduled" ? "blue" : "gray"}>
            {status}
          </Tag>
        </Space>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      render: (priority) => (
        <Tag color={getPriorityColor(priority)}>
          {priority?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (date) => (
        <Space>
          <Calendar size={14} className="text-gray-400" />
          <span>{date}</span>
        </Space>
      ),
    },
    {
      title: "Views",
      dataIndex: "views",
      render: (views) => (
        <div className="text-center">
          <Eye size={14} className="inline text-gray-400 mr-1" />
          <span className="font-medium">{views.toLocaleString()}</span>
        </div>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button 
              type="text" 
              icon={<Eye size={16} />}
              onClick={() => setSelectedAnnouncement(record)}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button type="text" icon={<Edit3 size={16} />} />
          </Tooltip>
          <Tooltip title="Delete">
            <Button type="text" danger icon={<Trash2 size={16} />} />
          </Tooltip>
        </Space>
      ),
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
                <Megaphone className="mr-3 text-blue-600" size={32} />
                Announcements
              </h1>
              <p className="text-gray-600 mt-2">
                Manage system announcements and important updates for your users
              </p>
            </div>
            <Button
              type="primary"
              size="large"
              icon={<Edit3 size={18} />}
              onClick={() => setCreateModal(true)}
            >
              New Announcement
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <Row gutter={16} className="mb-6">
          <Col span={6}>
            <Card className="text-center">
              <Statistic
                title="Total Announcements"
                value={announcements.length}
                prefix={<Megaphone className="text-blue-500" size={20} />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="text-center">
              <Statistic
                title="Active"
                value={announcements.filter(a => a.status === "Active").length}
                valueStyle={{ color: '#52c41a' }}
                prefix={<CheckCircle size={20} />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="text-center">
              <Statistic
                title="Scheduled"
                value={announcements.filter(a => a.status === "Scheduled").length}
                valueStyle={{ color: '#1890ff' }}
                prefix={<Clock size={20} />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="text-center">
              <Statistic
                title="Total Views"
                value={announcements.reduce((sum, a) => sum + a.views, 0)}
                prefix={<Eye size={20} />}
              />
            </Card>
          </Col>
        </Row>

        {/* Filters */}
        <Card className="mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <Input
              placeholder="Search announcements..."
              prefix={<Search size={16} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              <Option value="Active">Active</Option>
              <Option value="Scheduled">Scheduled</Option>
              <Option value="Completed">Completed</Option>
            </Select>
            <RangePicker />
          </div>
        </Card>

        {/* Announcements Table */}
        <Card 
          title={
            <span className="text-lg font-semibold">
              Recent Announcements ({filteredAnnouncements.length})
            </span>
          }
          className="shadow-sm"
        >
          <Table
            columns={columns}
            dataSource={filteredAnnouncements}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} announcements`,
            }}
          />
        </Card>
      </div>

      {/* Create Announcement Modal */}
      <Modal
        open={createModal}
        title={
          <span className="flex items-center">
            <Megaphone className="mr-2" size={20} />
            Create New Announcement
          </span>
        }
        onCancel={() => setCreateModal(false)}
        footer={null}
        width={600}
      >
        <Form layout="vertical">
          <Form.Item label="Title" required>
            <Input placeholder="Enter announcement title" size="large" />
          </Form.Item>
          
          <Form.Item label="Content" required>
            <TextArea
              rows={4}
              placeholder="Enter announcement content..."
              showCount
              maxLength={1000}
            />
          </Form.Item>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Target Group" required>
                <Select placeholder="Select target group" size="large">
                  <Option value="all">All Users</Option>
                  <Option value="publishers">Publishers Only</Option>
                  <Option value="viewers">Viewers Only</Option>
                  <Option value="admins">Admins Only</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Priority" required>
                <Select placeholder="Select priority" size="large">
                  <Option value="high">High</Option>
                  <Option value="medium">Medium</Option>
                  <Option value="low">Low</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item label="Schedule">
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              style={{ width: '100%' }}
              size="large"
              placeholder="Select date and time"
            />
          </Form.Item>
          
          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button onClick={() => setCreateModal(false)}>
              Cancel
            </Button>
            <Button type="primary">
              Save as Draft
            </Button>
            <Button type="primary">
              Schedule Announcement
            </Button>
          </div>
        </Form>
      </Modal>

      {/* View Announcement Modal */}
      <Modal
        open={!!selectedAnnouncement}
        title="Announcement Details"
        onCancel={() => setSelectedAnnouncement(null)}
        footer={[
          <Button key="close" onClick={() => setSelectedAnnouncement(null)}>
            Close
          </Button>,
        ]}
        width={600}
      >
        {selectedAnnouncement && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{selectedAnnouncement.title}</h3>
              <p className="text-gray-600 mt-2">{selectedAnnouncement.content}</p>
            </div>
            
            <Row gutter={16}>
              <Col span={12}>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Target Group:</span>
                    <Tag color="blue">{selectedAnnouncement.group}</Tag>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <Tag color={selectedAnnouncement.status === "Active" ? "green" : "blue"}>
                      {selectedAnnouncement.status}
                    </Tag>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Priority:</span>
                    <Tag color={getPriorityColor(selectedAnnouncement.priority)}>
                      {selectedAnnouncement.priority?.toUpperCase()}
                    </Tag>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date:</span>
                    <span>{selectedAnnouncement.date}</span>
                  </div>
                </div>
              </Col>
            </Row>
            
            <div className="pt-4 border-t">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Created by: {selectedAnnouncement.createdBy}</span>
                <span>Views: {selectedAnnouncement.views.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AnnouncementsPage;