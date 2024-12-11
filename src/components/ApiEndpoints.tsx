import React from 'react';
import { Code2 } from 'lucide-react';

const API_BASE_URL = 'https://sharevestcourse.netlify.app/.netlify/functions/api';

export function ApiEndpoints() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Code2 className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-gray-800">Available API Endpoints</h3>
      </div>
      
      <div className="space-y-6">
        <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded-r-lg">
          <div className="flex items-center gap-2">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-mono">GET</span>
            <code className="text-green-800">{`${API_BASE_URL}/courses`}</code>
          </div>
          <p className="text-gray-600 mt-2">Gets all available courses</p>
          <div className="mt-2 bg-green-100 p-3 rounded">
            <p className="text-sm text-green-800 font-medium">Example Request:</p>
            <pre className="text-sm text-green-700 mt-1 overflow-x-auto">
              {`fetch("${API_BASE_URL}/courses")`}
            </pre>
          </div>
        </div>

        <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r-lg">
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-mono">POST</span>
            <code className="text-blue-800">{`${API_BASE_URL}/courses`}</code>
          </div>
          <p className="text-gray-600 mt-2">Creates a new course</p>
          <div className="mt-2 bg-blue-100 p-3 rounded">
            <p className="text-sm text-blue-800 font-medium">Example Request:</p>
            <pre className="text-sm text-blue-700 mt-1 overflow-x-auto">
{`fetch("${API_BASE_URL}/courses", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(courseData)
})`}
            </pre>
          </div>
        </div>

        <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-50 rounded-r-lg">
          <div className="flex items-center gap-2">
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-mono">DELETE</span>
            <code className="text-red-800">{`${API_BASE_URL}/courses/:id`}</code>
          </div>
          <p className="text-gray-600 mt-2">Removes a specific course</p>
          <div className="mt-2 bg-red-100 p-3 rounded">
            <p className="text-sm text-red-800 font-medium">Example Request:</p>
            <pre className="text-sm text-red-700 mt-1 overflow-x-auto">
{`fetch("${API_BASE_URL}/courses/1", {
  method: "DELETE"
})`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}