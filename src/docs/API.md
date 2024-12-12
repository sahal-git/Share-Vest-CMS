# Course Management API Documentation

## Endpoints

### Get All Courses
```typescript
GET /api/courses
Response: Course[]
```

### Get Single Course
```typescript
GET /api/courses/:id
Response: Course | null
```

### Create Course
```typescript
POST /api/courses
Body: Omit<Course, "id">
Response: Course
```

### Update Course
```typescript
PUT /api/courses/:id
Body: Course
Response: Course | null
```

### Delete Course
```typescript
DELETE /api/courses/:id
Response: boolean
```

## Data Types

### Course
```typescript
interface Course {
  id: number;
  name: string;
  imageCode: string;
  published: boolean;
  intro: boolean;
  imageUrl: string;
  category: string;
  chapters: Chapter[];
}
```

### Chapter
```typescript
interface Chapter {
  id: number;
  title: string;
  videoUrl: string;
}
```

## Categories
Available categories:
- Beginner
- Intermediate
- Advanced

## Testing the API

You can test the API using the built-in course management interface or using tools like curl or Postman:

```bash
# Get all courses
curl http://localhost:5173/api/courses

# Create a new course
curl -X POST http://localhost:5173/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Course",
    "imageCode": "ABC123",
    "published": true,
    "intro": false,
    "imageUrl": "https://example.com/image.jpg",
    "category": "Beginner",
    "chapters": []
  }'

# Update a course
curl -X PUT http://localhost:5173/api/courses/1 \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "name": "Updated Course",
    "imageCode": "ABC123",
    "published": true,
    "intro": false,
    "imageUrl": "https://example.com/image.jpg",
    "category": "Beginner",
    "chapters": []
  }'

# Delete a course
curl -X DELETE http://localhost:5173/api/courses/1
```