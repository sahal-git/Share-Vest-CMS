"use client";

import { Course } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2, Copy } from "lucide-react";
import Image from "next/image";

interface CourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
  onDelete: (id: number) => void;
  onDuplicate?: (id: number) => void;
}

export function CourseCard({ course, onEdit, onDelete, onDuplicate }: CourseCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image
          src={course.imageUrl}
          alt={course.name}
          fill
          className="object-cover"
        />
        {course.published ? (
          <Badge className="absolute top-2 right-2">
            Published
          </Badge>
        ) : (
          <Badge variant="secondary" className="absolute top-2 right-2">
            Draft
          </Badge>
        )}
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{course.name}</h3>
            <Badge variant="secondary" className="mt-1">
              {course.category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {course.chapters.length} chapters
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onEdit(course)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          {onDuplicate && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => onDuplicate(course.id)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button
          variant="outline"
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