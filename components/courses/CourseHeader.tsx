import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface CourseHeaderProps {
  onAddClick: () => void;
}

export function CourseHeader({ onAddClick }: CourseHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-2">
        <GraduationCap className="h-8 w-8" />
        <h1 className="text-3xl font-bold">Course Platform</h1>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button onClick={onAddClick}>Add New Course</Button>
        </DialogTrigger>
      </Dialog>
    </div>
  );
}