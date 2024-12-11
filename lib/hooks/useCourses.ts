"use client";

import { useState, useCallback } from "react";
import { Course } from "@/lib/types";
import { courseService } from "@/lib/services/courseService";

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await courseService.fetchAll();
      setCourses(data);
    } catch (err) {
      setError("Failed to fetch courses");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addCourse = useCallback(async (course: Partial<Course>) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await courseService.create(course);
      setCourses(data);
      return true;
    } catch (err) {
      setError("Failed to add course");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateCourse = useCallback(async (course: Partial<Course>) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await courseService.update(course);
      setCourses(data);
      return true;
    } catch (err) {
      setError("Failed to update course");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteCourse = useCallback(async (id: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await courseService.delete(id);
      setCourses(data);
      return true;
    } catch (err) {
      setError("Failed to delete course");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    courses,
    isLoading,
    error,
    fetchCourses,
    addCourse,
    updateCourse,
    deleteCourse,
  };
}