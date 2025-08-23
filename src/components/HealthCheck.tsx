import React, { useState } from 'react';
import { health } from '../entities/echo/api/echo.api';

interface HealthCheckProps {
  className?: string;
}

export const HealthCheck: React.FC<HealthCheckProps> = ({ className = '' }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [response, setResponse] = useState<string>('');

  const handleHealthCheck = async () => {
    try {
      setStatus('loading');
      const res = await health();
      setResponse(JSON.stringify(res, null, 2));
      setStatus('success');
      console.log('Health check result:', res);
    } catch (error) {
      setResponse(error instanceof Error ? error.message : 'Unknown error');
      setStatus('error');
      console.error('Health check failed:', error);
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success': return 'bg-green-600 hover:bg-green-700';
      case 'error': return 'bg-red-600 hover:bg-red-700';
      case 'loading': return 'bg-yellow-500';
      default: return 'bg-blue-600 hover:bg-blue-700';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'loading': return 'Checking...';
      case 'success': return 'Healthy ✓';
      case 'error': return 'Error ✗';
      default: return 'Check Health';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <button
        onClick={handleHealthCheck}
        disabled={status === 'loading'}
        className={`px-4 py-2 text-white font-medium rounded-md transition-colors disabled:opacity-50 ${getStatusColor()}`}
      >
        {getStatusText()}
      </button>
      
      {response && (
        <div className="mt-4 p-3 bg-gray-100 rounded-md">
          <h4 className="text-sm font-medium text-gray-800 mb-2">API Response:</h4>
          <pre className="text-xs text-gray-600 overflow-auto max-h-40">
            {response}
          </pre>
        </div>
      )}
    </div>
  );
};

export default HealthCheck;