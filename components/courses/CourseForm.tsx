"use client";

import { useState } from "react";
import { Course } from "@/lib/types";
import { BasicInfoSection } from "@/components/courses/sections/BasicInfoSection";
import { ChaptersSection } from "@/components/courses/sections/ChaptersSection";
import { CustomFieldsSection } from "@/components/courses/sections/CustomFieldsSection";
import { ActionButton } from "@/components/courses/buttons/ActionButton";
import { Card } from "@/components/ui/card";

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

  const updateFormData = (data: Partial<Course>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="sticky top-0 z-50 -mt-6 pt-6 pb-4 bg-background/80 backdrop-blur-sm border-b">
        <ActionButton isEdit={!!course} />
      </div>

      <div className="space-y-6 mt-6">
        <Card className="p-6">
          <BasicInfoSection
            data={formData}
            onChange={updateFormData}
          />
        </Card>

        <Card className="p-6">
          <ChaptersSection
            chapters={formData.chapters || []}
            onChange={chapters => updateFormData({ chapters })}
          />
        </Card>

        <Card className="p-6">
          <CustomFieldsSection
            fields={formData.customFields || []}
            onChange={customFields => updateFormData({ customFields })}
          />
        </Card>
      </div>
    </form>
  );
}