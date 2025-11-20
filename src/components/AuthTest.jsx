import { useState } from 'react';
import { isAuthenticated, getCurrentUser, getUserRole, logout } from '../utils/authUtils';
import Apihelper from '../service/Apihelper';

const AuthTest = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const addResult = (test, success, message) => {
    setTestResults(prev => [...prev, { test, success, message, timestamp: new Date().toLocaleTimeString() }]);
  };

  const runTests = async () => {
    setLoading(true);
    setTestResults([]);

    // Test 1: Check authentication status
    try {
      const authStatus = isAuthenticated();
      addResult('Authentication Check', authStatus, `Authenticated: ${authStatus}`);
    } catch (error) {
      addResult('Authentication Check', false, `Error: ${error.message}`);
    }

    // Test 2: Get current user
    try {
      const user = getCurrentUser();
      addResult('Get Current User', !!user, user ? `User: ${user.username} (${user.role})` : 'No user found');
    } catch (error) {
      addResult('Get Current User', false, `Error: ${error.message}`);
    }

    // Test 3: Get user role
    try {
      const role = getUserRole();
      addResult('Get User Role', !!role, `Role: ${role}`);
    } catch (error) {
      addResult('Get User Role', false, `Error: ${error.message}`);
    }

    // Test 4: Test API connection
    try {
      const response = await Apihelper.GetCategories();
      addResult('API Connection', true, `Categories loaded: ${response.data?.categories?.length || 0}`);
    } catch (error) {
      addResult('API Connection', false, `API Error: ${error.response?.status || error.message}`);
    }

    // Test 5: Test dashboard stats (if authenticated)
    if (isAuthenticated()) {
      try {
        const response = await Apihelper.GetDashboardStats();
        addResult('Dashboard Stats', true, 'Dashboard stats loaded successfully');
      } catch (error) {
        addResult('Dashboard Stats', false, `Error: ${error.response?.status || error.message}`);
      }
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      addResult('Logout', true, 'Logged out successfully');
    } catch (error) {
      addResult('Logout', false, `Error: ${error.message}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Authentication System Test</h1>
        
        <div className="flex gap-4 mb-8">
          <button
            onClick={runTests}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold"
          >
            {loading ? 'Running Tests...' : 'Run Tests'}
          </button>
          
          {isAuthenticated() && (
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
            >
              Test Logout
            </button>
          )}
        </div>

        {/* Current Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-2">Authentication Status</h3>
            <p className={`font-bold ${isAuthenticated() ? 'text-green-600' : 'text-red-600'}`}>
              {isAuthenticated() ? 'Authenticated' : 'Not Authenticated'}
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-2">Current User</h3>
            <p className="font-bold text-gray-900">
              {getCurrentUser()?.username || 'None'}
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-2">User Role</h3>
            <p className="font-bold text-gray-900">
              {getUserRole()}
            </p>
          </div>
        </div>

        {/* Test Results */}
        {testResults.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Test Results</h2>
            <div className="space-y-3">
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    result.success
                      ? 'bg-green-50 border-green-500'
                      : 'bg-red-50 border-red-500'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`font-semibold ${
                        result.success ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {result.test}
                      </h3>
                      <p className={`text-sm ${
                        result.success ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {result.message}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">{result.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Local Storage Debug */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Local Storage Debug</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Token:</strong> {localStorage.getItem('token') ? 'Present' : 'Missing'}</p>
            <p><strong>User:</strong> {localStorage.getItem('user') ? 'Present' : 'Missing'}</p>
            <p><strong>User Role:</strong> {localStorage.getItem('userRole') || 'Not set'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthTest;