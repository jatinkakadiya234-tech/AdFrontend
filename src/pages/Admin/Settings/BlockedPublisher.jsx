// === 6.7 Security / Blocked Entities ===

import React, { useState } from "react";
import {
  Card, Tabs, Table, Button, Tag, Space, Input, Modal, Tooltip, Avatar
} from "antd";
import {
  Shield, XCircle, Globe, UserX, Slash, Trash2, Eye, Search,
  Delete,
} from "lucide-react";

const { TabPane } = Tabs;

// Mocked Data
const blockedPublishers = [
  { key: 1, name: "SpamPub LLC", reason: "Fraud", blockedAt: "2025-10-21", admin: "Alex" }
];
const blockedViewers = [
  { key: 1, name: "BotNet", reason: "Automation", blockedAt: "2025-10-13", admin: "Jamie" }
];
const blockedIps = [
  { key: 1, ip: "192.168.100.13", reason: "Traffic Fraud", blockedAt: "2025-10-14", count: 37, admin: "Alex" }
];
const blockedDomains = [
  { key: 1, domain: "malicious-site.com", reason: "Malware", blockedAt: "2025-10-09", count: 12, admin: "Sam" }
];

const BlockedEntities = () => {
  const [modal, setModal] = useState(false);

  const baseCols = [
    { title: "Entity", dataIndex: "name", render: (t, r) => <Space>
      <Avatar icon={<UserX />} /> <span className="font-semibold">{t}</span>
    </Space> },
    { title: "Reason", dataIndex: "reason", render: r => <Tag color="red">{r}</Tag> },
    { title: "Blocked At", dataIndex: "blockedAt" },
    { title: "Blocked By", dataIndex: "admin" },
    { title: "Actions", render: () => <Button icon={<Eye />} size="small">View</Button> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <Tabs defaultActiveKey="1" size="large">
        <TabPane tab={<span><XCircle /> Publishers</span>} key="1">
          <div className="mb-3 flex justify-end">
            <Button type="primary" onClick={() => setModal(true)}>Add to Blacklist</Button>
          </div>
          <Table columns={baseCols} dataSource={blockedPublishers} pagination={false} bordered />
        </TabPane>
        <TabPane tab={<span><Slash /> Viewers</span>} key="2">
          <div className="mb-3 flex justify-end">
            <Button type="primary" onClick={() => setModal(true)}>Add to Blacklist</Button>
          </div>
          <Table columns={baseCols} dataSource={blockedViewers} pagination={false} bordered />
        </TabPane>
        <TabPane tab={<span><Globe /> IPs</span>} key="3">
          <Table
            columns={[
              { title: "IP", dataIndex: "ip", render: t => <span className="font-mono font-semibold">{t}</span> },
              { title: "Reason", dataIndex: "reason" },
              { title: "Count", dataIndex: "count", render: v => <Tag color="purple">{v}</Tag> },
              { title: "Blocked At", dataIndex: "blockedAt" },
              { title: "Blocked By", dataIndex: "admin" },
              { title: "Actions", render: () => <Button icon={<Eye />} size="small">View</Button> }
            ]}
            dataSource={blockedIps}
            pagination={false}
            bordered
          />
        </TabPane>
        <TabPane tab={<span><Globe /> Domains</span>} key="4">
          <Table
            columns={[
              { title: "Domain", dataIndex: "domain", render: t => <span className="font-mono font-semibold">{t}</span> },
              { title: "Reason", dataIndex: "reason" },
              { title: "Count", dataIndex: "count", render: v => <Tag color="purple">{v}</Tag> },
              { title: "Blocked At", dataIndex: "blockedAt" },
              { title: "Blocked By", dataIndex: "admin" },
              { title: "Actions", render: () => <Button icon={<Eye />} size="small">View</Button> }
            ]}
            dataSource={blockedDomains}
            pagination={false}
            bordered
          />
        </TabPane>
        <TabPane tab={<span><Shield /> Blacklist Management</span>} key="5">
          <Card>
            <span>Manage all blocked entities in one place. Search or remove as needed.</span>
            <div className="my-2 flex">
              <Input prefix={<Search />} placeholder="Search IP, domain or user..." className="mr-4 max-w-md" />
              <Button icon={<Delete />} danger>Remove Selected</Button>
            </div>
            <div className="mt-4 text-xs text-gray-500">For critical security threats, consult your compliance or legal team before mass action.</div>
          </Card>
        </TabPane>
      </Tabs>
      <Modal open={modal} title="Blacklist Entity" onCancel={() => setModal(false)} footer={null}>
        <Input placeholder="Entity (Publisher/Viewers/IP/Domain)" className="mb-3" />
        <Input placeholder="Reason" className="mb-3" />
        <Button type="primary" block onClick={() => setModal(false)}>Add to Blacklist</Button>
      </Modal>
    </div>
  );
};

export default BlockedEntities;
