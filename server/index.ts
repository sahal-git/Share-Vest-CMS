import express from 'express';
import cors from 'cors';
import { courseApi } from '../src/api/courseApi';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await courseApi.getAllCourses();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/courses', async (req, res) => {
  try {
    const newCourse = await courseApi.addCourse(req.body);
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/courses/:id', async (req, res) => {
  try {
    await courseApi.deleteCourse(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});