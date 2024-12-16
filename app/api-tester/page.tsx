"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface Endpoint {
  path: string;
  method: HttpMethod;
  description: string;
}

const endpoints: Endpoint[] = [
  // Course endpoints
  { path: '/api/courses', method: 'GET', description: 'Get all courses' },
  { path: '/api/courses', method: 'POST', description: 'Create a course' },
  { path: '/api/courses', method: 'PUT', description: 'Update a course' },
  { path: '/api/courses', method: 'DELETE', description: 'Delete a course' },
  { path: '/api/courses/duplicate', method: 'POST', description: 'Duplicate a course' },
  
  // Stock endpoints
  { path: '/api/stocks', method: 'GET', description: 'Get all stocks' },
  { path: '/api/stocks', method: 'POST', description: 'Create a stock' },
  { path: '/api/stocks', method: 'PUT', description: 'Update a stock' },
  { path: '/api/stocks', method: 'DELETE', description: 'Delete a stock' },
  { path: '/api/stocks/duplicate', method: 'POST', description: 'Duplicate a stock' }
];

export default function ApiTesterPage() {
  const [method, setMethod] = useState<HttpMethod>('GET');
  const [endpoint, setEndpoint] = useState('/api/courses');
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState('No response yet');
  const [isLoading, setIsLoading] = useState(false);

  const handleEndpointChange = (value: string) => {
    const selected = endpoints.find(e => e.path === value && e.method === method);
    if (selected) {
      setEndpoint(selected.path);
    }
  };

  const handleMethodChange = (value: string) => {
    setMethod(value as HttpMethod);
    setRequestBody('');
    // Reset endpoint to first available for this method
    const availableEndpoint = endpoints.find(e => e.method === value);
    if (availableEndpoint) {
      setEndpoint(availableEndpoint.path);
    }
  };

  const handleRequest = async () => {
    setIsLoading(true);
    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // Add body for non-GET requests if body is provided
      if (method !== 'GET' && requestBody.trim()) {
        try {
          // Validate JSON
          JSON.parse(requestBody);
          options.body = requestBody;
        } catch (e) {
          toast.error('Invalid JSON in request body');
          return;
        }
      }

      const res = await fetch(endpoint, options);
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
      
      if (res.ok) {
        toast.success(`${method} request successful`);
      } else {
        toast.error(`Request failed with status: ${res.status}`);
      }
    } catch (error) {
      setResponse(JSON.stringify({ error: 'Request failed', details: error?.toString() }, null, 2));
      toast.error('Request failed');
    } finally {
      setIsLoading(false);
    }
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(requestBody);
      setRequestBody(JSON.stringify(parsed, null, 2));
      toast.success('JSON formatted');
    } catch (e) {
      toast.error('Invalid JSON');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-1">API Tester</h1>
      <p className="text-muted-foreground mb-8">
        Test your API endpoints
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Request</h2>
          <div className="space-y-4">
            <div>
              <Label>Method</Label>
              <Select value={method} onValueChange={handleMethodChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Endpoint</Label>
              <Select value={endpoint} onValueChange={handleEndpointChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select endpoint" />
                </SelectTrigger>
                <SelectContent>
                  {endpoints
                    .filter(e => e.method === method)
                    .map(e => (
                      <SelectItem key={`${e.method}${e.path}`} value={e.path}>
                        {e.path} - {e.description}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            {method !== 'GET' && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Request Body</Label>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={formatJson}
                  >
                    Format JSON
                  </Button>
                </div>
                <Textarea 
                  placeholder="{}" 
                  className="font-mono min-h-[200px]"
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                />
              </div>
            )}
            <Button 
              className="w-full" 
              onClick={handleRequest}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Request'}
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Response</h2>
          <ScrollArea className="h-[350px] rounded-md border p-4">
            <pre className="font-mono text-sm whitespace-pre-wrap">
              {response}
            </pre>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}