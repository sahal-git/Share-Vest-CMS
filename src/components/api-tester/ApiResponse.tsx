import React from 'react';
import { CheckCircle2, XCircle, Clock, ArrowDownCircle } from 'lucide-react';

interface ApiResponseProps {
  data: any;
  status?: number;
  duration?: number;
  timestamp?: string;
}

export function ApiResponse({ data, status = 200, duration = 0, timestamp = new Date().toISOString() }: ApiResponseProps) {
  const isSuccess = status >= 200 && status < 300;
  const isError = status >= 400;
  const formattedJson = JSON.stringify(data, null, 2);

  const getStatusColor = () => {
    if (isSuccess) return 'bg-green-50 text-green-700 ring-green-600/20';
    if (isError) return 'bg-red-50 text-red-700 ring-red-600/20';
    return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
  };

  const getStatusIcon = () => {
    if (isSuccess) return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    if (isError) return <XCircle className="h-5 w-5 text-red-500" />;
    return <Clock className="h-5 w-5 text-yellow-500" />;
  };

  return (
    <div className="mt-8 bg-gray-50 rounded-lg border border-gray-200">
      {/* Response Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ArrowDownCircle className="h-5 w-5 text-gray-400" />
            <h3 className="text-sm font-medium text-gray-900">Response</h3>
          </div>
          <span className="text-xs text-gray-500">{timestamp}</span>
        </div>
      </div>

      {/* Status and Timing */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {getStatusIcon()}
              <span className={`inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ring-1 ring-inset ${getStatusColor()}`}>
                Status: {status}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Duration: <span className="font-medium">{duration}ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Response Body */}
      <div className="p-4">
        <div className="relative">
          <pre className="mt-2 overflow-auto rounded-lg bg-gray-900 p-4">
            <code className="text-sm font-mono text-gray-200">
              {formattedJson}
            </code>
          </pre>
          <button
            onClick={() => navigator.clipboard.writeText(formattedJson)}
            className="absolute top-6 right-6 p-2 rounded-md hover:bg-gray-700 text-gray-400 hover:text-gray-200"
            title="Copy to clipboard"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}