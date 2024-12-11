"use client";

import { Course } from "@/lib/types";
import { CourseForm } from "@/components/course-form";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CourseDialogProps {
  isOpen: boolean;
  selectedCourse: Course | null;
  onSubmit: (course: Partial<Course>) => void;
  onOpenChange: (open: boolean) => void;
}

export function CourseDialog({ isOpen, selectedCourse, onSubmit, onOpenChange }: CourseDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-2xl font-bold">
            {selectedCourse ? "Edit Course" : "Create New Course"}
          </DialogTitle>
          <DialogDescription>
            {selectedCourse 
              ? "Make changes to your course here. Click save when you're done."
              : "Add a new course to your platform. Fill in the details below."}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-full px-6 py-4">
          <div className="pb-8">
            <CourseForm
              course={selectedCourse || undefined}
              onSubmit={onSubmit}
              onOpenChange={onOpenChange}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}