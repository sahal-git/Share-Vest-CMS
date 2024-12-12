import React, { useState } from 'react';
import { ApiTester as ApiTesterComponent } from '../components/api-tester/ApiTester';
import { ApiDocs } from '../components/api-tester/ApiDocs';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function ApiTesterPage() {
  const [showDocs, setShowDocs] = useState(true);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">API Tester</h1>
      
      <div className="space-y-6">
        <button
          onClick={() => setShowDocs(!showDocs)}
          className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          {showDocs ? <ChevronUp className="h-4 w-4 mr-1" /> : <ChevronDown className="h-4 w-4 mr-1" />}
          {showDocs ? 'Hide Documentation' : 'Show Documentation'}
        </button>

        {showDocs && (
          <div className="mb-8">
            <ApiDocs />
          </div>
        )}

        <ApiTesterComponent />
      </div>
    </div>
  );
}