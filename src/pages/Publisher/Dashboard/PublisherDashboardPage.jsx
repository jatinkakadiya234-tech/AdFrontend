import React, { useState } from 'react';
import { Layout, Badge, Button, Select, Dropdown, Avatar } from 'antd';
import {
  DollarSign,
  Eye,
  MousePointer,
  Activity,
  Clock,
  Target,
  TrendingUp,
  TrendingDown,
  Plus,
  BarChart3,
  CreditCard,
  Menu,
  Bell,
  Settings,
  User,
  ChevronDown,
} from 'lucide-react';
import { FaCheckCircle, FaPause, FaClock } from 'react-icons/fa';
import MetricCard from './MetricCard';
import EarningsChart from './EarningsChart';
import AdPerformanceChart from './AdPerformanceChart';
import TopCampaignsTable from './TopCampaignsTable';
import RecentActivity from './RecentActivity';

const { Header, Sider, Content } = Layout;
const { Option } = Select;

const PublisherDashboardPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [earningsPeriod, setEarningsPeriod] = useState('30');

  // Mock Data
  const publisherData = {
    name: 'John Smith',
    email: 'john.smith@example.com',
    status: 'Active',
    earnings: {
      total: 4520.75,
      change: 15,
      pending: 1250.50,
      nextPayout: 'Dec 1, 2025',
    },
    impressions: {
      total: 2847250,
      change: 8,
    },
    clicks: {
      total: 45680,
      ctr: 1.61,
      change: 12,
    },
    campaigns: {
      total: 12,
      live: 8,
      paused: 2,
      pending: 2,
    },
    metrics: {
      cpm: 3.25,
      cpc: 0.15,
    },
  };

  const menuItems = [
    { key: '1', icon: <Activity className="w-5 h-5" />, label: 'Dashboard', active: true },
    { key: '2', icon: <Target className="w-5 h-5" />, label: 'Campaigns' },
    { key: '3', icon: <BarChart3 className="w-5 h-5" />, label: 'Reports' },
    { key: '4', icon: <CreditCard className="w-5 h-5" />, label: 'Payments' },
    { key: '5', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  ];

  const userMenuItems = [
    { key: '1', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { key: '2', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
    { key: '3', label: 'Logout', icon: <TrendingDown className="w-4 h-4" /> },
  ];

  return (
    <Layout className="min-h-screen">
        <Content className="p-6 bg-gray-50">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome back, {publisherData.name}! 👋
                </h2>
                <p className="text-gray-600">Here's what's happening with your campaigns today.</p>
              </div>
              <div className="flex items-center gap-2">
                {publisherData.status === 'Active' && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 border border-green-300 rounded-full font-semibold">
                    <FaCheckCircle className="w-4 h-4" />
                    Active
                  </span>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                type="primary"
                size="large"
                icon={<Plus className="w-5 h-5" />}
                className="h-12 bg-gradient-to-r from-purple-600 to-purple-700 border-0 font-semibold hover:shadow-lg"
              >
                Create Campaign
              </Button>
              <Button
                size="large"
                icon={<BarChart3 className="w-5 h-5" />}
                className="h-12 font-semibold"
              >
                View Reports
              </Button>
              <Button
                size="large"
                icon={<CreditCard className="w-5 h-5" />}
                className="h-12 font-semibold"
              >
                Request Payment
              </Button>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <MetricCard
              title="Total Earnings (This Month)"
              value={`$${publisherData.earnings.total.toLocaleString()}`}
              change={publisherData.earnings.change}
              icon={DollarSign}
              trend="up"
              chartData={[980, 1200, 1150, 1380]}
              chartType="line"
            />
            <MetricCard
              title="Total Impressions (This Month)"
              value={publisherData.impressions.total.toLocaleString()}
              change={publisherData.impressions.change}
              icon={Eye}
              trend="up"
              chartData={[620000, 705000, 698000, 824250]}
              chartType="bar"
            />
            <MetricCard
              title="Total Clicks (This Month)"
              value={publisherData.clicks.total.toLocaleString()}
              change={publisherData.clicks.change}
              icon={MousePointer}
              trend="up"
              subValue={`CTR: ${publisherData.clicks.ctr}%`}
            />
            <MetricCard
              title="Active Campaigns"
              value={publisherData.campaigns.total.toString()}
              icon={Activity}
              subValue={`${publisherData.campaigns.live} Live • ${publisherData.campaigns.paused} Paused • ${publisherData.campaigns.pending} Pending`}
            />
            <MetricCard
              title="Pending Earnings"
              value={`$${publisherData.earnings.pending.toLocaleString()}`}
              icon={Clock}
              subValue={`Next payout: ${publisherData.earnings.nextPayout}`}
            />
            <MetricCard
              title="Average CPM / CPC"
              value={`$${publisherData.metrics.cpm} / $${publisherData.metrics.cpc}`}
              icon={Target}
            />
          </div>

          {/* Campaign Status Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <p className="text-sm font-medium text-gray-600 mb-2">CTR</p>
              <p className="text-2xl font-bold text-gray-900">{publisherData.clicks.ctr}%</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <p className="text-sm font-medium text-gray-600 mb-2">Live Campaigns</p>
              <p className="text-2xl font-bold text-green-600">{publisherData.campaigns.live}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <p className="text-sm font-medium text-gray-600 mb-2">Paused</p>
              <p className="text-2xl font-bold text-yellow-600">{publisherData.campaigns.paused}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <p className="text-sm font-medium text-gray-600 mb-2">Pending</p>
              <p className="text-2xl font-bold text-blue-600">{publisherData.campaigns.pending}</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Earnings Overview</h3>
                <Select
                  value={earningsPeriod}
                  onChange={setEarningsPeriod}
                  className="w-40"
                >
                  <Option value="7">Last 7 days</Option>
                  <Option value="30">Last 30 days</Option>
                  <Option value="90">Last 90 days</Option>
                  <Option value="365">Last 12 months</Option>
                </Select>
              </div>
              <EarningsChart period={earningsPeriod} />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Ad Performance by Type</h3>
              <AdPerformanceChart />
            </div>
          </div>

          {/* Tables and Activity Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <TopCampaignsTable />
            </div>
            <div>
              <RecentActivity />
            </div>
          </div>

          {/* Next Payout Banner */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-lg p-6 text-white">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-2">Next Payout</h3>
                <p className="text-purple-100">
                  Your next payment of <span className="font-bold text-white">${publisherData.earnings.pending.toLocaleString()}</span> is scheduled for {publisherData.earnings.nextPayout}
                </p>
              </div>
              <Button
                size="large"
                className="bg-white text-purple-600 border-0 font-semibold hover:shadow-lg"
              >
                View Details
              </Button>
            </div>
          </div>
        </Content>
    
    </Layout>
  );
};

export default PublisherDashboardPage;
