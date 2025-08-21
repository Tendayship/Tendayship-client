import { useState } from 'react';
import { useAuth } from '../contexts/useAuth';
import axiosInstance from '../shared/api/axiosInstance';

const AuthTest = () => {
  const { isAuthenticated, isLoading, user, login, logout, refreshAuth } = useAuth();
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testDirectApiCall = async () => {
    try {
      addResult('Testing direct API call...');
      const response = await axiosInstance.get('/auth/verify');
      addResult(`Direct API call success: ${JSON.stringify(response.data)}`);
    } catch (error) {
      addResult(`Direct API call failed: ${error}`);
    }
  };

  const testUserInfo = async () => {
    try {
      addResult('Testing user info...');
      const response = await axiosInstance.get('/auth/me');
      addResult(`User info success: ${JSON.stringify(response.data)}`);
    } catch (error) {
      addResult(`User info failed: ${error}`);
    }
  };

  const testRefreshToken = async () => {
    try {
      addResult('Testing refresh token...');
      const response = await axiosInstance.post('/auth/refresh');
      addResult(`Refresh token success: ${JSON.stringify(response.data)}`);
    } catch (error) {
      addResult(`Refresh token failed: ${error}`);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  if (isLoading) {
    return <div className="p-4">Loading authentication status...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Authentication Test Dashboard</h1>
      
      {/* Auth Status */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-2">Current Auth Status</h2>
        <div className="space-y-2">
          <p><strong>Authenticated:</strong> <span className={isAuthenticated ? 'text-green-600' : 'text-red-600'}>{isAuthenticated ? 'Yes' : 'No'}</span></p>
          <p><strong>Loading:</strong> <span className={isLoading ? 'text-yellow-600' : 'text-gray-600'}>{isLoading ? 'Yes' : 'No'}</span></p>
          <p><strong>User:</strong> <span className="text-gray-700">{user ? JSON.stringify(user, null, 2) : 'None'}</span></p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <button
          onClick={login}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Test Login
        </button>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Test Logout
        </button>
        <button
          onClick={refreshAuth}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Refresh Auth
        </button>
        <button
          onClick={testDirectApiCall}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Test Verify API
        </button>
        <button
          onClick={testUserInfo}
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Test User Info
        </button>
        <button
          onClick={testRefreshToken}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          Test Refresh Token
        </button>
        <button
          onClick={clearResults}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Clear Results
        </button>
      </div>

      {/* Test Results */}
      <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
        <h3 className="text-lg font-bold mb-2 text-white">Test Results:</h3>
        {testResults.length === 0 ? (
          <p className="text-gray-500">No test results yet. Click a test button above.</p>
        ) : (
          <div className="space-y-1 max-h-96 overflow-y-auto">
            {testResults.map((result, index) => (
              <div key={index} className="break-all">{result}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthTest;