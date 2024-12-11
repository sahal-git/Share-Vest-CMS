import { Handler } from '@netlify/functions';
import { courseApi } from '../src/api/courseApi';

export const handler: Handler = async (event) => {
  const path = event.path.replace('/.netlify/functions/api/', '');
  const method = event.httpMethod;

  try {
    switch (method) {
      case 'GET':
        if (path === 'courses') {
          const courses = await courseApi.getAllCourses();
          return {
            statusCode: 200,
            body: JSON.stringify(courses)
          };
        }
        break;

      case 'POST':
        if (path === 'courses' && event.body) {
          const newCourse = await courseApi.addCourse(JSON.parse(event.body));
          return {
            statusCode: 201,
            body: JSON.stringify(newCourse)
          };
        }
        break;

      case 'DELETE':
        const match = path.match(/courses\/(\d+)/);
        if (match) {
          await courseApi.deleteCourse(Number(match[1]));
          return {
            statusCode: 204,
            body: ''
          };
        }
        break;
    }

    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Not found' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};