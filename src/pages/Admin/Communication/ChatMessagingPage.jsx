// === Support Chat Page ===
import React, { useState, useRef, useEffect } from "react";
import {
  Card, Button, Tag, Space, Input, Avatar, Badge, List,
  Modal, Select, Divider, Tooltip, Row, Col, Statistic,
  Timeline, Progress, Form, Dropdown, Menu
} from "antd";
import {
  MessageCircle, Search, Phone, Video, MoreVertical, Send,
  Paperclip, User, Users, Clock, CheckCheck, Filter,
  Star, Archive, Shield, Zap, AlertCircle, CheckCircle,
  Calendar, FileText, Download, Share2, ThumbsUp, ThumbsDown
} from "lucide-react";

const { Option } = Select;
const { TextArea } = Input;

const SupportChatPage = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [ratingModal, setRatingModal] = useState(false);
  const messagesEndRef = useRef(null);

  const supportTickets = [
    {
      key: "TSK-001",
      user: {
        name: "TechCorp Ltd",
        email: "contact@techcorp.com",
        type: "Enterprise Publisher",
        plan: "Premium"
      },
      subject: "Cannot upload creative assets - Error 502",
      status: "open",
      priority: "high",
      category: "Technical Issue",
      assignedTo: "You",
      createdAt: "2025-11-23 14:30",
      lastActivity: "2 mins ago",
      unread: 0,
      firstResponse: "15 min",
      satisfaction: null,
      tags: ["Upload", "Creative", "Error"]
    },
    {
      key: "TSK-002",
      user: {
        name: "GamePortal Inc",
        email: "support@gameportal.com",
        type: "Publisher",
        plan: "Professional"
      },
      subject: "Payout not received for November earnings",
      status: "in-progress",
      priority: "urgent",
      category: "Payment Issue",
      assignedTo: "Sarah Miller",
      createdAt: "2025-11-21 09:15",
      lastActivity: "30 mins ago",
      unread: 3,
      firstResponse: "5 min",
      satisfaction: 5,
      tags: ["Payment", "Billing", "Urgent"]
    },
    {
      key: "TSK-003",
      user: {
        name: "NewsDaily Media",
        email: "admin@newsdaily.com",
        type: "Viewer",
        plan: "Basic"
      },
      subject: "Account verification problem - Link expires",
      status: "resolved",
      priority: "medium",
      category: "Account Issue",
      assignedTo: "You",
      createdAt: "2025-11-22 11:00",
      lastActivity: "1 hour ago",
      unread: 0,
      firstResponse: "8 min",
      satisfaction: 4,
      tags: ["Verification", "Account"]
    },
    {
      key: "TSK-004",
      user: {
        name: "StreamHub Pro",
        email: "admin@streamhub.com",
        type: "Publisher",
        plan: "Premium"
      },
      subject: "API integration documentation needed",
      status: "open",
      priority: "low",
      category: "Documentation",
      assignedTo: "Unassigned",
      createdAt: "2025-11-23 10:00",
      lastActivity: "Just now",
      unread: 1,
      firstResponse: null,
      satisfaction: null,
      tags: ["API", "Documentation"]
    },
  ];

  const chatMessages = {
    "TSK-001": [
      { 
        id: 1, 
        type: "customer",
        sender: "TechCorp Ltd", 
        content: "Hello, I'm having trouble uploading creative assets. Getting Error 502 when trying to upload new banner creatives.", 
        time: "14:30 PM",
        timestamp: "2025-11-23 14:30:00",
        attachments: []
      },
      { 
        id: 2, 
        type: "agent",
        sender: "You", 
        content: "Hi there! I can help with that. Could you please share the exact error message and the file format you're trying to upload?", 
        time: "14:32 PM",
        timestamp: "2025-11-23 14:32:00",
        attachments: []
      },
      { 
        id: 3, 
        type: "customer",
        sender: "TechCorp Ltd", 
        content: "The error says: 'Error 502: File upload service unavailable'. I'm trying to upload PNG files around 2MB in size.", 
        time: "14:35 PM",
        timestamp: "2025-11-23 14:35:00",
        attachments: [
          { name: "error-screenshot.png", size: "1.2 MB" }
        ]
      },
      { 
        id: 4, 
        type: "system",
        sender: "System", 
        content: "Ticket priority upgraded to High", 
        time: "14:36 PM",
        timestamp: "2025-11-23 14:36:00",
        attachments: []
      },
    ],
    "TSK-002": [
      { 
        id: 1, 
        type: "customer",
        sender: "GamePortal Inc", 
        content: "We haven't received our November payment. The expected date was 15th and it's now the 21st.", 
        time: "09:15 AM",
        timestamp: "2025-11-21 09:15:00",
        attachments: []
      },
      { 
        id: 2, 
        type: "agent",
        sender: "Sarah Miller", 
        content: "I apologize for the delay. Let me check the payment status for you immediately.", 
        time: "09:20 AM",
        timestamp: "2025-11-21 09:20:00",
        attachments: []
      },
    ],
  };

  const [messages, setMessages] = useState([]);
  const [quickReplies, setQuickReplies] = useState([
    "Can you provide more details about the issue?",
    "I'll look into this right away.",
    "Thank you for reporting this issue.",
    "Is this issue still occurring?",
    "Let me transfer you to a specialist."
  ]);

  useEffect(() => {
    if (selectedTicket) {
      setMessages(chatMessages[selectedTicket.key] || []);
    }
  }, [selectedTicket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (message.trim() === "" || !selectedTicket) return;

    const newMessage = {
      id: messages.length + 1,
      type: "agent",
      sender: "You",
      content: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: new Date().toISOString(),
      attachments: []
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open": return "red";
      case "in-progress": return "orange";
      case "resolved": return "green";
      case "closed": return "gray";
      default: return "gray";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "open": return "Open";
      case "in-progress": return "In Progress";
      case "resolved": return "Resolved";
      case "closed": return "Closed";
      default: return status;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent": return "red";
      case "high": return "orange";
      case "medium": return "blue";
      case "low": return "gray";
      default: return "gray";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "urgent": return <AlertCircle size={14} />;
      case "high": return <Zap size={14} />;
      case "medium": return <Shield size={14} />;
      case "low": return <Clock size={14} />;
      default: return <Clock size={14} />;
    }
  };

  const filteredTickets = supportTickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || ticket.status === filterStatus;
    const matchesPriority = filterPriority === "all" || ticket.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = {
    open: supportTickets.filter(t => t.status === "open").length,
    inProgress: supportTickets.filter(t => t.status === "in-progress").length,
    resolved: supportTickets.filter(t => t.status === "resolved").length,
    urgent: supportTickets.filter(t => t.priority === "urgent").length,
  };

  const actionMenu = (
    <Menu
      items={[
        { key: 'assign', label: 'Assign to me', icon: <User size={14} /> },
        { key: 'priority', label: 'Change priority', icon: <Zap size={14} /> },
        { key: 'category', label: 'Change category', icon: <Filter size={14} /> },
        { type: 'divider' },
        { key: 'close', label: 'Close ticket', icon: <CheckCircle size={14} /> },
        { key: 'archive', label: 'Archive', icon: <Archive size={14} /> },
      ]}
    />
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <MessageCircle className="mr-3 text-blue-600" size={32} />
                Support Chat
              </h1>
              <p className="text-gray-600 mt-2">
                Manage customer support tickets and provide timely assistance
              </p>
            </div>
            <Space>
              <Button icon={<Filter size={16} />}>
                Filters
              </Button>
              <Button type="primary" icon={<MessageCircle size={16} />}>
                New Ticket
              </Button>
            </Space>
          </div>
        </div>

        {/* Stats */}
        <Row gutter={16} className="mb-6">
          <Col span={6}>
            <Card className="text-center border-l-4 border-l-red-500">
              <Statistic
                title="Open Tickets"
                value={stats.open}
                valueStyle={{ color: '#ef4444' }}
                prefix={<AlertCircle size={20} />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="text-center border-l-4 border-l-orange-500">
              <Statistic
                title="In Progress"
                value={stats.inProgress}
                valueStyle={{ color: '#f59e0b' }}
                prefix={ <Clock size={20} />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="text-center border-l-4 border-l-green-500">
              <Statistic
                title="Resolved Today"
                value={stats.resolved}
                valueStyle={{ color: '#10b981' }}
                prefix={<CheckCircle size={20} />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="text-center border-l-4 border-l-purple-500">
              <Statistic
                title="Urgent Priority"
                value={stats.urgent}
                valueStyle={{ color: '#8b5cf6' }}
                prefix={<Zap size={20} />}
              />
            </Card>
          </Col>
        </Row>

        {/* Main Chat Layout */}
        <Card className="shadow-sm" bodyStyle={{ padding: 0 }}>
          <div className="flex h-[600px]">
            {/* Tickets Sidebar */}
            <div className="w-96 border-r bg-white">
              <div className="p-4 border-b">
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="Search tickets..."
                    prefix={<Search size={16} />}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select
                    value={filterStatus}
                    onChange={setFilterStatus}
                    style={{ width: '50%' }}
                    size="small"
                  >
                    <Option value="all">All Status</Option>
                    <Option value="open">Open</Option>
                    <Option value="in-progress">In Progress</Option>
                    <Option value="resolved">Resolved</Option>
                  </Select>
                  <Select
                    value={filterPriority}
                    onChange={setFilterPriority}
                    style={{ width: '50%' }}
                    size="small"
                  >
                    <Option value="all">All Priority</Option>
                    <Option value="urgent">Urgent</Option>
                    <Option value="high">High</Option>
                    <Option value="medium">Medium</Option>
                    <Option value="low">Low</Option>
                  </Select>
                </div>
              </div>
              
              <div className="overflow-y-auto h-[520px]">
                <List
                  dataSource={filteredTickets}
                  renderItem={(ticket) => (
                    <List.Item
                      className={`p-4 cursor-pointer hover:bg-gray-50 border-0 ${
                        selectedTicket?.key === ticket.key ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                      }`}
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      <div className="w-full">
                        <div className="flex items-start justify-between mb-2">
                          <Space>
                            <Avatar icon={<User size={14} />} size="small" />
                            <div>
                              <div className="font-semibold text-sm">{ticket.user.name}</div>
                              <div className="text-xs text-gray-500">{ticket.user.type}</div>
                            </div>
                          </Space>
                          <div className="text-right">
                            <div className="text-xs text-gray-400">{ticket.lastActivity}</div>
                            {ticket.unread > 0 && (
                              <Badge count={ticket.unread} style={{ backgroundColor: '#ff4d4f' }} />
                            )}
                          </div>
                        </div>
                        
                        <div className="mb-2">
                          <div className="font-medium text-gray-900 text-sm mb-1">
                            {ticket.subject}
                          </div>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {ticket.tags.map((tag, index) => (
                              <Tag key={index} size="small" color="blue">
                                {tag}
                              </Tag>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Space size="small">
                            <Tag 
                              color={getStatusColor(ticket.status)} 
                              size="small"
                            >
                              {getStatusText(ticket.status)}
                            </Tag>
                            <Tag 
                              color={getPriorityColor(ticket.priority)} 
                              size="small"
                              icon={getPriorityIcon(ticket.priority)}
                            >
                              {ticket.priority}
                            </Tag>
                          </Space>
                          <div className="text-xs text-gray-500">
                            {ticket.assignedTo}
                          </div>
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedTicket ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Avatar icon={<User size={18} />} />
                        <div>
                          <div className="font-semibold">{selectedTicket.user.name}</div>
                          <div className="text-xs text-gray-500">
                            {selectedTicket.user.type} • {selectedTicket.user.plan} • {selectedTicket.user.email}
                          </div>
                        </div>
                      </div>
                      <Space>
                        <Tag color={getPriorityColor(selectedTicket.priority)}>
                          {getPriorityIcon(selectedTicket.priority)} {selectedTicket.priority.toUpperCase()}
                        </Tag>
                        <Tag color={getStatusColor(selectedTicket.status)}>
                          {getStatusText(selectedTicket.status)}
                        </Tag>
                        <Dropdown overlay={actionMenu} placement="bottomRight">
                          <Button type="text" icon={<MoreVertical size={16} />} />
                        </Dropdown>
                      </Space>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-gray-600">
                        <strong>Ticket:</strong> {selectedTicket.key} • 
                        <strong> Category:</strong> {selectedTicket.category} •
                        <strong> Created:</strong> {selectedTicket.createdAt}
                      </div>
                      {selectedTicket.firstResponse && (
                        <div className="text-green-600">
                          First response: {selectedTicket.firstResponse}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${
                            msg.type === "agent" ? "justify-end" : 
                            msg.type === "system" ? "justify-center" : "justify-start"
                          }`}
                        >
                          {msg.type === "system" ? (
                            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs">
                              {msg.content}
                            </div>
                          ) : (
                            <div
                              className={`max-w-2xl px-4 py-3 rounded-lg ${
                                msg.type === "agent"
                                  ? "bg-blue-500 text-white rounded-br-none"
                                  : "bg-white border rounded-bl-none"
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-xs font-medium ${
                                  msg.type === "agent" ? "text-blue-100" : "text-gray-600"
                                }`}>
                                  {msg.sender}
                                </span>
                                <span className={`text-xs ${
                                  msg.type === "agent" ? "text-blue-200" : "text-gray-400"
                                }`}>
                                  {msg.time}
                                </span>
                              </div>
                              <div className="text-sm">{msg.content}</div>
                              
                              {msg.attachments && msg.attachments.length > 0 && (
                                <div className="mt-2 space-y-1">
                                  {msg.attachments.map((file, index) => (
                                    <div key={index} className="flex items-center gap-2 text-xs bg-black bg-opacity-10 px-2 py-1 rounded">
                                      <Paperclip size={12} />
                                      <span>{file.name}</span>
                                      <span className="opacity-70">({file.size})</span>
                                      <Button type="text" size="small" icon={<Download size={12} />} />
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  {/* Quick Replies */}
                  <div className="px-4 pt-2 bg-gray-50 border-t">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {quickReplies.map((reply, index) => (
                        <Button
                          key={index}
                          size="small"
                          onClick={() => setMessage(reply)}
                          className="text-xs"
                        >
                          {reply}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t bg-white">
                    <Space.Compact style={{ width: '100%' }}>
                      <Button type="text" icon={<Paperclip size={18} />} />
                      <TextArea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your response... (Press Enter to send)"
                        autoSize={{ minRows: 1, maxRows: 4 }}
                        className="flex-1"
                      />
                      <Button
                        type="primary"
                        icon={<Send size={18} />}
                        onClick={sendMessage}
                        disabled={!message.trim()}
                      >
                        Send
                      </Button>
                    </Space.Compact>
                    
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-xs text-gray-500">
                        Press Enter to send, Shift+Enter for new line
                      </div>
                      <Space>
                        <Button size="small" icon={<ThumbsUp size={14} />}>
                          Resolve
                        </Button>
                        <Button size="small" icon={<Share2 size={14} />}>
                          Transfer
                        </Button>
                      </Space>
                    </div>
                  </div>
                </>
              ) : (
                /* Empty State */
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <MessageCircle size={64} className="text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-500 mb-2">
                      Select a support ticket
                    </h3>
                    <p className="text-gray-400 max-w-md">
                      Choose a ticket from the sidebar to start assisting customers. 
                      You can filter by status, priority, or search for specific tickets.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SupportChatPage;