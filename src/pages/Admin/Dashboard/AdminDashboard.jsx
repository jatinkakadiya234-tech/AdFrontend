import React, { useState, useEffect } from 'react';
import { Card, Table, Badge, Progress, Avatar, Statistic, Timeline, Empty, Tag } from 'antd';
import {
  DollarSign,
  Users,
  Eye,
  Clock,
  Megaphone,
  BarChart3,
  MousePointer,
  Activity,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  UserCheck,
  Globe,
  AlertCircle,
  CreditCard,
  UserPlus,
  FileText,
  Shield,
  CheckCircle,
  XCircle,
  ChevronRight,
  Search,
  Filter,
  Download,
  MoreVertical
} from 'lucide-react';
import {
  FaChartLine,
  FaChartArea,
  FaChartPie,
  FaBolt,
  FaStream,
  FaHistory
} from 'react-icons/fa';

// Mock Data Generator
const generateMockData = () => ({
  metrics: {
    totalRevenue: 245678.50,
    revenueChange: 12.5,
    activePublishers: 1247,
    publishersChange: 8.2,
    activeViewers: 3856,
    viewersChange: 15.3,
    pendingApprovals: 23,
    activeCampaigns: 342,
    campaignsChange: 5.7,
    impressionsToday: 1245789,
    impressionsChange: 22.1,
    totalClicks: 456789,
    clicksChange: 18.9,
    healthScore: 98.5
  },
  quickActions: [
    { id: 1, title: 'Pending Publisher KYC', count: 12, icon: UserCheck, color: 'blue', path: '/kyc-review' },
    { id: 2, title: 'Platform Approvals', count: 8, icon: Globe, color: 'green', path: '/platform-verification' },
    { id: 3, title: 'Campaign Approvals', count: 3, icon: Megaphone, color: 'purple', path: '/campaign-review' },
    { id: 4, title: 'Reported Issues', count: 5, icon: AlertCircle, color: 'red', path: '/issues' },
    { id: 5, title: 'Payment Requests', count: 15, icon: CreditCard, color: 'orange', path: '/payments' }
  ],
  activities: [
    { id: 1, type: 'signup', user: 'TechCorp Inc.', action: 'New publisher signup', time: '2 min ago', icon: UserPlus, color: 'blue' },
    { id: 2, type: 'campaign', user: 'Acme Marketing', action: 'Submitted campaign for review', time: '15 min ago', icon: Megaphone, color: 'purple' },
    { id: 3, type: 'platform', user: 'GameZone Portal', action: 'Platform registered', time: '32 min ago', icon: Globe, color: 'green' },
    { id: 4, type: 'alert', user: 'System', action: 'High traffic detected on viewer platform', time: '1 hour ago', icon: TrendingUp, color: 'cyan' },
    { id: 5, type: 'payment', user: 'MediaHub Network', action: 'Requested payout of $2,450', time: '2 hours ago', icon: DollarSign, color: 'orange' },
    { id: 6, type: 'approval', user: 'Admin', action: 'Approved campaign "Summer Sale"', time: '3 hours ago', icon: CheckCircle, color: 'green' },
    { id: 7, type: 'signup', user: 'Digital Dynamics', action: 'New viewer signup', time: '4 hours ago', icon: UserPlus, color: 'blue' },
    { id: 8, type: 'alert', user: 'System', action: 'Fraud detection alert', time: '5 hours ago', icon: Shield, color: 'red' }
  ],
  recentActivities: [
    { id: 1, description: 'Publisher KYC approved', user: 'TechVision Inc.', status: 'success', timestamp: '10:45 AM' },
    { id: 2, description: 'Campaign launched', user: 'Acme Corp', status: 'success', timestamp: '10:30 AM' },
    { id: 3, description: 'Viewer platform verified', user: 'GamePortal.com', status: 'success', timestamp: '10:15 AM' },
    { id: 4, description: 'Payment processed', user: 'MediaHub', status: 'success', timestamp: '09:50 AM' },
    { id: 5, description: 'Campaign rejected', user: 'StartupX', status: 'error', timestamp: '09:30 AM' },
    { id: 6, description: 'Publisher KYC pending', user: 'NewBiz LLC', status: 'warning', timestamp: '09:10 AM' },
    { id: 7, description: 'Viewer registered', user: 'NewsDaily.net', status: 'processing', timestamp: '08:45 AM' },
    { id: 8, description: 'Security alert resolved', user: 'System', status: 'success', timestamp: '08:20 AM' },
    { id: 9, description: 'Campaign budget updated', user: 'BrandCo', status: 'processing', timestamp: '07:55 AM' },
    { id: 10, description: 'Publisher suspended', user: 'SpamAds Inc.', status: 'error', timestamp: '07:30 AM' }
  ]
});

// Enhanced Metric Card Component
const MetricCard = ({ icon: Icon, title, value, change, changeType, iconBgColor, iconColor, suffix }) => {
  const isPositive = changeType === 'up';
  
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white rounded-2xl shadow-sm hover:shadow-lg">
      <div className="flex items-start justify-between p-1">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{ backgroundColor: iconBgColor }}
            >
              <Icon className="w-5 h-5" style={{ color: iconColor }} />
            </div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
          </div>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold text-gray-900">{value}{suffix}</h3>
            {change && (
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {isPositive ? 
                  <TrendingUp className="w-3 h-3" /> : 
                  <TrendingDown className="w-3 h-3" />
                }
                <span className="text-xs font-semibold">{change}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

// Enhanced Quick Action Card Component
const QuickActionCard = ({ title, count, icon: Icon, color, onClick }) => {
  const colorConfig = {
    blue: { 
      bg: 'bg-blue-50', 
      iconBg: 'bg-blue-100',
      text: 'text-blue-600', 
      badge: 'bg-blue-500',
      hover: 'hover:border-blue-300'
    },
    green: { 
      bg: 'bg-green-50', 
      iconBg: 'bg-green-100',
      text: 'text-green-600', 
      badge: 'bg-green-500',
      hover: 'hover:border-green-300'
    },
    purple: { 
      bg: 'bg-purple-50', 
      iconBg: 'bg-purple-100',
      text: 'text-purple-600', 
      badge: 'bg-purple-500',
      hover: 'hover:border-purple-300'
    },
    red: { 
      bg: 'bg-red-50', 
      iconBg: 'bg-red-100',
      text: 'text-red-600', 
      badge: 'bg-red-500',
      hover: 'hover:border-red-300'
    },
    orange: { 
      bg: 'bg-orange-50', 
      iconBg: 'bg-orange-100',
      text: 'text-orange-600', 
      badge: 'bg-orange-500',
      hover: 'hover:border-orange-300'
    }
  };

  const config = colorConfig[color] || colorConfig.blue;

  return (
    <Card 
      className={`group cursor-pointer border-2 border-transparent transition-all duration-300 hover:shadow-lg rounded-2xl ${config.hover}`}
      onClick={onClick}
      bodyStyle={{ padding: '20px' }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${config.iconBg}`}>
          <Icon className={`w-6 h-6 ${config.text}`} />
        </div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${config.badge}`}>
          {count}
        </div>
      </div>
      <h4 className="font-semibold text-gray-900 mb-3 text-base leading-tight">{title}</h4>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">View details</span>
        <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center">
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </div>
      </div>
    </Card>
  );
};

// Enhanced Activity Item Component
const ActivityItem = ({ activity }) => {
  const Icon = activity.icon;
  const colorConfig = {
    blue: { bg: 'bg-blue-50', icon: 'text-blue-600', dot: 'bg-blue-400' },
    green: { bg: 'bg-green-50', icon: 'text-green-600', dot: 'bg-green-400' },
    purple: { bg: 'bg-purple-50', icon: 'text-purple-600', dot: 'bg-purple-400' },
    cyan: { bg: 'bg-cyan-50', icon: 'text-cyan-600', dot: 'bg-cyan-400' },
    orange: { bg: 'bg-orange-50', icon: 'text-orange-600', dot: 'bg-orange-400' },
    red: { bg: 'bg-red-50', icon: 'text-red-600', dot: 'bg-red-400' }
  };

  const config = colorConfig[activity.color];

  return (
    <div className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-xl transition-all duration-200 group cursor-pointer">
      <div className="relative flex-shrink-0">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${config.bg}`}>
          <Icon className={`w-4 h-4 ${config.icon}`} />
        </div>
        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${config.dot}`}></div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 text-sm mb-1 truncate">{activity.user}</p>
        <p className="text-sm text-gray-600 mb-2 leading-relaxed">{activity.action}</p>
        <span className="text-xs text-gray-400 font-medium">{activity.time}</span>
      </div>
    </div>
  );
};

// Enhanced Chart Placeholder Component
const ChartPlaceholder = ({ title, icon: Icon, type, description }) => {
  const gradientConfig = {
    line: 'from-blue-500 to-cyan-500',
    area: 'from-green-500 to-emerald-500',
    pie: 'from-purple-500 to-pink-500'
  };

  return (
    <Card className="h-full border-0 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1 flex items-center gap-2">
            <Icon className="w-5 h-5 text-indigo-600" />
            {title}
          </h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <button className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center">
          <MoreVertical className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      <div className={`h-64 bg-gradient-to-br ${gradientConfig[type]} rounded-xl flex items-center justify-center relative overflow-hidden group`}>
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative z-10 text-center text-white">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <p className="font-semibold text-lg mb-1">{title}</p>
          <p className="text-sm opacity-90">Interactive chart visualization</p>
        </div>
      </div>
    </Card>
  );
};

// Main Dashboard Component
const AdminDashboard = () => {
  const [data, setData] = useState(generateMockData());
  const [loading, setLoading] = useState(false);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  // Enhanced Table columns configuration
  const columns = [
    {
      title: 'Activity Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => (
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <span className="font-medium text-gray-900">{text}</span>
        </div>
      )
    },
    {
      title: 'User/Entity',
      dataIndex: 'user',
      key: 'user',
      render: (text) => <span className="text-gray-600 font-medium">{text}</span>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusConfig = {
          success: { color: 'green', text: 'Completed' },
          error: { color: 'red', text: 'Failed' },
          warning: { color: 'orange', text: 'Pending' },
          processing: { color: 'blue', text: 'In Progress' }
        };
        const config = statusConfig[status];
        return (
          <Tag color={config.color} className="rounded-full px-3 py-1 font-medium">
            {config.text}
          </Tag>
        );
      }
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (text) => (
        <div className="text-right">
          <span className="text-gray-500 text-sm font-medium">{text}</span>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/20 p-4 md:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Dashboard Overview
            </h1>
            <p className="text-gray-600 text-base md:text-lg">
              Welcome back! Here's what's happening with your ad platform today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="p-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200">
              <Filter className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200">
              <Download className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid - Primary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <MetricCard
          icon={DollarSign}
          title="Total Revenue"
          value={formatCurrency(data.metrics.totalRevenue)}
          change={data.metrics.revenueChange}
          changeType="up"
          iconBgColor="#f0f9ff"
          iconColor="#0ea5e9"
        />
        <MetricCard
          icon={Users}
          title="Active Publishers"
          value={formatNumber(data.metrics.activePublishers)}
          change={data.metrics.publishersChange}
          changeType="up"
          iconBgColor="#f0fdf4"
          iconColor="#22c55e"
        />
        <MetricCard
          icon={Eye}
          title="Active Viewers"
          value={formatNumber(data.metrics.activeViewers)}
          change={data.metrics.viewersChange}
          changeType="up"
          iconBgColor="#faf5ff"
          iconColor="#a855f7"
        />
        <MetricCard
          icon={Clock}
          title="Pending Approvals"
          value={data.metrics.pendingApprovals}
          iconBgColor="#fffbeb"
          iconColor="#f59e0b"
        />
      </div>

      {/* Key Metrics Grid - Secondary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <MetricCard
          icon={Megaphone}
          title="Active Campaigns"
          value={formatNumber(data.metrics.activeCampaigns)}
          change={data.metrics.campaignsChange}
          changeType="up"
          iconBgColor="#fdf2f8"
          iconColor="#ec4899"
        />
        <MetricCard
          icon={BarChart3}
          title="Impressions Today"
          value={formatNumber(data.metrics.impressionsToday)}
          change={data.metrics.impressionsChange}
          changeType="up"
          iconBgColor="#ecfeff"
          iconColor="#06b6d4"
        />
        <MetricCard
          icon={MousePointer}
          title="Total Clicks"
          value={formatNumber(data.metrics.totalClicks)}
          change={data.metrics.clicksChange}
          changeType="up"
          iconBgColor="#fefce8"
          iconColor="#eab308"
        />
        <MetricCard
          icon={Activity}
          title="Platform Health"
          value={data.metrics.healthScore}
          suffix="%"
          iconBgColor="#f0fdf4"
          iconColor="#10b981"
        />
      </div>

      {/* Quick Actions Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
              <FaBolt className="text-yellow-600 text-lg" />
            </div>
            Quick Actions
            <span className="text-sm text-gray-500 font-normal">({data.quickActions.length} items)</span>
          </h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
            View all
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {data.quickActions.map(action => (
            <QuickActionCard
              key={action.id}
              {...action}
              onClick={() => console.log(`Navigate to ${action.path}`)}
            />
          ))}
        </div>
      </div>

      {/* Charts and Activity Feed Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Charts Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          <ChartPlaceholder 
            title="Revenue Trends" 
            icon={FaChartLine} 
            type="line" 
            description="Monthly revenue performance and projections"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartPlaceholder 
              title="User Growth" 
              icon={FaChartArea} 
              type="area" 
              description="Publisher and viewer growth trends"
            />
            <ChartPlaceholder 
              title="Ad Type Distribution" 
              icon={FaChartPie} 
              type="pie" 
              description="Breakdown of ad types and performance"
            />
          </div>
        </div>

        {/* Activity Feed Column - 1/3 width */}
        <div className="lg:col-span-1">
          <Card className="h-full border-0 bg-white rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FaStream className="text-blue-600 text-lg" />
                </div>
                Real-time Activity
              </h3>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="max-h-[600px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {data.activities.map(activity => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Activities Table */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <FaHistory className="text-purple-600 text-lg" />
            </div>
            Recent Activities
            <span className="text-sm text-gray-500 font-normal">({data.recentActivities.length} records)</span>
          </h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
            Export report
            <Download className="w-4 h-4" />
          </button>
        </div>
        <Card className="border-0 bg-white rounded-2xl shadow-sm overflow-hidden">
          <Table
            columns={columns}
            dataSource={data.recentActivities}
            pagination={{
              pageSize: 8,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} of ${total} items`
            }}
            rowKey="id"
            className="custom-table"
            rowClassName="hover:bg-gray-50 transition-colors duration-200"
          />
        </Card>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        .custom-table .ant-table-thead > tr > th {
          background-color: #f8fafc;
          font-weight: 600;
          color: #475569;
          font-size: 0.875rem;
          padding: 16px 12px;
          border-bottom: 2px solid #e2e8f0;
        }

        .custom-table .ant-table-tbody > tr > td {
          padding: 16px 12px;
          border-bottom: 1px solid #f1f5f9;
          transition: all 0.2s ease;
        }

        .custom-table .ant-table-tbody > tr:hover > td {
          background-color: #f8fafc;
        }

        .custom-table .ant-pagination-item {
          border-radius: 10px;
          border: 1px solid #e2e8f0;
        }

        .custom-table .ant-pagination-item-active {
          border-color: #3b82f6;
          background: #3b82f6;
        }

        .custom-table .ant-pagination-item-active a {
          color: white;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;