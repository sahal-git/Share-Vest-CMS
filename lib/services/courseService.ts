import { Course } from "@/lib/types";

interface ApiResponse {
  success: boolean;
  message: string;
  data: Course[] | null;
}

export const courseService = {
  async fetchAll(): Promise<Course[]> {
    const response = await fetch("/api/courses");
    const json: ApiResponse = await response.json();
    return json.data || [];
  },

  async create(course: Partial<Course>): Promise<Course[]> {
    const response = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course),
    });
    const json: ApiResponse = await response.json();
    return json.data || [];
  },

  async update(course: Partial<Course>): Promise<Course[]> {
    const response = await fetch("/api/courses", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course),
    });
    const json: ApiResponse = await response.json();
    return json.data || [];
  },

  async delete(id: number): Promise<Course[]> {
    const response = await fetch("/api/courses", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const json: ApiResponse = await response.json();
    return json.data || [];
  },

  async duplicate(id: number): Promise<Course[]> {
    const response = await fetch("/api/courses/duplicate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const json: ApiResponse = await response.json();
    return json.data || [];
  }
};