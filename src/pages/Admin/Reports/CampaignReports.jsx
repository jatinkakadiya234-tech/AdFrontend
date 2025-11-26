import React, { useState } from 'react';
import {
  Card, Row, Col, Statistic, Table, Progress, DatePicker,
  Select, Button, Space, Tag, Badge, Tooltip, Divider, List
} from 'antd';
import {
  Megaphone, BarChart3, PieChart, TrendingUp, Download,
  Filter, Eye, DollarSign, Target, Calendar, Clock,
  CheckCircle, AlertCircle, PlayCircle, PauseCircle
} from 'lucide-react';

const { Option } = Select;
const { RangePicker } = DatePicker;

const CampaignReportsPage = () => {
  const [dateRange, setDateRange] = useState(null);
  const [campaignFilter, setCampaignFilter] = useState('all');

  // Mock data
  const campaignStats = {
    totalCampaigns: 58,
    activeCampaigns: 42,
    completedCampaigns: 16,
    avgROI: 247,
    budgetUtilization: 91,
    totalSpend: 125000,
    totalRevenue: 435000
  };

  const adTypePerformance = [
    { type: 'Banner Ads', effectiveness: 58, revenue: 252000, color: '#3b82f6' },
    { type: 'Interstitial Ads', effectiveness: 24, revenue: 104400, color: '#8b5cf6' },
    { type: 'Rewarded Video', effectiveness: 12, revenue: 52200, color: '#10b981' },
    { type: 'Native Ads', effectiveness: 6, revenue: 26100, color: '#f59e0b' }
  ];

  const campaignPerformance = [
    {
      key: 1,
      name: 'Q4 Brand Awareness',
      type: 'Banner',
      status: 'active',
      budget: 3500,
      spent: 3150,
      impressions: '2.4M',
      clicks: '48K',
      ctr: '2.0%',
      roi: '202%',
      startDate: '2025-10-01',
      endDate: '2025-12-31'
    },
    {
      key: 2,
      name: 'Holiday Promotion',
      type: 'Interstitial',
      status: 'active',
      budget: 2800,
      spent: 2540,
      impressions: '1.8M',
      clicks: '36K',
      ctr: '2.0%',
      roi: '187%',
      startDate: '2025-11-15',
      endDate: '2025-12-25'
    },
    {
      key: 3,
      name: 'Mobile App Launch',
      type: 'Rewarded Video',
      status: 'completed',
      budget: 4200,
      spent: 4200,
      impressions: '3.2M',
      clicks: '96K',
      ctr: '3.0%',
      roi: '312%',
      startDate: '2025-09-01',
      endDate: '2025-10-31'
    },
    {
      key: 4,
      name: 'Product Demo',
      type: 'Native',
      status: 'paused',
      budget: 1800,
      spent: 900,
      impressions: '650K',
      clicks: '13K',
      ctr: '2.0%',
      roi: '145%',
      startDate: '2025-11-01',
      endDate: '2025-11-30'
    }
  ];

  const topPerformers = [
    { name: 'Q4 Brand Awareness', roi: '202%', spend: '$3,150', revenue: '$9,513' },
    { name: 'Mobile App Launch', roi: '312%', spend: '$4,200', revenue: '$17,304' },
    { name: 'Holiday Promotion', roi: '187%', spend: '$2,540', revenue: '$7,290' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <PlayCircle className="text-green-500" size={16} />;
      case 'paused': return <PauseCircle className="text-orange-500" size={16} />;
      case 'completed': return <CheckCircle className="text-blue-500" size={16} />;
      default: return <AlertCircle className="text-gray-500" size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'green';
      case 'paused': return 'orange';
      case 'completed': return 'blue';
      default: return 'gray';
    }
  };

  const columns = [
    {
      title: 'Campaign',
      dataIndex: 'name',
      key: 'name',
      render: (name) => <span className="font-semibold">{name}</span>
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => <Tag color="blue">{type}</Tag>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Space>
          {getStatusIcon(status)}
          <Badge status={getStatusColor(status)} text={status.toUpperCase()} />
        </Space>
      )
    },
    {
      title: 'Budget',
      dataIndex: 'budget',
      key: 'budget',
      render: (budget) => `$${budget.toLocaleString()}`
    },
    {
      title: 'Spent',
      dataIndex: 'spent',
      key: 'spent',
      render: (spent) => `$${spent.toLocaleString()}`
    },
    {
      title: 'Impressions',
      dataIndex: 'impressions',
      key: 'impressions'
    },
    {
      title: 'CTR',
      dataIndex: 'ctr',
      key: 'ctr',
      render: (ctr) => <span className="font-semibold">{ctr}</span>
    },
    {
      title: 'ROI',
      dataIndex: 'roi',
      key: 'roi',
      render: (roi) => <Tag color="green">{roi}</Tag>
    },
    {
      title: 'Period',
      key: 'period',
      render: (record) => (
        <div className="text-xs text-gray-500">
          {record.startDate} to {record.endDate}
        </div>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button type="text" icon={<Eye size={16} />} size="small" />
          </Tooltip>
          <Tooltip title="Download Report">
            <Button type="text" icon={<Download size={16} />} size="small" />
          </Tooltip>
        </Space>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Megaphone className="mr-3 text-purple-600" size={32} />
                Campaign Reports & Analytics
              </h1>
              <p className="text-gray-600 mt-2">
                Track campaign performance, ROI, and advertising effectiveness
              </p>
            </div>
            <Space className="mt-4 lg:mt-0">
              <RangePicker onChange={setDateRange} />
              <Button type="primary" icon={<Download size={16} />}>
                Export Report
              </Button>
            </Space>
          </div>
        </div>

        {/* Key Metrics */}
        <Row gutter={16} className="mb-6">
          <Col xs={24} sm={12} lg={4}>
            <Card className="text-center h-full">
              <Statistic
                title="Total Campaigns"
                value={campaignStats.totalCampaigns}
                prefix={<Megaphone className="text-purple-500" size={20} />}
                valueStyle={{ color: '#8b5cf6' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={4}>
            <Card className="text-center h-full">
              <Statistic
                title="Active"
                value={campaignStats.activeCampaigns}
                prefix={<PlayCircle className="text-green-500" size={20} />}
                valueStyle={{ color: '#10b981' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={4}>
            <Card className="text-center h-full">
              <Statistic
                title="Avg. ROI"
                value={campaignStats.avgROI}
                suffix="%"
                prefix={<TrendingUp className="text-blue-500" size={20} />}
                valueStyle={{ color: '#3b82f6' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={4}>
            <Card className="text-center h-full">
              <Statistic
                title="Budget Used"
                value={campaignStats.budgetUtilization}
                suffix="%"
                prefix={<PieChart className="text-orange-500" size={20} />}
                valueStyle={{ color: '#f59e0b' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={4}>
            <Card className="text-center h-full">
              <Statistic
                title="Total Spend"
                value={campaignStats.totalSpend}
                prefix={<DollarSign className="text-red-500" size={20} />}
                valueStyle={{ color: '#ef4444' }}
                formatter={value => `$${(value / 1000).toFixed(0)}K`}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={4}>
            <Card className="text-center h-full">
              <Statistic
                title="Revenue"
                value={campaignStats.totalRevenue}
                prefix={<DollarSign className="text-green-500" size={20} />}
                valueStyle={{ color: '#10b981' }}
                formatter={value => `$${(value / 1000).toFixed(0)}K`}
              />
            </Card>
          </Col>
        </Row>

        {/* Ad Type Effectiveness and Top Performers */}
        <Row gutter={16} className="mb-6">
          <Col xs={24} lg={12}>
            <Card 
              title={
                <span className="flex items-center">
                  <BarChart3 size={18} className="mr-2" />
                  Ad Type Effectiveness
                </span>
              }
            >
              <div className="space-y-4">
                {adTypePerformance.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{item.type}</span>
                      <div className="text-right">
                        <div className="font-semibold">{item.effectiveness}%</div>
                        <div className="text-xs text-gray-500">
                          ${(item.revenue / 1000).toFixed(0)}K revenue
                        </div>
                      </div>
                    </div>
                    <Progress
                      percent={item.effectiveness}
                      strokeColor={item.color}
                      showInfo={false}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card 
              title={
                <span className="flex items-center">
                  <Target size={18} className="mr-2" />
                  Top Performing Campaigns
                </span>
              }
            >
              <div className="space-y-4">
                {topPerformers.map((campaign, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold">{campaign.name}</div>
                      <div className="text-sm text-gray-600">
                        Spend: {campaign.spend} • Revenue: {campaign.revenue}
                      </div>
                    </div>
                    <Tag color="green" className="text-lg font-bold">
                      {campaign.roi}
                    </Tag>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>

        {/* Campaign Performance */}
        <Card 
          title={
            <span className="flex items-center">
              <TrendingUp size={18} className="mr-2" />
              Campaign Performance Summary
            </span>
          }
          extra={
            <Space>
              <Select 
                value={campaignFilter}
                onChange={setCampaignFilter}
                style={{ width: 120 }}
                suffixIcon={<Filter size={16} />}
              >
                <Option value="all">All Status</Option>
                <Option value="active">Active</Option>
                <Option value="paused">Paused</Option>
                <Option value="completed">Completed</Option>
              </Select>
              <Button icon={<Download size={16} />}>
                Export
              </Button>
            </Space>
          }
        >
          <Table
            columns={columns}
            dataSource={campaignPerformance.filter(campaign => 
              campaignFilter === 'all' || campaign.status === campaignFilter
            )}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 1200 }}
          />
        </Card>
      </div>
    </div>
  );
};

export default CampaignReportsPage;