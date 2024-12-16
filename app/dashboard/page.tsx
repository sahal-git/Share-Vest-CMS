"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Course } from "@/lib/types";
import { courseService } from "@/lib/services/courseService";
import { 
  BookOpen, 
  BookCheck, 
  BookX,
  BarChart3 
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function DashboardPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.fetchAll();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const totalCourses = courses.length;
  const publishedCourses = courses.filter(course => course.published).length;
  const draftCourses = totalCourses - publishedCourses;

  const categoryData = courses.reduce((acc, course) => {
    acc[course.category] = (acc[course.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(categoryData).map(([name, count]) => ({
    name,
    courses: count
  }));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
      <p className="text-muted-foreground mb-8">
        Overview of your course platform
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Courses</p>
              <h3 className="text-2xl font-bold">{totalCourses}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-500/10 p-3 rounded-lg">
              <BookCheck className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Published Courses</p>
              <h3 className="text-2xl font-bold">{publishedCourses}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-500/10 p-3 rounded-lg">
              <BookX className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Draft Courses</p>
              <h3 className="text-2xl font-bold">{draftCourses}</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-primary/10 p-3 rounded-lg">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Courses by Category</h3>
              <p className="text-sm text-muted-foreground">
                Distribution of courses across categories
              </p>
            </div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="courses" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-primary/10 p-3 rounded-lg">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Recent Courses</h3>
              <p className="text-sm text-muted-foreground">
                Latest courses added to the platform
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {courses.slice(-5).reverse().map((course) => (
              <div key={course.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{course.name}</p>
                  <p className="text-sm text-muted-foreground">{course.category}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs ${
                  course.published 
                    ? 'bg-green-500/10 text-green-500' 
                    : 'bg-yellow-500/10 text-yellow-500'
                }`}>
                  {course.published ? 'Published' : 'Draft'}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
} 