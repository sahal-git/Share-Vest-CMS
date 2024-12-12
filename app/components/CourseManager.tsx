'use client';

import { useState } from 'react';
import { useCourses } from '../hooks/useCourses';
import { Course } from '../types/course';

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
      published: false,
      intro: course.intro,
      category: course.category,
      chapters: course.chapters.map(chapter => ({
        ...chapter,
        id: Math.random(),
      })),
    };
    
    create.mutate(duplicatedCourse as Course);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Course Management</h1>
      {/* Add your course management UI here */}
    </div>
  );
} 