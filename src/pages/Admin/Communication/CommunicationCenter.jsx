// === 6.6 Communication Center ===

import React, { useState } from "react";
import {
  Card, Tabs, Table, Button, Tag, Space, Input, Select, Modal, DatePicker, Statistic, Avatar, Tooltip, Progress, Badge,
} from "antd";
import {
  Megaphone, Mail, MessageCircle, User, Users, Clock, Edit, Paperclip, Send, Eye, Delete,
} from "lucide-react";
import { FaChartLine, FaCheckCircle, FaRegCommentDots } from "react-icons/fa";

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

// Mocked data
const announcements = [
  { key: 1, title: "System Maintenance", group: "All", date: "2025-12-01", status: "Scheduled" },
  { key: 2, title: "New Feature Launch", group: "Publishers", date: "2025-11-27", status: "Active" },
];
const emailCampaigns = [
  { key: 1, subject: "Welcome to the Platform", sent: 5000, opened: 4200, clicked: 1300, status: "Completed", date: "2025-11-24" }
];
const supportTickets = [
  { key: 1, user: "TechCorp", subject: "Cannot upload creative", created: "2025-11-23", priority: "high", assigned: "Alex", status: "Open" },
  { key: 2, user: "GamePortal", subject: "Payout not received", created: "2025-11-21", priority: "urgent", assigned: "", status: "In Progress" }
];
const chatUsers = [
  { key: "pub_001", name: "TechCorp", avatar: "", type: "publisher", status: "online" },
  { key: "vw_201", name: "NewsDaily", avatar: "", type: "viewer", status: "offline" },
];

const CommunicationCenter = () => {
  const [announcementModal, setAnnouncementModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [chatModal, setChatModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Announcement columns
  const announcementCols = [
    { title: "Title", dataIndex: "title", render: t => <span className="font-semibold">{t}</span> },
    { title: "Target Group", dataIndex: "group" },
    { title: "Date", dataIndex: "date" },
    { title: "Status", dataIndex: "status", render: s => <Tag color={s === "Active" ? "green" : "blue"}>{s}</Tag> },
    { title: "Actions", render: () => (<Button type="link" icon={<Eye />}>View</Button>) }
  ];

  // Email campaign columns
  const emailCols = [
    { title: "Subject", dataIndex: "subject", render: t => <span className="font-semibold">{t}</span> },
    { title: "Sent", dataIndex: "sent" },
    { title: "Opened", dataIndex: "opened", render: (v, r) => (
      <Progress percent={Math.round((r.opened / r.sent) * 100)} size="small" strokeColor="#16a34a" format={p => `${r.opened} (${p}%)`} />
    ) },
    { title: "Clicked", dataIndex: "clicked", render: (v, r) => (
      <Progress percent={Math.round((r.clicked / r.opened) * 100)} size="small" strokeColor="#3b82f6" format={p => `${r.clicked} (${p}%)`} />
    ) },
    { title: "Status", dataIndex: "status", render: s => <Tag color={s === "Completed" ? "green" : "blue"}>{s}</Tag> },
    { title: "Sent Date", dataIndex: "date" }
  ];

  // Support ticket columns
  const ticketCols = [
    { title: "User", dataIndex: "user", render: v => <Space><Avatar icon={<User />} /> <span className="font-semibold">{v}</span></Space> },
    { title: "Subject", dataIndex: "subject" },
    { title: "Created", dataIndex: "created" },
    {
      title: "Priority", dataIndex: "priority",
      render: p => <Tag color={p === "urgent" ? "red" : p === "high" ? "orange" : "blue"}>{p ? p[0].toUpperCase() + p.slice(1) : "Normal"}</Tag>
    },
    { title: "Assigned", dataIndex: "assigned", render: v => v ? <Tag color="green">{v}</Tag> : <Tag>Unassigned</Tag> },
    { title: "Status", dataIndex: "status", render: s => <Tag color={s === "Open" ? "orange" : "green"}>{s}</Tag> },
    { title: "Actions", render: (_, r) => <Button icon={<Eye />} size="small">View</Button> }
  ];

  // Chat user cards
  const renderChatList = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {chatUsers.map(u =>
        <Card
          key={u.key}
          className={`cursor-pointer hover:shadow-md border ${u.status === "online" ? "border-green-400" : ""}`}
          onClick={() => { setSelectedUser(u); setChatModal(true); }}>
          <Space>
            <Avatar icon={<User />} /> <span>{u.name}</span>
          </Space>
          <div className={`text-xs mt-2 ${u.status === "online" ? "text-green-600" : "text-gray-400"}`}>{u.status}</div>
        </Card>
      )}
    </div>
  );

  // Chat modal (simple mock)
  const chatMsgs = [
    { who: "self", content: "Hello, how can I help you?", time: "10:30 AM" },
    { who: "user", content: "I can't see my earnings dashboard.", time: "10:32 AM" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <Tabs defaultActiveKey="1" size="large">
        <TabPane tab={<span><Megaphone /> Announcements</span>} key="1">
          <div className="mb-4 flex justify-end">
            <Button icon={<Edit />} type="primary" onClick={() => setAnnouncementModal(true)}>New Announcement</Button>
          </div>
          <Table columns={announcementCols} dataSource={announcements} pagination={false} />
        </TabPane>
        <TabPane tab={<span><Mail /> Email Campaigns</span>} key="2">
          <div className="mb-4 flex justify-end">
            <Button icon={<Edit />} type="primary" onClick={() => setEmailModal(true)}>New Email</Button>
          </div>
          <Table columns={emailCols} dataSource={emailCampaigns} pagination={false} />
        </TabPane>
        <TabPane tab={<span><FaRegCommentDots className="inline" /> Support Tickets</span>} key="3">
          <Table columns={ticketCols} dataSource={supportTickets} pagination={false} />
        </TabPane>
        <TabPane tab={<span><MessageCircle /> Chat / Messaging</span>} key="4">
          <Card title="Direct Message Users">
            {renderChatList()}
          </Card>
        </TabPane>
      </Tabs>

      {/* Announcement Modal */}
      <Modal
        open={announcementModal}
        title="Create Announcement"
        onCancel={() => setAnnouncementModal(false)}
        footer={null}
      >
        <Input placeholder="Title" className="mb-2" />
        <Select placeholder="Target Group" className="mb-2 w-full">
          <Option value="all">All Users</Option>
          <Option value="publisher">Publishers Only</Option>
          <Option value="viewer">Viewers Only</Option>
        </Select>
        <DatePicker className="mb-2 w-full" showTime placeholder="Schedule Time" />
        <TextArea rows={4} placeholder="Announcement content..." className="mb-3" />
        <Button type="primary" block onClick={() => setAnnouncementModal(false)}>Schedule Announcement</Button>
      </Modal>

      {/* Email Modal */}
      <Modal
        open={emailModal}
        title="Create Email Campaign"
        onCancel={() => setEmailModal(false)}
        footer={null}
      >
        <Input placeholder="Subject" className="mb-2" />
        <Select placeholder="Email Template" className="mb-2 w-full">
          <Option value="welcome">Welcome</Option>
          <Option value="update">Platform Update</Option>
        </Select>
        <TextArea rows={4} placeholder="Email content..." className="mb-3" />
        <Button type="primary" block onClick={() => setEmailModal(false)}>Send Email</Button>
      </Modal>

      {/* Chat Modal */}
      <Modal
        open={chatModal}
        title={selectedUser ? `Chat with ${selectedUser.name}` : "Chat"}
        onCancel={() => setChatModal(false)}
        footer={null}
        width={420}
      >
        <div className="h-56 overflow-y-auto bg-gray-100 rounded px-2 py-3 mb-2">
          {chatMsgs.map((msg, idx) =>
            <div
              key={idx}
              className={`mb-2 flex ${msg.who === "self" ? "justify-end" : "justify-start"}`}>
              <div className={`px-3 py-2 rounded-lg ${msg.who === "self" ? "bg-blue-500 text-white ml-16" : "bg-white border mr-16"}`}>
                <span>{msg.content}</span>
                <div className="text-xs mt-1 text-gray-400">{msg.time}</div>
              </div>
            </div>
          )}
        </div>
        <Space className="w-full">
          <Input placeholder="Type message..." />
          <Button icon={<Send />} type="primary" />
        </Space>
      </Modal>
    </div>
  );
};

export default CommunicationCenter;
