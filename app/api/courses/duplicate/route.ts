import { NextResponse } from 'next/server';
import { courses } from '@/lib/courseData';

export async function POST(request: Request) {
  const { id } = await request.json();
  const courseToDuplicate = courses.find(c => c.id === id);

  if (!courseToDuplicate) {
    return NextResponse.json(
      { success: false, message: "Course not found" },
      { status: 404 }
    );
  }

  const duplicatedCourse = {
    ...courseToDuplicate,
    id: Math.max(...courses.map(c => c.id)) + 1,
    name: `${courseToDuplicate.name} (Copy)`,
    published: false
  };

  courses.push(duplicatedCourse);

  return NextResponse.json({
    success: true,
    message: "Course duplicated successfully",
    data: courses
  });
} 