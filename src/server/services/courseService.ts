import { Course } from '../../types/course';

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
      { id: 2, title: "Basics of Stock Investing", videoUrl: "https://vimeo.com/271741409" },
      { id: 3, title: "Understanding Market Trends", videoUrl: "https://vimeo.com/271741409" },
      { id: 4, title: "Types of Stocks", videoUrl: "https://vimeo.com/271741409" },
      { id: 5, title: "Risk Management in Stocks", videoUrl: "https://vimeo.com/271741409" },
      { id: 6, title: "Key Financial Metrics", videoUrl: "https://vimeo.com/271741409" },
      { id: 7, title: "How Stock Prices are Determined", videoUrl: "https://vimeo.com/271741409" },
      { id: 8, title: "Introduction to Stock Market", videoUrl: "https://vimeo.com/271741409" }
    ]
  }
];

export const getCourses = (): Course[] => {
  return courses;
};

export const getCourse = (id: number): Course | undefined => {
  return courses.find(course => course.id === id);
};

export const createCourse = (course: Omit<Course, "id">): Course => {
  const newCourse = {
    ...course,
    id: Math.max(...courses.map(c => c.id), 0) + 1,
  };
  courses.push(newCourse);
  return newCourse;
};

export const updateCourse = (id: number, course: Course): Course | null => {
  const index = courses.findIndex(c => c.id === id);
  if (index !== -1) {
    courses[index] = course;
    return course;
  }
  return null;
};

export const deleteCourse = (id: number): boolean => {
  const initialLength = courses.length;
  courses = courses.filter(course => course.id !== id);
  return courses.length < initialLength;
};