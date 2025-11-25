import React from 'react';
import { Table, Tag } from 'antd';
import { FaCheckCircle, FaPause, FaClock } from 'react-icons/fa';

const TopCampaignsTable = () => {
  const columns = [
    {
      title: 'Campaign',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span className="font-semibold text-gray-900">{text}</span>,
    },
    {
      title: 'Impressions',
      dataIndex: 'impressions',
      key: 'impressions',
      sorter: (a, b) => parseFloat(a.impressions) - parseFloat(b.impressions),
    },
    {
      title: 'Clicks',
      dataIndex: 'clicks',
      key: 'clicks',
      sorter: (a, b) => parseFloat(a.clicks) - parseFloat(b.clicks),
    },
    {
      title: 'CTR',
      dataIndex: 'ctr',
      key: 'ctr',
      sorter: (a, b) => parseFloat(a.ctr) - parseFloat(b.ctr),
    },
    {
      title: 'Earnings',
      dataIndex: 'earnings',
      key: 'earnings',
      render: (text) => <span className="font-semibold text-green-600">{text}</span>,
      sorter: (a, b) => parseFloat(a.earnings.replace(/[$,]/g, '')) - parseFloat(b.earnings.replace(/[$,]/g, '')),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const config = {
          Live: { color: 'success', icon: <FaCheckCircle /> },
          Paused: { color: 'warning', icon: <FaPause /> },
          Pending: { color: 'processing', icon: <FaClock /> },
        };
        return (
          <Tag color={config[status].color} icon={config[status].icon}>
            {status}
          </Tag>
        );
      },
    },
  ];

  const dataSource = [
    {
      key: '1',
      name: 'Summer Sale 2025',
      impressions: '850K',
      clicks: '12.5K',
      ctr: '1.47%',
      earnings: '$2,765',
      status: 'Live',
    },
    {
      key: '2',
      name: 'Black Friday Special',
      impressions: '620K',
      clicks: '9.8K',
      ctr: '1.58%',
      earnings: '$2,015',
      status: 'Live',
    },
    {
      key: '3',
      name: 'Product Launch',
      impressions: '485K',
      clicks: '8.2K',
      ctr: '1.69%',
      earnings: '$1,578',
      status: 'Paused',
    },
    {
      key: '4',
      name: 'Holiday Campaign',
      impressions: '395K',
      clicks: '6.5K',
      ctr: '1.65%',
      earnings: '$1,285',
      status: 'Live',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">Top Performing Campaigns</h3>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        className="custom-table"
      />
    </div>
  );
};

export default TopCampaignsTable;
