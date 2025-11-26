import React, { useState } from 'react';
import {
  Card,
  Collapse,
  Avatar,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Checkbox,
  Image,
  Space,
  Descriptions,
  Alert,
  Timeline,
  Divider,
  Upload,
  message
} from 'antd';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  FileText,
  CreditCard,
  Globe,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  ZoomIn,
  ZoomOut,
  Flag,
  Eye,
  Shield
} from 'lucide-react';
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa';

const { Panel } = Collapse;
const { TextArea } = Input;
const { Option } = Select;

// Mock Publisher Data
const mockPublisherData = {
  publisherId: 'PUB00001',
  profilePhoto: 'https://ui-avatars.com/api/?name=TechCorp&background=random&size=200',
  fullName: 'TechCorp Inc.',
  email: 'contact@techcorp.com',
  phone: '+1 555-123-4567',
  registrationDate: '2024-10-15',
  ipAddress: '192.168.1.100',
  location: 'New York, USA',
  
  personalInfo: {
    legalName: 'TechCorp Incorporated',
    companyRegNumber: 'REG-2024-12345',
    taxId: 'TAX-987654321',
    registeredAddress: '123 Tech Street, Silicon Valley',
    city: 'San Francisco',
    state: 'California',
    zipCode: '94102',
    country: 'United States',
    companyDocument: 'company_registration.pdf',
    incorporationDate: '2020-05-10',
    authorizedPersonName: 'John Smith',
    authorizedPersonDesignation: 'CEO'
  },
  
  platformDetails: {
    websiteUrl: 'https://www.techcorp.com',
    category: 'Technology & Software',
    language: 'English',
    description: 'Leading technology solutions provider specializing in cloud computing and AI',
    monthlyVisitors: '500,000',
    audienceLocation: 'United States, Canada, UK',
    screenshots: [
      'https://via.placeholder.com/800x600/4F46E5/FFFFFF?text=Homepage',
      'https://via.placeholder.com/800x600/7C3AED/FFFFFF?text=Products',
      'https://via.placeholder.com/800x600/DB2777/FFFFFF?text=About'
    ],
    additionalDetails: 'Award-winning platform with 10 years in business',
    socialMedia: 'Twitter: @techcorp, LinkedIn: /company/techcorp',
    termsAccepted: true
  },
  
  bankingInfo: {
    bankName: 'Chase Bank',
    accountHolderName: 'TechCorp Inc.',
    accountNumber: '****5678',
    swiftCode: 'CHASUS33',
    bankAddress: '123 Bank Street, New York, NY',
    bankStatement: 'bank_statement_3months.pdf',
    bankDocument: 'bank_verification.pdf',
    minPayoutThreshold: '$1,000',
    paymentFrequency: 'Monthly'
  },
  
  adPreferences: {
    adTypes: ['Banner Ads', 'Interstitial Ads', 'Rewarded Ads'],
    configuration: 'Standard configuration with frequency capping',
    targetAudience: 'Tech-savvy professionals aged 25-45'
  },
  
  verificationChecks: {
    emailVerified: true,
    phoneVerified: true,
    documentAuthenticity: true,
    fraudCheck: false,
    riskScore: 'Low'
  },
  
  timeline: [
    { date: '2024-10-15', action: 'Account Created', status: 'success' },
    { date: '2024-10-15', action: 'Email Verified', status: 'success' },
    { date: '2024-10-16', action: 'KYC Documents Submitted', status: 'success' },
    { date: '2024-10-16', action: 'Under Admin Review', status: 'processing' }
  ]
};

const PublisherKYCReview = () => {
  const [publisher] = useState(mockPublisherData);
  const [approveModalVisible, setApproveModalVisible] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [changesModalVisible, setChangesModalVisible] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [form] = Form.useForm();

  // Document Viewer Component
  const DocumentViewer = ({ title, filename }) => (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-gray-900">{title}</span>
        <Space>
          <Button size="small" icon={<Download className="w-4 h-4" />}>
            Download
          </Button>
          <Button size="small" icon={<Eye className="w-4 h-4" />}>
            View
          </Button>
        </Space>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <FileText className="w-4 h-4" />
        <span>{filename}</span>
      </div>
    </div>
  );

  // Verification Check Item
  const VerificationItem = ({ label, status }) => (
    <div className="flex items-center justify-between py-2">
      <span className="text-gray-700">{label}</span>
      {status ? (
        <CheckCircle className="w-5 h-5 text-green-500" />
      ) : (
        <XCircle className="w-5 h-5 text-red-500" />
      )}
    </div>
  );

  // Handle Approve
  const handleApprove = (values) => {
    message.success('Publisher KYC approved successfully!');
    setApproveModalVisible(false);
  };

  // Handle Reject
  const handleReject = (values) => {
    message.error('Publisher KYC rejected');
    setRejectModalVisible(false);
  };

  // Handle Request Changes
  const handleRequestChanges = (values) => {
    message.info('Change request sent to publisher');
    setChangesModalVisible(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <Button type="link" className="mb-2 pl-0">
          ← Back to Publishers List
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Publisher KYC Review</h1>
        <p className="text-gray-600">Review and verify publisher documentation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Publisher Basic Info Card */}
          <Card title="Publisher Basic Information" className="shadow-sm">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar src={publisher.profilePhoto} size={120} />
              <div className="flex-1">
                <Descriptions column={1} size="small">
                  <Descriptions.Item label={<span className="flex items-center gap-2"><User className="w-4 h-4" />Full Name</span>}>
                    <span className="font-semibold">{publisher.fullName}</span>
                  </Descriptions.Item>
                  <Descriptions.Item label={<span className="flex items-center gap-2"><Mail className="w-4 h-4" />Email</span>}>
                    {publisher.email}
                  </Descriptions.Item>
                  <Descriptions.Item label={<span className="flex items-center gap-2"><Phone className="w-4 h-4" />Phone</span>}>
                    {publisher.phone}
                  </Descriptions.Item>
                  <Descriptions.Item label={<span className="flex items-center gap-2"><Calendar className="w-4 h-4" />Registration Date</span>}>
                    {publisher.registrationDate}
                  </Descriptions.Item>
                  <Descriptions.Item label={<span className="flex items-center gap-2"><MapPin className="w-4 h-4" />Location</span>}>
                    {publisher.location}
                  </Descriptions.Item>
                  <Descriptions.Item label="IP Address">
                    {publisher.ipAddress}
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </div>
          </Card>

          {/* KYC Information Sections */}
          <Card title="KYC Documentation" className="shadow-sm">
            <Collapse defaultActiveKey={['1']} className="bg-white">
              {/* Section 1: Personal/Business Information */}
              <Panel 
                header={<span className="font-semibold">Personal/Business Information</span>} 
                key="1"
                extra={<Tag color="blue">Required</Tag>}
              >
                <Descriptions column={1} bordered size="small">
                  <Descriptions.Item label="Full Legal Name">
                    {publisher.personalInfo.legalName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Company Registration Number">
                    {publisher.personalInfo.companyRegNumber}
                  </Descriptions.Item>
                  <Descriptions.Item label="Tax ID/VAT Number">
                    {publisher.personalInfo.taxId}
                  </Descriptions.Item>
                  <Descriptions.Item label="Registered Address">
                    {publisher.personalInfo.registeredAddress}
                  </Descriptions.Item>
                  <Descriptions.Item label="City">
                    {publisher.personalInfo.city}
                  </Descriptions.Item>
                  <Descriptions.Item label="State">
                    {publisher.personalInfo.state}
                  </Descriptions.Item>
                  <Descriptions.Item label="Zip Code">
                    {publisher.personalInfo.zipCode}
                  </Descriptions.Item>
                  <Descriptions.Item label="Country">
                    {publisher.personalInfo.country}
                  </Descriptions.Item>
                  <Descriptions.Item label="Date of Incorporation">
                    {publisher.personalInfo.incorporationDate}
                  </Descriptions.Item>
                  <Descriptions.Item label="Authorized Person">
                    {publisher.personalInfo.authorizedPersonName} - {publisher.personalInfo.authorizedPersonDesignation}
                  </Descriptions.Item>
                </Descriptions>
                <Divider />
                <DocumentViewer 
                  title="Company Registration Document"
                  filename={publisher.personalInfo.companyDocument}
                />
              </Panel>

              {/* Section 2: Platform Details */}
              <Panel 
                header={<span className="font-semibold">Platform Details</span>} 
                key="2"
                extra={<Tag color="green">Verified</Tag>}
              >
                <Descriptions column={1} bordered size="small">
                  <Descriptions.Item label={<span className="flex items-center gap-2"><Globe className="w-4 h-4" />Website URL</span>}>
                    <a href={publisher.platformDetails.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                      {publisher.platformDetails.websiteUrl}
                    </a>
                  </Descriptions.Item>
                  <Descriptions.Item label="Category">
                    {publisher.platformDetails.category}
                  </Descriptions.Item>
                  <Descriptions.Item label="Language">
                    {publisher.platformDetails.language}
                  </Descriptions.Item>
                  <Descriptions.Item label="Description">
                    {publisher.platformDetails.description}
                  </Descriptions.Item>
                  <Descriptions.Item label="Monthly Visitors">
                    {publisher.platformDetails.monthlyVisitors}
                  </Descriptions.Item>
                  <Descriptions.Item label="Primary Audience Location">
                    {publisher.platformDetails.audienceLocation}
                  </Descriptions.Item>
                  <Descriptions.Item label="Additional Details">
                    {publisher.platformDetails.additionalDetails}
                  </Descriptions.Item>
                  <Descriptions.Item label="Social Media">
                    {publisher.platformDetails.socialMedia}
                  </Descriptions.Item>
                  <Descriptions.Item label="Terms Accepted">
                    {publisher.platformDetails.termsAccepted ? (
                      <Tag color="success">Yes</Tag>
                    ) : (
                      <Tag color="error">No</Tag>
                    )}
                  </Descriptions.Item>
                </Descriptions>
                <Divider />
                <div>
                  <h4 className="font-semibold mb-3">Website Screenshots</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Image.PreviewGroup>
                      {publisher.platformDetails.screenshots.map((url, index) => (
                        <Image
                          key={index}
                          src={url}
                          alt={`Screenshot ${index + 1}`}
                          className="rounded-lg"
                        />
                      ))}
                    </Image.PreviewGroup>
                  </div>
                </div>
              </Panel>

              {/* Section 3: Banking Information */}
              <Panel 
                header={<span className="font-semibold">Banking Information</span>} 
                key="3"
                extra={<Tag color="purple">Confidential</Tag>}
              >
                <Alert
                  message="Sensitive Information"
                  description="Handle banking details with utmost confidentiality"
                  type="warning"
                  showIcon
                  icon={<Shield className="w-4 h-4" />}
                  className="mb-4"
                />
                <Descriptions column={1} bordered size="small">
                  <Descriptions.Item label={<span className="flex items-center gap-2"><CreditCard className="w-4 h-4" />Bank Name</span>}>
                    {publisher.bankingInfo.bankName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Account Holder Name">
                    {publisher.bankingInfo.accountHolderName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Account Number">
                    {publisher.bankingInfo.accountNumber}
                  </Descriptions.Item>
                  <Descriptions.Item label="SWIFT/BIC Code">
                    {publisher.bankingInfo.swiftCode}
                  </Descriptions.Item>
                  <Descriptions.Item label="Bank Address">
                    {publisher.bankingInfo.bankAddress}
                  </Descriptions.Item>
                  <Descriptions.Item label="Minimum Payout Threshold">
                    {publisher.bankingInfo.minPayoutThreshold}
                  </Descriptions.Item>
                  <Descriptions.Item label="Payment Frequency">
                    {publisher.bankingInfo.paymentFrequency}
                  </Descriptions.Item>
                </Descriptions>
                <Divider />
                <Space direction="vertical" className="w-full">
                  <DocumentViewer 
                    title="Bank Statement (Last 3 Months)"
                    filename={publisher.bankingInfo.bankStatement}
                  />
                  <DocumentViewer 
                    title="Bank Verification Document"
                    filename={publisher.bankingInfo.bankDocument}
                  />
                </Space>
              </Panel>

              {/* Section 4: Ad Preferences */}
              <Panel 
                header={<span className="font-semibold">Ad Preferences</span>} 
                key="4"
              >
                <Descriptions column={1} bordered size="small">
                  <Descriptions.Item label="Ad Types">
                    <Space wrap>
                      {publisher.adPreferences.adTypes.map(type => (
                        <Tag key={type} color="blue">{type}</Tag>
                      ))}
                    </Space>
                  </Descriptions.Item>
                  <Descriptions.Item label="Configuration">
                    {publisher.adPreferences.configuration}
                  </Descriptions.Item>
                  <Descriptions.Item label="Target Audience">
                    {publisher.adPreferences.targetAudience}
                  </Descriptions.Item>
                </Descriptions>
              </Panel>

              {/* Section 5: Verification Checks */}
              <Panel 
                header={<span className="font-semibold">Verification Checks</span>} 
                key="5"
                extra={<Tag color="success">All Passed</Tag>}
              >
                <div className="space-y-2">
                  <VerificationItem 
                    label="Email Verification Status" 
                    status={publisher.verificationChecks.emailVerified} 
                  />
                  <VerificationItem 
                    label="Phone Verification Status" 
                    status={publisher.verificationChecks.phoneVerified} 
                  />
                  <VerificationItem 
                    label="Document Authenticity Check" 
                    status={publisher.verificationChecks.documentAuthenticity} 
                  />
                  <VerificationItem 
                    label="Fraud Risk Check (No Flags)" 
                    status={!publisher.verificationChecks.fraudCheck} 
                  />
                </div>
                <Divider />
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-900">Risk Assessment</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Overall Risk Score: <span className="font-bold">{publisher.verificationChecks.riskScore}</span>
                  </p>
                </div>
              </Panel>
            </Collapse>
          </Card>

          {/* Admin Notes Section */}
          <Card title="Admin Notes" className="shadow-sm">
            <TextArea
              rows={4}
              placeholder="Add internal notes about this KYC review (not visible to publisher)..."
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              className="mb-4"
            />
            <Button type="primary" ghost>
              Save Notes
            </Button>
          </Card>

          {/* Document Tools */}
          <Card title="Document Review Tools" className="shadow-sm">
            <Space wrap>
              <Button icon={<ZoomIn className="w-4 h-4" />}>Zoom In</Button>
              <Button icon={<ZoomOut className="w-4 h-4" />}>Zoom Out</Button>
              <Button icon={<Download className="w-4 h-4" />}>Download All</Button>
              <Button icon={<Flag className="w-4 h-4" />} danger>Flag Suspicious</Button>
            </Space>
          </Card>
        </div>

        {/* RIGHT COLUMN - 1/3 width - STICKY */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            {/* Decision Actions Card */}
            <Card title="Decision Actions" className="shadow-lg border-2 border-gray-200">
              <Space direction="vertical" className="w-full" size="large">
                <Button
                  type="primary"
                  size="large"
                  icon={<FaCheckCircle />}
                  onClick={() => setApproveModalVisible(true)}
                  className="w-full bg-green-600 hover:bg-green-700 border-green-600 h-12"
                >
                  Approve KYC
                </Button>

                <Button
                  danger
                  size="large"
                  icon={<FaTimesCircle />}
                  onClick={() => setRejectModalVisible(true)}
                  className="w-full h-12"
                >
                  Reject KYC
                </Button>

                <Button
                  size="large"
                  icon={<FaExclamationTriangle />}
                  onClick={() => setChangesModalVisible(true)}
                  className="w-full bg-orange-50 text-orange-600 border-orange-300 hover:bg-orange-100 h-12"
                >
                  Request Changes
                </Button>

                <Divider className="my-2" />

                <Button
                  size="large"
                  icon={<XCircle className="w-4 h-4" />}
                  className="w-full"
                  ghost
                >
                  Suspend Account
                </Button>
              </Space>
            </Card>

            {/* Quick Verification Checklist */}
            <Card title="Quick Verification Checklist" className="shadow-sm">
              <Checkbox.Group className="w-full">
                <Space direction="vertical" className="w-full">
                  <Checkbox value="1">Identity Documents Valid</Checkbox>
                  <Checkbox value="2">Business Documents Verified</Checkbox>
                  <Checkbox value="3">Address Proof Recent</Checkbox>
                  <Checkbox value="4">Banking Info Matches</Checkbox>
                  <Checkbox value="5">No AML/Sanctions Flags</Checkbox>
                  <Checkbox value="6">Business Details Legitimate</Checkbox>
                </Space>
              </Checkbox.Group>
            </Card>

            {/* Risk Assessment */}
            <Card title="Risk Assessment" className="shadow-sm">
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {publisher.verificationChecks.riskScore}
                </div>
                <div className="text-sm text-gray-600">Overall Risk Score</div>
              </div>
              <Divider />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Fraud Indicators:</span>
                  <Tag color="success">None</Tag>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Document Quality:</span>
                  <Tag color="success">Excellent</Tag>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Information Match:</span>
                  <Tag color="success">100%</Tag>
                </div>
              </div>
            </Card>

            {/* Timeline */}
            <Card title="Review Timeline" className="shadow-sm">
              <Timeline>
                {publisher.timeline.map((item, index) => (
                  <Timeline.Item
                    key={index}
                    color={item.status === 'success' ? 'green' : item.status === 'error' ? 'red' : 'blue'}
                  >
                    <p className="text-sm font-semibold text-gray-900">{item.action}</p>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </Timeline.Item>
                ))}
              </Timeline>
            </Card>
          </div>
        </div>
      </div>

      {/* Approve Modal */}
      <Modal
        title="Approve Publisher KYC"
        open={approveModalVisible}
        onCancel={() => setApproveModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form form={form} onFinish={handleApprove} layout="vertical">
          <Alert
            message="Confirmation Required"
            description="You are about to approve this publisher's KYC. They will gain full access to create and manage campaigns."
            type="info"
            showIcon
            className="mb-4"
          />
          <Form.Item
            name="sendWelcomeEmail"
            valuePropName="checked"
            initialValue={true}
          >
            <Checkbox>Send welcome email to publisher</Checkbox>
          </Form.Item>
          <Form.Item>
            <Space className="w-full justify-end">
              <Button onClick={() => setApproveModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" className="bg-green-600">
                Confirm Approval
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Reject Modal */}
      <Modal
        title="Reject Publisher KYC"
        open={rejectModalVisible}
        onCancel={() => setRejectModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form form={form} onFinish={handleReject} layout="vertical">
          <Alert
            message="Rejection Action"
            description="Please provide a detailed reason for rejection to help the publisher understand what needs to be corrected."
            type="warning"
            showIcon
            className="mb-4"
          />
          <Form.Item
            name="reason"
            label="Rejection Reason"
            rules={[{ required: true, message: 'Please select a reason' }]}
          >
            <Select placeholder="Select rejection reason">
              <Option value="incomplete">Incomplete Documents</Option>
              <Option value="invalid">Invalid Documents</Option>
              <Option value="verification_failed">Failed Verification</Option>
              <Option value="suspicious">Suspicious Activity</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="message"
            label="Detailed Message"
            rules={[{ required: true, message: 'Please provide details' }]}
          >
            <TextArea rows={4} placeholder="Explain what needs to be corrected..." />
          </Form.Item>
          <Form.Item
            name="allowResubmission"
            valuePropName="checked"
            initialValue={true}
          >
            <Checkbox>Allow resubmission of documents</Checkbox>
          </Form.Item>
          <Form.Item>
            <Space className="w-full justify-end">
              <Button onClick={() => setRejectModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" danger htmlType="submit">
                Confirm Rejection
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Request Changes Modal */}
      <Modal
        title="Request Changes"
        open={changesModalVisible}
        onCancel={() => setChangesModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form form={form} onFinish={handleRequestChanges} layout="vertical">
          <Alert
            message="Request Document Changes"
            description="Select which documents need to be resubmitted and provide specific instructions."
            type="info"
            showIcon
            className="mb-4"
          />
          <Form.Item
            name="documents"
            label="Documents to Resubmit"
            rules={[{ required: true, message: 'Please select at least one document' }]}
          >
            <Checkbox.Group className="w-full">
              <Space direction="vertical" className="w-full">
                <Checkbox value="company_reg">Company Registration Document</Checkbox>
                <Checkbox value="tax_doc">Tax Documents</Checkbox>
                <Checkbox value="bank_statement">Bank Statement</Checkbox>
                <Checkbox value="id_proof">ID Proof</Checkbox>
                <Checkbox value="address_proof">Address Proof</Checkbox>
                <Checkbox value="screenshots">Platform Screenshots</Checkbox>
              </Space>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            name="instructions"
            label="Specific Instructions"
            rules={[{ required: true, message: 'Please provide instructions' }]}
          >
            <TextArea rows={4} placeholder="Provide detailed instructions on what needs to be corrected or updated..." />
          </Form.Item>
          <Form.Item>
            <Space className="w-full justify-end">
              <Button onClick={() => setChangesModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" className="bg-orange-500">
                Send Request
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PublisherKYCReview;
