import React from 'react';
import { ChevronRight } from 'lucide-react';

const endpoints = [
  {
    method: 'GET',
    path: '/api/courses',
    description: 'Get all courses',
    response: {
      type: 'Course[]',
      example: [
        {
          id: 1,
          name: "Course name",
          imageCode: "ABC123",
          published: true,
          intro: false,
          imageUrl: "https://example.com/image.jpg",
          category: "Category",
          chapters: [
            { id: 1, title: "Chapter 1", videoUrl: "https://example.com/video" }
          ]
        }
      ]
    }
  },
  {
    method: 'POST',
    path: '/api/courses',
    description: 'Create a new course',
    body: {
      name: 'string',
      imageCode: 'string',
      published: 'boolean',
      intro: 'boolean',
      category: 'string',
      chapters: 'Array<{ title: string, videoUrl: string }>'
    },
    response: {
      type: 'Course',
      example: {
        id: 1,
        name: "New Course",
        imageCode: "ABC123",
        published: false,
        intro: false,
        imageUrl: "https://example.com/image.jpg",
        category: "Category",
        chapters: []
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/courses/:id',
    description: 'Update an existing course',
    body: {
      name: 'string',
      imageCode: 'string',
      published: 'boolean',
      intro: 'boolean',
      category: 'string',
      chapters: 'Array<{ id: number, title: string, videoUrl: string }>'
    },
    response: {
      type: 'Course',
      example: {
        id: 1,
        name: "Updated Course",
        imageCode: "ABC123",
        published: true,
        intro: false,
        imageUrl: "https://example.com/image.jpg",
        category: "Category",
        chapters: [
          { id: 1, title: "Updated Chapter", videoUrl: "https://example.com/video" }
        ]
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/courses/:id',
    description: 'Delete a course',
    response: {
      type: 'boolean',
      example: true
    }
  }
];

const methodColors = {
  GET: 'bg-blue-100 text-blue-800',
  POST: 'bg-green-100 text-green-800',
  PUT: 'bg-yellow-100 text-yellow-800',
  DELETE: 'bg-red-100 text-red-800'
};

export function ApiDocs() {
  return (
    <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">API Documentation</h2>
      
      <div className="space-y-8">
        {endpoints.map((endpoint, index) => (
          <div key={index} className="border-b border-gray-100 last:border-0 pb-8 last:pb-0">
            <div className="flex items-center space-x-3 mb-4">
              <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${methodColors[endpoint.method]}`}>
                {endpoint.method}
              </span>
              <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                {endpoint.path}
              </code>
            </div>
            
            <p className="text-gray-600 mb-4">{endpoint.description}</p>
            
            {endpoint.body && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Request Body:</h4>
                <pre className="bg-gray-50 p-4 rounded-lg text-sm font-mono overflow-auto">
                  {JSON.stringify(endpoint.body, null, 2)}
                </pre>
              </div>
            )}
            
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Response ({endpoint.response.type}):</h4>
              <pre className="bg-gray-50 p-4 rounded-lg text-sm font-mono overflow-auto">
                {JSON.stringify(endpoint.response.example, null, 2)}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}