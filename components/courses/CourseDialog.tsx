"use client";

import { Course } from "@/lib/types";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EditorCard } from "./editor/EditorCard";

interface CourseDialogProps {
  isOpen: boolean;
  selectedCourse: Course | null;
  onSubmit: (course: Partial<Course>) => Promise<void>;
  onOpenChange: (open: boolean) => void;
}

export function CourseDialog({ isOpen, selectedCourse, onSubmit, onOpenChange }: CourseDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[90vh] p-6">
        <DialogTitle className="sr-only">
          {selectedCourse ? "Edit Course" : "Add New Course"}
        </DialogTitle>
        <ScrollArea className="h-full pr-4">
          <EditorCard
            course={selectedCourse || undefined}
            onSubmit={onSubmit}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}