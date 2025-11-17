import React, { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import EmbedCodeApi from '../service/EmbedCodeApi';

const EmbedCodeGenerator = ({ adId }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('html');
  const [embedData, setEmbedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const languages = [
    { value: 'html', label: 'HTML' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'react', label: 'React' },
    { value: 'php', label: 'PHP' },
    { value: 'java', label: 'Java' },
    { value: 'python', label: 'Python' },
    { value: 'flutter', label: 'Flutter' },
    { value: 'swift', label: 'Swift' }
  ];

  const fetchEmbedCode = async (language) => {
    setLoading(true);
    try {
      const data = await EmbedCodeApi.getPublicEmbedCode(adId, language);
      setEmbedData(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adId) {
      fetchEmbedCode(selectedLanguage);
    }
  }, [adId, selectedLanguage]);

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
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Get Embed Code</h3>
      
      {/* Language Selection */}
      <div className="mb-4">
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      {/* Code Display */}
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading...</span>
        </div>
      ) : embedData ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">{selectedLanguage.toUpperCase()} Code</span>
            <button
              onClick={copyToClipboard}
              className={`flex items-center space-x-1 px-3 py-1 rounded text-sm font-medium transition-colors ${
                copied
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
          
          <div className="relative">
            <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
              <code>{embedData.embedCode}</code>
            </pre>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No embed code available</p>
        </div>
      )}
    </div>
  );
};

export default EmbedCodeGenerator;