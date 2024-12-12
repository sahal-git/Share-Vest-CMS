'use client';

import { useState } from 'react';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestConfig {
  method: RequestMethod;
  headers: Record<string, string>;
  body?: string;
}

export function ApiTesterPage() {
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
    } catch (error: any) {
      setResponseStatus(500);
      setResponseDuration(Math.round(performance.now() - startTime));
      setResponseTimestamp(new Date().toISOString());
      setResponse({ error: error.message });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">API Tester</h1>
      {/* Add your API testing UI here */}
    </div>
  );
} 