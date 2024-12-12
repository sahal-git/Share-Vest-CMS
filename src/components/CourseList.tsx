import React from 'react';
import { Course } from '../types/course';
import { Edit, Trash2, BookOpen, Copy } from 'lucide-react';

interface CourseListProps {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (id: number) => void;
  onDuplicate: (course: Course) => void;
}

export function CourseList({ courses, onEdit, onDelete, onDuplicate }: CourseListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <div
          key={course.id}
          className="bg-white overflow-hidden shadow rounded-lg group"
        >
          <div className="relative h-48">
            <img
              src={course.imageUrl}
              alt={course.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
            <div className="absolute top-3 right-3 flex space-x-2">
              {course.published && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 shadow-sm">
                  Published
                </span>
              )}
              {course.intro && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 shadow-sm">
                  Intro
                </span>
              )}
            </div>
          </div>
          <div className="px-4 py-4">
            <h3 className="text-lg font-medium text-gray-900">{course.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{course.category}</p>
            <p className="mt-2 text-sm text-gray-500">
              {course.chapters.length} chapters
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => onDuplicate(course)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </button>
              <button
                onClick={() => onEdit(course)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </button>
              <button
                onClick={() => onDelete(course.id)}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}