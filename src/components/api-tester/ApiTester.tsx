import React, { useState } from 'react';
import { Button } from '../common/Button';
import { Play, Trash2 } from 'lucide-react';
import { RequestMethod, RequestConfig } from '../../types/api';
import { ApiResponse } from './ApiResponse';

const METHODS: RequestMethod[] = ['GET', 'POST', 'PUT', 'DELETE'];

export function ApiTester() {
  const [method, setMethod] = useState<RequestMethod>('GET');
  const [endpoint, setEndpoint] = useState('/api/courses');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState<number>();
  const [responseDuration, setResponseDuration] = useState<number>();
  const [responseTimestamp, setResponseTimestamp] = useState<string>();

  const handleTest = async () => {
    setLoading(true);
    const startTime = performance.now();
    
    try {
      const config: RequestConfig = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (method !== 'GET' && body) {
        config.body = body;
      }

      const result = await fetch(endpoint, config);
      const data = await result.json();
      
      const endTime = performance.now();
      setResponseStatus(result.status);
      setResponseDuration(Math.round(endTime - startTime));
      setResponseTimestamp(new Date().toISOString());
      setResponse(data);
    } catch (error) {
      setResponseStatus(500);
      setResponseDuration(Math.round(performance.now() - startTime));
      setResponseTimestamp(new Date().toISOString());
      setResponse({ error: error.message });
    }
    setLoading(false);
  };

  const clearResponse = () => {
    setResponse(null);
    setResponseStatus(undefined);
    setResponseDuration(undefined);
    setResponseTimestamp(undefined);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100">
      <div className="space-y-6">
        <div className="flex space-x-4">
          <div className="w-32">
            <label className="block text-sm font-medium text-gray-700 mb-1">Method</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as RequestMethod)}
              className="block w-full rounded-lg border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
            >
              {METHODS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Endpoint</label>
            <input
              type="text"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              className="block w-full rounded-lg border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
            />
          </div>
        </div>

        {method !== 'GET' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Request Body (JSON)</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={5}
              className="block w-full rounded-lg border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-mono"
              placeholder="{}"
            />
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <Button
            variant="secondary"
            icon={Trash2}
            onClick={clearResponse}
            disabled={!response}
          >
            Clear Response
          </Button>
          <Button
            icon={Play}
            onClick={handleTest}
            disabled={loading}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            {loading ? 'Sending...' : 'Test API'}
          </Button>
        </div>

        {response && (
          <ApiResponse 
            data={response}
            status={responseStatus}
            duration={responseDuration}
            timestamp={responseTimestamp}
          />
        )}
      </div>
    </div>
  );
}