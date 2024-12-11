"use client";

import { Course } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BasicInfoSectionProps {
  data: Partial<Course>;
  onChange: (data: Partial<Course>) => void;
}

export function BasicInfoSection({ data, onChange }: BasicInfoSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Basic Information</h3>
      
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Course Name</Label>
          <Input
            id="name"
            value={data.name || ""}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="Enter course name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={data.category || ""}
            onChange={(e) => onChange({ category: e.target.value })}
            placeholder="Enter course category"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            value={data.imageUrl || ""}
            onChange={(e) => onChange({ imageUrl: e.target.value })}
            placeholder="Enter image URL"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="imageCode">Image Code</Label>
          <Input
            id="imageCode"
            value={data.imageCode || ""}
            onChange={(e) => onChange({ imageCode: e.target.value })}
            placeholder="Enter image code"
            required
          />
        </div>
      </div>
    </div>
  );
}