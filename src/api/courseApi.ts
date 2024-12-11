import { Course, CourseResponse } from '../types/course';
import { initialCourses } from '../data/courses';

const API_URL = import.meta.env.PROD 
  ? '/.netlify/functions/api'
  : 'http://localhost:3000/api';

export const courseApi = {
  getAllCourses: async (): Promise<CourseResponse> => {
    const response = await fetch(`${API_URL}/courses`);
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    return response.json();
  },

  addCourse: async (course: Omit<Course, 'id'>): Promise<Course> => {
    const response = await fetch(`${API_URL}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(course),
    });
    if (!response.ok) {
      throw new Error('Failed to add course');
    }
    return response.json();
  },

  updateCourse: async (id: number, course: Partial<Course>): Promise<Course> => {
    const response = await fetch(`${API_URL}/courses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(course),
    });
    if (!response.ok) {
      throw new Error('Failed to update course');
    }
    return response.json();
  },

  deleteCourse: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/courses/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete course');
    }
  }
};