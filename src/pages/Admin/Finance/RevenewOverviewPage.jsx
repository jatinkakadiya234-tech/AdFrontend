import React from 'react';
import {
  Card, Row, Col, Statistic, Progress, Table, Button,
  Select, DatePicker, Space, Tag, Tooltip
} from 'antd';
import {
  DollarSign, Wallet, BarChart3, PieChart, TrendingUp,
  Download, Calendar, Filter, Eye, MoreVertical
} from 'lucide-react';

const { Option } = Select;
const { RangePicker } = DatePicker;

const RevenueOverviewPage = () => {
  // Mock data
  const stats = {
    commission: 41230,
    revenue: 149500,
    growth: 12.5,
    previousRevenue: 132800
  };

  const adTypeRevenue = [
    { type: 'Banner Ads', value: 70465, percentage: 70, color: '#3b82f6' },
    { type: 'Interstitial Ads', value: 17115, percentage: 17, color: '#10b981' },
    { type: 'Rewarded Video', value: 8056, percentage: 8, color: '#f59e0b' },
    { type: 'URL Shortener', value: 5025, percentage: 5, color: '#ef4444' }
  ];

  const geoRevenue = [
    { country: 'United States', value: 60000, percentage: 40, flag: '🇺🇸' },
    { country: 'India', value: 45000, percentage: 30, flag: '🇮🇳' },
    { country: 'United Kingdom', value: 18000, percentage: 12, flag: '🇬🇧' },
    { country: 'Germany', value: 12500, percentage: 8, flag: '🇩🇪' },
    { country: 'Others', value: 14000, percentage: 10, flag: '🌍' }
  ];

  const recentTransactions = [
    {
      key: 1,
      date: '2025-11-20',
      type: 'Ad Revenue',
      publisher: 'TechCorp Ltd',
      adType: 'Banner',
      amount: 2200,
      status: 'completed'
    },
    {
      key: 2,
      date: '2025-11-19',
      type: 'Ad Revenue',
      publisher: 'GamePortal Inc',
      adType: 'Interstitial',
      amount: 1500,
      status: 'completed'
    },
    {
      key: 3,
      date: '2025-11-18',
      type: 'Commission',
      publisher: 'NewsDaily Media',
      adType: 'Rewarded',
      amount: 850,
      status: 'completed'
    }
  ];

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => (
        <Space>
          <Calendar size={14} className="text-gray-400" />
          {date}
        </Space>
      )
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => <Tag color="blue">{type}</Tag>
    },
    {
      title: 'Publisher',
      dataIndex: 'publisher',
      key: 'publisher'
    },
    {
      title: 'Ad Type',
      dataIndex: 'adType',
      key: 'adType',
      render: (adType) => <Tag color="cyan">{adType}</Tag>
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => (
        <span className="text-green-600 font-semibold">
          +${amount.toLocaleString()}
        </span>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'completed' ? 'green' : 'orange'}>
          {status.toUpperCase()}
        </Tag>
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
                <DollarSign className="mr-3 text-green-600" size={32} />
                Revenue Overview
              </h1>
              <p className="text-gray-600 mt-2">
                Monitor your earnings, revenue streams, and financial performance
              </p>
            </div>
            <Space className="mt-4 lg:mt-0">
              <RangePicker />
              <Select defaultValue="all" style={{ width: 120 }}>
                <Option value="all">All Types</Option>
                <Option value="banner">Banner</Option>
                <Option value="interstitial">Interstitial</Option>
                <Option value="rewarded">Rewarded</Option>
              </Select>
              <Button type="primary" icon={<Download size={16} />}>
                Export Report
              </Button>
            </Space>
          </div>
        </div>

        {/* Key Metrics */}
        <Row gutter={16} className="mb-6">
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center h-full">
              <Statistic
                title="Total Commission"
                value={stats.commission}
                prefix={<Wallet className="text-blue-500" size={20} />}
                valueStyle={{ color: '#3b82f6' }}
                formatter={value => `$${value.toLocaleString()}`}
              />
              <div className="text-sm text-green-600 mt-2">
                <TrendingUp size={14} className="inline mr-1" />
                8.2% from last month
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center h-full">
              <Statistic
                title="Total Revenue"
                value={stats.revenue}
                prefix={<DollarSign className="text-green-500" size={20} />}
                valueStyle={{ color: '#10b981' }}
                formatter={value => `$${value.toLocaleString()}`}
              />
              <div className="text-sm text-green-600 mt-2">
                <TrendingUp size={14} className="inline mr-1" />
                12.5% from last month
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center h-full">
              <Statistic
                title="Top Performing"
                value="Banner Ads"
                prefix={<BarChart3 className="text-purple-500" size={20} />}
                valueStyle={{ color: '#8b5cf6' }}
              />
              <div className="text-sm text-gray-600 mt-2">
                70% of total revenue
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center h-full">
              <Statistic
                title="Top Region"
                value="United States"
                prefix={<PieChart className="text-orange-500" size={20} />}
                valueStyle={{ color: '#f59e0b' }}
              />
              <div className="text-sm text-gray-600 mt-2">
                40% of total revenue
              </div>
            </Card>
          </Col>
        </Row>

        {/* Revenue Breakdown */}
        <Row gutter={16} className="mb-6">
          <Col xs={24} lg={12}>
            <Card 
              title={
                <span className="flex items-center">
                  <BarChart3 size={18} className="mr-2" />
                  Revenue by Ad Type
                </span>
              }
              extra={
                <Tooltip title="View detailed breakdown">
                  <Button type="text" icon={<Eye size={16} />} />
                </Tooltip>
              }
            >
              <div className="space-y-4">
                {adTypeRevenue.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-medium">{item.type}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Progress
                        percent={item.percentage}
                        strokeColor={item.color}
                        style={{ width: 120 }}
                        size="small"
                        showInfo={false}
                      />
                      <div className="text-right min-w-[80px]">
                        <div className="font-semibold">${item.value.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">{item.percentage}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card 
              title={
                <span className="flex items-center">
                  <PieChart size={18} className="mr-2" />
                  Revenue by Geography
                </span>
              }
              extra={
                <Tooltip title="View detailed breakdown">
                  <Button type="text" icon={<Eye size={16} />} />
                </Tooltip>
              }
            >
              <div className="space-y-4">
                {geoRevenue.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{item.flag}</span>
                      <span className="font-medium">{item.country}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Progress
                        percent={item.percentage}
                        strokeColor={index === 0 ? '#3b82f6' : index === 1 ? '#10b981' : index === 2 ? '#f59e0b' : '#8b5cf6'}
                        style={{ width: 120 }}
                        size="small"
                        showInfo={false}
                      />
                      <div className="text-right min-w-[80px]">
                        <div className="font-semibold">${item.value.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">{item.percentage}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>

        {/* Recent Transactions */}
        <Card
          title={
            <span className="flex items-center">
              <TrendingUp size={18} className="mr-2" />
              Recent Revenue Transactions
            </span>
          }
          extra={
            <Space>
              <Select defaultValue="all" size="small">
                <Option value="all">All Status</Option>
                <Option value="completed">Completed</Option>
                <Option value="pending">Pending</Option>
              </Select>
              <Button size="small" icon={<Filter size={14} />}>
                Filter
              </Button>
            </Space>
          }
        >
          <Table
            columns={columns}
            dataSource={recentTransactions}
            pagination={{ pageSize: 5 }}
            size="middle"
            scroll={{ x: 800 }}
          />
        </Card>
      </div>
    </div>
  );
};

export default RevenueOverviewPage;