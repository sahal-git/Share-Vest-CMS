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

export const getCourses = () => {
  return courses;
};

export const getCourse = (id: number) => {
  return courses.find(course => course.id === id);
};

export const createCourse = (course: Omit<Course, "id">) => {
  const newCourse = {
    ...course,
    id: courses.length + 1
  };
  courses.push(newCourse);
  return newCourse;
};

export const updateCourse = (id: number, course: Course) => {
  const index = courses.findIndex(c => c.id === id);
  if (index !== -1) {
    courses[index] = course;
    return course;
  }
  return null;
};

export const deleteCourse = (id: number) => {
  courses = courses.filter(course => course.id !== id);
  return true;
};