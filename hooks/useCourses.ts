import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Course } from '@/types/course';

const API_URL = '/api/courses';

async function fetchCourses(): Promise<Course[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }
  return response.json();
}

async function createCourse(course: Omit<Course, 'id'>): Promise<Course> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(course),
  });
  if (!response.ok) {
    throw new Error('Failed to create course');
  }
  return response.json();
}

async function updateCourse(course: Course): Promise<Course> {
  const response = await fetch(`${API_URL}/${course.id}`, {
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
}

async function deleteCourse(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete course');
  }
}

export function useCourses() {
  const queryClient = useQueryClient();

  const courses = useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses
  });

  const create = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    }
  });

  const update = useMutation({
    mutationFn: updateCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    }
  });

  const remove = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    }
  });

  return {
    courses: courses.data || [],
    isLoading: courses.isLoading,
    create,
    update,
    remove
  };
} 