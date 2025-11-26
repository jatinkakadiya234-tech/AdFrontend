import React, { useState } from 'react';
import {
  Card, Statistic, Tabs, Badge, Table, Button, Tag, Space, Tooltip, Progress
} from 'antd';
import {
  Clock, UserCheck, Megaphone, Globe, DollarSign, CheckCircle, XCircle, Eye, Timer,
  AlertTriangle, Download, MoreVertical
} from 'lucide-react';
import { FaHistory, FaArrowRight } from 'react-icons/fa';

const { TabPane } = Tabs;

// Utility to get waiting/priority
const getPriority = (waitDays) => waitDays > 5 ? 'urgent' : waitDays >= 3 ? 'high' : 'normal';
const getPriorityTag = (waitDays) => {
  if (waitDays > 5) return <Tag color="red">Urgent</Tag>;
  if (waitDays >= 3) return <Tag color="orange">High</Tag>;
  return <Tag>Normal</Tag>;
};

const ApprovalQueueDashboard = () => {
  // Mock stats
  const stats = {
    total: 62,
    avgReview: '17h 21m',
    approvedToday: 14,
    rejectedToday: 2
  };

  // Mock approval data
  const publisherKyc = [
    { key: 1, name: "TechCorp Inc.", date: "2025-11-19", wait: 7 },
    { key: 2, name: "Digital Dynamics", date: "2025-11-23", wait: 2 },
    { key: 3, name: "Acme Marketing", date: "2025-11-22", wait: 4 }
  ];
  const campaigns = [
    { key: 1, name: "Winter Sale 2025", publisher: "TechCorp Inc.", adType: "Banner", budget: 4500, wait: 3 },
    { key: 2, name: "Rewarded Bonus", publisher: "MediaHub", adType: "Rewarded", budget: 9000, wait: 6 }
  ];
  const platforms = [
    { key: 1, platform: "newsdaily.com", viewer: "NewsDaily", type: "Website", date: "2025-11-24", wait: 1 },
    { key: 2, platform: "game-portal", viewer: "GamePortal", type: "App", date: "2025-11-20", wait: 5 }
  ];
  const payments = [
    { key: 1, viewer: "NewsDaily", amount: 1100, method: "PayPal", date: "2025-11-25" },
    { key: 2, viewer: "GamePortal", amount: 850, method: "Bank", date: "2025-11-25" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      {/* ===== Quick Stats Header ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="hover:shadow-md">
          <Statistic title="Total Pending Items" value={stats.total} prefix={<Clock />} />
        </Card>
        <Card className="hover:shadow-md">
          <Statistic title="Avg. Review Time" value={stats.avgReview} prefix={<Timer />} />
        </Card>
        <Card className="hover:shadow-md">
          <Statistic title="Today's Approvals" value={stats.approvedToday} prefix={<CheckCircle className="text-green-600" />} />
        </Card>
        <Card className="hover:shadow-md">
          <Statistic title="Today's Rejections" value={stats.rejectedToday} prefix={<XCircle className="text-red-600" />} />
        </Card>
      </div>

      {/* ===== Tabbed Queue ===== */}
      <Card>
        <Tabs defaultActiveKey="1" type="card" size="large">
          {/* Publisher KYC Approvals */}
          <TabPane
            tab={
              <span>
                <UserCheck /> Publisher KYC <Badge count={publisherKyc.length} offset={[4,-4]} />
              </span>
            }
            key="1"
          >
            <Table
              rowKey="key"
              dataSource={publisherKyc}
              columns={[
                { title: 'Publisher', dataIndex: 'name', render: (v, r) => <span className="font-semibold">{v}</span> },
                { title: 'Submission Date', dataIndex: 'date' },
                {
                  title: 'Waiting',
                  dataIndex: 'wait',
                  render: (days, r) => (
                    <Space>
                      <Tag color={getPriority(days) === "urgent" ? "red" : getPriority(days) === "high" ? "orange" : "default"}>
                        {days} days
                      </Tag>
                      {getPriorityTag(days)}
                    </Space>
                  )
                },
                {
                  title: 'Quick Actions', key: 'actions',
                  render: (_, r) => (
                    <Space>
                      <Button type="primary" className="bg-green-600" size="small">Approve</Button>
                      <Button danger size="small">Reject</Button>
                      <Button size="small" icon={<Eye />} href={`/admin/publishers/${r.key}/kyc-review`}>Review</Button>
                    </Space>
                  )
                }
              ]}
              pagination={false}
            />
          </TabPane>

          {/* Campaign Approvals */}
          <TabPane
            tab={
              <span>
                <Megaphone /> Campaigns <Badge count={campaigns.length} offset={[4,-4]} />
              </span>
            }
            key="2"
          >
            <Table
              rowKey="key"
              dataSource={campaigns}
              columns={[
                { title: 'Campaign', dataIndex: 'name', render: (v, r) => <span className="font-semibold">{v}</span> },
                { title: 'Publisher', dataIndex: 'publisher' },
                { title: 'Ad Type', dataIndex: 'adType', render: t => <Tag>{t}</Tag> },
                { title: 'Budget', dataIndex: 'budget', render: v => <span className="font-semibold text-blue-700">${v}</span> },
                { title: 'Waiting', dataIndex: 'wait', render: days => getPriorityTag(days) },
                {
                  title: 'Quick Review',
                  render: (_, r) => <Button size="small" icon={<Eye />} href={`/admin/campaigns/${r.key}/review`}>Review</Button>
                }
              ]}
              pagination={false}
            />
          </TabPane>

          {/* Viewer Platform Approvals */}
          <TabPane
            tab={
              <span>
                <Globe /> Platforms <Badge count={platforms.length} offset={[4,-4]} />
              </span>
            }
            key="3"
          >
            <Table
              rowKey="key"
              dataSource={platforms}
              columns={[
                { title: 'Platform', dataIndex: 'platform', render: v => <span className="font-semibold">{v}</span> },
                { title: 'Viewer', dataIndex: 'viewer' },
                { title: 'Type', dataIndex: 'type', render: t => <Tag color={t === "Website" ? "blue" : "purple"}>{t}</Tag> },
                { title: 'Submission Date', dataIndex: 'date' },
                { title: 'Waiting', dataIndex: 'wait', render: days => getPriorityTag(days) },
                {
                  title: 'Quick Review',
                  render: (_, r) => <Button size="small" icon={<Eye />} href={`/admin/viewers/${r.key}/platforms/review`}>Review</Button>
                }
              ]}
              pagination={false}
            />
          </TabPane>

          {/* Payment Requests */}
          <TabPane
            tab={
              <span>
                <DollarSign /> Payment Requests <Badge count={payments.length} offset={[4,-4]} />
              </span>
            }
            key="4"
          >
            <Table
              rowKey="key"
              dataSource={payments}
              columns={[
                { title: "Viewer", dataIndex: "viewer" },
                { title: "Amount", dataIndex: "amount", render: a => <span className="font-semibold text-green-700">${a}</span> },
                { title: "Method", dataIndex: "method" },
                { title: "Requested At", dataIndex: "date" },
                {
                  title: "Actions",
                  render: (_, r) => (
                    <Space>
                      <Button className="bg-green-600" type="primary" size="small">Approve</Button>
                      <Button danger size="small">Reject</Button>
                    </Space>
                  )
                }
              ]}
              pagination={false}
            />
          </TabPane>
        </Tabs>
      </Card>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap gap-4 items-center">
        <Tag color="red">Urgent (&gt;5d)</Tag>
        <Tag color="orange">High (3-5d)</Tag>
        <Tag>Normal (&lt;3d)</Tag>
        <span className="text-gray-400 mr-3">(Priority based on waiting time)</span>
      </div>
    </div>
  );
};

export default ApprovalQueueDashboard;
