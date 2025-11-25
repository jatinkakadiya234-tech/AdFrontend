import React from 'react';
import { AlertCircle, Upload, Lock } from 'lucide-react';

const Step3BankingDetails = ({ formData, errors, onChange, onFileUpload }) => {
  return (
    <div className="min-h-[500px]">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Banking & Payment Details</h2>
      <p className="text-gray-600 mb-8">
        Securely provide your payment information for earnings withdrawal
      </p>

      {/* Security Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-6 flex gap-3">
        <Lock className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800">
          Your banking information is encrypted and stored securely. We use bank-level security to protect your data.
        </p>
      </div>

      <div className="space-y-5">
        {/* Bank Name & Account Holder */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Bank Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.bankName ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
              }`}
              value={formData.bankName}
              onChange={(e) => onChange('bankName', e.target.value)}
              placeholder="Enter bank name"
            />
            {errors.bankName && (
              <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.bankName}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Account Holder Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.accountHolderName ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
              }`}
              value={formData.accountHolderName}
              onChange={(e) => onChange('accountHolderName', e.target.value)}
              placeholder="Enter account holder name"
            />
            {errors.accountHolderName && (
              <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.accountHolderName}
              </div>
            )}
          </div>
        </div>

        {/* Account Number & IFSC */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Account Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.accountNumber ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
              }`}
              value={formData.accountNumber}
              onChange={(e) => onChange('accountNumber', e.target.value)}
              placeholder="Enter account number"
            />
            {errors.accountNumber && (
              <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.accountNumber}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              IFSC/SWIFT/IBAN Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.ifscCode ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
              }`}
              value={formData.ifscCode}
              onChange={(e) => onChange('ifscCode', e.target.value)}
              placeholder="Enter IFSC/SWIFT/IBAN code"
            />
            {errors.ifscCode && (
              <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.ifscCode}
              </div>
            )}
          </div>
        </div>

        {/* Branch Address */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Branch Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
              errors.branchAddress ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
            }`}
            value={formData.branchAddress}
            onChange={(e) => onChange('branchAddress', e.target.value)}
            placeholder="Enter bank branch address"
          />
          {errors.branchAddress && (
            <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
              <AlertCircle className="w-3 h-3" />
              {errors.branchAddress}
            </div>
          )}
        </div>

        {/* Bank Statement Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Bank Statement <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-600 mb-2">Upload last 3 months bank statement for verification</p>
          <label
            className={`block border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
              formData.bankStatement
                ? 'border-green-500 bg-green-50'
                : errors.bankStatement
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300 bg-gray-50 hover:border-blue-600 hover:bg-blue-50'
            }`}
          >
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => onFileUpload('bankStatement', e.target.files[0])}
            />
            <Upload className={`w-8 h-8 mx-auto mb-3 ${formData.bankStatement ? 'text-green-500' : 'text-gray-400'}`} />
            {formData.bankStatement ? (
              <>
                <p className="font-semibold text-green-600 mb-1">✓ {formData.bankStatement.name}</p>
                <p className="text-xs text-gray-600">Click to change file</p>
              </>
            ) : (
              <>
                <p className="font-semibold text-gray-700 mb-1">Upload Bank Statement</p>
                <p className="text-xs text-gray-600">PDF only (Max 10MB)</p>
              </>
            )}
          </label>
          {errors.bankStatement && (
            <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
              <AlertCircle className="w-3 h-3" />
              {errors.bankStatement}
            </div>
          )}
        </div>

        {/* Payment Preferences */}
        <div className="pt-6 border-t-2 border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Payment Preferences
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Minimum Payout Threshold <span className="text-red-500">*</span>
              </label>
              <select
                className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                  errors.minPayoutThreshold ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
                }`}
                value={formData.minPayoutThreshold}
                onChange={(e) => onChange('minPayoutThreshold', e.target.value)}
              >
                <option value="">Select threshold</option>
                <option value="$50">$50</option>
                <option value="$100">$100 (Recommended)</option>
                <option value="$200">$200</option>
                <option value="$500">$500</option>
              </select>
              <p className="text-xs text-gray-600 mt-1">Minimum balance required before payout</p>
              {errors.minPayoutThreshold && (
                <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.minPayoutThreshold}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Payment Frequency <span className="text-red-500">*</span>
              </label>
              <select
                className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                  errors.paymentFrequency ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
                }`}
                value={formData.paymentFrequency}
                onChange={(e) => onChange('paymentFrequency', e.target.value)}
              >
                <option value="">Select frequency</option>
                <option value="Weekly">Weekly</option>
                <option value="Bi-weekly">Bi-weekly</option>
                <option value="Monthly">Monthly (Recommended)</option>
              </select>
              <p className="text-xs text-gray-600 mt-1">How often you want to receive payments</p>
              {errors.paymentFrequency && (
                <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.paymentFrequency}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3BankingDetails;