import { Router } from 'express';
import {
  getAllCourses,
  getSingleCourse,
  createNewCourse,
  updateExistingCourse,
  deleteCourseById
} from '../controllers/courseController';

const router = Router();

router.get('/courses', getAllCourses);
router.get('/courses/:id', getSingleCourse);
router.post('/courses', createNewCourse);
router.put('/courses/:id', updateExistingCourse);
router.delete('/courses/:id', deleteCourseById);

export default router;