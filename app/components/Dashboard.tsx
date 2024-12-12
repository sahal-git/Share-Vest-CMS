'use client';

import { BarChart, Users, BookOpen, Award, LayoutGrid } from 'lucide-react';
import { useCourses } from '../hooks/useCourses';

export function Dashboard() {
  const { courses } = useCourses();
  
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Stats cards */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BookOpen className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Courses</dt>
                  <dd className="text-lg font-medium text-gray-900">{courses.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        {/* Add more stats cards as needed */}
      </div>
    </div>
  );
} 