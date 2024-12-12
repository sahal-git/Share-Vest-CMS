import React, { useState } from 'react';
import { Course } from '../types/course';
import { CourseForm } from './CourseForm';
import { CourseList } from './CourseList';
import { Header } from './layout/Header';
import { useCourses } from '../hooks/useCourses';

export function CourseManager() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const { courses, create, update, remove } = useCourses();

  const handleSubmit = (data: Partial<Course>) => {
    if (selectedCourse) {
      update.mutate({ ...data, id: selectedCourse.id } as Course);
    } else {
      create.mutate(data as Course);
    }
    setIsEditing(false);
    setSelectedCourse(null);
  };

  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setIsEditing(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      remove.mutate(id);
    }
  };

  const handleDuplicate = (course: Course) => {
    const duplicatedCourse: Omit<Course, 'id'> = {
      name: `${course.name} (Copy)`,
      imageCode: course.imageCode,
      imageUrl: course.imageUrl,
      published: false, // Set to unpublished by default
      intro: course.intro,
      category: course.category,
      chapters: course.chapters.map(chapter => ({
        ...chapter,
        id: Math.random(), // Generate new IDs for chapters
      })),
    };
    
    create.mutate(duplicatedCourse as Course);
  };

  return (
    <div>
      <Header 
        onAddClick={() => setIsEditing(true)} 
        isEditing={isEditing} 
      />

      {isEditing ? (
        <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCourse ? 'Edit Course' : 'Add New Course'}
            </h2>
            <button
              onClick={() => {
                setIsEditing(false);
                setSelectedCourse(null);
              }}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
          <CourseForm
            onSubmit={handleSubmit}
            initialData={selectedCourse || undefined}
          />
        </div>
      ) : (
        <CourseList
          courses={courses}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
        />
      )}
    </div>
  );
} 