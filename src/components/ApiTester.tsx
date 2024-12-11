import React, { useState } from 'react';
import { Course } from '../types/course';
import { courseApi } from '../api/courseApi';
import { Code, Plus } from 'lucide-react';
import { CourseForm } from './forms/CourseForm';

export function ApiTester() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleApiCall = async (action: string) => {
    setLoading(true);
    try {
      let response;
      switch (action) {
        case 'GET':
          response = await courseApi.getAllCourses();
          break;
        case 'DELETE':
          await courseApi.deleteCourse(1);
          response = { message: 'Course deleted successfully' };
          break;
      }
      setResult(JSON.stringify(response, null, 2));
    } catch (error) {
      setResult(JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (courseData: Omit<Course, 'id'>) => {
    setLoading(true);
    try {
      const response = await courseApi.addCourse(courseData);
      setResult(JSON.stringify(response, null, 2));
      setShowForm(false);
    } catch (error) {
      setResult(JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Code className="w-6 h-6" />
          <h1 className="text-2xl font-bold">API Tester</h1>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Course
        </button>
      </div>

      {showForm && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow">
          <CourseForm onSubmit={handleSubmit} />
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => handleApiCall('GET')}
          className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          GET /courses
        </button>
        <button
          onClick={() => handleApiCall('DELETE')}
          className="p-3 bg-red-500 text-white rounded hover:bg-red-600"
        >
          DELETE /courses/1
        </button>
      </div>

      <div className="relative">
        <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-auto max-h-[500px]">
          {loading ? 'Loading...' : result || 'Click a button to test the API'}
        </pre>
      </div>
    </div>
  );
}