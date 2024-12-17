import { Course } from "@/lib/types";

export const courseService = {
  async fetchAll(): Promise<Course[]> {
    const response = await fetch("/api/courses");
    const data = await response.json();
    return data.data;
  },

  async fetchById(id: number): Promise<Course> {
    const response = await fetch(`/api/courses/${id}`);
    const data = await response.json();
    return data.data;
  },

  async create(course: Partial<Course>): Promise<Course[]> {
    const response = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course),
    });
    const data = await response.json();
    return data.data;
  },

  async update(course: Partial<Course>): Promise<Course[]> {
    const response = await fetch("/api/courses", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course),
    });
    const data = await response.json();
    return data.data;
  },

  async delete(id: number): Promise<void> {
    await fetch("/api/courses", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  },

  async duplicate(id: number): Promise<Course[]> {
    const response = await fetch("/api/courses/duplicate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    return data.data;
  }
};