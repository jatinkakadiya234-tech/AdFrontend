import React, { useState } from 'react';
import {
  Card, Button, Tag, Space, Modal, Avatar, Descriptions, Timeline,
  Image, Collapse, Form, Input, Checkbox, Select, Alert, Progress, Tooltip, message, Divider
} from 'antd';
import {
  Globe,
  Eye,
  CheckCircle,
  XCircle,
  Download,
  Flag,
  Shield,
  Calendar,
  UserCheck,
  Code2,
  AlertCircle,
  Smartphone,
  Apple,
  Info
} from 'lucide-react';

const { Panel } = Collapse;
const { Option } = Select;
const { TextArea } = Input;

// Mock Data
const mockPlatform = {
  name: 'newsdaily.com',
  type: 'Website',
  url: 'https://www.newsdaily.com',
  category: 'News/Media',
  submissionDate: '2024-10-21',
  status: 'pending',
  description: 'NewsDaily is a news aggregator site covering world headlines.',
  contentType: 'News',
  audience: 'Adults 18-55 worldwide',
  monetizationGoals: 'Ad revenue, native advertising',
  verification: {
    ownershipMethods: [
      { method: 'DNS TXT Record', code: 'newsdaily-verif-XYZ123' },
      { method: 'HTML File Upload', code: '/.well-known/verify-newsdaily.html' },
      { method: 'Meta Tag', code: '<meta name="newsdaily-verif" content="XYZ123">' }
    ],
    whois: 'Registered: 2014-03-03, Owner: NewsDaily LLC',
    ssl: true,
    contactMatch: true
  },
  screenshots: [
    'https://via.placeholder.com/500x350/4F46E5/FFFFFF?text=Home+Page',
    'https://via.placeholder.com/500x350/7C3AED/FFFFFF?text=Article',
    'https://via.placeholder.com/500x350/DB2777/FFFFFF?text=Mobile+View'
  ]
};

const PlatformVerificationDetail = () => {
  const [approveModal, setApproveModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [changesModal, setChangesModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [form] = Form.useForm();

  // For web layout use
  const infoBg = 'bg-gray-50 border border-gray-200 p-3 rounded-lg';

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* LEFT COLUMN */}
      <div className="lg:col-span-2 space-y-6">
        {/* Basic Info */}
        <Card title="Platform Basic Info" className={`${infoBg} shadow-sm`}>
          <Descriptions size="small" column={2} bordered>
            <Descriptions.Item label="Platform Name">{mockPlatform.name}</Descriptions.Item>
            <Descriptions.Item label="Type">
              <Tag icon={mockPlatform.type === 'Website' ? <Globe /> : <Smartphone />} color={mockPlatform.type === 'Website' ? 'blue' : 'purple'}>
                {mockPlatform.type}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="URL / Bundle ID">
              <a href={mockPlatform.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">{mockPlatform.url}</a>
            </Descriptions.Item>
            <Descriptions.Item label="Category/Vertical">{mockPlatform.category}</Descriptions.Item>
            <Descriptions.Item label="Submission Date">{mockPlatform.submissionDate}</Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color="warning">{mockPlatform.status}</Tag>
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Platform Details */}
        <Card title="Platform Details" className={`${infoBg} shadow-sm`}>
          <Descriptions size="small" column={1} bordered>
            <Descriptions.Item label="Description">{mockPlatform.description}</Descriptions.Item>
            <Descriptions.Item label="Content Type">{mockPlatform.contentType}</Descriptions.Item>
            <Descriptions.Item label="Audience">{mockPlatform.audience}</Descriptions.Item>
            <Descriptions.Item label="Monetization Goals">{mockPlatform.monetizationGoals}</Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Ownership Verification */}
        <Card title="Ownership Verification" className={`${infoBg} shadow-sm`}>
          <Collapse ghost>
            <Panel header="Website Verification Methods" key="1">
              {mockPlatform.verification.ownershipMethods.map((m, idx) => (
                <div key={idx} className="mb-3">
                  <div className="font-semibold">{m.method}</div>
                  <code className="bg-gray-100 px-2 py-1 roundeded text-sm">{m.code}</code>
                </div>
              ))}
            </Panel>
            <Panel header="WHOIS & Security" key="2">
              <div>
                <div className="mb-1"><span className="font-semibold">WHOIS:</span> {mockPlatform.verification.whois}</div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" /> SSL Certificate: {mockPlatform.verification.ssl ? <Tag color="green">Valid</Tag> : <Tag color="red">Invalid</Tag>}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <UserCheck className="w-4 h-4" /> Contact Info Match: {mockPlatform.verification.contactMatch ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>}
                </div>
              </div>
            </Panel>
          </Collapse>
        </Card>

        {/* Screenshots */}
        <Card title="Platform Screenshots" className={`${infoBg} shadow-sm`}>
          <Image.PreviewGroup>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockPlatform.screenshots.map((item, idx) => (
                <Image key={idx} src={item} className="rounded" />
              ))}
            </div>
          </Image.PreviewGroup>
        </Card>
      </div>

      {/* RIGHT COLUMN */}
      <div className="lg:col-span-1 space-y-6 sticky top-8">
        {/* Platform Preview */}
        <Card title="Quick Platform Preview" className="mb-2">
          <iframe
            title="Site Preview"
            src={mockPlatform.url}
            className="w-full rounded border border-gray-200"
            style={{ minHeight: 240, background: '#fff' }}
          />
          <Divider>Metrics</Divider>
          <div className="text-sm text-center text-gray-500">Impressions: 54,000 • Earnings: $1,500</div>
        </Card>

        {/* Action Panel */}
        <Card title="Review Actions" className="shadow-sm">
          <Space direction="vertical" className="w-full" size="large">
            <Button size="large" type="primary" className="bg-green-600" onClick={() => setApproveModal(true)}>Approve Platform</Button>
            <Button size="large" danger onClick={() => setRejectModal(true)}>Reject Platform</Button>
            <Button size="large" className="bg-orange-100 text-orange-700" onClick={() => setChangesModal(true)}>Request Changes</Button>
            <Button size="large" icon={<XCircle />} ghost>Suspend Platform</Button>
          </Space>
        </Card>

        {/* Admin Notes */}
        <Card title="Admin Notes" className="shadow-sm">
          <TextArea rows={3} 
            placeholder="Internal notes (not visible to viewer)" 
            value={adminNotes}
            onChange={e => setAdminNotes(e.target.value)}
            className="mb-3"
          />
          <Button type="primary" ghost>Save Notes</Button>
        </Card>
      </div>

      {/* Approve Modal */}
      <Modal
        open={approveModal}
        title="Approve Platform"
        onCancel={() => setApproveModal(false)}
        footer={null}
      >
        <Alert message="Are you sure you want to approve this platform for ad serving?" type="success" showIcon className="mb-3" />
        <Form onFinish={() => { setApproveModal(false); message.success('Platform approved!'); }}>
          <Form.Item label="Initial Payment Threshold" name="threshold" initialValue={100} required>
            <Input prefix="$" type="number" />
          </Form.Item>
          <Form.Item>
            <Space className="w-full justify-end">
              <Button onClick={() => setApproveModal(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" className="bg-green-600">Confirm Approval</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      {/* Reject Modal */}
      <Modal
        open={rejectModal}
        title="Reject Platform"
        onCancel={() => setRejectModal(false)}
        footer={null}
      >
        <Form onFinish={() => { setRejectModal(false); message.error('Platform rejected.'); }}>
          <Form.Item label="Rejection Reason" name="reason" required>
            <Select>
              <Option value="ownership">Ownership not verified</Option>
              <Option value="content">Prohibited content detected</Option>
              <Option value="traffic">Low traffic/quality</Option>
              <Option value="suspicious">Suspicious activity</Option>
              <Option value="technical">Technical issues</Option>
              <Option value="other">Other (specify below)</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Details" name="details" required>
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item name="resub" valuePropName="checked" initialValue={true}>
            <Checkbox>Allow resubmission</Checkbox>
          </Form.Item>
          <Form.Item>
            <Space className="w-full justify-end">
              <Button onClick={() => setRejectModal(false)}>Cancel</Button>
              <Button danger type="primary" htmlType="submit">Reject</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      {/* Request Changes Modal */}
      <Modal
        open={changesModal}
        title="Request Changes"
        onCancel={() => setChangesModal(false)}
        footer={null}
      >
        <Form onFinish={() => { setChangesModal(false); message.info('Change request sent.'); }}>
          <Form.Item label="Issues to Fix" name="issues" required>
            <Checkbox.Group>
              <Space direction="vertical">
                <Checkbox value="ownership">Ownership verification proof</Checkbox>
                <Checkbox value="screenshot">Screenshots update</Checkbox>
                <Checkbox value="description">Fix platform description</Checkbox>
                <Checkbox value="compliance">Content/policy compliance</Checkbox>
                <Checkbox value="other">Other (specify below)</Checkbox>
              </Space>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item label="Instructions" name="instructions" required>
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Space className="w-full justify-end">
              <Button onClick={() => setChangesModal(false)}>Cancel</Button>
              <Button type="primary" className="bg-orange-500" htmlType="submit">Send Request</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PlatformVerificationDetail;
