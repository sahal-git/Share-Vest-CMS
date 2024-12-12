import { Request, Response } from 'express';
import * as courseService from '../services/courseService';

export const getAllCourses = (req: Request, res: Response) => {
  try {
    const courses = courseService.getCourses();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

export const getSingleCourse = (req: Request, res: Response) => {
  try {
    const course = courseService.getCourse(parseInt(req.params.id));
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course' });
  }
};

export const createNewCourse = (req: Request, res: Response) => {
  try {
    const newCourse = courseService.createCourse(req.body);
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create course' });
  }
};

export const updateExistingCourse = (req: Request, res: Response) => {
  try {
    const updatedCourse = courseService.updateCourse(parseInt(req.params.id), req.body);
    if (updatedCourse) {
      res.json(updatedCourse);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update course' });
  }
};

export const deleteCourseById = (req: Request, res: Response) => {
  try {
    const success = courseService.deleteCourse(parseInt(req.params.id));
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete course' });
  }
};