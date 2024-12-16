import { NextResponse } from 'next/server';
import { courses } from '@/lib/data';

export async function POST(request: Request) {
  const { id } = await request.json();
  const course = courses.find((c) => c.id === id);
  
  if (!course) {
    return NextResponse.json({
      success: false,
      message: "Course not found",
      data: null
    }, { status: 404 });
  }

  const newCourse = {
    ...course,
    id: Math.max(...courses.map(c => c.id)) + 1,
    name: `${course.name} (Copy)`,
    published: false
  };

  courses.push(newCourse);
  return NextResponse.json({
    success: true,
    message: "Course duplicated successfully",
    data: courses
  });
} 