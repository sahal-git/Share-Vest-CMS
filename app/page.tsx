"use client";

import { useEffect, useState } from "react";
import { Course } from "@/lib/types";
import { SearchBar } from "@/components/search/SearchBar";
import { CourseGrid } from "@/components/courses/CourseGrid";
import { CourseHeader } from "@/components/courses/CourseHeader";
import { CourseDialog } from "@/components/courses/CourseDialog";
import { useCourses } from "@/lib/hooks/useCourses";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { courses, isLoading, error, fetchCourses, addCourse, updateCourse, deleteCourse } = useCourses();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleSubmit = async (course: Partial<Course>) => {
    try {
      const success = selectedCourse
        ? await updateCourse({ ...course, id: selectedCourse.id })
        : await addCourse(course);
      
      if (success) {
        setIsDialogOpen(false);
        setSelectedCourse(null);
      }
    } catch (error) {
      console.error('Failed to save course:', error);
    }
  };

  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(search.toLowerCase()) ||
    course.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8">
      <CourseHeader onAddClick={() => setIsDialogOpen(true)} />
      <SearchBar value={search} onChange={setSearch} />
      
      {error && (
        <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-md mb-6">
          {error}
        </div>
      )}
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <CourseGrid 
          courses={filteredCourses}
          onEdit={(course) => {
            setSelectedCourse(course);
            setIsDialogOpen(true);
          }}
          onDelete={deleteCourse}
        />
      )}

      <CourseDialog
        isOpen={isDialogOpen}
        selectedCourse={selectedCourse}
        onSubmit={handleSubmit}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
}