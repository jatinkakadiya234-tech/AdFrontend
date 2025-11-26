import React, { useState } from 'react';
import {
  DatePicker,
  Select,
  Button,
  Tabs,
  Card,
  Statistic,
  Table,
  Switch,
  Dropdown,
  Tag,
  Input,
  Empty,
  Progress,
  Radio,
} from 'antd';
import {
  Download,
  FileText,
  Mail,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Eye,
  MousePointer,
  Target,
  Activity,
  BarChart3,
  PieChart,
  Clock,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Minus,
  Search,
  Filter,
} from 'lucide-react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const { RangePicker } = DatePicker;
const { Option } = Select;

const ReportsAnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [datePreset, setDatePreset] = useState('last30days');
  const [compareEnabled, setCompareEnabled] = useState(false);
  const [chartTimeframe, setChartTimeframe] = useState('daily');

  // Mock Data
  const overviewMetrics = {
    totalEarnings: { value: 5230.5, change: 15.3, trend: 'up', previous: 4530.2 },
    totalImpressions: { value: 1847250, change: 12.8, trend: 'up', previous: 1637520 },
    totalClicks: { value: 72000, change: 18.5, trend: 'up', previous: 60760 },
    ctr: { value: 3.9, change: 5.1, trend: 'up', previous: 3.71 },
    cpm: { value: 2.83, change: 2.2, trend: 'up', previous: 2.77 },
    cpc: { value: 0.073, change: -2.7, trend: 'down', previous: 0.075 },
    fillRate: { value: 87.5, change: 3.2, trend: 'up', previous: 84.8 },
    viewabilityRate: { value: 92.3, change: 1.8, trend: 'up', previous: 90.6 },
  };

  const earningsChartData = {
    labels: ['May 1', 'May 8', 'May 15', 'May 22', 'May 29'],
    datasets: [
      {
        label: 'Current Period',
        data: [780, 920, 1150, 1380, 1000],
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
      ...(compareEnabled
        ? [
            {
              label: 'Previous Period',
              data: [680, 820, 950, 1180, 900],
              borderColor: '#d1d5db',
              backgroundColor: 'rgba(209, 213, 219, 0.1)',
              fill: true,
              tension: 0.4,
              borderDash: [5, 5],
            },
          ]
        : []),
    ],
  };

  const adTypePerformanceData = {
    labels: ['Banner Ads', 'Rewarded Ads', 'Interstitial Ads', 'URL Shortener'],
    datasets: [
      {
        label: 'Impressions (K)',
        data: [1000, 500, 300, 0],
        backgroundColor: '#8b5cf6',
      },
      {
        label: 'Clicks (K)',
        data: [10, 7.5, 4.5, 50],
        backgroundColor: '#10b981',
      },
      {
        label: 'Earnings ($)',
        data: [2000, 2000, 900, 330.5],
        backgroundColor: '#3b82f6',
      },
    ],
  };

  const performanceTrendsData = [
    { metric: 'Impressions', current: '1.8M', previous: '1.5M', change: 20, trend: 'up' },
    { metric: 'Clicks', current: '72K', previous: '60K', change: 20, trend: 'up' },
    { metric: 'CTR', current: '3.9%', previous: '3.7%', change: 5.4, trend: 'up' },
    { metric: 'Earnings', current: '$5,230', previous: '$4,530', change: 15.4, trend: 'up' },
    { metric: 'CPM', current: '$2.83', previous: '$2.77', change: 2.2, trend: 'up' },
    { metric: 'CPC', current: '$0.073', previous: '$0.075', change: -2.7, trend: 'down' },
  ];

  const campaignsData = [
    {
      key: 1,
      campaign: 'Summer Sale 2025',
      adType: 'Banner',
      impressions: '500K',
      clicks: '5K',
      ctr: '1.0%',
      earnings: '$500',
      status: 'Active',
    },
    {
      key: 2,
      campaign: 'Black Friday Special',
      adType: 'Interstitial',
      impressions: '300K',
      clicks: '4.5K',
      ctr: '1.5%',
      earnings: '$450',
      status: 'Active',
    },
    {
      key: 3,
      campaign: 'Rewarded Video Campaign',
      adType: 'Rewarded',
      impressions: '250K',
      clicks: '3.75K',
      ctr: '1.5%',
      earnings: '$1,000',
      status: 'Active',
    },
    {
      key: 4,
      campaign: 'URL Shortener Links',
      adType: 'URL Shortener',
      impressions: 'N/A',
      clicks: '50K',
      ctr: 'N/A',
      earnings: '$330.50',
      status: 'Active',
    },
  ];

  const creativesData = [
    {
      key: 1,
      name: 'Summer Banner A',
      size: '300x250',
      impressions: '500K',
      clicks: '5K',
      ctr: '1.0%',
      earnings: '$500',
      campaigns: 3,
      preview: 'https://via.placeholder.com/150x100/8b5cf6/ffffff?text=Banner+A',
    },
    {
      key: 2,
      name: 'Black Friday Video',
      size: 'Video',
      impressions: '250K',
      clicks: '3.75K',
      ctr: '1.5%',
      earnings: '$1,000',
      campaigns: 2,
      preview: 'https://via.placeholder.com/150x100/10b981/ffffff?text=Video',
    },
    {
      key: 3,
      name: 'Holiday Leaderboard',
      size: '728x90',
      impressions: '300K',
      clicks: '3K',
      ctr: '1.0%',
      earnings: '$300',
      campaigns: 1,
      preview: 'https://via.placeholder.com/150x100/3b82f6/ffffff?text=Leaderboard',
    },
  ];

  const revenueByAdTypeData = [
    {
      key: 1,
      adType: 'Banner Ads',
      impressions: '1M',
      clicks: '10K',
      cpm: '$2.00',
      cpc: '$0.20',
      earnings: '$2,000',
      percentage: 38.2,
    },
    {
      key: 2,
      adType: 'Rewarded Ads',
      impressions: '500K',
      clicks: '7.5K',
      cpm: '$4.00',
      cpc: '$0.27',
      earnings: '$2,000',
      percentage: 38.2,
    },
    {
      key: 3,
      adType: 'Interstitial',
      impressions: '300K',
      clicks: '4.5K',
      cpm: '$3.00',
      cpc: '$0.20',
      earnings: '$900',
      percentage: 17.2,
    },
    {
      key: 4,
      adType: 'URL Shortener',
      impressions: '-',
      clicks: '50K',
      cpm: '-',
      cpc: '$0.01',
      earnings: '$330.50',
      percentage: 6.4,
    },
  ];

  const topEarningCampaigns = [
    { key: 1, campaign: 'Summer Sale', adType: 'Banner', earnings: '$1,200', percentage: 23 },
    { key: 2, campaign: 'Black Friday', adType: 'Interstitial', earnings: '$900', percentage: 17 },
    { key: 3, campaign: 'Rewarded Video', adType: 'Rewarded', earnings: '$2,000', percentage: 38 },
    { key: 4, campaign: 'URL Campaign', adType: 'URL Shortener', earnings: '$330.50', percentage: 6 },
  ];

  // Export Menu
  const exportMenu = {
    items: [
      {
        key: 'pdf',
        label: (
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Export as PDF
          </div>
        ),
      },
      {
        key: 'csv',
        label: (
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export as CSV
          </div>
        ),
      },
      {
        key: 'excel',
        label: (
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Export as Excel
          </div>
        ),
      },
      {
        type: 'divider',
      },
      {
        key: 'schedule',
        label: (
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Schedule Email Report
          </div>
        ),
      },
    ],
  };

  // Metric Card Component
  const MetricCard = ({ title, value, change, trend, prefix = '', suffix = '', icon: Icon }) => (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">
            {prefix}
            {typeof value === 'number' ? value.toLocaleString() : value}
            {suffix}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <div
              className={`flex items-center gap-1 text-sm font-semibold ${
                trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`}
            >
              {trend === 'up' ? (
                <ArrowUp className="w-4 h-4" />
              ) : trend === 'down' ? (
                <ArrowDown className="w-4 h-4" />
              ) : (
                <Minus className="w-4 h-4" />
              )}
              {Math.abs(change)}%
            </div>
            <span className="text-xs text-gray-500">vs previous period</span>
          </div>
        </div>
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-purple-600" />
        </div>
      </div>
    </Card>
  );

  // Trend Icon Component
  const TrendIcon = ({ trend, value }) => {
    if (trend === 'up') {
      return (
        <span className="flex items-center gap-1 text-green-600 font-semibold">
          <ArrowUp className="w-4 h-4" />
          {value}%
        </span>
      );
    } else if (trend === 'down') {
      return (
        <span className="flex items-center gap-1 text-red-600 font-semibold">
          <ArrowDown className="w-4 h-4" />
          {value}%
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 text-gray-600 font-semibold">
        <Minus className="w-4 h-4" />
        {value}%
      </span>
    );
  };

  // Overview Tab Content
  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Earnings"
          value={overviewMetrics.totalEarnings.value}
          change={overviewMetrics.totalEarnings.change}
          trend={overviewMetrics.totalEarnings.trend}
          prefix="$"
          icon={DollarSign}
        />
        <MetricCard
          title="Total Impressions"
          value={overviewMetrics.totalImpressions.value}
          change={overviewMetrics.totalImpressions.change}
          trend={overviewMetrics.totalImpressions.trend}
          icon={Eye}
        />
        <MetricCard
          title="Total Clicks"
          value={overviewMetrics.totalClicks.value}
          change={overviewMetrics.totalClicks.change}
          trend={overviewMetrics.totalClicks.trend}
          icon={MousePointer}
        />
        <MetricCard
          title="CTR"
          value={overviewMetrics.ctr.value}
          change={overviewMetrics.ctr.change}
          trend={overviewMetrics.ctr.trend}
          suffix="%"
          icon={Target}
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="CPM"
          value={overviewMetrics.cpm.value}
          change={overviewMetrics.cpm.change}
          trend={overviewMetrics.cpm.trend}
          prefix="$"
          icon={BarChart3}
        />
        <MetricCard
          title="CPC"
          value={overviewMetrics.cpc.value}
          change={overviewMetrics.cpc.change}
          trend={overviewMetrics.cpc.trend}
          prefix="$"
          icon={Activity}
        />
        <MetricCard
          title="Fill Rate"
          value={overviewMetrics.fillRate.value}
          change={overviewMetrics.fillRate.change}
          trend={overviewMetrics.fillRate.trend}
          suffix="%"
          icon={PieChart}
        />
        <MetricCard
          title="Viewability Rate"
          value={overviewMetrics.viewabilityRate.value}
          change={overviewMetrics.viewabilityRate.change}
          trend={overviewMetrics.viewabilityRate.trend}
          suffix="%"
          icon={CheckCircle}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Earnings Over Time */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Earnings Over Time</h3>
            <Radio.Group value={chartTimeframe} onChange={(e) => setChartTimeframe(e.target.value)} size="small">
              <Radio.Button value="daily">Daily</Radio.Button>
              <Radio.Button value="weekly">Weekly</Radio.Button>
              <Radio.Button value="monthly">Monthly</Radio.Button>
            </Radio.Group>
          </div>
          <div className="h-80">
            <Line
              data={earningsChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: compareEnabled, position: 'bottom' },
                  tooltip: {
                    backgroundColor: '#1f2937',
                    padding: 12,
                    callbacks: {
                      label: (context) => `${context.dataset.label}: $${context.parsed.y}`,
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: { callback: (value) => '$' + value },
                  },
                },
              }}
            />
          </div>
        </Card>

        {/* Performance by Ad Type */}
        <Card>
          <h3 className="text-lg font-bold text-gray-900 mb-6">Performance by Ad Type</h3>
          <div className="h-80">
            <Bar
              data={adTypePerformanceData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: true, position: 'bottom' },
                },
                scales: {
                  y: { beginAtZero: true },
                },
              }}
            />
          </div>
        </Card>
      </div>

      {/* Performance Trends Table */}
      <Card>
        <h3 className="text-lg font-bold text-gray-900 mb-6">Performance Trends</h3>
        <Table
          dataSource={performanceTrendsData}
          pagination={false}
          columns={[
            {
              title: 'Metric',
              dataIndex: 'metric',
              key: 'metric',
              render: (text) => <span className="font-semibold text-gray-900">{text}</span>,
            },
            {
              title: 'Current Period',
              dataIndex: 'current',
              key: 'current',
              render: (text) => <span className="font-semibold text-gray-900">{text}</span>,
            },
            {
              title: 'Previous Period',
              dataIndex: 'previous',
              key: 'previous',
              render: (text) => <span className="text-gray-600">{text}</span>,
            },
            {
              title: 'Change',
              dataIndex: 'change',
              key: 'change',
              render: (value, record) => <TrendIcon trend={record.trend} value={Math.abs(value)} />,
            },
          ]}
        />
      </Card>
    </div>
  );

  // Campaigns Tab Content
  const CampaignsTab = () => {
    const [searchText, setSearchText] = useState('');

    const campaignColumns = [
      {
        title: 'Campaign',
        dataIndex: 'campaign',
        key: 'campaign',
        render: (text) => <span className="font-semibold text-gray-900">{text}</span>,
      },
      {
        title: 'Ad Type',
        dataIndex: 'adType',
        key: 'adType',
        render: (text) => (
          <Tag
            color={
              text === 'Banner'
                ? 'purple'
                : text === 'Rewarded'
                ? 'green'
                : text === 'Interstitial'
                ? 'blue'
                : 'orange'
            }
          >
            {text}
          </Tag>
        ),
      },
      {
        title: 'Impressions',
        dataIndex: 'impressions',
        key: 'impressions',
        sorter: true,
      },
      {
        title: 'Clicks',
        dataIndex: 'clicks',
        key: 'clicks',
        sorter: true,
      },
      {
        title: 'CTR',
        dataIndex: 'ctr',
        key: 'ctr',
        sorter: true,
      },
      {
        title: 'Earnings',
        dataIndex: 'earnings',
        key: 'earnings',
        render: (text) => <span className="font-semibold text-green-600">{text}</span>,
        sorter: true,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status) => (
          <Tag color={status === 'Active' ? 'success' : 'default'} icon={<CheckCircle className="w-3 h-3" />}>
            {status}
          </Tag>
        ),
      },
      {
        title: 'Actions',
        key: 'actions',
        render: () => (
          <Button type="link" size="small">
            View Details
          </Button>
        ),
      },
    ];

    return (
      <div className="space-y-6">
        {/* Filters */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Search campaigns..."
              prefix={<Search className="w-4 h-4 text-gray-400" />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
            <Select placeholder="All Ad Types" className="w-full">
              <Option value="all">All Ad Types</Option>
              <Option value="banner">Banner</Option>
              <Option value="rewarded">Rewarded</Option>
              <Option value="interstitial">Interstitial</Option>
              <Option value="url">URL Shortener</Option>
            </Select>
            <Select placeholder="All Statuses" className="w-full">
              <Option value="all">All Statuses</Option>
              <Option value="active">Active</Option>
              <Option value="paused">Paused</Option>
              <Option value="ended">Ended</Option>
            </Select>
            <Button icon={<Filter className="w-4 h-4" />} className="w-full">
              More Filters
            </Button>
          </div>
        </Card>

        {/* Campaigns Table */}
        <Card>
          <Table
            dataSource={campaignsData}
            columns={campaignColumns}
            pagination={{ pageSize: 10, showSizeChanger: true }}
          />
        </Card>
      </div>
    );
  };

  // Creatives Tab Content
  const CreativesTab = () => (
    <div className="space-y-6">
      {/* Sort Options */}
      <Card>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Creative Performance</h3>
          <Select defaultValue="ctr" className="w-48">
            <Option value="ctr">Highest CTR</Option>
            <Option value="impressions">Most Impressions</Option>
            <Option value="earnings">Highest Earnings</Option>
            <Option value="recent">Most Recent</Option>
          </Select>
        </div>
      </Card>

      {/* Creatives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {creativesData.map((creative) => (
          <Card key={creative.key} hoverable>
            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img src={creative.preview} alt={creative.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{creative.name}</h4>
                <p className="text-sm text-gray-600">{creative.size}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Impressions</p>
                  <p className="font-semibold text-gray-900">{creative.impressions}</p>
                </div>
                <div>
                  <p className="text-gray-600">Clicks</p>
                  <p className="font-semibold text-gray-900">{creative.clicks}</p>
                </div>
                <div>
                  <p className="text-gray-600">CTR</p>
                  <p className="font-semibold text-purple-600">{creative.ctr}</p>
                </div>
                <div>
                  <p className="text-gray-600">Earnings</p>
                  <p className="font-semibold text-green-600">{creative.earnings}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Used in <span className="font-semibold text-purple-600">{creative.campaigns} campaigns</span>
                </p>
                <Button type="link" size="small" className="px-0 mt-2">
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  // Revenue Tab Content
  const RevenueTab = () => (
    <div className="space-y-6">
      {/* Revenue Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <Statistic
            title="Total Earnings"
            value={5230.5}
            precision={2}
            prefix="$"
            valueStyle={{ color: '#8b5cf6', fontWeight: 'bold' }}
          />
        </Card>
        <Card>
          <Statistic
            title="Paid Out"
            value={4500}
            precision={2}
            prefix="$"
            valueStyle={{ color: '#10b981', fontWeight: 'bold' }}
          />
        </Card>
        <Card>
          <Statistic
            title="Pending"
            value={730.5}
            precision={2}
            prefix="$"
            valueStyle={{ color: '#f59e0b', fontWeight: 'bold' }}
          />
        </Card>
        <Card>
          <div>
            <p className="text-sm text-gray-600 mb-2">Next Payout</p>
            <p className="text-2xl font-bold text-gray-900">$730.50</p>
            <p className="text-xs text-gray-500 mt-1">June 15, 2025</p>
          </div>
        </Card>
      </div>

      {/* Revenue Breakdown Table */}
      <Card>
        <h3 className="text-lg font-bold text-gray-900 mb-6">Revenue by Ad Type</h3>
        <Table
          dataSource={revenueByAdTypeData}
          pagination={false}
          columns={[
            {
              title: 'Ad Type',
              dataIndex: 'adType',
              key: 'adType',
              render: (text) => <span className="font-semibold text-gray-900">{text}</span>,
            },
            {
              title: 'Impressions',
              dataIndex: 'impressions',
              key: 'impressions',
            },
            {
              title: 'Clicks',
              dataIndex: 'clicks',
              key: 'clicks',
            },
            {
              title: 'CPM',
              dataIndex: 'cpm',
              key: 'cpm',
            },
            {
              title: 'CPC',
              dataIndex: 'cpc',
              key: 'cpc',
            },
            {
              title: 'Earnings',
              dataIndex: 'earnings',
              key: 'earnings',
              render: (text) => <span className="font-semibold text-green-600">{text}</span>,
            },
            {
              title: '% of Total',
              dataIndex: 'percentage',
              key: 'percentage',
              render: (value) => (
                <div className="flex items-center gap-2">
                  <Progress percent={value} size="small" showInfo={false} strokeColor="#8b5cf6" />
                  <span className="text-sm font-medium">{value}%</span>
                </div>
              ),
            },
          ]}
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row className="bg-purple-50">
                <Table.Summary.Cell index={0}>
                  <span className="font-bold text-gray-900">Total</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <span className="font-semibold">1.8M</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  <span className="font-semibold">72K</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>-</Table.Summary.Cell>
                <Table.Summary.Cell index={4}>-</Table.Summary.Cell>
                <Table.Summary.Cell index={5}>
                  <span className="font-bold text-green-600">$5,230.50</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={6}>
                  <span className="font-bold text-purple-600">100%</span>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
      </Card>

      {/* Top Earning Campaigns */}
      <Card>
        <h3 className="text-lg font-bold text-gray-900 mb-6">Top Earning Campaigns</h3>
        <Table
          dataSource={topEarningCampaigns}
          pagination={false}
          columns={[
            {
              title: 'Campaign',
              dataIndex: 'campaign',
              key: 'campaign',
              render: (text) => <span className="font-semibold text-gray-900">{text}</span>,
            },
            {
              title: 'Ad Type',
              dataIndex: 'adType',
              key: 'adType',
              render: (text) => (
                <Tag
                  color={
                    text === 'Banner'
                      ? 'purple'
                      : text === 'Rewarded'
                      ? 'green'
                      : text === 'Interstitial'
                      ? 'blue'
                      : 'orange'
                  }
                >
                  {text}
                </Tag>
              ),
            },
            {
              title: 'Earnings',
              dataIndex: 'earnings',
              key: 'earnings',
              render: (text) => <span className="font-semibold text-green-600">{text}</span>,
            },
            {
              title: '% of Total',
              dataIndex: 'percentage',
              key: 'percentage',
              render: (value) => (
                <div className="flex items-center gap-2">
                  <Progress percent={value} size="small" showInfo={false} strokeColor="#10b981" />
                  <span className="text-sm font-medium">{value}%</span>
                </div>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into your campaign performance</p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Date Range Selector */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row gap-4">
                <Select
                  value={datePreset}
                  onChange={setDatePreset}
                  className="w-full sm:w-48"
                  suffixIcon={<Calendar className="w-4 h-4" />}
                >
                  <Option value="today">Today</Option>
                  <Option value="yesterday">Yesterday</Option>
                  <Option value="last7days">Last 7 Days</Option>
                  <Option value="last30days">Last 30 Days</Option>
                  <Option value="thisMonth">This Month</Option>
                  <Option value="lastMonth">Last Month</Option>
                  <Option value="custom">Custom Range</Option>
                </Select>
                {datePreset === 'custom' && <RangePicker className="flex-1" />}
              </div>
            </div>

            {/* Compare Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Compare:</span>
              <Switch checked={compareEnabled} onChange={setCompareEnabled} />
            </div>

            {/* Export Button */}
            <Dropdown menu={exportMenu} trigger={['click']}>
              <Button icon={<Download className="w-4 h-4" />}>Export</Button>
            </Dropdown>
          </div>
        </Card>

        {/* Tabs */}
        <Card>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={[
              {
                key: 'overview',
                label: (
                  <span className="flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Overview
                  </span>
                ),
                children: <OverviewTab />,
              },
              {
                key: 'campaigns',
                label: (
                  <span className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Campaigns
                  </span>
                ),
                children: <CampaignsTab />,
              },
              {
                key: 'creatives',
                label: (
                  <span className="flex items-center gap-2">
                    <PieChart className="w-4 h-4" />
                    Creatives
                  </span>
                ),
                children: <CreativesTab />,
              },
              {
                key: 'revenue',
                label: (
                  <span className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Revenue
                  </span>
                ),
                children: <RevenueTab />,
              },
            ]}
          />
        </Card>
      </div>
    </div>
  );
};

export default ReportsAnalyticsPage;
