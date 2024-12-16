import { NextResponse } from 'next/server';
import { courses } from '@/lib/data';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Courses retrieved successfully",
    data: courses
  });
}

export async function POST(request: Request) {
  const course = await request.json();
  courses.push({ 
    ...course, 
    id: Math.max(...courses.map(c => c.id)) + 1,
    published: false 
  });
  return NextResponse.json({
    success: true,
    message: "Course created successfully",
    data: courses
  });
}

export async function PUT(request: Request) {
  const course = await request.json();
  const index = courses.findIndex((c) => c.id === course.id);
  if (index > -1) {
    courses[index] = { ...courses[index], ...course };
  }
  return NextResponse.json({
    success: true,
    message: "Course updated successfully",
    data: courses
  });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const index = courses.findIndex((c) => c.id === id);
  if (index > -1) {
    courses.splice(index, 1);
  }
  return NextResponse.json({
    success: true,
    message: "Course deleted successfully",
    data: courses
  });
}