import React, { useState } from 'react';
import { FileText, Download, Search, Calendar, Filter, Eye, Printer, Mail, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const Invoices = () => {
  const [invoices, setInvoices] = useState([
    {
      id: 'INV-2025-11-001',
      paymentId: 'PAY-2025-11-001',
      period: 'November 2025',
      issueDate: '2025-11-30',
      dueDate: '2025-12-15',
      amount: 1245.50,
      status: 'paid',
      paidDate: '2025-11-15',
      impressions: 145230,
      clicks: 3345,
      revenue: 1245.50
    },
    {
      id: 'INV-2025-10-001',
      paymentId: 'PAY-2025-10-001',
      period: 'October 2025',
      issueDate: '2025-10-31',
      dueDate: '2025-11-15',
      amount: 987.30,
      status: 'paid',
      paidDate: '2025-10-15',
      impressions: 123450,
      clicks: 2890,
      revenue: 987.30
    },
    {
      id: 'INV-2025-12-001',
      paymentId: 'PAY-2025-12-001',
      period: 'December 2025',
      issueDate: '2025-11-30',
      dueDate: '2025-12-15',
      amount: 456.80,
      status: 'pending',
      paidDate: null,
      impressions: 56780,
      clicks: 1234,
      revenue: 456.80
    },
    {
      id: 'INV-2025-09-001',
      paymentId: 'PAY-2025-09-001',
      period: 'September 2025',
      issueDate: '2025-09-30',
      dueDate: '2025-10-15',
      amount: 2103.45,
      status: 'paid',
      paidDate: '2025-08-15',
      impressions: 234560,
      clicks: 5678,
      revenue: 2103.45
    },
    {
      id: 'INV-2025-08-001',
      paymentId: 'PAY-2025-08-001',
      period: 'August 2025',
      issueDate: '2025-08-31',
      dueDate: '2025-09-15',
      amount: 1532.90,
      status: 'overdue',
      paidDate: null,
      impressions: 178900,
      clicks: 4123,
      revenue: 1532.90
    }
  ]);

  const [filters, setFilters] = useState({
    search: '',
    status: '',
    year: '2025'
  });

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const statusConfig = {
    paid: {
      label: 'Paid',
      bg: 'bg-green-50',
      text: 'text-green-700',
      border: 'border-green-200',
      icon: CheckCircle,
      iconColor: 'text-green-500'
    },
    pending: {
      label: 'Pending',
      bg: 'bg-yellow-50',
      text: 'text-yellow-700',
      border: 'border-yellow-200',
      icon: Clock,
      iconColor: 'text-yellow-500'
    },
    overdue: {
      label: 'Overdue',
      bg: 'bg-red-50',
      text: 'text-red-700',
      border: 'border-red-200',
      icon: AlertCircle,
      iconColor: 'text-red-500'
    }
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(filters.search.toLowerCase()) ||
                         invoice.period.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = !filters.status || invoice.status === filters.status;
    const matchesYear = !filters.year || invoice.issueDate.startsWith(filters.year);
    
    return matchesSearch && matchesStatus && matchesYear;
  });

  const stats = {
    totalInvoices: invoices.length,
    paidInvoices: invoices.filter(i => i.status === 'paid').length,
    pendingInvoices: invoices.filter(i => i.status === 'pending').length,
    overdueInvoices: invoices.filter(i => i.status === 'overdue').length,
    totalRevenue: invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0)
  };

  const handleDownload = (invoice) => {
    showToast(`Downloading ${invoice.id}`);
    // Simulate download
  };

  const handleEmail = (invoice) => {
    showToast(`Sending ${invoice.id} to your email`);
    // Simulate email
  };

  const handlePreview = (invoice) => {
    setSelectedInvoice(invoice);
    setIsPreviewModalOpen(true);
  };

  const handlePrint = () => {
    showToast('Opening print dialog...');
    // Simulate print
  };

  const handleDownloadAll = () => {
    showToast('Preparing all invoices for download...');
    // Simulate bulk download
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Invoices</h1>
              <p className="text-gray-600">View and download all your payment invoices</p>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-500">
              <span>Last updated: Today</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Total Invoices</p>
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.totalInvoices}</p>
            <p className="text-xs text-gray-500 mt-1">All time</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Paid</p>
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.paidInvoices}</p>
            <p className="text-xs text-gray-500 mt-1">${stats.totalRevenue.toFixed(2)} total</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Pending</p>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.pendingInvoices}</p>
            <p className="text-xs text-gray-500 mt-1">Awaiting payment</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Overdue</p>
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.overdueInvoices}</p>
            <p className="text-xs text-gray-500 mt-1">Requires attention</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Filter Invoices</h3>
            <button 
              onClick={() => setFilters({ search: '', status: '', year: '2025' })}
              className="text-sm text-gray-600 hover:text-gray-700"
            >
              Clear all
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Search by ID or period..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>

            <select
              className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>

            <select
              className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={filters.year}
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
            >
              <option value="">All Years</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>

            <button 
              onClick={handleDownloadAll}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              Download All
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredInvoices.length} of {invoices.length} invoices
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <FileText className="w-4 h-4" />
            <span>Sorted by: Latest first</span>
          </div>
        </div>

        {/* Invoices Grid */}
        {filteredInvoices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInvoices.map(invoice => {
              const status = statusConfig[invoice.status];
              const StatusIcon = status.icon;
              return (
                <div
                  key={invoice.id}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="w-4 h-4 text-blue-500" />
                        <code className="text-sm font-mono text-gray-900 font-semibold">
                          {invoice.id}
                        </code>
                      </div>
                      <p className="text-sm text-gray-600">{invoice.period}</p>
                    </div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${status.bg} ${status.text} ${status.border}`}>
                      <StatusIcon className={`w-3 h-3 ${status.iconColor}`} />
                      <span className="text-xs font-medium">{status.label}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Amount</span>
                      <span className="font-semibold text-gray-900 text-lg">${invoice.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Issue Date</span>
                      <span className="text-gray-900">
                        {new Date(invoice.issueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    {invoice.paidDate ? (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Paid Date</span>
                        <span className="text-green-600 font-medium">
                          {new Date(invoice.paidDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    ) : (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Due Date</span>
                        <span className="text-gray-900">
                          {new Date(invoice.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Impressions</span>
                      <span className="text-gray-900">{invoice.impressions.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePreview(invoice)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group-hover:border-gray-400"
                      >
                        <Eye className="w-4 h-4" />
                        Preview
                      </button>
                      <button
                        onClick={() => handleDownload(invoice)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Invoices Found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              No invoices match your current filters. Try adjusting your search criteria or clear all filters to see all invoices.
            </p>
            <button
              onClick={() => setFilters({ search: '', status: '', year: '2025' })}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
            >
              <Filter className="w-4 h-4" />
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Invoice Preview Modal */}
      {isPreviewModalOpen && selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setIsPreviewModalOpen(false)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
              <h2 className="text-xl font-semibold text-gray-900">Invoice Preview</h2>
              <div className="flex items-center gap-3">
                <Tooltip title="Print Invoice">
                  <button
                    onClick={handlePrint}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Printer className="w-5 h-5" />
                  </button>
                </Tooltip>
                <Tooltip title="Email Invoice">
                  <button
                    onClick={() => handleEmail(selectedInvoice)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </button>
                </Tooltip>
                <Tooltip title="Download Invoice">
                  <button
                    onClick={() => handleDownload(selectedInvoice)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </Tooltip>
              </div>
            </div>

            <div className="p-8">
              {/* Invoice Header */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">INVOICE</h1>
                  <code className="text-lg font-mono text-gray-600 bg-gray-50 px-3 py-1 rounded border">{selectedInvoice.id}</code>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600 mb-1">AdRevenue Pro</div>
                  <p className="text-sm text-gray-600">
                    123 Business Street<br />
                    San Francisco, CA 94105<br />
                    billing@adrevenue.com
                  </p>
                </div>
              </div>

              {/* Invoice Details */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Bill To</h3>
                  <p className="text-gray-900 font-medium">John Doe</p>
                  <p className="text-sm text-gray-600">
                    john.doe@example.com<br />
                    Publisher ID: PUB-123456
                  </p>
                </div>
                <div className="text-right">
                  <div className="mb-2">
                    <span className="text-sm text-gray-600">Issue Date: </span>
                    <span className="text-gray-900 font-medium">
                      {new Date(selectedInvoice.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="mb-2">
                    <span className="text-sm text-gray-600">Due Date: </span>
                    <span className="text-gray-900 font-medium">
                      {new Date(selectedInvoice.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Period: </span>
                    <span className="text-gray-900 font-medium">{selectedInvoice.period}</span>
                  </div>
                </div>
              </div>

              {/* Invoice Items */}
              <div className="mb-8">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 text-sm font-semibold text-gray-700">Description</th>
                      <th className="text-right py-3 text-sm font-semibold text-gray-700">Quantity</th>
                      <th className="text-right py-3 text-sm font-semibold text-gray-700">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-4">
                        <p className="font-medium text-gray-900">Ad Impressions</p>
                        <p className="text-sm text-gray-600">{selectedInvoice.period}</p>
                      </td>
                      <td className="text-right py-4 text-gray-900">{selectedInvoice.impressions.toLocaleString()}</td>
                      <td className="text-right py-4 text-gray-900">${selectedInvoice.revenue.toFixed(2)}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4">
                        <p className="font-medium text-gray-900">Ad Clicks</p>
                        <p className="text-sm text-gray-600">{selectedInvoice.period}</p>
                      </td>
                      <td className="text-right py-4 text-gray-900">{selectedInvoice.clicks.toLocaleString()}</td>
                      <td className="text-right py-4 text-gray-900">$0.00</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-gray-300">
                      <td colSpan="2" className="text-right py-4 text-lg font-semibold text-gray-900">Total Amount Due</td>
                      <td className="text-right py-4 text-2xl font-bold text-gray-900">${selectedInvoice.amount.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Payment Status */}
              {selectedInvoice.status === 'paid' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-900">Payment Received</p>
                      <p className="text-sm text-green-800">
                        Paid on {new Date(selectedInvoice.paidDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Notes */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Notes</h3>
                <p className="text-sm text-gray-600">
                  Thank you for your partnership. Payments are processed within 7 business days of the due date.
                  For any questions regarding this invoice, please contact our support team at support@adrevenue.com.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-50 border border-green-200 rounded-lg shadow-lg p-4 min-w-[320px] z-50">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div className="flex-1">
              <div className="font-semibold text-green-800">Success</div>
              <div className="text-sm text-green-700 mt-0.5">{toast}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Simple Tooltip component
const Tooltip = ({ title, children }) => {
  const [show, setShow] = useState(false);
  
  return (
    <div className="relative">
      <div 
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>
      {show && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-50">
          {title}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
};

export default Invoices;