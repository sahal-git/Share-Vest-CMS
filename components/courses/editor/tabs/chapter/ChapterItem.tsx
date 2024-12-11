"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, GripVertical } from "lucide-react";
import { FormField } from "@/components/ui/form";

interface ChapterItemProps {
  index: number;
  onRemove: () => void;
}

export function ChapterItem({ index, onRemove }: ChapterItemProps) {
  const { control } = useFormContext();

  return (
    <div className="flex gap-4 items-start bg-muted/50 p-4 rounded-lg group relative">
      <div className="flex items-center text-muted-foreground px-2">
        <GripVertical className="h-5 w-5" />
      </div>
      
      <div className="flex-1 space-y-3">
        <FormField
          control={control}
          name={`chapters.${index}.title`}
          render={({ field }) => (
            <Input
              placeholder="Chapter Title"
              {...field}
            />
          )}
        />

        <FormField
          control={control}
          name={`chapters.${index}.videoUrl`}
          render={({ field }) => (
            <Input
              placeholder="Video URL"
              {...field}
            />
          )}
        />
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={onRemove}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}