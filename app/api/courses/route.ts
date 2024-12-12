import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Course } from '@/types/course';

// In-memory storage (will be replaced with a proper database later)
let courses: Course[] = [
  {
    id: 1,
    name: "Stock Market Basics",
    imageCode: "FINSsC9P50Y",
    published: true,
    intro: true,
    imageUrl: "https://i.ytimg.com/vi/FINSsC9P50Y/maxresdefault.jpg",
    category: "Beginner",
    chapters: [
      { id: 1, title: "Stock Market Terminology", videoUrl: "https://vimeo.com/271741409" },
      { id: 2, title: "Basics of Stock Investing", videoUrl: "https://vimeo.com/271741409" }
    ]
  }
];

export async function GET() {
  return NextResponse.json(courses);
}

export async function POST(request: NextRequest) {
  const course = await request.json();
  const newCourse = {
    ...course,
    id: Math.max(...courses.map(c => c.id), 0) + 1
  };
  courses.push(newCourse);
  return NextResponse.json(newCourse, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const course = await request.json();
  const index = courses.findIndex(c => c.id === course.id);
  if (index !== -1) {
    courses[index] = course;
    return NextResponse.json(course);
  }
  return NextResponse.json({ error: 'Course not found' }, { status: 404 });
}

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = parseInt(url.pathname.split('/').pop() || '');
  const initialLength = courses.length;
  courses = courses.filter(course => course.id !== id);
  if (courses.length < initialLength) {
    return new NextResponse(null, { status: 204 });
  }
  return NextResponse.json({ error: 'Course not found' }, { status: 404 });
} 