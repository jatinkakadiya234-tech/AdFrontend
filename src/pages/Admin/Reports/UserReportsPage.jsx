import React, { useState } from 'react';
import {
  Card, Row, Col, Statistic, Table, Progress, DatePicker,
  Select, Button, Space, Tag, Divider, List, Avatar, Tooltip
} from 'antd';
import {
  Users, UserCheck, TrendingUp, Download, Filter,
  BarChart3, PieChart, MapPin, Calendar, Clock,
  Mail, Phone, Globe
} from 'lucide-react';

const { Option } = Select;
const { RangePicker } = DatePicker;

const UserReportsPage = () => {
  const [dateRange, setDateRange] = useState(null);

  // Mock data
  const userStats = {
    totalUsers: 12540,
    publishers: 3240,
    viewers: 9300,
    publisherGrowth: 8.2,
    viewerGrowth: 11.5,
    retentionRate: 81,
    activeUsers: 8940
  };

  const demographics = {
    gender: [
      { label: 'Male', value: 68, color: '#3b82f6' },
      { label: 'Female', value: 32, color: '#ec4899' },
      { label: 'Other', value: 2, color: '#8b5cf6' }
    ],
    ageGroups: [
      { range: '18-24', percentage: 32, count: 4013 },
      { range: '25-34', percentage: 39, count: 4891 },
      { range: '35-44', percentage: 18, count: 2257 },
      { range: '45-54', percentage: 8, count: 1003 },
      { range: '55+', percentage: 3, count: 376 }
    ],
    topCountries: [
      { country: 'United States', users: 3240, percentage: 26 },
      { country: 'India', users: 2180, percentage: 17 },
      { country: 'United Kingdom', users: 1560, percentage: 12 },
      { country: 'Germany', users: 1120, percentage: 9 },
      { country: 'Canada', users: 890, percentage: 7 }
    ]
  };

  const retentionData = [
    { month: 'January', cohortSize: 420, m1: '82%', m3: '58%', m6: '32%' },
    { month: 'February', cohortSize: 480, m1: '85%', m3: '61%', m6: '35%' },
    { month: 'March', cohortSize: 520, m1: '83%', m3: '59%', m6: '33%' },
    { month: 'April', cohortSize: 450, m1: '80%', m3: '54%', m6: '28%' },
    { month: 'May', cohortSize: 510, m1: '84%', m3: '57%', m6: '31%' },
    { month: 'June', cohortSize: 490, m1: '81%', m3: '55%', m6: '29%' },
    { month: 'July', cohortSize: 530, m1: '86%', m3: '62%', m6: '36%' }
  ];

  const recentSignups = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@techcorp.com',
      type: 'Publisher',
      date: '2025-11-23',
      country: 'United States',
      status: 'active'
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike@newsportal.com',
      type: 'Viewer',
      date: '2025-11-22',
      country: 'Canada',
      status: 'active'
    },
    {
      id: 3,
      name: 'Emma Davis',
      email: 'emma@streamhub.com',
      type: 'Publisher',
      date: '2025-11-21',
      country: 'United Kingdom',
      status: 'pending'
    }
  ];

  const retentionColumns = [
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month',
      render: (month) => (
        <Space>
          <Calendar size={14} className="text-gray-400" />
          {month}
        </Space>
      )
    },
    {
      title: 'Cohort Size',
      dataIndex: 'cohortSize',
      key: 'cohortSize',
      render: (size) => <span className="font-semibold">{size.toLocaleString()}</span>
    },
    {
      title: '1 Month',
      dataIndex: 'm1',
      key: 'm1',
      render: (value) => <Tag color="green">{value}</Tag>
    },
    {
      title: '3 Months',
      dataIndex: 'm3',
      key: 'm3',
      render: (value) => <Tag color="blue">{value}</Tag>
    },
    {
      title: '6 Months',
      dataIndex: 'm6',
      key: 'm6',
      render: (value) => <Tag color="orange">{value}</Tag>
    }
  ];

  const userColumns = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <Space>
          <Avatar size="small" style={{ backgroundColor: '#3b82f6' }}>
            {name.charAt(0)}
          </Avatar>
          <div>
            <div className="font-medium">{name}</div>
            <div className="text-xs text-gray-500">{record.email}</div>
          </div>
        </Space>
      )
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === 'Publisher' ? 'blue' : 'green'}>
          {type}
        </Tag>
      )
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      render: (country) => (
        <Space>
          <Globe size={14} className="text-gray-400" />
          {country}
        </Space>
      )
    },
    {
      title: 'Signup Date',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'orange'}>
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
                <Users className="mr-3 text-blue-600" size={32} />
                User Reports & Analytics
              </h1>
              <p className="text-gray-600 mt-2">
                Comprehensive insights into user growth, demographics, and retention metrics
              </p>
            </div>
            <Space className="mt-4 lg:mt-0">
              <RangePicker onChange={setDateRange} />
              <Button icon={<Download size={16} />}>
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
                title="Total Users"
                value={userStats.totalUsers}
                prefix={<Users className="text-blue-500" size={20} />}
                valueStyle={{ color: '#3b82f6' }}
              />
              <div className="text-sm text-gray-600 mt-2">
                {userStats.publishers.toLocaleString()} Publishers • {userStats.viewers.toLocaleString()} Viewers
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center h-full">
              <Statistic
                title="Publisher Growth"
                value={userStats.publisherGrowth}
                suffix="%"
                prefix={<TrendingUp className="text-green-500" size={20} />}
                valueStyle={{ color: '#10b981' }}
              />
              <div className="text-sm text-green-600 mt-2">
                +2.4% from last month
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center h-full">
              <Statistic
                title="Viewer Growth"
                value={userStats.viewerGrowth}
                suffix="%"
                prefix={<TrendingUp className="text-purple-500" size={20} />}
                valueStyle={{ color: '#8b5cf6' }}
              />
              <div className="text-sm text-green-600 mt-2">
                +3.1% from last month
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="text-center h-full">
              <Statistic
                title="User Retention"
                value={userStats.retentionRate}
                suffix="%"
                prefix={<UserCheck className="text-orange-500" size={20} />}
                valueStyle={{ color: '#f59e0b' }}
              />
              <div className="text-sm text-gray-600 mt-2">
                Active users: {userStats.activeUsers.toLocaleString()}
              </div>
            </Card>
          </Col>
        </Row>

        {/* Demographics and Geography */}
        <Row gutter={16} className="mb-6">
          <Col xs={24} lg={8}>
            <Card 
              title={
                <span className="flex items-center">
                  <PieChart size={18} className="mr-2" />
                  Gender Distribution
                </span>
              }
            >
              <div className="space-y-4">
                {demographics.gender.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{item.label}</span>
                      <span className="font-semibold">{item.value}%</span>
                    </div>
                    <Progress
                      percent={item.value}
                      strokeColor={item.color}
                      showInfo={false}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card 
              title={
                <span className="flex items-center">
                  <BarChart3 size={18} className="mr-2" />
                  Age Groups
                </span>
              }
            >
              <div className="space-y-3">
                {demographics.ageGroups.map((group, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium">{group.range}</span>
                    <div className="text-right">
                      <div className="font-semibold">{group.percentage}%</div>
                      <div className="text-xs text-gray-500">{group.count.toLocaleString()} users</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card 
              title={
                <span className="flex items-center">
                  <MapPin size={18} className="mr-2" />
                  Top Countries
                </span>
              }
            >
              <div className="space-y-3">
                {demographics.topCountries.map((country, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium">{country.country}</span>
                    <div className="text-right">
                      <div className="font-semibold">{country.users.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{country.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>

        {/* Retention Metrics */}
        <Card 
          title={
            <span className="flex items-center">
              <UserCheck size={18} className="mr-2" />
              User Retention Metrics
            </span>
          }
          className="mb-6"
          extra={
            <Select defaultValue="6months" style={{ width: 120 }}>
              <Option value="3months">3 Months</Option>
              <Option value="6months">6 Months</Option>
              <Option value="12months">12 Months</Option>
            </Select>
          }
        >
          <Table
            columns={retentionColumns}
            dataSource={retentionData}
            pagination={false}
            scroll={{ x: 800 }}
          />
        </Card>

        {/* Recent Signups */}
        <Card
          title={
            <span className="flex items-center">
              <Users size={18} className="mr-2" />
              Recent User Signups
            </span>
          }
          extra={
            <Button type="link">View All</Button>
          }
        >
          <Table
            columns={userColumns}
            dataSource={recentSignups}
            pagination={false}
            size="middle"
          />
        </Card>
      </div>
    </div>
  );
};

export default UserReportsPage;