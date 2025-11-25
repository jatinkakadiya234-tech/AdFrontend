import React from 'react';
import { AlertCircle, Upload } from 'lucide-react';

const Step1CompanyDetails = ({ formData, errors, onChange, onFileUpload }) => {
  return (
    <div className="min-h-[500px]">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Company Details</h2>
      <p className="text-gray-600 mb-8">
        Please provide your company registration and authorization details
      </p>

      <div className="space-y-5">
        {/* Company Name & Registration Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Company Legal Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.companyName ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
              }`}
              value={formData.companyName}
              onChange={(e) => onChange('companyName', e.target.value)}
              placeholder="Enter company legal name"
            />
            {errors.companyName && (
              <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.companyName}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Company Registration Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.registrationNumber ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
              }`}
              value={formData.registrationNumber}
              onChange={(e) => onChange('registrationNumber', e.target.value)}
              placeholder="Enter registration number"
            />
            {errors.registrationNumber && (
              <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.registrationNumber}
              </div>
            )}
          </div>
        </div>

        {/* Tax ID & Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tax Identification Number (TIN/VAT) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.taxId ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
              }`}
              value={formData.taxId}
              onChange={(e) => onChange('taxId', e.target.value)}
              placeholder="Enter tax ID"
            />
            {errors.taxId && (
              <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.taxId}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Date of Incorporation <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.incorporationDate ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
              }`}
              value={formData.incorporationDate}
              onChange={(e) => onChange('incorporationDate', e.target.value)}
            />
            {errors.incorporationDate && (
              <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.incorporationDate}
              </div>
            )}
          </div>
        </div>

        {/* Registration Document */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Company Registration Document <span className="text-red-500">*</span>
          </label>
          <label
            className={`block border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
              formData.registrationDoc
                ? 'border-green-500 bg-green-50'
                : errors.registrationDoc
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300 bg-gray-50 hover:border-blue-600 hover:bg-blue-50'
            }`}
          >
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => onFileUpload('registrationDoc', e.target.files[0])}
            />
            <Upload className={`w-8 h-8 mx-auto mb-3 ${formData.registrationDoc ? 'text-green-500' : 'text-gray-400'}`} />
            {formData.registrationDoc ? (
              <>
                <p className="font-semibold text-green-600 mb-1">✓ {formData.registrationDoc.name}</p>
                <p className="text-xs text-gray-600">Click to change file</p>
              </>
            ) : (
              <>
                <p className="font-semibold text-gray-700 mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-600">PDF only (Max 10MB)</p>
              </>
            )}
          </label>
          {errors.registrationDoc && (
            <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
              <AlertCircle className="w-3 h-3" />
              {errors.registrationDoc}
            </div>
          )}
        </div>

        {/* Company Address */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Company Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
              errors.companyAddress ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
            }`}
            value={formData.companyAddress}
            onChange={(e) => onChange('companyAddress', e.target.value)}
            placeholder="Enter full company address"
          />
          {errors.companyAddress && (
            <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
              <AlertCircle className="w-3 h-3" />
              {errors.companyAddress}
            </div>
          )}
        </div>

        {/* City & State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.city ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
              }`}
              value={formData.city}
              onChange={(e) => onChange('city', e.target.value)}
              placeholder="Enter city"
            />
            {errors.city && (
              <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.city}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.state ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
              }`}
              value={formData.state}
              onChange={(e) => onChange('state', e.target.value)}
              placeholder="Enter state"
            />
            {errors.state && (
              <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.state}
              </div>
            )}
          </div>
        </div>

        {/* ZIP & Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ZIP Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.zipCode ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
              }`}
              value={formData.zipCode}
              onChange={(e) => onChange('zipCode', e.target.value)}
              placeholder="Enter ZIP code"
            />
            {errors.zipCode && (
              <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.zipCode}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Country <span className="text-red-500">*</span>
            </label>
            <select
              className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.country ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
              }`}
              value={formData.country}
              onChange={(e) => onChange('country', e.target.value)}
            >
              <option value="">Select country</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
              <option value="IN">India</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="JP">Japan</option>
              <option value="Other">Other</option>
            </select>
            {errors.country && (
              <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.country}
              </div>
            )}
          </div>
        </div>

        {/* Authorized Person */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Authorized Person Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.authorizedPersonName ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
              }`}
              value={formData.authorizedPersonName}
              onChange={(e) => onChange('authorizedPersonName', e.target.value)}
              placeholder="Enter authorized person name"
            />
            {errors.authorizedPersonName && (
              <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.authorizedPersonName}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Authorized Person Designation <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.authorizedPersonDesignation ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
              }`}
              value={formData.authorizedPersonDesignation}
              onChange={(e) => onChange('authorizedPersonDesignation', e.target.value)}
              placeholder="e.g., CEO, Director, Manager"
            />
            {errors.authorizedPersonDesignation && (
              <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.authorizedPersonDesignation}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1CompanyDetails;