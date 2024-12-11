"use client";

import { Course } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2 } from "lucide-react";

interface CourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
  onDelete: (id: number) => void;
}

export function CourseCard({ course, onEdit, onDelete }: CourseCardProps) {
  return (
    <Card>
      <CardHeader className="relative">
        <img
          src={course.imageUrl}
          alt={course.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <Badge className="absolute top-2 right-2">
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
          onClick={() => onDelete(course.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}