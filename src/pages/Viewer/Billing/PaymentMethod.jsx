import React, { useState } from 'react';
import { CreditCard, Building2, Wallet, Plus, Check, X, AlertCircle, Edit2, Trash2, Shield, Info } from 'lucide-react';

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'bank',
      isPrimary: true,
      details: {
        accountName: 'John Doe',
        bankName: 'Chase Bank',
        accountNumber: '****6789',
        routingNumber: '****4532',
        accountType: 'Checking'
      },
      verified: true,
      addedDate: '2025-01-15'
    },
    {
      id: 2,
      type: 'paypal',
      isPrimary: false,
      details: {
        email: 'john.doe@example.com'
      },
      verified: true,
      addedDate: '2025-02-20'
    },
    {
      id: 3,
      type: 'payoneer',
      isPrimary: false,
      details: {
        email: 'john.doe@payoneer.com'
      },
      verified: false,
      addedDate: '2025-11-28'
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [newMethodType, setNewMethodType] = useState('');
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    accountName: '',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    accountType: 'checking',
    swiftCode: '',
    paypalEmail: '',
    payoneerEmail: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const paymentMethodTypes = [
    {
      type: 'bank',
      icon: Building2,
      name: 'Bank Transfer',
      description: 'Direct deposit to your bank account',
      fee: 'No fees',
      processingTime: '3-5 business days',
      color: 'from-blue-500 to-blue-600'
    },
    {
      type: 'paypal',
      icon: Wallet,
      name: 'PayPal',
      description: 'Fast and easy withdrawals',
      fee: '2.9% fee',
      processingTime: 'Instant',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      type: 'payoneer',
      icon: CreditCard,
      name: 'Payoneer',
      description: 'Best for international users',
      fee: '$3 per transfer',
      processingTime: '1-2 business days',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const showToast = (title, message, type = 'success') => {
    setToast({ title, message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleAddMethod = () => {
    setSelectedMethod(null);
    setNewMethodType('');
    setFormData({
      accountName: '',
      bankName: '',
      accountNumber: '',
      routingNumber: '',
      accountType: 'checking',
      swiftCode: '',
      paypalEmail: '',
      payoneerEmail: ''
    });
    setFormErrors({});
    setIsAddModalOpen(true);
  };

  const handleSelectMethodType = (type) => {
    setNewMethodType(type);
  };

  const validateForm = () => {
    const errors = {};

    if (newMethodType === 'bank') {
      if (!formData.accountName) errors.accountName = 'Account name is required';
      if (!formData.bankName) errors.bankName = 'Bank name is required';
      if (!formData.accountNumber) errors.accountNumber = 'Account number is required';
      if (!formData.routingNumber) errors.routingNumber = 'Routing number is required';
    } else if (newMethodType === 'paypal') {
      if (!formData.paypalEmail) errors.paypalEmail = 'PayPal email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.paypalEmail)) errors.paypalEmail = 'Invalid email format';
    } else if (newMethodType === 'payoneer') {
      if (!formData.payoneerEmail) errors.payoneerEmail = 'Payoneer email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.payoneerEmail)) errors.payoneerEmail = 'Invalid email format';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const newMethod = {
      id: Date.now(),
      type: newMethodType,
      isPrimary: paymentMethods.length === 0,
      verified: false,
      addedDate: new Date().toISOString().split('T')[0],
      details: {}
    };

    if (newMethodType === 'bank') {
      newMethod.details = {
        accountName: formData.accountName,
        bankName: formData.bankName,
        accountNumber: `****${formData.accountNumber.slice(-4)}`,
        routingNumber: `****${formData.routingNumber.slice(-4)}`,
        accountType: formData.accountType,
        swiftCode: formData.swiftCode
      };
    } else if (newMethodType === 'paypal') {
      newMethod.details = {
        email: formData.paypalEmail
      };
    } else if (newMethodType === 'payoneer') {
      newMethod.details = {
        email: formData.payoneerEmail
      };
    }

    setPaymentMethods([...paymentMethods, newMethod]);
    setIsAddModalOpen(false);
    showToast('Success', 'Payment method added successfully. Verification in progress.', 'success');
  };

  const handleSetPrimary = (id) => {
    setPaymentMethods(methods =>
      methods.map(m => ({ ...m, isPrimary: m.id === id }))
    );
    showToast('Success', 'Primary payment method updated', 'success');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this payment method?')) {
      setPaymentMethods(methods => methods.filter(m => m.id !== id));
      showToast('Success', 'Payment method removed', 'success');
    }
  };

  const getMethodIcon = (type) => {
    const method = paymentMethodTypes.find(m => m.type === type);
    return method ? method.icon : CreditCard;
  };

  const getMethodName = (type) => {
    const method = paymentMethodTypes.find(m => m.type === type);
    return method ? method.name : type;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Methods</h1>
              <p className="text-gray-600">Manage how you receive payments from your ad revenue</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">Last updated: Today</span>
            </div>
          </div>
        </div>

        {/* Warning Banner if no payment method */}
        {paymentMethods.length === 0 && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-1">No Payment Method Added</h3>
                <p className="text-sm text-yellow-700">
                  Add a payment method to receive your earnings. You won't be able to withdraw until this is set up.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Current Balance Card */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 mb-8 text-white shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 text-sm mb-1">Available Balance</p>
              <h2 className="text-4xl font-bold mb-2">$1,245.67</h2>
              <p className="text-blue-100 text-sm">Ready for withdrawal</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <Wallet className="w-8 h-8" />
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/20 flex justify-between items-center">
            <div>
              <p className="text-blue-100 text-xs">Next Payment</p>
              <p className="font-semibold">December 15, 2025</p>
            </div>
            <button className="bg-white text-blue-600 px-6 py-2.5 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-sm">
              Withdraw Funds
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Payment Methods</p>
                <p className="text-2xl font-bold text-gray-900">{paymentMethods.length}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Verified</p>
                <p className="text-2xl font-bold text-gray-900">
                  {paymentMethods.filter(m => m.verified).length}
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Check className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {paymentMethods.filter(m => !m.verified).length}
                </p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods List */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Your Payment Methods</h2>
            <button
              onClick={handleAddMethod}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Add Payment Method
            </button>
          </div>

          {paymentMethods.length > 0 ? (
            <div className="space-y-4">
              {paymentMethods.map(method => {
                const Icon = getMethodIcon(method.type);
                return (
                  <div
                    key={method.id}
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-3 bg-gray-100 rounded-lg">
                          <Icon className="w-6 h-6 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {getMethodName(method.type)}
                            </h3>
                            {method.isPrimary && (
                              <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                Primary
                              </span>
                            )}
                            {method.verified ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                <Check className="w-3 h-3" />
                                Verified
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                                <AlertCircle className="w-3 h-3" />
                                Pending Verification
                              </span>
                            )}
                          </div>

                          {method.type === 'bank' && (
                            <div className="space-y-1.5 text-sm text-gray-600">
                              <p><span className="font-medium">Bank:</span> {method.details.bankName}</p>
                              <p><span className="font-medium">Account:</span> {method.details.accountType} {method.details.accountNumber}</p>
                              <p><span className="font-medium">Routing:</span> {method.details.routingNumber}</p>
                              <p><span className="font-medium">Account Holder:</span> {method.details.accountName}</p>
                            </div>
                          )}

                          {(method.type === 'paypal' || method.type === 'payoneer') && (
                            <p className="text-sm text-gray-600">
                              {method.details.email}
                            </p>
                          )}

                          <p className="text-xs text-gray-500 mt-2">
                            Added on {new Date(method.addedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        {!method.isPrimary && method.verified && (
                          <button
                            onClick={() => handleSetPrimary(method.id)}
                            className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Set as Primary
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(method.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
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
                <CreditCard className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Payment Methods</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Add your first payment method to start receiving payments. You can choose from bank transfer, PayPal, or Payoneer.
              </p>
              <button
                onClick={handleAddMethod}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
              >
                <Plus className="w-5 h-5" />
                Add Payment Method
              </button>
            </div>
          )}
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Your payment information is secure</h4>
              <p className="text-sm text-blue-800">
                All payment data is encrypted and stored securely using bank-level security. We never share your financial information with third parties.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Payment Method Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setIsAddModalOpen(false)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
              <h2 className="text-xl font-semibold text-gray-900">Add Payment Method</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {!newMethodType ? (
                <div>
                  <p className="text-gray-600 mb-6">Choose how you want to receive payments</p>
                  <div className="space-y-3">
                    {paymentMethodTypes.map(method => {
                      const Icon = method.icon;
                      return (
                        <button
                          key={method.type}
                          onClick={() => handleSelectMethodType(method.type)}
                          className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-all duration-200 text-left group hover:shadow-sm"
                        >
                          <div className="flex items-start gap-4">
                            <div className={`p-3 bg-gradient-to-br ${method.color} rounded-lg group-hover:scale-105 transition-transform`}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-1">{method.name}</h3>
                              <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                              <div className="flex gap-4 text-xs text-gray-500">
                                <span>💰 {method.fee}</span>
                                <span>⏱️ {method.processingTime}</span>
                              </div>
                            </div>
                            <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
                              <Plus className="w-5 h-5" />
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <button
                      type="button"
                      onClick={() => setNewMethodType('')}
                      className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Back to selection
                    </button>
                  </div>

                  {newMethodType === 'bank' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Account Holder Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className={`w-full px-4 py-2.5 bg-gray-50 border ${formErrors.accountName ? 'border-red-500' : 'border-gray-300'} rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                          placeholder="Full name as it appears on account"
                          value={formData.accountName}
                          onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                        />
                        {formErrors.accountName && <p className="mt-1 text-sm text-red-500">{formErrors.accountName}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bank Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className={`w-full px-4 py-2.5 bg-gray-50 border ${formErrors.bankName ? 'border-red-500' : 'border-gray-300'} rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                          placeholder="e.g., Chase Bank, Bank of America"
                          value={formData.bankName}
                          onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                        />
                        {formErrors.bankName && <p className="mt-1 text-sm text-red-500">{formErrors.bankName}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Account Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            className={`w-full px-4 py-2.5 bg-gray-50 border ${formErrors.accountNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                            placeholder="Account number"
                            value={formData.accountNumber}
                            onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                          />
                          {formErrors.accountNumber && <p className="mt-1 text-sm text-red-500">{formErrors.accountNumber}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Routing Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            className={`w-full px-4 py-2.5 bg-gray-50 border ${formErrors.routingNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                            placeholder="Routing number"
                            value={formData.routingNumber}
                            onChange={(e) => setFormData({ ...formData, routingNumber: e.target.value })}
                          />
                          {formErrors.routingNumber && <p className="mt-1 text-sm text-red-500">{formErrors.routingNumber}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Account Type
                        </label>
                        <select
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          value={formData.accountType}
                          onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
                        >
                          <option value="checking">Checking Account</option>
                          <option value="savings">Savings Account</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          SWIFT/BIC Code (International only)
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Optional for international transfers"
                          value={formData.swiftCode}
                          onChange={(e) => setFormData({ ...formData, swiftCode: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  {newMethodType === 'paypal' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PayPal Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        className={`w-full px-4 py-2.5 bg-gray-50 border ${formErrors.paypalEmail ? 'border-red-500' : 'border-gray-300'} rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                        placeholder="your-paypal@example.com"
                        value={formData.paypalEmail}
                        onChange={(e) => setFormData({ ...formData, paypalEmail: e.target.value })}
                      />
                      {formErrors.paypalEmail && <p className="mt-1 text-sm text-red-500">{formErrors.paypalEmail}</p>}
                      <p className="mt-2 text-sm text-gray-500">
                        Enter the email address associated with your PayPal account
                      </p>
                    </div>
                  )}

                  {newMethodType === 'payoneer' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payoneer Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        className={`w-full px-4 py-2.5 bg-gray-50 border ${formErrors.payoneerEmail ? 'border-red-500' : 'border-gray-300'} rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                        placeholder="your-payoneer@example.com"
                        value={formData.payoneerEmail}
                        onChange={(e) => setFormData({ ...formData, payoneerEmail: e.target.value })}
                      />
                      {formErrors.payoneerEmail && <p className="mt-1 text-sm text-red-500">{formErrors.payoneerEmail}</p>}
                      <p className="mt-2 text-sm text-gray-500">
                        Enter the email address associated with your Payoneer account
                      </p>
                    </div>
                  )}

                  <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex gap-3">
                      <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">Verification Required</p>
                        <p>
                          {newMethodType === 'bank' && 'We will send micro-deposits to verify your bank account. This usually takes 1-2 business days.'}
                          {newMethodType === 'paypal' && 'We will send a verification email to your PayPal address. Please confirm to activate.'}
                          {newMethodType === 'payoneer' && 'We will send a verification email to your Payoneer address. Please confirm to activate.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="flex-1 px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
                    >
                      Add Payment Method
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 ${toast.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border rounded-lg shadow-lg p-4 min-w-[320px] z-50`}>
          <div className="flex items-start gap-3">
            <div className={toast.type === 'success' ? 'text-green-600' : 'text-red-600'}>
              {toast.type === 'success' ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <div className={`font-semibold ${toast.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>{toast.title}</div>
              <div className={`text-sm mt-0.5 ${toast.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>{toast.message}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;