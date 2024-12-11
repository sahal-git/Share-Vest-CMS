import { Course } from "@/lib/types";
import { CourseCard } from "@/components/ui/course-card";

interface CourseGridProps {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (id: number) => void;
}

export function CourseGrid({ courses, onEdit, onDelete }: CourseGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}