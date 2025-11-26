import React from 'react';
import { Input, Radio, Select, DatePicker, InputNumber, Checkbox } from 'antd';
import { AlertCircle, Image, Gift, Maximize2, Link2 } from 'lucide-react';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;

const Step1BasicInfo = ({ data, errors, onChange }) => {
  const adTypes = [
    {
      value: 'Banner Ads',
      icon: Image,
      title: 'Banner Ads',
      description: 'Display ads in various sizes across websites',
    },
    {
      value: 'Rewarded Ads',
      icon: Gift,
      title: 'Rewarded Ads',
      description: 'Users watch ads to earn rewards',
    },
    {
      value: 'Interstitial Ads',
      icon: Maximize2,
      title: 'Interstitial Ads',
      description: 'Full-screen ads between content transitions',
    },
    {
      value: 'URL Shortener',
      icon: Link2,
      title: 'URL Shortener',
      description: 'Monetize shortened links with interstitial ads',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Information</h2>
        <p className="text-gray-600">Set up the foundation of your campaign</p>
      </div>

      {/* Campaign Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Campaign Name <span className="text-red-500">*</span>
        </label>
        <Input
          size="large"
          placeholder="e.g., Summer Sale 2025"
          value={data.campaignName}
          onChange={(e) => onChange('campaignName', e.target.value)}
          maxLength={100}
          showCount
          status={errors.campaignName ? 'error' : ''}
        />
        {errors.campaignName && (
          <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
            <AlertCircle className="w-3 h-3" />
            {errors.campaignName}
          </div>
        )}
      </div>

      {/* Ad Type */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Ad Type <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {adTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.value}
                type="button"
                onClick={() => onChange('adType', type.value)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  data.adType === type.value
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-300 bg-white hover:border-purple-400'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      data.adType === type.value ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        data.adType === type.value ? 'text-white' : 'text-gray-600'
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{type.title}</h3>
                    <p className="text-xs text-gray-600">{type.description}</p>
                  </div>
                  {data.adType === type.value && (
                    <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
        {errors.adType && (
          <div className="flex items-center gap-1 text-red-500 text-xs mt-2">
            <AlertCircle className="w-3 h-3" />
            {errors.adType}
          </div>
        )}
      </div>

      {/* Campaign Objective */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Campaign Objective <span className="text-gray-500 text-xs">(Optional)</span>
        </label>
        <Select
          size="large"
          placeholder="Select campaign objective"
          className="w-full"
          value={data.campaignObjective || undefined}
          onChange={(value) => onChange('campaignObjective', value)}
        >
          <Option value="Brand Awareness">Brand Awareness</Option>
          <Option value="Traffic">Traffic</Option>
          <Option value="Conversions">Conversions</Option>
          <Option value="App Installs">App Installs</Option>
          <Option value="Engagement">Engagement</Option>
        </Select>
      </div>

      {/* Campaign Duration */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Campaign Duration <span className="text-red-500">*</span>
        </label>
        <Radio.Group
          value={data.durationType}
          onChange={(e) => onChange('durationType', e.target.value)}
          className="flex flex-col gap-3"
        >
          <Radio value="continuous" className="text-base">
            <span className="font-medium">Continuous</span>
            <span className="text-gray-500 text-sm ml-2">(No end date)</span>
          </Radio>
          <Radio value="scheduled" className="text-base">
            <span className="font-medium">Scheduled</span>
            <span className="text-gray-500 text-sm ml-2">(Set start & end date)</span>
          </Radio>
        </Radio.Group>

        {data.durationType === 'scheduled' && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date <span className="text-red-500">*</span>
              </label>
              <DatePicker
                size="large"
                className="w-full"
                value={data.startDate ? dayjs(data.startDate) : null}
                onChange={(date) => onChange('startDate', date)}
                placeholder="Select start date"
                status={errors.startDate ? 'error' : ''}
              />
              {errors.startDate && (
                <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date <span className="text-red-500">*</span>
              </label>
              <DatePicker
                size="large"
                className="w-full"
                value={data.endDate ? dayjs(data.endDate) : null}
                onChange={(date) => onChange('endDate', date)}
                placeholder="Select end date"
                status={errors.endDate ? 'error' : ''}
              />
              {errors.endDate && (
                <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Daily Budget */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Daily Budget <span className="text-gray-500 text-xs">(Optional)</span>
        </label>
        <div className="flex items-center gap-4">
          <InputNumber
            size="large"
            placeholder="Enter daily budget"
            value={data.dailyBudget}
            onChange={(value) => onChange('dailyBudget', value)}
            disabled={data.noDailyLimit}
            className="flex-1"
            min={0}
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          />
          <Checkbox
            checked={data.noDailyLimit}
            onChange={(e) => {
              onChange('noDailyLimit', e.target.checked);
              if (e.target.checked) onChange('dailyBudget', '');
            }}
          >
            <span className="text-sm font-medium">No daily limit</span>
          </Checkbox>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Set a maximum daily spending limit for your campaign
        </p>
      </div>
    </div>
  );
};

export default Step1BasicInfo;
