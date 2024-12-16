"use client";

import { useEffect, useState } from "react";
import { Course } from "@/lib/types";
import { SearchBar } from "@/components/search/SearchBar";
import { CourseGrid } from "@/components/courses/CourseGrid";
import { Button } from "@/components/ui/button";
import { CourseDialog } from "@/components/courses/CourseDialog";
import { useCourses } from "@/lib/hooks/useCourses";
import { Plus } from "lucide-react";

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { 
    courses, 
    isLoading, 
    error, 
    fetchCourses, 
    addCourse, 
    updateCourse, 
    deleteCourse,
    duplicateCourse 
  } = useCourses();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleSubmit = async (course: Partial<Course>) => {
    const success = selectedCourse
      ? await updateCourse(course)
      : await addCourse(course);
    
    if (success) {
      setIsDialogOpen(false);
      setSelectedCourse(null);
    }
  };

  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(search.toLowerCase()) ||
    course.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Course Management</h1>
          <p className="text-muted-foreground">
            Manage your course catalog
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </Button>
      </div>

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
          onDuplicate={duplicateCourse}
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