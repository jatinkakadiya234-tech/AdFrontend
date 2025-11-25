import React from 'react';
import { AlertCircle, Edit2, Shield, Calendar } from 'lucide-react';

const Step5ReviewSubmit = ({ formData, errors, onChange, onEdit }) => {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const maskAccountNumber = (number) => {
    if (!number) return '-';
    return '****' + number.slice(-4);
  };

  return (
    <div className="min-h-[500px]">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Review & Submit</h2>
      <p className="text-gray-600 mb-8">
        Please review all information before submitting your application
      </p>

      {/* Company Details */}
      <div className="bg-white border-2 border-gray-200 rounded-lg p-5 mb-5">
        <div className="flex justify-between items-center mb-4 pb-3 border-b-2 border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Company Details</h3>
          <button
            type="button"
            onClick={() => onEdit(1)}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold text-sm"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-600 font-medium">Company Name:</span>
            <p className="text-gray-900 font-semibold mt-1">{formData.companyName || '-'}</p>
          </div>
          <div>
            <span className="text-gray-600 font-medium">Registration Number:</span>
            <p className="text-gray-900 font-semibold mt-1">{formData.registrationNumber || '-'}</p>
          </div>
          <div>
            <span className="text-gray-600 font-medium">Tax ID:</span>
            <p className="text-gray-900 font-semibold mt-1">{formData.taxId || '-'}</p>
          </div>
          <div>
            <span className="text-gray-600 font-medium">Incorporation Date:</span>
            <p className="text-gray-900 font-semibold mt-1">{formData.incorporationDate || '-'}</p>
          </div>
          <div className="md:col-span-2">
            <span className="text-gray-600 font-medium">Location:</span>
            <p className="text-gray-900 font-semibold mt-1">
              {formData.city}, {formData.state}, {formData.zipCode}, {formData.country}
            </p>
          </div>
          <div className="md:col-span-2">
            <span className="text-gray-600 font-medium">Authorized Person:</span>
            <p className="text-gray-900 font-semibold mt-1">
              {formData.authorizedPersonName} ({formData.authorizedPersonDesignation})
            </p>
          </div>
        </div>
      </div>

      {/* Platform Details */}
      <div className="bg-white border-2 border-gray-200 rounded-lg p-5 mb-5">
        <div className="flex justify-between items-center mb-4 pb-3 border-b-2 border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Platform Details</h3>
          <button
            type="button"
            onClick={() => onEdit(2)}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold text-sm"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="md:col-span-2">
            <span className="text-gray-600 font-medium">Website URL:</span>
            <p className="text-blue-600 font-semibold mt-1 break-all">
              <a href={formData.websiteUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {formData.websiteUrl || '-'}
              </a>
            </p>
          </div>
          <div>
            <span className="text-gray-600 font-medium">Category:</span>
            <p className="text-gray-900 font-semibold mt-1">{formData.websiteCategory || '-'}</p>
          </div>
          <div>
            <span className="text-gray-600 font-medium">Monthly Visitors:</span>
            <p className="text-gray-900 font-semibold mt-1">{formData.monthlyVisitors || '-'}</p>
          </div>
          <div>
            <span className="text-gray-600 font-medium">Language:</span>
            <p className="text-gray-900 font-semibold mt-1">{formData.websiteLanguage || '-'}</p>
          </div>
          <div className="md:col-span-2">
            <span className="text-gray-600 font-medium">Target Countries:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.audienceLocation.length > 0 ? (
                formData.audienceLocation.map((country) => (
                  <span key={country} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    {country}
                  </span>
                ))
              ) : (
                <span className="text-gray-900">-</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Banking Details */}
      <div className="bg-white border-2 border-gray-200 rounded-lg p-5 mb-5">
        <div className="flex justify-between items-center mb-4 pb-3 border-b-2 border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Banking Details</h3>
          <button
            type="button"
            onClick={() => onEdit(3)}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold text-sm"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-600 font-medium">Bank Name:</span>
            <p className="text-gray-900 font-semibold mt-1">{formData.bankName || '-'}</p>
          </div>
          <div>
            <span className="text-gray-600 font-medium">Account Holder:</span>
            <p className="text-gray-900 font-semibold mt-1">{formData.accountHolderName || '-'}</p>
          </div>
          <div>
            <span className="text-gray-600 font-medium">Account Number:</span>
            <p className="text-gray-900 font-semibold mt-1 font-mono tracking-wider">
              {maskAccountNumber(formData.accountNumber)}
            </p>
          </div>
          <div>
            <span className="text-gray-600 font-medium">IFSC/SWIFT Code:</span>
            <p className="text-gray-900 font-semibold mt-1">{formData.ifscCode || '-'}</p>
          </div>
          <div>
            <span className="text-gray-600 font-medium">Payout Threshold:</span>
            <p className="text-gray-900 font-semibold mt-1">{formData.minPayoutThreshold || '-'}</p>
          </div>
          <div>
            <span className="text-gray-600 font-medium">Payment Frequency:</span>
            <p className="text-gray-900 font-semibold mt-1">{formData.paymentFrequency || '-'}</p>
          </div>
        </div>
      </div>

      {/* Ad Preferences */}
      <div className="bg-white border-2 border-gray-200 rounded-lg p-5 mb-5">
        <div className="flex justify-between items-center mb-4 pb-3 border-b-2 border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Ad Preferences</h3>
          <button
            type="button"
            onClick={() => onEdit(4)}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold text-sm"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        </div>
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-gray-600 font-medium">Selected Ad Types:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.adTypes.length > 0 ? (
                formData.adTypes.map((type) => (
                  <span key={type} className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-semibold">
                    {type}
                  </span>
                ))
              ) : (
                <span className="text-gray-900">-</span>
              )}
            </div>
          </div>
          {formData.adTypes.includes('Banner Ads') && formData.bannerSizes.length > 0 && (
            <div>
              <span className="text-gray-600 font-medium">Banner Sizes:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.bannerSizes.map((size) => (
                  <span key={size} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-semibold">
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}
          {formData.audienceAgeGroup && (
            <div>
              <span className="text-gray-600 font-medium">Target Age Group:</span>
              <p className="text-gray-900 font-semibold mt-1">{formData.audienceAgeGroup}</p>
            </div>
          )}
          {formData.audienceInterests.length > 0 && (
            <div>
              <span className="text-gray-600 font-medium">Audience Interests:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.audienceInterests.map((interest) => (
                  <span key={interest} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-semibold">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Declarations */}
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-5 mb-5">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-yellow-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Declarations <span className="text-red-500">*</span>
          </h3>
        </div>
        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer hover:bg-yellow-100 p-2 rounded-lg transition-colors">
            <input
              type="checkbox"
              className="w-5 h-5 mt-0.5 text-blue-600 rounded focus:ring-2 focus:ring-blue-200"
              checked={formData.declaration1}
              onChange={(e) => onChange('declaration1', e.target.checked)}
            />
            <span className="text-sm text-gray-700">
              I declare that all information provided is accurate and true
            </span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer hover:bg-yellow-100 p-2 rounded-lg transition-colors">
            <input
              type="checkbox"
              className="w-5 h-5 mt-0.5 text-blue-600 rounded focus:ring-2 focus:ring-blue-200"
              checked={formData.declaration2}
              onChange={(e) => onChange('declaration2', e.target.checked)}
            />
            <span className="text-sm text-gray-700">
              I understand that false information may result in account termination
            </span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer hover:bg-yellow-100 p-2 rounded-lg transition-colors">
            <input
              type="checkbox"
              className="w-5 h-5 mt-0.5 text-blue-600 rounded focus:ring-2 focus:ring-blue-200"
              checked={formData.declaration3}
              onChange={(e) => onChange('declaration3', e.target.checked)}
            />
            <span className="text-sm text-gray-700">
              I agree to comply with platform policies and guidelines
            </span>
          </label>
        </div>
        {(errors.declaration1 || errors.declaration2 || errors.declaration3) && (
          <div className="flex items-center gap-1 text-red-500 text-xs mt-3">
            <AlertCircle className="w-3 h-3" />
            All declarations are required
          </div>
        )}
      </div>

      {/* Digital Signature */}
      <div className="bg-white border-2 border-gray-200 rounded-lg p-5 mb-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Digital Signature</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name (acts as digital signature) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.digitalSignature ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
              }`}
              value={formData.digitalSignature}
              onChange={(e) => onChange('digitalSignature', e.target.value)}
              placeholder="Type your full name"
            />
            {errors.digitalSignature && (
              <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.digitalSignature}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700 font-medium">{currentDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Final Notice */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-2">What happens next?</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Your application will be reviewed within 2-5 business days</li>
              <li>We'll verify all submitted documents and information</li>
              <li>You'll receive an email notification once reviewed</li>
              <li>Upon approval, you can access your dashboard and start creating campaigns</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step5ReviewSubmit;