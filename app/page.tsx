"use client";

import { useState, useEffect } from "react";
import { Course } from "@/lib/types";
import { CourseCard } from "@/components/ui/course-card";
import { CourseForm } from "@/components/course-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { GraduationCap, Search } from "lucide-react";

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const response = await fetch("/api/courses");
    const data = await response.json();
    setCourses(data);
  };

  const handleAddCourse = async (course: Partial<Course>) => {
    await fetch("/api/courses", {
      method: "POST",
      body: JSON.stringify(course),
    });
    fetchCourses();
    setIsDialogOpen(false);
  };

  const handleUpdateCourse = async (course: Partial<Course>) => {
    await fetch("/api/courses", {
      method: "PUT",
      body: JSON.stringify(course),
    });
    fetchCourses();
    setIsDialogOpen(false);
    setSelectedCourse(null);
  };

  const handleDeleteCourse = async (id: number) => {
    await fetch("/api/courses", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    fetchCourses();
  };

  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(search.toLowerCase()) ||
    course.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Course Platform</h1>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New Course</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedCourse ? "Edit Course" : "Add New Course"}</DialogTitle>
            </DialogHeader>
            <CourseForm
              course={selectedCourse || undefined}
              onSubmit={selectedCourse ? handleUpdateCourse : handleAddCourse}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onEdit={(course) => {
              setSelectedCourse(course);
              setIsDialogOpen(true);
            }}
            onDelete={handleDeleteCourse}
          />
        ))}
      </div>
    </div>
  );
}