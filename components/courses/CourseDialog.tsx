"use client";

import { Course } from "@/lib/types";
import { CourseForm } from "@/components/course-form";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CourseDialogProps {
  isOpen: boolean;
  selectedCourse: Course | null;
  onSubmit: (course: Partial<Course>) => Promise<void>;
}

export function CourseDialog({ isOpen, selectedCourse, onSubmit }: CourseDialogProps) {
  if (!isOpen) return null;

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {selectedCourse ? "Edit Course" : "Add New Course"}
        </DialogTitle>
      </DialogHeader>
      <CourseForm
        course={selectedCourse || undefined}
        onSubmit={onSubmit}
      />
    </DialogContent>
  );
}