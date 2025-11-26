import React, { useState } from 'react';
import {
  Card,
  Button,
  Progress,
  Statistic,
  Input,
  Select,
  Modal,
  message,
  Tag,
  Divider,
  Alert,
  Tooltip,
} from 'antd';
import {
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  Wallet,
  CreditCard,
  Calendar,
  Settings,
  Info,
  Download,
  ArrowRight,
  AlertCircle,
  Activity,
} from 'lucide-react';
import { FaDollarSign, FaPaypal, FaUniversity } from 'react-icons/fa';

const { Option } = Select;

const EarningsOverviewPage = () => {
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bank');

  // Mock Data
  const earningsData = {
    currentBalance: 1234.56,
    lastUpdated: '2 hours ago',
    minimumPayout: 100,
    pendingEarnings: 234.56,
    confirmedEarnings: 1000.0,
    totalEarnings: 15234.56,
    paymentRequested: 500.0,
    paidOut: 13500.0,
    averageMonthly: 1523,
    highestMonth: { month: 'March 2025', amount: 2340 },
    activeCampaigns: 12,
    nextPayout: 'June 15, 2025',
  };

  const paymentFee = 0;
  const netAmount = payoutAmount ? parseFloat(payoutAmount) - paymentFee : 0;

  const handleRequestPayout = () => {
    if (!payoutAmount || parseFloat(payoutAmount) < earningsData.minimumPayout) {
      message.error(`Minimum payout amount is $${earningsData.minimumPayout}`);
      return;
    }
    if (parseFloat(payoutAmount) > earningsData.confirmedEarnings) {
      message.error('Amount exceeds available balance');
      return;
    }

    Modal.confirm({
      title: 'Confirm Payout Request',
      content: (
        <div className="space-y-3">
          <p>
            <strong>Amount:</strong> ${parseFloat(payoutAmount).toFixed(2)}
          </p>
          <p>
            <strong>Payment Method:</strong>{' '}
            {paymentMethod === 'bank' ? 'Bank Transfer' : paymentMethod === 'paypal' ? 'PayPal' : 'Payoneer'}
          </p>
          <p>
            <strong>Processing Time:</strong> 3-5 business days
          </p>
          <p>
            <strong>Net Amount:</strong> ${netAmount.toFixed(2)}
          </p>
        </div>
      ),
      onOk: () => {
        message.success('Payout request submitted successfully!');
        setIsPayoutModalOpen(false);
        setPayoutAmount('');
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Earnings Overview</h1>
          <p className="text-gray-600">Manage your earnings and request payouts</p>
        </div>

        {/* Current Balance Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 bg-gradient-to-br from-purple-600 to-purple-700 border-0">
            <div className="text-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-purple-200 text-sm mb-2">CURRENT BALANCE</p>
                  <h2 className="text-5xl font-bold">${earningsData.currentBalance.toFixed(2)}</h2>
                </div>
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Wallet className="w-8 h-8" />
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-purple-200">Last updated:</span>
                  <span className="font-semibold">{earningsData.lastUpdated}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-purple-200">Minimum payout:</span>
                  <span className="font-semibold">${earningsData.minimumPayout}</span>
                </div>
              </div>

              <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Eligible for withdrawal</span>
                </div>
              </div>

              <Button
                type="primary"
                size="large"
                block
                className="bg-white text-purple-600 hover:bg-purple-50 border-0 font-semibold"
                icon={<ArrowRight className="w-5 h-5" />}
                onClick={() => setIsPayoutModalOpen(true)}
              >
                Request Payout
              </Button>
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="space-y-4">
            <Card>
              <Statistic
                title="Average Monthly Earnings"
                value={earningsData.averageMonthly}
                prefix="$"
                valueStyle={{ color: '#8b5cf6', fontWeight: 'bold' }}
                suffix={
                  <Tooltip title="Based on last 6 months">
                    <Info className="w-4 h-4 text-gray-400 ml-2" />
                  </Tooltip>
                }
              />
            </Card>
            <Card>
              <Statistic
                title="Highest Earning Month"
                value={earningsData.highestMonth.amount}
                prefix="$"
                valueStyle={{ color: '#10b981', fontWeight: 'bold' }}
              />
              <p className="text-xs text-gray-500 mt-2">{earningsData.highestMonth.month}</p>
            </Card>
            <Card>
              <Statistic
                title="Active Campaigns"
                value={earningsData.activeCampaigns}
                valueStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                suffix={<Activity className="w-4 h-4 text-blue-600 ml-2" />}
              />
            </Card>
          </div>
        </div>

        {/* Earnings Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Pending Earnings</h3>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-orange-600 mb-2">${earningsData.pendingEarnings.toFixed(2)}</p>
            <p className="text-sm text-gray-600">Not yet confirmed</p>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Confirmed Earnings</h3>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-green-600 mb-2">${earningsData.confirmedEarnings.toFixed(2)}</p>
            <p className="text-sm text-gray-600">Available for payout</p>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Earnings</h3>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-purple-600 mb-2">${earningsData.totalEarnings.toFixed(2)}</p>
            <p className="text-sm text-gray-600">All time</p>
          </Card>
        </div>

        {/* Earnings by Status */}
        <Card className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Earnings by Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Available for Withdrawal</p>
                  <p className="text-sm text-gray-600">Ready to request payout</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">${earningsData.confirmedEarnings.toFixed(2)}</p>
                <Button type="link" size="small" className="text-green-600 px-0">
                  Request Now →
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Payment Requested</p>
                  <p className="text-sm text-gray-600">Processing (Est. 3-5 days)</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">${earningsData.paymentRequested.toFixed(2)}</p>
                <Button type="link" size="small" className="text-blue-600 px-0">
                  View Status →
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Download className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Paid Out</p>
                  <p className="text-sm text-gray-600">View transaction history</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-purple-600">${earningsData.paidOut.toFixed(2)}</p>
                <Button type="link" size="small" className="text-purple-600 px-0">
                  View History →
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Payout Schedule */}
        <Card>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Payout Schedule</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <strong className="text-gray-900">Next automatic payout:</strong> {earningsData.nextPayout} (if
                  balance ≥ ${earningsData.minimumPayout})
                </p>
                <p>
                  <strong className="text-gray-900">Payout frequency:</strong> Monthly (15th of each month)
                </p>
                <Button
                  type="link"
                  size="small"
                  icon={<Settings className="w-4 h-4" />}
                  className="px-0 text-purple-600"
                >
                  Change payout settings
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Request Payout Modal */}
      <Modal
        title="Request Payout"
        open={isPayoutModalOpen}
        onCancel={() => setIsPayoutModalOpen(false)}
        footer={null}
        width={600}
      >
        <div className="space-y-6 py-4">
          <Alert
            message="Available Balance"
            description={`You can withdraw up to $${earningsData.confirmedEarnings.toFixed(2)}`}
            type="info"
            showIcon
            icon={<Info className="w-4 h-4" />}
          />

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Amount to Withdraw <span className="text-red-500">*</span>
            </label>
            <Input
              size="large"
              type="number"
              placeholder="Enter amount"
              prefix={<DollarSign className="w-4 h-4 text-gray-400" />}
              value={payoutAmount}
              onChange={(e) => setPayoutAmount(e.target.value)}
              max={earningsData.confirmedEarnings}
            />
            <p className="text-xs text-gray-500 mt-1">
              Minimum: ${earningsData.minimumPayout} • Maximum: ${earningsData.confirmedEarnings.toFixed(2)}
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Payment Method <span className="text-red-500">*</span>
            </label>
            <Select
              size="large"
              value={paymentMethod}
              onChange={setPaymentMethod}
              className="w-full"
              suffixIcon={<CreditCard className="w-4 h-4" />}
            >
              <Option value="bank">
                <div className="flex items-center gap-2">
                  <FaUniversity className="text-blue-600" />
                  Bank Transfer (Default)
                </div>
              </Option>
              <Option value="paypal">
                <div className="flex items-center gap-2">
                  <FaPaypal className="text-blue-600" />
                  PayPal
                </div>
              </Option>
              <Option value="payoneer">
                <div className="flex items-center gap-2">
                  <FaDollarSign className="text-orange-600" />
                  Payoneer
                </div>
              </Option>
            </Select>
          </div>

          <Divider />

          <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Amount</span>
              <span className="font-semibold text-gray-900">
                ${payoutAmount ? parseFloat(payoutAmount).toFixed(2) : '0.00'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Processing Fee</span>
              <span className="font-semibold text-green-600">
                ${paymentFee.toFixed(2)} <Tag color="success">Free</Tag>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Expected Processing Time</span>
              <span className="font-semibold text-gray-900">3-5 business days</span>
            </div>
            <Divider className="my-2" />
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900">Net Amount You'll Receive</span>
              <span className="text-2xl font-bold text-purple-600">${netAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button size="large" onClick={() => setIsPayoutModalOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={handleRequestPayout}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
              icon={<CheckCircle className="w-4 h-4" />}
            >
              Request Payout
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EarningsOverviewPage;
