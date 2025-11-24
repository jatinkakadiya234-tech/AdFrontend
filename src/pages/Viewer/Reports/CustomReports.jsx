// CustomReports.jsx
import React, { useState } from 'react';
import {
  Settings,
  Download,
  Save,
  Play,
  Plus,
  X,
  Calendar,
  Filter,
  BarChart3,
  FileText,
  Clock,
  Mail,
  Trash2,
  Edit,
  Copy
} from 'lucide-react';

const CustomReports = () => {
  const [showBuilder, setShowBuilder] = useState(false);
  const [reportName, setReportName] = useState('');
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [selectedDimensions, setSelectedDimensions] = useState([]);
  const [filters, setFilters] = useState([]);
  const [savedReports, setSavedReports] = useState([
    {
      id: 1,
      name: 'Weekly Revenue Summary',
      metrics: ['Impressions', 'Revenue', 'eCPM'],
      dimensions: ['Date', 'Platform'],
      filters: 2,
      lastRun: '2024-11-20',
      schedule: 'Weekly'
    },
    {
      id: 2,
      name: 'SDK Performance Analysis',
      metrics: ['Impressions', 'Clicks', 'CTR', 'Fill Rate'],
      dimensions: ['SDK', 'Ad Unit'],
      filters: 1,
      lastRun: '2024-11-21',
      schedule: 'Daily'
    },
    {
      id: 3,
      name: 'Platform Comparison Report',
      metrics: ['Revenue', 'CTR', 'eCPM'],
      dimensions: ['Platform', 'Device Type'],
      filters: 0,
      lastRun: '2024-11-19',
      schedule: 'Monthly'
    }
  ]);

  const availableMetrics = [
    'Impressions',
    'Clicks',
    'CTR',
    'Revenue',
    'eCPM',
    'Fill Rate',
    'Conversions',
    'Viewability',
    'Click-through Rate',
    'Cost per Click'
  ];

  const availableDimensions = [
    'Date',
    'Platform',
    'SDK',
    'Ad Unit',
    'Device Type',
    'Country',
    'Browser',
    'OS',
    'Ad Size',
    'Ad Format'
  ];

  const filterOperators = ['equals', 'not equals', 'contains', 'greater than', 'less than'];

  const toggleMetric = (metric) => {
    setSelectedMetrics(prev =>
      prev.includes(metric)
        ? prev.filter(m => m !== metric)
        : [...prev, metric]
    );
  };

  const toggleDimension = (dimension) => {
    setSelectedDimensions(prev =>
      prev.includes(dimension)
        ? prev.filter(d => d !== dimension)
        : [...prev, dimension]
    );
  };

  const addFilter = () => {
    setFilters([...filters, { dimension: '', operator: 'equals', value: '' }]);
  };

  const removeFilter = (index) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const updateFilter = (index, field, value) => {
    const newFilters = [...filters];
    newFilters[index][field] = value;
    setFilters(newFilters);
  };

  const saveReport = () => {
    if (reportName && selectedMetrics.length > 0 && selectedDimensions.length > 0) {
      const newReport = {
        id: savedReports.length + 1,
        name: reportName,
        metrics: selectedMetrics,
        dimensions: selectedDimensions,
        filters: filters.length,
        lastRun: new Date().toISOString().split('T')[0],
        schedule: 'Manual'
      };
      setSavedReports([...savedReports, newReport]);
      resetBuilder();
    }
  };

  const resetBuilder = () => {
    setShowBuilder(false);
    setReportName('');
    setSelectedMetrics([]);
    setSelectedDimensions([]);
    setFilters([]);
  };

  const deleteReport = (id) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      setSavedReports(savedReports.filter(r => r.id !== id));
    }
  };

  const duplicateReport = (report) => {
    const newReport = {
      ...report,
      id: savedReports.length + 1,
      name: `${report.name} (Copy)`,
      lastRun: new Date().toISOString().split('T')[0]
    };
    setSavedReports([...savedReports, newReport]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Custom Reports</h1>
            <p className="text-gray-600 mt-1">Build and save custom reports with your preferred metrics</p>
          </div>
          
          <button
            onClick={() => setShowBuilder(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="font-medium">Create Report</span>
          </button>
        </div>

        {/* Report Builder */}
        {showBuilder && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Report Builder</h2>
              <button
                onClick={resetBuilder}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Report Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Name *</label>
              <input
                type="text"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                placeholder="e.g., Monthly SDK Performance Report"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Metrics Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Metrics * <span className="text-gray-500 font-normal">({selectedMetrics.length} selected)</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {availableMetrics.map(metric => (
                  <button
                    key={metric}
                    onClick={() => toggleMetric(metric)}
                    className={`px-4 py-2.5 rounded-lg border-2 transition-all font-medium ${
                      selectedMetrics.includes(metric)
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {metric}
                  </button>
                ))}
              </div>
            </div>

            {/* Dimensions Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Dimensions * <span className="text-gray-500 font-normal">({selectedDimensions.length} selected)</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {availableDimensions.map(dimension => (
                  <button
                    key={dimension}
                    onClick={() => toggleDimension(dimension)}
                    className={`px-4 py-2.5 rounded-lg border-2 transition-all font-medium ${
                      selectedDimensions.includes(dimension)
                        ? 'border-green-600 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {dimension}
                  </button>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Filters <span className="text-gray-500 font-normal">(optional)</span>
                </label>
                <button
                  onClick={addFilter}
                  className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Filter
                </button>
              </div>

              {filters.length > 0 ? (
                <div className="space-y-3">
                  {filters.map((filter, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <select
                        value={filter.dimension}
                        onChange={(e) => updateFilter(index, 'dimension', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select dimension</option>
                        {availableDimensions.map(dim => (
                          <option key={dim} value={dim}>{dim}</option>
                        ))}
                      </select>

                      <select
                        value={filter.operator}
                        onChange={(e) => updateFilter(index, 'operator', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {filterOperators.map(op => (
                          <option key={op} value={op}>{op}</option>
                        ))}
                      </select>

                      <input
                        type="text"
                        value={filter.value}
                        onChange={(e) => updateFilter(index, 'value', e.target.value)}
                        placeholder="Value"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />

                      <button
                        onClick={() => removeFilter(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <Filter className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">No filters added. Click "Add Filter" to create one.</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={resetBuilder}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={saveReport}
                disabled={!reportName || selectedMetrics.length === 0 || selectedDimensions.length === 0}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                Save Report
              </button>
            </div>
          </div>
        )}

        {/* Saved Reports */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Saved Reports</h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {savedReports.map(report => (
              <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{report.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center gap-1">
                            <BarChart3 className="w-4 h-4" />
                            {report.metrics.length} metrics
                          </span>
                          <span className="flex items-center gap-1">
                            <Settings className="w-4 h-4" />
                            {report.dimensions.length} dimensions
                          </span>
                          <span className="flex items-center gap-1">
                            <Filter className="w-4 h-4" />
                            {report.filters} filters
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {report.metrics.slice(0, 3).map((metric, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                          {metric}
                        </span>
                      ))}
                      {report.metrics.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                          +{report.metrics.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Last run: {report.lastRun}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Schedule: {report.schedule}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => alert('Running report...')}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                    >
                      <Play className="w-4 h-4" />
                      <span className="font-medium">Run</span>
                    </button>
                    <button
                      onClick={() => alert('Downloading report...')}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => duplicateReport(report)}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => alert('Edit functionality coming soon...')}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteReport(report.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Templates */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Report Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: 'Revenue Overview',
                description: 'Track total revenue, eCPM, and fill rates',
                metrics: ['Revenue', 'eCPM', 'Fill Rate'],
                icon: '💰'
              },
              {
                name: 'Performance Summary',
                description: 'Monitor impressions, clicks, and CTR',
                metrics: ['Impressions', 'Clicks', 'CTR'],
                icon: '📊'
              },
              {
                name: 'SDK Breakdown',
                description: 'Analyze performance across all SDKs',
                metrics: ['Impressions', 'Revenue', 'CTR'],
                icon: '⚙️'
              }
            ].map((template, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setShowBuilder(true);
                  setReportName(template.name);
                  setSelectedMetrics(template.metrics);
                }}
                className="text-left p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
              >
                <div className="text-3xl mb-3">{template.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-2">{template.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                <div className="flex flex-wrap gap-1">
                  {template.metrics.map((metric, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 group-hover:bg-blue-100 text-gray-700 group-hover:text-blue-700 rounded text-xs font-medium">
                      {metric}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CustomReports;
