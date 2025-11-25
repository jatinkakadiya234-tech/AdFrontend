import React, { useState } from 'react';
import { Send, Mail, MessageCircle, Phone, Clock, CheckCircle, Upload, X, AlertCircle, Headphones, Zap } from 'lucide-react';

const ContactSupport = () => {
  const [activeTab, setActiveTab] = useState('ticket');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    priority: 'medium',
    platform: '',
    message: '',
    attachments: []
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const supportChannels = [
    {
      id: 'ticket',
      name: 'Submit Ticket',
      icon: Mail,
      description: 'Get detailed help with your integration',
      responseTime: '24 hours',
      availability: 'Always available'
    },
    {
      id: 'chat',
      name: 'Live Chat',
      icon: MessageCircle,
      description: 'Instant help from our support team',
      responseTime: '5 minutes',
      availability: 'Premium users only',
      premium: true
    },
    {
      id: 'email',
      name: 'Email Support',
      icon: Send,
      description: 'Send us a detailed message',
      responseTime: '12-24 hours',
      availability: 'Always available'
    }
  ];

  const categories = [
    { value: 'integration', label: 'Integration Issues' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'performance', label: 'Ad Performance' },
    { value: 'account', label: 'Account Issues' },
    { value: 'technical', label: 'Technical Problems' },
    { value: 'other', label: 'Other' }
  ];

  const platforms = [
    { value: 'web', label: 'Website (JavaScript)' },
    { value: 'ios', label: 'iOS App' },
    { value: 'android', label: 'Android App' },
    { value: 'flutter', label: 'Flutter' },
    { value: 'react-native', label: 'React Native' }
  ];

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      attachments: [...formData.attachments, ...files]
    });
  };

  const removeAttachment = (index) => {
    setFormData({
      ...formData,
      attachments: formData.attachments.filter((_, i) => i !== index)
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          subject: '',
          category: '',
          priority: 'medium',
          platform: '',
          message: '',
          attachments: []
        });
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <Headphones className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Contact Support</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get help with integration, billing, or technical issues
          </p>
        </div>

        {/* Support Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {supportChannels.map(channel => {
            const Icon = channel.icon;
            return (
              <div
                key={channel.id}
                className={`relative bg-white rounded-lg border-2 p-5 cursor-pointer transition-all ${
                  activeTab === channel.id 
                    ? 'border-blue-500 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(channel.id)}
              >
                {channel.premium && (
                  <span className="absolute top-3 right-3 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                    PREMIUM
                  </span>
                )}
                <Icon className={`w-8 h-8 mb-3 ${
                  activeTab === channel.id ? 'text-blue-600' : 'text-gray-600'
                }`} />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{channel.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{channel.description}</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Response: {channel.responseTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>{channel.availability}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit Ticket Form */}
        {activeTab === 'ticket' && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-900">Submit Support Ticket</h2>
              <p className="text-sm text-gray-600 mt-1">
                Fill out the form below and we'll get back to you within 24 hours
              </p>
            </div>

            {submitted ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Ticket Submitted Successfully!
                </h3>
                <p className="text-gray-600 mb-2">
                  Ticket ID: <code className="px-2 py-1 bg-gray-100 rounded">#TK-{Date.now().toString().slice(-6)}</code>
                </p>
                <p className="text-gray-600 mb-6">
                  We've sent a confirmation email to <strong>{formData.email}</strong>
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Submit Another Ticket
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={`w-full px-3 py-2.5 bg-white border ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      className={`w-full px-3 py-2.5 bg-white border ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2.5 bg-white border ${
                      errors.subject ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                    placeholder="Brief description of your issue"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                  {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      className={`w-full px-3 py-2.5 bg-white border ${
                        errors.category ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="">Select a category</option>
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                    {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority Level
                    </label>
                    <select
                      className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    >
                      <option value="low">🟢 Low - General inquiry</option>
                      <option value="medium">🟡 Medium - Need help soon</option>
                      <option value="high">🔴 High - Urgent issue</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Platform (Optional)
                  </label>
                  <select
                    className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  >
                    <option value="">Select platform (if applicable)</option>
                    {platforms.map(platform => (
                      <option key={platform.value} value={platform.value}>
                        {platform.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className={`w-full px-3 py-2.5 bg-white border ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none`}
                    rows="5"
                    placeholder="Please describe your issue in detail..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attachments (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-5 text-center hover:border-blue-500 transition-colors">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                      accept=".png,.jpg,.jpeg,.pdf,.txt,.log"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, PDF, TXT up to 10MB
                      </p>
                    </label>
                  </div>
                  {formData.attachments.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {formData.attachments.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded">
                              <Upload className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{file.name}</p>
                              <p className="text-xs text-gray-500">
                                {(file.size / 1024).toFixed(1)} KB
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAttachment(index)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <strong>Response Time:</strong> Our support team typically responds within 24 hours during business days. For urgent issues, please mark as high priority.
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({
                      name: '', email: '', subject: '', category: '', priority: 'medium', platform: '', message: '', attachments: []
                    })}
                    className="px-5 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                  >
                    Clear Form
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Submit Ticket
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Live Chat (Premium) */}
        {activeTab === 'chat' && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-green-600 px-6 py-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5" />
                  <div>
                    <h2 className="text-lg font-semibold">Live Chat Support</h2>
                    <p className="text-sm text-green-100">Premium Feature - Average response time: 5 minutes</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-medium rounded">
                  PREMIUM
                </span>
              </div>
            </div>

            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Upgrade to Premium
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Get instant access to live chat support with real-time assistance from our expert team
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
                  <Zap className="w-4 h-4" />
                  Upgrade Now
                </button>
                <button className="px-5 py-2.5 text-green-700 bg-green-50 border border-green-600 rounded-lg hover:bg-green-100 font-medium transition-colors">
                  Learn More
                </button>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                {[
                  { icon: '⚡', title: 'Instant Responses', desc: 'Get help within 5 minutes' },
                  { icon: '👨‍💻', title: 'Expert Support', desc: 'Chat with certified developers' },
                  { icon: '🔒', title: 'Priority Queue', desc: 'Skip the waiting line' }
                ].map((feature, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl mb-2">{feature.icon}</div>
                    <h4 className="font-medium text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Email Support */}
        {activeTab === 'email' && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Email Support</h2>
              <p className="text-gray-600">
                Send us a detailed message and we'll respond within 12-24 hours
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-5">
              <div className="p-5 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-3">📧 Email Addresses by Category</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { category: 'General Support', email: 'support@yourplatform.com' },
                    { category: 'Technical Issues', email: 'tech@yourplatform.com' },
                    { category: 'Billing Questions', email: 'billing@yourplatform.com' },
                    { category: 'Partnership Inquiries', email: 'partners@yourplatform.com' }
                  ].map((item, index) => (
                    <div key={index} className="p-3 bg-white rounded border border-blue-200">
                      <div className="font-medium text-gray-900 mb-1">{item.category}</div>
                      <a
                        href={`mailto:${item.email}`}
                        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <Mail className="w-3 h-3" />
                        {item.email}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-3">📝 What to Include in Your Email</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Clear subject line describing the issue</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Your account email and ad unit IDs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Detailed description of the problem</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Steps to reproduce the issue</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Screenshots or error messages</span>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <a
                  href="mailto:support@yourplatform.com"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Open Email Client
                </a>
                <p className="text-sm text-gray-500 mt-3">
                  Or use the ticket form above for tracked support
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="mt-12 bg-gray-50 rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-5 text-center">
            Other Ways to Get Help
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/support/help-center"
              className="p-5 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-all"
            >
              <div className="text-3xl mb-2">📚</div>
              <h4 className="font-medium text-gray-900 mb-2">Help Center</h4>
              <p className="text-sm text-gray-600">
                Browse FAQs, guides, and tutorials
              </p>
            </a>

            <a
              href="/support/documentation"
              className="p-5 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-all"
            >
              <div className="text-3xl mb-2">📖</div>
              <h4 className="font-medium text-gray-900 mb-2">Documentation</h4>
              <p className="text-sm text-gray-600">
                Complete API reference and guides
              </p>
            </a>

            <a
              href="https://community.yourplatform.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-all"
            >
              <div className="text-3xl mb-2">💬</div>
              <h4 className="font-medium text-gray-900 mb-2">Community Forum</h4>
              <p className="text-sm text-gray-600">
                Connect with other developers
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;