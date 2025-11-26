import React, { useState } from 'react';
import { Input, Select, Checkbox, TimePicker, Tag, Button, Collapse, Space } from 'antd';
import { AlertCircle, Plus, X } from 'lucide-react';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

const Step3Targeting = ({ data, errors, onChange }) => {
  const [customInterest, setCustomInterest] = useState('');

  // Countries List
  const COUNTRIES = [
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'India',
    'Germany',
    'France',
    'Japan',
    'Brazil',
    'Mexico',
    'Spain',
    'Italy',
    'South Korea',
    'China',
    'Russia',
    'Netherlands',
    'Sweden',
    'Switzerland',
  ];

  // Interest Categories
  const INTERESTS = [
    'Technology',
    'Gaming',
    'Sports',
    'Fashion',
    'Food & Cooking',
    'Travel',
    'Entertainment',
    'Education',
    'Health & Fitness',
    'Finance',
    'Business',
    'Music',
    'Movies',
    'Books',
    'Art & Design',
    'Photography',
    'Automotive',
    'Real Estate',
    'DIY & Crafts',
    'Pets',
  ];

  // Content Categories
  const CONTENT_CATEGORIES = [
    'News',
    'Entertainment',
    'Technology',
    'Sports',
    'Education',
    'Business',
    'Health',
    'Lifestyle',
    'Gaming',
    'Shopping',
  ];

  // Days of Week
  const DAYS_OF_WEEK = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' },
  ];

  // Handle Age Group Toggle
  const handleAgeGroupToggle = (ageGroup) => {
    const updated = data.ageGroups.includes(ageGroup)
      ? data.ageGroups.filter(a => a !== ageGroup)
      : [...data.ageGroups, ageGroup];
    onChange('ageGroups', updated);
  };

  // Handle Interest Toggle
  const handleInterestToggle = (interest) => {
    const updated = data.interests.includes(interest)
      ? data.interests.filter(i => i !== interest)
      : [...data.interests, interest];
    onChange('interests', updated);
  };

  // Add Custom Interest
  const handleAddCustomInterest = () => {
    if (customInterest.trim() && !data.interests.includes(customInterest)) {
      onChange('interests', [...data.interests, customInterest]);
      setCustomInterest('');
    }
  };

  // Handle Day Toggle
  const handleDayToggle = (day) => {
    const updated = data.selectedDays.includes(day)
      ? data.selectedDays.filter(d => d !== day)
      : [...data.selectedDays, day];
    onChange('selectedDays', updated);
  };

  // Handle Content Category Toggle
  const handleContentCategoryToggle = (category) => {
    const updated = data.contentCategories.includes(category)
      ? data.contentCategories.filter(c => c !== category)
      : [...data.contentCategories, category];
    onChange('contentCategories', updated);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Targeting & Settings</h2>
        <p className="text-gray-600">Define your audience and campaign parameters</p>
      </div>

      {/* SECTION 1: GEOGRAPHIC TARGETING */}
      <div className="border-t pt-8">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            🌍 Geographic Targeting
          </h3>

          {/* Geographic Radio Options */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <input
                type="radio"
                id="geo-all"
                name="geoTargeting"
                value="all"
                checked={data.geoTargeting === 'all'}
                onChange={(e) => onChange('geoTargeting', e.target.value)}
                className="mt-1"
              />
              <label htmlFor="geo-all" className="flex-1 cursor-pointer">
                <span className="font-medium text-gray-900">All Countries</span>
                <p className="text-xs text-gray-600 mt-1">Show ads to users worldwide</p>
              </label>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="radio"
                id="geo-specific"
                name="geoTargeting"
                value="specific"
                checked={data.geoTargeting === 'specific'}
                onChange={(e) => onChange('geoTargeting', e.target.value)}
                className="mt-1"
              />
              <label htmlFor="geo-specific" className="flex-1 cursor-pointer">
                <span className="font-medium text-gray-900">Specific Countries</span>
                <p className="text-xs text-gray-600 mt-1">Target only selected countries</p>
              </label>
            </div>
          </div>

          {/* Country Selection */}
          {data.geoTargeting === 'specific' && (
            <div className="mt-4">
              <Select
                mode="multiple"
                placeholder="Search and select countries"
                className="w-full"
                size="large"
                value={data.selectedCountries}
                onChange={(value) => onChange('selectedCountries', value)}
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
                maxTagCount="responsive"
              >
                {COUNTRIES.map((country) => (
                  <Option key={country} value={country}>
                    {country}
                  </Option>
                ))}
              </Select>
              {data.selectedCountries.length > 0 && (
                <p className="text-xs text-gray-600 mt-2">
                  {data.selectedCountries.length} country/countries selected
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: AUDIENCE DEMOGRAPHICS */}
      <div className="border-t pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          👥 Audience Demographics
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Age Groups */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-3 block">
              Age Groups <span className="text-gray-500 text-xs">(Optional)</span>
            </label>
            <div className="space-y-2">
              {['13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+', 'All ages'].map(
                (age) => (
                  <label
                    key={age}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={data.ageGroups.includes(age)}
                      onChange={() => handleAgeGroupToggle(age)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium text-gray-700">{age}</span>
                  </label>
                )
              )}
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-3 block">
              Gender <span className="text-gray-500 text-xs">(Optional)</span>
            </label>
            <div className="space-y-2">
              {[
                { value: 'all', label: 'All Genders' },
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={option.value}
                    checked={data.gender === option.value}
                    onChange={(e) => onChange('gender', e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: INTERESTS */}
      <div className="border-t pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          ❤️ Audience Interests
        </h3>

        <label className="text-sm font-semibold text-gray-700 mb-3 block">
          Select Interests <span className="text-gray-500 text-xs">(Optional)</span>
        </label>

        {/* Interest Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {INTERESTS.map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => handleInterestToggle(interest)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                data.interests.includes(interest)
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>

        {/* Custom Interest Input */}
        <div className="flex gap-2">
          <Input
            size="large"
            placeholder="Add custom interest"
            value={customInterest}
            onChange={(e) => setCustomInterest(e.target.value)}
            onPressEnter={handleAddCustomInterest}
            prefix="🏷️"
          />
          <Button size="large" type="primary" onClick={handleAddCustomInterest}>
            Add
          </Button>
        </div>

        {/* Selected Interests Display */}
        {data.interests.length > 0 && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs font-medium text-gray-600 mb-2">Selected Interests:</p>
            <div className="flex flex-wrap gap-2">
              {data.interests.map((interest) => (
                <Tag
                  key={interest}
                  closable
                  onClose={() => {
                    const updated = data.interests.filter(i => i !== interest);
                    onChange('interests', updated);
                  }}
                  color="purple"
                >
                  {interest}
                </Tag>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SECTION 4: SCHEDULE TARGETING */}
      <div className="border-t pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          📅 Schedule Targeting
        </h3>

        <div className="space-y-6">
          {/* Days of Week */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-3 block">
              Days of Week <span className="text-gray-500 text-xs">(Optional)</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {DAYS_OF_WEEK.map((day) => (
                <label
                  key={day.value}
                  className={`px-4 py-2 rounded-lg border-2 font-medium text-sm transition-all cursor-pointer ${
                    data.selectedDays.includes(day.value)
                      ? 'border-purple-600 bg-purple-50 text-purple-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-purple-400'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={data.selectedDays.includes(day.value)}
                    onChange={() => handleDayToggle(day.value)}
                    className="hidden"
                  />
                  {day.label}
                </label>
              ))}
            </div>
          </div>

          {/* Time of Day */}
          <div>
            <label className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                checked={data.allDay}
                onChange={(e) => onChange('allDay', e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-semibold text-gray-700">All day</span>
            </label>

            {!data.allDay && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From
                  </label>
                  <TimePicker
                    size="large"
                    format="HH:mm"
                    className="w-full"
                    value={data.timeFrom ? dayjs(data.timeFrom, 'HH:mm') : null}
                    onChange={(time) =>
                      onChange('timeFrom', time ? time.format('HH:mm') : null)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To
                  </label>
                  <TimePicker
                    size="large"
                    format="HH:mm"
                    className="w-full"
                    value={data.timeTo ? dayjs(data.timeTo, 'HH:mm') : null}
                    onChange={(time) =>
                      onChange('timeTo', time ? time.format('HH:mm') : null)
                    }
                  />
                </div>
              </div>
            )}

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timezone
              </label>
              <Select
                size="large"
                placeholder="Select timezone"
                className="w-full"
                value={data.timezone}
                onChange={(value) => onChange('timezone', value)}
              >
                <Option value="UTC">UTC (Coordinated Universal Time)</Option>
                <Option value="EST">EST (Eastern Standard Time)</Option>
                <Option value="CST">CST (Central Standard Time)</Option>
                <Option value="MST">MST (Mountain Standard Time)</Option>
                <Option value="PST">PST (Pacific Standard Time)</Option>
                <Option value="GMT">GMT (Greenwich Mean Time)</Option>
                <Option value="IST">IST (Indian Standard Time)</Option>
                <Option value="JST">JST (Japan Standard Time)</Option>
                <Option value="AEST">AEST (Australian Eastern Standard Time)</Option>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5: CONTENT/CONTEXTUAL TARGETING */}
      <div className="border-t pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          📰 Content & Contextual Targeting
        </h3>

        <div className="space-y-6">
          {/* Website Categories */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-3 block">
              Website Categories <span className="text-gray-500 text-xs">(Optional)</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {CONTENT_CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleContentCategoryToggle(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    data.contentCategories.includes(category)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Keyword Targeting */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-3 block">
              Keyword Targeting <span className="text-gray-500 text-xs">(Optional)</span>
            </label>
            <TextArea
              rows={4}
              placeholder="Enter keywords separated by commas (e.g., keyword1, keyword2, keyword3)"
              value={data.keywords}
              onChange={(e) => onChange('keywords', e.target.value)}
            />
            <p className="text-xs text-gray-600 mt-2">
              Your ads will appear on pages containing these keywords
            </p>

            {/* Keywords Display */}
            {data.keywords && (
              <div className="mt-3 flex flex-wrap gap-2">
                {data.keywords
                  .split(',')
                  .map((keyword) => keyword.trim())
                  .filter((keyword) => keyword)
                  .map((keyword) => (
                    <Tag key={keyword} className="px-3 py-1">
                      {keyword}
                    </Tag>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SUMMARY CARD */}
      <div className="border-t pt-8">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
          <h4 className="text-sm font-bold text-gray-900 mb-4">📊 Targeting Summary</h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-600">Geographic:</span>
              <span className="font-medium text-gray-900 ml-2">
                {data.geoTargeting === 'all'
                  ? 'All Countries'
                  : `${data.selectedCountries.length} countries`}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Demographics:</span>
              <span className="font-medium text-gray-900 ml-2">
                {data.ageGroups.length > 0 ? `${data.ageGroups.length} age groups` : 'All ages'} •{' '}
                {data.gender === 'all' ? 'All genders' : data.gender}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Interests:</span>
              <span className="font-medium text-gray-900 ml-2">
                {data.interests.length > 0 ? `${data.interests.length} interests` : 'Not specified'}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Schedule:</span>
              <span className="font-medium text-gray-900 ml-2">
                {data.selectedDays.length > 0 ? `${data.selectedDays.length} days` : 'All days'} •{' '}
                {data.allDay ? 'All day' : `${data.timeFrom} - ${data.timeTo}`}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Content:</span>
              <span className="font-medium text-gray-900 ml-2">
                {data.contentCategories.length > 0
                  ? `${data.contentCategories.length} categories`
                  : 'Not specified'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3Targeting;
