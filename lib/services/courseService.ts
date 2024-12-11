import { Course } from "@/lib/types";

export const courseService = {
  async fetchAll(): Promise<Course[]> {
    const response = await fetch("/api/courses");
    return response.json();
  },

  async create(course: Partial<Course>): Promise<Course[]> {
    const response = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course),
    });
    return response.json();
  },

  async update(course: Partial<Course>): Promise<Course[]> {
    const response = await fetch("/api/courses", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course),
    });
    return response.json();
  },

  async delete(id: number): Promise<Course[]> {
    const response = await fetch("/api/courses", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    return response.json();
  },
};