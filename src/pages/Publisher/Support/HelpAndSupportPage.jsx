import React, { useState } from 'react';
import {
  Card,
  Input,
  Select,
  Button,
  Upload,
  Table,
  Tag,
  Form,
  message,
  Badge,
  Tooltip,
  Modal,
  Alert,
} from 'antd';
import {
  BookOpen,
  Code,
  Video,
  MessageCircle,
  HelpCircle,
  Send,
  FileText,
  Paperclip,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Search,
  Eye,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';
import {
  FaBook,
  FaCode,
  FaVideo,
  FaComments,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
} from 'react-icons/fa';

const { TextArea } = Input;
const { Option } = Select;

const HelpAndSupportPage = () => {
  const [form] = Form.useForm();
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Mock Support Tickets Data
  const tickets = [
    {
      key: 1,
      ticketId: '#12345',
      subject: 'Payment not received',
      category: 'Payment',
      status: 'Open',
      priority: 'High',
      created: 'May 10, 2025',
      lastUpdated: 'May 11, 2025',
      description: 'I have not received my payment for last month...',
    },
    {
      key: 2,
      ticketId: '#12344',
      subject: 'Campaign approval delay',
      category: 'Campaign',
      status: 'Resolved',
      priority: 'Medium',
      created: 'May 5, 2025',
      lastUpdated: 'May 6, 2025',
      description: 'My campaign has been pending approval for 3 days...',
    },
    {
      key: 3,
      ticketId: '#12343',
      subject: 'API integration issue',
      category: 'Technical',
      status: 'In Progress',
      priority: 'Urgent',
      created: 'May 3, 2025',
      lastUpdated: 'May 4, 2025',
      description: 'Getting 401 error when calling the analytics endpoint...',
    },
  ];

  // Support Resources
  const supportResources = [
    {
      icon: <FaBook className="w-8 h-8" />,
      title: 'Knowledge Base',
      description: 'Browse articles & guides',
      buttonText: 'Visit Knowledge Base',
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      icon: <FaCode className="w-8 h-8" />,
      title: 'API Documentation',
      description: 'Integration guides & reference',
      buttonText: 'View API Docs',
      color: 'green',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      icon: <FaVideo className="w-8 h-8" />,
      title: 'Video Tutorials',
      description: 'Step-by-step walkthroughs',
      buttonText: 'Watch Tutorials',
      color: 'red',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
    },
    {
      icon: <FaComments className="w-8 h-8" />,
      title: 'Community Forum',
      description: 'Ask questions & share tips',
      buttonText: 'Join Forum',
      color: 'purple',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
  ];

  // Handle File Upload
  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // Handle Submit Ticket
  const handleSubmitTicket = () => {
    form.validateFields().then((values) => {
      console.log('Ticket submitted:', values);
      message.success('Support ticket submitted successfully! We will get back to you soon.');
      form.resetFields();
      setFileList([]);
    });
  };

  // Handle View Ticket Details
  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setIsTicketModalOpen(true);
  };

  // Status Badge Config
  const getStatusConfig = (status) => {
    const configs = {
      Open: { color: 'success', icon: <FaCheckCircle />, text: 'Open' },
      'In Progress': { color: 'processing', icon: <FaClock />, text: 'In Progress' },
      Resolved: { color: 'default', icon: <FaCheckCircle />, text: 'Resolved' },
      Closed: { color: 'default', icon: <FaCheckCircle />, text: 'Closed' },
    };
    return configs[status] || configs.Open;
  };

  // Priority Badge Config
  const getPriorityColor = (priority) => {
    const colors = {
      Low: 'default',
      Medium: 'warning',
      High: 'error',
      Urgent: 'error',
    };
    return colors[priority] || 'default';
  };

  // Table Columns
  const columns = [
    {
      title: 'Ticket ID',
      dataIndex: 'ticketId',
      key: 'ticketId',
      render: (text) => <span className="font-mono font-semibold text-gray-900">{text}</span>,
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      render: (text) => <span className="font-medium text-gray-900">{text}</span>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const config = getStatusConfig(status);
        return (
          <Tag color={config.color} icon={config.icon}>
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => <Tag color={getPriorityColor(priority)}>{priority}</Tag>,
    },
    {
      title: 'Created',
      dataIndex: 'created',
      key: 'created',
      render: (text) => <span className="text-sm text-gray-600">{text}</span>,
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
      render: (text) => <span className="text-sm text-gray-600">{text}</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="flex gap-2">
          <Button size="small" icon={<Eye className="w-3.5 h-3.5" />} onClick={() => handleViewTicket(record)}>
            View
          </Button>
          {record.status !== 'Resolved' && record.status !== 'Closed' && (
            <Button type="primary" size="small" icon={<MessageSquare className="w-3.5 h-3.5" />}>
              Reply
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Help & Support</h1>
              <p className="text-gray-600 text-lg">We're here to help you succeed</p>
            </div>
          </div>
        </div>

        {/* System Status Alert */}
        <Alert
          message={
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="font-semibold">All Systems Operational</span>
            </div>
          }
          description={
            <div className="flex items-center justify-between">
              <span>All services are running smoothly</span>
              <Button type="link" icon={<ExternalLink className="w-3.5 h-3.5" />} className="p-0">
                View Status Page
              </Button>
            </div>
          }
          type="success"
          showIcon={false}
          className="mb-8"
        />

        {/* Support Resources */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Support Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportResources.map((resource, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className="text-center">
                  <div
                    className={`w-16 h-16 ${resource.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <div className={resource.iconColor}>{resource.icon}</div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                  <Button type="primary" icon={<ArrowRight className="w-4 h-4" />} className="w-full">
                    {resource.buttonText}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Contact Support Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Support Ticket Form */}
            <Card className="shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Submit Support Ticket</h2>
              </div>

              <Form form={form} layout="vertical">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Form.Item
                    label="Subject"
                    name="subject"
                    rules={[{ required: true, message: 'Please enter subject' }]}
                    className="md:col-span-2"
                  >
                    <Input size="large" placeholder="Brief description of your issue" />
                  </Form.Item>

                  <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: 'Please select category' }]}
                  >
                    <Select size="large" placeholder="Select category">
                      <Option value="technical">Technical Issue</Option>
                      <Option value="payment">Payment Issue</Option>
                      <Option value="account">Account Issue</Option>
                      <Option value="campaign">Campaign Issue</Option>
                      <Option value="other">Other</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="Priority" name="priority" initialValue="medium">
                    <Select size="large">
                      <Option value="low">Low</Option>
                      <Option value="medium">Medium</Option>
                      <Option value="high">High</Option>
                      <Option value="urgent">Urgent</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please enter description' }]}
                    className="md:col-span-2"
                  >
                    <TextArea rows={6} placeholder="Describe your issue in detail..." />
                  </Form.Item>

                  <Form.Item label="Attachments" className="md:col-span-2">
                    <Upload
                      fileList={fileList}
                      onChange={handleFileChange}
                      beforeUpload={() => false}
                      maxCount={5}
                      accept="image/*,.pdf"
                      multiple
                    >
                      <Button icon={<Paperclip className="w-4 h-4" />}>Upload Files</Button>
                    </Upload>
                    <p className="text-xs text-gray-500 mt-2">
                      Accepted: Images, PDFs (Max 5 files, 10MB each)
                    </p>
                  </Form.Item>
                </div>

                <Button
                  type="primary"
                  size="large"
                  icon={<Send className="w-4 h-4" />}
                  onClick={handleSubmitTicket}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Submit Ticket
                </Button>
              </Form>
            </Card>

            {/* Your Support Tickets */}
            <Card className="shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Your Support Tickets</h2>
                </div>
                <Badge count={tickets.filter((t) => t.status === 'Open').length} showZero>
                  <Button icon={<Search className="w-4 h-4" />}>Filter</Button>
                </Badge>
              </div>

              <Table
                dataSource={tickets}
                columns={columns}
                pagination={{ pageSize: 5 }}
                scroll={{ x: 1000 }}
              />
            </Card>
          </div>

          {/* Right Column - Contact Options */}
          <div className="space-y-6">
            {/* Live Chat */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Live Chat</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">Get instant help from our support team</p>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Response time: &lt; 2 minutes</span>
              </div>
              <Button
                type="primary"
                size="large"
                icon={<MessageCircle className="w-4 h-4" />}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Start Live Chat
              </Button>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 font-semibold">Online Now</span>
              </div>
            </Card>

            {/* Email Support */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Email Support</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">Send us a detailed email</p>
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <a href="mailto:support@yourplatform.com" className="text-sm text-purple-600 hover:underline">
                    support@yourplatform.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Response time: &lt; 24 hours</span>
                </div>
              </div>
              <Button size="large" icon={<Mail className="w-4 h-4" />} className="w-full">
                Send Email
              </Button>
            </Card>

            {/* Phone Support */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow border-2 border-purple-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Phone Support</h3>
                </div>
                <Tag color="purple">Premium</Tag>
              </div>
              <p className="text-sm text-gray-600 mb-4">For premium publishers only</p>
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-mono text-gray-900">+1-XXX-XXX-XXXX</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Mon-Fri, 9 AM - 6 PM EST</span>
                </div>
              </div>
              <Button size="large" icon={<Phone className="w-4 h-4" />} className="w-full" disabled>
                Call Now
              </Button>
              <p className="text-xs text-gray-500 mt-3 text-center">Upgrade to Premium to unlock</p>
            </Card>

            {/* Quick Tips */}
            <Card className="shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900">Quick Tips</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Check Knowledge Base first for quick answers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Include screenshots for faster resolution</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Provide account details for account-related issues</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>

      {/* Ticket Details Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            <span className="text-xl font-bold">Ticket Details</span>
          </div>
        }
        open={isTicketModalOpen}
        onCancel={() => setIsTicketModalOpen(false)}
        footer={null}
        width={700}
      >
        {selectedTicket && (
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Ticket ID</p>
                <p className="font-mono font-semibold text-gray-900">{selectedTicket.ticketId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <Tag color={getStatusConfig(selectedTicket.status).color} icon={getStatusConfig(selectedTicket.status).icon}>
                  {selectedTicket.status}
                </Tag>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Subject</p>
              <p className="font-semibold text-gray-900">{selectedTicket.subject}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Category</p>
                <Tag color="blue">{selectedTicket.category}</Tag>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Priority</p>
                <Tag color={getPriorityColor(selectedTicket.priority)}>{selectedTicket.priority}</Tag>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Description</p>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-900">{selectedTicket.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Created</p>
                <p className="text-gray-900">{selectedTicket.created}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Last Updated</p>
                <p className="text-gray-900">{selectedTicket.lastUpdated}</p>
              </div>
            </div>

            {selectedTicket.status !== 'Resolved' && selectedTicket.status !== 'Closed' && (
              <div className="flex gap-3 pt-4">
                <Button type="primary" icon={<MessageSquare className="w-4 h-4" />} className="flex-1">
                  Add Reply
                </Button>
                <Button icon={<CheckCircle className="w-4 h-4" />}>Mark as Resolved</Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default HelpAndSupportPage;
