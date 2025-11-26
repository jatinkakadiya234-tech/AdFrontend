import React from 'react';
import {
  Card, Tabs, Statistic, Row, Col, Tag, Progress, Table, DatePicker, Input, Button, Space
} from 'antd';
import {
  Users,
  UserCheck,
  Megaphone,
  BarChart3,
  DollarSign,
  PieChart,
  TrendingUp,
  FileText,
  CreditCard,
  Download
} from 'lucide-react';
import { FaChartLine, FaChartPie } from 'react-icons/fa';

const { TabPane } = Tabs;

const ReportsAnalytics = () => {
  // Mock: Use your real dashboard/report APIs here
  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <Tabs size="large" defaultActiveKey="1">
        {/* User Reports */}
        <TabPane tab={<span><Users /> User Reports</span>} key="1">
          <Row gutter={16} className="mb-6">
            <Col md={8}><Card><Statistic title="Publisher Growth" value="8.2%" prefix={<TrendingUp />} /></Card></Col>
            <Col md={8}><Card><Statistic title="Viewer Growth" value="11.5%" prefix={<TrendingUp />} /></Card></Col>
            <Col md={8}><Card><Statistic title="User Retention" value="81%" suffix="%" prefix={<UserCheck />} valueStyle={{ color: "#10b981" }} /></Card></Col>
          </Row>
          <Card title="User Demographics" className="mb-6">
            <Progress type="circle" percent={68} status="active" />
            <div className="mt-3 text-sm text-gray-600">68% Male • 32% Female • 71% 18-34yo</div>
          </Card>
          <Card title="Retention Metrics">
            <Table columns={[
              { title: "Month", dataIndex: "month" },
              { title: "Cohort Size", dataIndex: "size" },
              { title: "1 Month", dataIndex: "m1" },
              { title: "3 Months", dataIndex: "m3" },
              { title: "6 Months", dataIndex: "m6" }
            ]} dataSource={[
              { key: 1, month: "Jul", size: 450, m1: "80%", m3: "54%", m6: "23%" }
            ]} pagination={false} />
          </Card>
        </TabPane>
        {/* Campaign Reports */}
        <TabPane tab={<span><Megaphone /> Campaign Reports</span>} key="2">
          <Row gutter={16} className="mb-6">
            <Col md={8}><Card><Statistic title="Campaigns This Month" value={58} prefix={<Megaphone />} /></Card></Col>
            <Col md={8}><Card><Statistic title="Avg. ROI" value="247%" prefix={<BarChart3 />} valueStyle={{ color: "#7e22ce" }} /></Card></Col>
            <Col md={8}><Card><Statistic title="Budget Utilization" value="91%" prefix={<PieChart />} valueStyle={{ color: "#eab308" }} /></Card></Col>
          </Row>
          <Card title="Ad Type Effectiveness" className="mb-6">
            <Progress percent={58} status="active" format={p => `Banner: ${p}%`} className="mb-2" />
            <Progress percent={24} status="success" format={p => `Interstitial: ${p}%`} className="mb-2" strokeColor="#7e22ce" />
            <Progress percent={12} status="active" format={p => `Rewarded: ${p}%`} strokeColor="#16a34a" />
          </Card>
          <Card title="Campaign Performance Summary">
            <Table columns={[
              { title: "Campaign", dataIndex: "name" },
              { title: "Type", dataIndex: "type", render: t => <Tag color="blue">{t}</Tag> },
              { title: "Budget", dataIndex: "budget", render: v => `$${v}` },
              { title: "ROI", dataIndex: "roi" },
              { title: "Status", dataIndex: "status", render: s => <Tag color={s === "active" ? "green" : "orange"}>{s}</Tag> }
            ]} dataSource={[
              { key: 1, name: "Q4 Awareness", type: "Banner", budget: "3500", roi: "202%", status: "active" }
            ]} pagination={false} />
          </Card>
        </TabPane>
        {/* Financial Reports */}
        <TabPane tab={<span><DollarSign /> Financial Reports</span>} key="3">
          <Row gutter={16} className="mb-6">
            <Col md={8}><Card><Statistic title="Revenue (MTD)" value={48000} prefix={<DollarSign />} formatter={v => `$${v}`} /></Card></Col>
            <Col md={8}><Card><Statistic title="Commission (MTD)" value={5600} prefix={<CreditCard />} formatter={v => `$${v}`} /></Card></Col>
            <Col md={8}><Card><Statistic title="Payouts (MTD)" value={14800} prefix={<DollarSign />} formatter={v => `$${v}`} /></Card></Col>
          </Row>
          <Card title="Tax Reports & Exports">
            <div className="mb-4">
              <DatePicker.RangePicker className="mr-4" />
              <Button type="primary" icon={<Download />}>Export Tax Report</Button>
            </div>
            <Table columns={[
              { title: "Report", dataIndex: "report" },
              { title: "Period", dataIndex: "period" },
              { title: "Amount", dataIndex: "amount", render: v => <span className="font-bold">${v}</span> }
            ]} dataSource={[
              { key: 1, report: "Tax (Q3)", period: "Jul-Sep", amount: 2200 }
            ]} pagination={false} />
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ReportsAnalytics;
