"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormField } from "@/components/ui/form";

export function BasicInfoTab() {
  const form = useFormContext();

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <div className="space-y-2">
              <Label htmlFor="name">Course Name</Label>
              <Input
                id="name"
                placeholder="Enter course name"
                {...field}
              />
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="Enter course category"
                {...field}
              />
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                placeholder="Enter image URL"
                {...field}
              />
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="imageCode"
          render={({ field }) => (
            <div className="space-y-2">
              <Label htmlFor="imageCode">Image Code</Label>
              <Input
                id="imageCode"
                placeholder="Enter image code"
                {...field}
              />
            </div>
          )}
        />
      </div>
    </div>
  );
}