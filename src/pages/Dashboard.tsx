import React from 'react';
import { BarChart, Users, BookOpen, Award, LayoutGrid } from 'lucide-react';
import { useCourses } from '../hooks/useCourses';

export function Dashboard() {
  const { courses } = useCourses();

  // Calculate statistics
  const totalCourses = courses.length;
  const publishedCourses = courses.filter(course => course.published).length;
  const introCourses = courses.filter(course => course.intro).length;
  const totalChapters = courses.reduce((sum, course) => sum + course.chapters.length, 0);

  const stats = [
    { 
      name: 'Total Courses', 
      value: totalCourses.toString(), 
      icon: BookOpen,
      change: `${Math.round((publishedCourses / totalCourses) * 100)}% published`,
      changeType: 'positive' 
    },
    { 
      name: 'Total Chapters', 
      value: totalChapters.toString(), 
      icon: LayoutGrid,
      change: `${Math.round(totalChapters / totalCourses)} avg per course`,
      changeType: 'neutral' 
    },
    { 
      name: 'Intro Courses', 
      value: introCourses.toString(), 
      icon: Award,
      change: `${Math.round((introCourses / totalCourses) * 100)}% of total`,
      changeType: 'positive' 
    },
    { 
      name: 'Published', 
      value: publishedCourses.toString(), 
      icon: BarChart,
      change: `${Math.round((publishedCourses / totalCourses) * 100)}% of total`,
      changeType: publishedCourses > totalCourses / 2 ? 'positive' : 'negative'
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-100 p-6"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
              <div className="mt-4">
                <span 
                  className={`text-sm font-medium ${
                    stat.changeType === 'positive' 
                      ? 'text-green-600' 
                      : stat.changeType === 'negative'
                      ? 'text-red-600'
                      : 'text-gray-600'
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Section */}
      <div className="mt-12">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Courses</h2>
        <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {courses.slice(0, 5).map((course) => (
              <li key={course.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 h-12 w-12">
                    <img 
                      className="h-12 w-12 rounded-lg object-cover" 
                      src={course.imageUrl} 
                      alt={course.name} 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {course.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {course.chapters.length} chapters
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {course.published && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Published
                      </span>
                    )}
                    {course.intro && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Intro
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}