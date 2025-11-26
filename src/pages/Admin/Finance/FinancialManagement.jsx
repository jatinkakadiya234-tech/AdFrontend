import React from 'react';
import {
  Card, Tabs, Statistic, Row, Col, Table, Button, Input, Select, Badge, Tag, Space, Progress
} from 'antd';
import {
  DollarSign,
  Download,
  TrendingUp,
  CreditCard,
  Wallet,
  BarChart3,
  PieChart
} from 'lucide-react';

const { TabPane } = Tabs;
const { Option } = Select;

const FinancialManagement = () => {
  // Mock stats
  const stats = {
    commission: 41230, revenue: 149500, adType: { Banner: 70, Interstitial: 17, Rewarded: 8, Shortener: 5 }, geo: [{ name: 'India', val: 45000 }, { name: 'US', val: 60000 }, { name: 'UK', val: 18000 }]
  };
  // Mock tables
  const publisherPayments = [{ key: 1, pub: "Acme", amt: 5200, date: "2025-11-10", type: "invoice", status: "paid" }];
  const viewerPayouts = [{ key: 1, viewer: "NewsDaily", amt: 1100, date: "2025-11-21", meth: "Paypal", status: "processing" }];
  const transactions = [{ key: 1, type: "ad_revenue", entity: "TechCorp", plus: 2200, minus: 0, date: "2025-11-20", desc: "Banner Ad Earnings" }];

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <Tabs defaultActiveKey="1" size="large">
        {/* Revenue Overview */}
        <TabPane tab={<span><DollarSign /> Revenue Overview</span>} key="1">
          <Row gutter={16} className="mb-6">
            <Col md={6}><Card><Statistic title="Commission" value={stats.commission} prefix={<Wallet />} formatter={v => `$${v}`} /></Card></Col>
            <Col md={6}><Card><Statistic title="Total Revenue" value={stats.revenue} prefix={<DollarSign />} formatter={v => `$${v}`} /></Card></Col>
            <Col md={6}><Card><Statistic title="Top Ad Type" value="Banner" prefix={<BarChart3 />} /></Card></Col>
            <Col md={6}><Card><Statistic title="Top Country" value="US" prefix={<PieChart />} /></Card></Col>
          </Row>
          <Card className="mb-4">
            <Row>
              <Col md={12}>
                <h3 className="text-lg font-semibold mb-2">Revenue by Ad Type</h3>
                <ul>
                  {Object.entries(stats.adType).map(([type, val], i) => (
                    <li key={i} className="flex justify-between font-medium mb-1">
                      <span>{type}</span>
                      <Progress percent={val} size="small" className="w-40" />
                    </li>
                  ))}
                </ul>
              </Col>
              <Col md={12}>
                <h3 className="text-lg font-semibold mb-2">Revenue by Geography</h3>
                <ul>
                  {stats.geo.map((g, i) => (
                    <li key={i} className="flex justify-between font-medium mb-1">
                      <span>{g.name}</span>
                      <span>${g.val}</span>
                    </li>
                  ))}
                </ul>
              </Col>
            </Row>
          </Card>
        </TabPane>
        {/* Publisher Payments */}
        <TabPane tab={<span><CreditCard /> Publisher Payments</span>} key="2">
          <Table
            columns={[
              { title: "Publisher", dataIndex: "pub", key: "pub" },
              { title: "Amount", dataIndex: "amt", render: v => <span className="text-green-700 font-bold">${v}</span> },
              { title: "Date", dataIndex: "date" },
              { title: "Type", dataIndex: "type" },
              { title: "Status", dataIndex: "status", render: s => <Tag color={s === "paid" ? "green" : "orange"}>{s}</Tag> }
            ]}
            dataSource={publisherPayments}
            pagination={false}
            bordered
          />
          <Button type="primary" icon={<Download />}>Export</Button>
        </TabPane>
        {/* Viewer Payouts */}
        <TabPane tab={<span><Wallet /> Viewer Payouts</span>} key="3">
          <Table
            columns={[
              { title: "Viewer", dataIndex: "viewer" },
              { title: "Amount", dataIndex: "amt", render: v => <span className="text-green-700 font-bold">${v}</span> },
              { title: "Date", dataIndex: "date" },
              { title: "Method", dataIndex: "meth" },
              { title: "Status", dataIndex: "status", render: s => <Tag color={s === "processing" ? "orange" : "green"}>{s}</Tag> }
            ]}
            dataSource={viewerPayouts}
            pagination={false}
            bordered
          />
        </TabPane>
        {/* Transaction Logs */}
        <TabPane tab={<span><BarChart3 /> Transaction Logs</span>} key="4">
          <Table
            columns={[
              { title: "Type", dataIndex: "type" },
              { title: "Entity", dataIndex: "entity" },
              { title: "Income", dataIndex: "plus", render: v => v ? <span className="text-green-700">${v}</span> : "" },
              { title: "Expense", dataIndex: "minus", render: v => v ? <span className="text-red-600">-${v}</span> : "" },
              { title: "Date", dataIndex: "date" },
              { title: "Description", dataIndex: "desc" }
            ]}
            dataSource={transactions}
            pagination={false}
            bordered
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default FinancialManagement;
