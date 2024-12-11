"use client";

import { Course } from "@/lib/types";
import { CourseForm } from "@/components/course-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CourseDialogProps {
  isOpen: boolean;
  selectedCourse: Course | null;
  onSubmit: (course: Partial<Course>) => Promise<void>;
  onOpenChange: (open: boolean) => void;
}

export function CourseDialog({ isOpen, selectedCourse, onSubmit, onOpenChange }: CourseDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
    </Dialog>
  );
}