"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ChapterItem } from "./chapter/ChapterItem";

export function ChaptersTab() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "chapters"
  });

  const addChapter = () => {
    append({ title: "", videoUrl: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Course Chapters</h3>
        <Button 
          type="button" 
          variant="outline" 
          onClick={addChapter}
          className="gap-2"
        >
          Add Chapter
        </Button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <ChapterItem
            key={field.id}
            index={index}
            onRemove={() => remove(index)}
          />
        ))}
      </div>
    </div>
  );
}