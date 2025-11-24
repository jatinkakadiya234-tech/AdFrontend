import React, { useState } from 'react';
import Apihelper from '../service/Apihelper';

const JoinRequestPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    requestedRole: 'advertiser',
    companyName: '',
    website: '',
    businessType: 'individual',
    industry: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: ''
    },
    expectedBudget: '',
    websiteTraffic: '',
    adSpaceDetails: '',
    howDidYouHear: 'google',
    additionalInfo: '',
    agreedToTerms: false,
    agreedToPrivacy: false
  });

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleFileChange = (e) => {
    setDocuments(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.agreedToTerms || !formData.agreedToPrivacy) {
      setMessage('Please agree to terms and privacy policy');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const submitData = new FormData();
      
      // Append form data
      Object.keys(formData).forEach(key => {
        if (key === 'address') {
          Object.keys(formData.address).forEach(addressKey => {
            submitData.append(`address.${addressKey}`, formData.address[addressKey]);
          });
        } else {
          submitData.append(key, formData[key]);
        }
      });

      // Append documents
      documents.forEach((file, index) => {
        submitData.append('documents', file);
      });

      const response = await Apihelper.SubmitJoinRequest(submitData);
      setMessage('Join request submitted successfully! We will review it within 24-48 hours.');
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        requestedRole: 'advertiser',
        companyName: '',
        website: '',
        businessType: 'individual',
        industry: '',
        address: {
          street: '',
          city: '',
          state: '',
          country: '',
          zipCode: ''
        },
        expectedBudget: '',
        websiteTraffic: '',
        adSpaceDetails: '',
        howDidYouHear: 'google',
        additionalInfo: '',
        agreedToTerms: false,
        agreedToPrivacy: false
      });
      setDocuments([]);

    } catch (error) {
      setMessage(error.response?.data?.message || 'Error submitting request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-4 sm:p-6 lg:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Join Our Ad Platform</h2>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">Submit your request to become an advertiser or publisher</p>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-md ${message.includes('successfully') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I want to join as:
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="requestedRole"
                    value="advertiser"
                    checked={formData.requestedRole === 'advertiser'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Advertiser (Run ads)
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="requestedRole"
                    value="publisher"
                    checked={formData.requestedRole === 'publisher'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Publisher (Show ads)
                </label>
              </div>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Username *</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  minLength="6"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Company Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Role-specific fields */}
            {formData.requestedRole === 'advertiser' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Expected Monthly Budget (USD) *</label>
                <input
                  type="number"
                  name="expectedBudget"
                  value={formData.expectedBudget}
                  onChange={handleInputChange}
                  required
                  min="100"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {formData.requestedRole === 'publisher' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Monthly Website Traffic *</label>
                  <input
                    type="number"
                    name="websiteTraffic"
                    value={formData.websiteTraffic}
                    onChange={handleInputChange}
                    required
                    min="1000"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ad Space Details *</label>
                  <textarea
                    name="adSpaceDetails"
                    value={formData.adSpaceDetails}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your available ad spaces..."
                  />
                </div>
              </div>
            )}

            {/* Documents Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Documents (Optional)</label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="mt-1 text-sm text-gray-500">Upload business license, tax ID, or other relevant documents</p>
            </div>

            {/* Additional Info */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Additional Information</label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                rows="4"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell us more about your business or any specific requirements..."
              />
            </div>

            {/* Terms and Privacy */}
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleInputChange}
                  required
                  className="mr-2"
                />
                I agree to the Terms and Conditions *
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="agreedToPrivacy"
                  checked={formData.agreedToPrivacy}
                  onChange={handleInputChange}
                  required
                  className="mr-2"
                />
                I agree to the Privacy Policy *
              </label>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {loading ? 'Submitting...' : 'Submit Join Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinRequestPage;