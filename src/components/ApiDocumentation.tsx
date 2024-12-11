import React from 'react';
import { BookOpen, Server } from 'lucide-react';
import { ApiEndpoints } from './ApiEndpoints';

export function ApiDocumentation() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold">Welcome to ShareVest Course API</h2>
      </div>

      <div className="prose max-w-none space-y-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Server className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-800">What is this API?</h3>
          </div>
          <p className="text-blue-700">
            This API helps manage courses for ShareVest's learning platform. It lets you:
          </p>
          <ul className="list-disc list-inside text-blue-700 mt-2">
            <li>Get a list of all available courses</li>
            <li>Add new courses to the platform</li>
            <li>Remove courses when needed</li>
          </ul>
        </div>

        <ApiEndpoints />

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Course Information Structure</h3>
          <p className="text-gray-600 mb-3">When creating a course, you'll need to provide these details:</p>
          <div className="bg-white p-4 rounded border border-gray-200">
            <pre className="text-sm text-gray-800">
{`{
  "name": "Course name",
  "imageCode": "YouTube video code",
  "imageUrl": "Course thumbnail URL",
  "category": "Beginner/Advanced/Portfolio/etc.",
  "chapters": [
    {
      "title": "Chapter title",
      "videoUrl": "Video URL for the chapter"
    }
  ]
}`}
            </pre>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Try It Out!</h3>
          <p className="text-yellow-700">
            Use the API Tester below to experiment with these endpoints. It's a safe environment
            to learn how the API works and see immediate results.
          </p>
        </div>
      </div>
    </div>
  );
}