import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TestPage = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [ads, setAds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const response = await fetch('http://localhost:5500/api/ad/debug/list');
      const data = await response.json();
      if (response.ok) {
        setAds(data.ads);
      }
    } catch (error) {
      console.error('Error fetching ads:', error);
    }
  };

  const createTestAd = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5500/api/ad/test-ad', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      
      if (response.ok) {
        setResult(`Test ad created with ID: ${data.id}`);
        fetchAds(); // Refresh the list
        // Navigate to embed code page after 2 seconds
        setTimeout(() => {
          navigate(`/embed-code/${data.id}`);
        }, 2000);
      } else {
        setResult(`Error: ${data.error}`);
      }
    } catch (error) {
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-2xl font-bold mb-6">Test Embed Code Generation</h1>
          
          <button
            onClick={createTestAd}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Creating Test Ad...' : 'Create Test Ad & View Embed Code'}
          </button>
          
          {result && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p>{result}</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Existing Ads ({ads.length})</h2>
          
          {ads.length === 0 ? (
            <p className="text-gray-500">No ads found. Create a test ad first.</p>
          ) : (
            <div className="space-y-3">
              {ads.map(ad => (
                <div key={ad._id} className="border rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{ad.title}</h3>
                    <p className="text-sm text-gray-600">ID: {ad._id}</p>
                    <p className="text-sm text-gray-600">Status: {ad.isActive ? 'Active' : 'Inactive'}</p>
                    <p className="text-sm text-gray-600">Has Embed Codes: {ad.embedCodes?.web ? 'Yes' : 'No'}</p>
                  </div>
                  <button
                    onClick={() => navigate(`/embed-code/${ad._id}`)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    View Embed Code
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPage;