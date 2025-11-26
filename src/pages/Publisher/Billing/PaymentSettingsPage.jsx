import React, { useState } from 'react';
import {
  Card,
  Button,
  Input,
  Radio,
  Switch,
  Modal,
  Form,
  Select,
  message,
  Tag,
  Divider,
  Alert,
  Space,
} from 'antd';
import {
  CreditCard,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Calendar,
  Settings,
  FileText,
  Mail,
  Building,
  MapPin,
  Hash,
  Save,
} from 'lucide-react';
import { FaUniversity, FaPaypal, FaCcStripe, FaCheckCircle } from 'react-icons/fa';
import { SiPayoneer } from 'react-icons/si';

const { Option } = Select;

const PaymentSettingsPage = () => {
  const [form] = Form.useForm();
  const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false);
  const [paymentMethodType, setPaymentMethodType] = useState('bank');
  const [minimumPayout, setMinimumPayout] = useState(100);
  const [payoutFrequency, setPayoutFrequency] = useState('monthly');
  const [automaticPayout, setAutomaticPayout] = useState(true);
  const [sendInvoiceEmail, setSendInvoiceEmail] = useState(true);
  const [includeTaxBreakdown, setIncludeTaxBreakdown] = useState(true);

  // Mock Payment Methods
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'bank',
      isPrimary: true,
      bank: 'Chase Bank',
      account: '****1234',
      addedDate: 'Jan 15, 2025',
      verified: true,
    },
    {
      id: 2,
      type: 'paypal',
      isPrimary: false,
      email: 'user@email.com',
      verified: true,
    },
  ]);

  // Payment Method Icons
  const paymentIcons = {
    bank: <FaUniversity className="w-6 h-6 text-blue-600" />,
    paypal: <FaPaypal className="w-6 h-6 text-blue-600" />,
    stripe: <FaCcStripe className="w-6 h-6 text-purple-600" />,
    payoneer: <SiPayoneer className="w-6 h-6 text-orange-600" />,
  };

  // Payment Method Names
  const paymentNames = {
    bank: 'Bank Transfer',
    paypal: 'PayPal',
    stripe: 'Stripe',
    payoneer: 'Payoneer',
  };

  // Handle Set Primary
  const handleSetPrimary = (id) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isPrimary: method.id === id,
      }))
    );
    message.success('Primary payment method updated');
  };

  // Handle Remove Payment Method
  const handleRemovePaymentMethod = (id) => {
    Modal.confirm({
      title: 'Remove Payment Method',
      content: 'Are you sure you want to remove this payment method?',
      okText: 'Remove',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
        message.success('Payment method removed successfully');
      },
    });
  };

  // Handle Add Payment Method
  const handleAddPaymentMethod = () => {
    form.validateFields().then((values) => {
      const newMethod = {
        id: paymentMethods.length + 1,
        type: paymentMethodType,
        isPrimary: paymentMethods.length === 0,
        verified: true,
        ...values,
      };
      setPaymentMethods([...paymentMethods, newMethod]);
      message.success('Payment method added successfully');
      setIsAddPaymentModalOpen(false);
      form.resetFields();
    });
  };

  // Handle Save Settings
  const handleSaveSettings = () => {
    message.success('Payment settings saved successfully');
  };

  // Payment Method Card Component
  const PaymentMethodCard = ({ method }) => (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            {paymentIcons[method.type]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{paymentNames[method.type]}</h3>
              {method.isPrimary && (
                <Tag color="purple" className="text-xs">
                  Primary
                </Tag>
              )}
            </div>
            {method.verified && (
              <div className="flex items-center gap-1 text-green-600 text-xs mt-1">
                <FaCheckCircle className="w-3 h-3" />
                Verified
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2 text-sm mb-4">
        {method.type === 'bank' && (
          <>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Bank:</span>
              <span className="font-medium text-gray-900">{method.bank}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Account:</span>
              <span className="font-mono font-medium text-gray-900">{method.account}</span>
            </div>
          </>
        )}
        {method.type === 'paypal' && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="font-medium text-gray-900">{method.email}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Added:</span>
          <span className="font-medium text-gray-900">{method.addedDate || 'Recently'}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button size="small" icon={<Edit className="w-3.5 h-3.5" />}>
          Edit
        </Button>
        {!method.isPrimary && (
          <>
            <Button size="small" type="primary" onClick={() => handleSetPrimary(method.id)}>
              Set Primary
            </Button>
            <Button
              size="small"
              danger
              icon={<Trash2 className="w-3.5 h-3.5" />}
              onClick={() => handleRemovePaymentMethod(method.id)}
            >
              Remove
            </Button>
          </>
        )}
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Settings</h1>
          <p className="text-gray-600">Manage your payment methods and payout preferences</p>
        </div>

        {/* Payment Methods Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Payment Methods</h2>
            <Button
              type="primary"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setIsAddPaymentModalOpen(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Add New Payment Method
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paymentMethods.map((method) => (
              <PaymentMethodCard key={method.id} method={method} />
            ))}
          </div>
        </div>

        {/* Payout Preferences Section */}
        <Card className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Payout Preferences</h2>
          </div>

          <div className="space-y-6">
            {/* Minimum Payout Threshold */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Minimum Payout Threshold
              </h3>
              <Radio.Group value={minimumPayout} onChange={(e) => setMinimumPayout(e.target.value)}>
                <Space direction="vertical" className="w-full">
                  <Radio value={50}>
                    <div>
                      <span className="font-medium">$50</span>
                      <span className="text-gray-600 text-sm ml-2">
                        (Payout when balance ≥ $50)
                      </span>
                    </div>
                  </Radio>
                  <Radio value={100}>
                    <div>
                      <span className="font-medium">$100</span>
                      <Tag color="green" className="ml-2">
                        Recommended
                      </Tag>
                    </div>
                  </Radio>
                  <Radio value={200}>
                    <span className="font-medium">$200</span>
                  </Radio>
                  <Radio value={500}>
                    <span className="font-medium">$500</span>
                  </Radio>
                  <Radio value="custom">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Custom:</span>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        prefix={<DollarSign className="w-4 h-4 text-gray-400" />}
                        className="w-32"
                        disabled={minimumPayout !== 'custom'}
                      />
                    </div>
                  </Radio>
                </Space>
              </Radio.Group>
            </div>

            <Divider />

            {/* Payout Frequency */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Payout Frequency
              </h3>
              <Radio.Group value={payoutFrequency} onChange={(e) => setPayoutFrequency(e.target.value)}>
                <Space direction="vertical" className="w-full">
                  <Radio value="weekly">
                    <div>
                      <span className="font-medium">Weekly</span>
                      <span className="text-gray-600 text-sm ml-2">
                        (Every Friday if balance ≥ threshold)
                      </span>
                    </div>
                  </Radio>
                  <Radio value="biweekly">
                    <div>
                      <span className="font-medium">Bi-weekly</span>
                      <span className="text-gray-600 text-sm ml-2">(1st and 15th of month)</span>
                    </div>
                  </Radio>
                  <Radio value="monthly">
                    <div>
                      <span className="font-medium">Monthly</span>
                      <span className="text-gray-600 text-sm ml-2">(15th of month)</span>
                    </div>
                  </Radio>
                  <Radio value="manual">
                    <div>
                      <span className="font-medium">Manual</span>
                      <span className="text-gray-600 text-sm ml-2">(Only when I request)</span>
                    </div>
                  </Radio>
                </Space>
              </Radio.Group>
            </div>

            <Divider />

            {/* Automatic Payout */}
            <div className="flex items-start justify-between bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  Automatic Payout
                </h3>
                <p className="text-sm text-gray-600">
                  Automatically request payout when balance reaches threshold
                </p>
                {!automaticPayout && (
                  <p className="text-xs text-orange-600 mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Manual payout request required
                  </p>
                )}
              </div>
              <Switch checked={automaticPayout} onChange={setAutomaticPayout} />
            </div>
          </div>
        </Card>

        {/* Invoicing Settings Section */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Invoicing Settings</h2>
          </div>

          <div className="space-y-6">
            {/* Company/Billing Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Company/Billing Name
                </label>
                <Input size="large" placeholder="Enter company name" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <Input size="large" type="email" placeholder="user@email.com" defaultValue="user@email.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Billing Address
              </label>
              <Input.TextArea rows={3} placeholder="Enter billing address" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Hash className="w-4 h-4" />
                VAT/Tax ID (if applicable)
              </label>
              <Input size="large" placeholder="Enter VAT/Tax ID" />
            </div>

            <Divider />

            {/* Invoice Preferences */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Invoice Preferences</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Send invoice via email</p>
                    <p className="text-sm text-gray-600">Automatically email invoices after each payout</p>
                  </div>
                  <Switch checked={sendInvoiceEmail} onChange={setSendInvoiceEmail} />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Include tax breakdown</p>
                    <p className="text-sm text-gray-600">Show detailed tax information on invoices</p>
                  </div>
                  <Switch checked={includeTaxBreakdown} onChange={setIncludeTaxBreakdown} />
                </div>
              </div>
            </div>
          </div>

          <Divider />

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              type="primary"
              size="large"
              icon={<Save className="w-4 h-4" />}
              onClick={handleSaveSettings}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Save Settings
            </Button>
          </div>
        </Card>

        {/* Info Alert */}
        <Alert
          message="Payment Processing Times"
          description="Bank transfers typically take 3-5 business days. PayPal and other methods may process faster (1-2 business days). Processing times may vary based on your location and payment provider."
          type="info"
          showIcon
          icon={<AlertCircle className="w-4 h-4" />}
          className="mt-6"
        />
      </div>

      {/* Add Payment Method Modal */}
      <Modal
        title="Add New Payment Method"
        open={isAddPaymentModalOpen}
        onCancel={() => setIsAddPaymentModalOpen(false)}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" className="py-4">
          <Form.Item label="Payment Method Type" name="type" initialValue="bank">
            <Select
              size="large"
              value={paymentMethodType}
              onChange={setPaymentMethodType}
              suffixIcon={<CreditCard className="w-4 h-4" />}
            >
              <Option value="bank">
                <div className="flex items-center gap-2">
                  <FaUniversity className="text-blue-600" />
                  Bank Transfer
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
                  <SiPayoneer className="text-orange-600" />
                  Payoneer
                </div>
              </Option>
            </Select>
          </Form.Item>

          {paymentMethodType === 'bank' && (
            <>
              <Form.Item
                label="Bank Name"
                name="bank"
                rules={[{ required: true, message: 'Please enter bank name' }]}
              >
                <Input size="large" placeholder="Enter bank name" />
              </Form.Item>
              <Form.Item
                label="Account Number"
                name="account"
                rules={[{ required: true, message: 'Please enter account number' }]}
              >
                <Input size="large" placeholder="Enter account number" />
              </Form.Item>
              <Form.Item
                label="Account Holder Name"
                name="holderName"
                rules={[{ required: true, message: 'Please enter account holder name' }]}
              >
                <Input size="large" placeholder="Enter account holder name" />
              </Form.Item>
              <Form.Item label="Routing Number" name="routing">
                <Input size="large" placeholder="Enter routing number (optional)" />
              </Form.Item>
            </>
          )}

          {paymentMethodType === 'paypal' && (
            <Form.Item
              label="PayPal Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter PayPal email' },
                { type: 'email', message: 'Please enter valid email' },
              ]}
            >
              <Input size="large" type="email" placeholder="Enter PayPal email" />
            </Form.Item>
          )}

          {paymentMethodType === 'payoneer' && (
            <Form.Item
              label="Payoneer Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter Payoneer email' },
                { type: 'email', message: 'Please enter valid email' },
              ]}
            >
              <Input size="large" type="email" placeholder="Enter Payoneer email" />
            </Form.Item>
          )}

          <Alert
            message="Verification Required"
            description="After adding your payment method, you may need to verify it before receiving payouts. You'll receive verification instructions via email."
            type="warning"
            showIcon
            className="mb-4"
          />

          <div className="flex gap-3">
            <Button size="large" onClick={() => setIsAddPaymentModalOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={handleAddPaymentMethod}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
              icon={<Plus className="w-4 h-4" />}
            >
              Add Payment Method
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default PaymentSettingsPage;
