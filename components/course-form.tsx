"use client";

import { useState } from "react";
import { Course } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChapterList } from "@/components/chapters/ChapterList";
import { CustomFieldList } from "@/components/custom-fields/CustomFieldList";

interface CourseFormProps {
  course?: Course;
  onSubmit: (course: Partial<Course>) => void;
}

export function CourseForm({ course, onSubmit }: CourseFormProps) {
  const [formData, setFormData] = useState<Partial<Course>>(course || {
    name: "",
    category: "",
    imageCode: "",
    imageUrl: "",
    chapters: [],
    customFields: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Course Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="imageCode">Image Code</Label>
          <Input
            id="imageCode"
            value={formData.imageCode}
            onChange={(e) => setFormData({ ...formData, imageCode: e.target.value })}
            required
          />
        </div>
      </div>

      <ChapterList
        chapters={formData.chapters || []}
        onChange={(chapters) => setFormData({ ...formData, chapters })}
      />

      <CustomFieldList
        fields={formData.customFields || []}
        onChange={(customFields) => setFormData({ ...formData, customFields })}
      />

      <Button type="submit" className="w-full">
        {course ? "Update Course" : "Add Course"}
      </Button>
    </form>
  );
}