"use client";

import { Course } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2 } from "lucide-react";
import Image from "next/image";

interface CourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
  onDelete: (id: number) => void;
}

export function CourseCard({ course, onEdit, onDelete }: CourseCardProps) {
  const handleDelete = () => {
    if (typeof course.id === 'number') {
      onDelete(course.id);
    } else {
      console.error('Course ID is missing');
    }
  };

  return (
    <Card>
      <CardHeader className="relative h-[200px]">
        <div className="relative w-full h-full">
          <Image
            src={course.imageUrl}
            alt={course.name}
            fill
            className="object-cover rounded-t-lg"
            priority={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <Badge className="absolute top-2 right-2 z-10">
          {course.category}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <h3 className="text-xl font-semibold">{course.name}</h3>
        
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            {course.chapters.length} Chapters
          </p>
          
          {course.customFields?.map((field, index) => (
            <div key={index} className="text-sm">
              <span className="font-medium">{field.key}:</span> {field.value}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(course)}
        >
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}