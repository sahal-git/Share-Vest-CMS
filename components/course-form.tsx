"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { Course } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChapterList } from "@/components/chapters/ChapterList";
import { CustomFieldList } from "@/components/custom-fields/CustomFieldList";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

interface CourseFormProps {
  course?: Course;
  onSubmit: (course: Partial<Course>) => void;
  onOpenChange: (open: boolean) => void;
}

export function CourseForm({ course, onSubmit, onOpenChange }: CourseFormProps) {
  const [formData, setFormData] = useState<Partial<Course>>(course || {
    id: Date.now(),
    name: "",
    category: "",
    imageCode: "",
    imageUrl: "",
    chapters: [],
    customFields: []
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Course Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter course name"
                    required
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="Enter category"
                    required
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">Course Media</h3>
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input
                      id="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      placeholder="Enter image URL"
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="imageCode">Image Code</Label>
                    <Input
                      id="imageCode"
                      value={formData.imageCode}
                      onChange={handleInputChange}
                      placeholder="Enter image code"
                      required
                      className="w-full"
                    />
                  </div>
                </div>
                {formData.imageUrl && (
                  <div className="relative h-48 rounded-lg overflow-hidden border">
                    <Image
                      src={formData.imageUrl}
                      alt="Course preview"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
              </div>
            </div>

            <Separator />

            <div>
              <ChapterList
                chapters={formData.chapters || []}
                onChange={(chapters) => setFormData({ ...formData, chapters })}
              />
            </div>

            <Separator />

            <div>
              <CustomFieldList
                fields={formData.customFields || []}
                onChange={(customFields) => setFormData({ ...formData, customFields })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="sticky bottom-0 flex justify-end gap-4 pt-4 bg-background border-t">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>
        <Button type="submit">
          {course ? "Save Changes" : "Create Course"}
        </Button>
      </div>
    </form>
  );
}