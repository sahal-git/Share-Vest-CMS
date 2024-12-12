import express from 'express';
import type { Course } from '../types/course.js';

export const coursesRouter = express.Router();

// In-memory storage (replace with database in production)
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

coursesRouter.get('/', (req, res) => {
  res.json(courses);
});

coursesRouter.post('/', (req, res) => {
  const course = req.body;
  const newCourse = {
    ...course,
    id: Math.max(...courses.map(c => c.id), 0) + 1
  };
  courses.push(newCourse);
  res.status(201).json(newCourse);
});

coursesRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const course = req.body;
  const index = courses.findIndex(c => c.id === parseInt(id));
  if (index !== -1) {
    courses[index] = course;
    res.json(course);
  } else {
    res.status(404).json({ error: 'Course not found' });
  }
});

coursesRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = courses.length;
  courses = courses.filter(course => course.id !== parseInt(id));
  if (courses.length < initialLength) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Course not found' });
  }
}); 