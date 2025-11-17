import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EmbedCodeApi from '../service/EmbedCodeApi';

const EmbedCodePage = () => {
  const { id } = useParams();
  const [selectedLanguage, setSelectedLanguage] = useState('html');
  const [embedData, setEmbedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const languages = [
    { value: 'html', label: 'HTML', icon: '🌐' },
    { value: 'javascript', label: 'JavaScript', icon: '⚡' },
    { value: 'react', label: 'React', icon: '⚛️' },
    { value: 'php', label: 'PHP', icon: '🐘' },
    { value: 'java', label: 'Java', icon: '☕' },
    { value: 'python', label: 'Python', icon: '🐍' },
    { value: 'flutter', label: 'Flutter', icon: '📱' },
    { value: 'swift', label: 'Swift', icon: '🍎' },
    { value: 'mobile', label: 'Mobile HTML', icon: '📱' }
  ];

  const fetchEmbedCode = async (language) => {
    console.log('Fetching embed code for ID:', id, 'Language:', language);
    setLoading(true);
    try {
      // Try public API first, then authenticated API
      let data;
      try {
        console.log('Trying public API...');
        data = await EmbedCodeApi.getPublicEmbedCode(id, language);
        console.log('Public API success:', data);
      } catch (error) {
        console.log('Public API failed, trying authenticated API:', error.message);
        data = await EmbedCodeApi.getEmbedCode(id, language);
        console.log('Authenticated API success:', data);
      }
      setEmbedData(data);
    } catch (error) {
      console.error('Both APIs failed:', error);
      setEmbedData({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchEmbedCode(selectedLanguage);
    }
  }, [id, selectedLanguage]);

  const copyToClipboard = async () => {
    if (embedData?.embedCode) {
      try {
        await navigator.clipboard.writeText(embedData.embedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Embed Code Generator
            </h1>
            {embedData && (
              <p className="text-gray-600">
                Generate embed code for: <span className="font-semibold">{embedData.adTitle}</span>
              </p>
            )}
          </div>

          {/* Language Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Programming Language
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => setSelectedLanguage(lang.value)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                    selectedLanguage === lang.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{lang.icon}</span>
                    <span className="font-medium text-sm">{lang.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Embed Code Display */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading embed code...</span>
            </div>
          ) : embedData?.error ? (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Embed Code</h3>
                <p className="text-red-700">{embedData.error}</p>
                <p className="text-sm text-red-600 mt-2">Ad ID: {id}</p>
              </div>
            </div>
          ) : embedData ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {languages.find(l => l.value === selectedLanguage)?.label} Code
                </h3>
                <button
                  onClick={copyToClipboard}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    copied
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {copied ? '✓ Copied!' : '📋 Copy Code'}
                </button>
              </div>
              
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{embedData.embedCode}</code>
                </pre>
              </div>

              {/* Usage Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Usage Instructions:</h4>
                <div className="text-sm text-blue-800">
                  {selectedLanguage === 'html' && (
                    <p>Paste this HTML code directly into your webpage where you want the ad to appear.</p>
                  )}
                  {selectedLanguage === 'javascript' && (
                    <p>Add this JavaScript code to your webpage. Make sure to include it within script tags.</p>
                  )}
                  {selectedLanguage === 'react' && (
                    <p>Use this JSX code in your React component. Make sure to handle the click event properly.</p>
                  )}
                  {selectedLanguage === 'php' && (
                    <p>Include this PHP code in your server-side script to render the ad dynamically.</p>
                  )}
                  {selectedLanguage === 'java' && (
                    <p>Use this Java string in your application to generate HTML content for web views.</p>
                  )}
                  {selectedLanguage === 'python' && (
                    <p>This Python code can be used in web frameworks like Django or Flask to render ads.</p>
                  )}
                  {selectedLanguage === 'flutter' && (
                    <p>Add this Flutter widget to your app. Make sure to import the url_launcher package.</p>
                  )}
                  {selectedLanguage === 'swift' && (
                    <p>Use this Swift code in your iOS app to display ads in web views or image views.</p>
                  )}
                  {selectedLanguage === 'mobile' && (
                    <p>This mobile-optimized HTML is responsive and works well on mobile devices.</p>
                  )}
                </div>
              </div>

              {/* Ad Preview */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Ad Preview:</h4>
                <div 
                  className="border border-gray-300 rounded p-4 bg-white"
                  dangerouslySetInnerHTML={{ __html: embedData.embedCode }}
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No embed code available for Ad ID: {id}</p>
              <p className="text-sm mt-2">Make sure the ad exists and is active</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmbedCodePage;