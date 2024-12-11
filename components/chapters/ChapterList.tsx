"use client";

import { Chapter } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

interface ChapterListProps {
  chapters: Chapter[];
  onChange: (chapters: Chapter[]) => void;
}

export function ChapterList({ chapters, onChange }: ChapterListProps) {
  const addChapter = () => {
    const newChapter: Chapter = {
      id: chapters.length + 1,
      title: "",
      videoUrl: ""
    };
    onChange([...chapters, newChapter]);
  };

  const updateChapter = (index: number, field: keyof Chapter, value: string) => {
    const updatedChapters = chapters.map((chapter, i) => {
      if (i === index) {
        return { ...chapter, [field]: value };
      }
      return chapter;
    });
    onChange(updatedChapters);
  };

  const removeChapter = (index: number) => {
    const updatedChapters = chapters.filter((_, i) => i !== index);
    onChange(updatedChapters);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Chapters</h3>
        <Button type="button" variant="outline" onClick={addChapter}>
          Add Chapter
        </Button>
      </div>
      
      {chapters.map((chapter, index) => (
        <div key={chapter.id} className="flex gap-4 items-start">
          <div className="flex-1 space-y-2">
            <Input
              placeholder="Chapter Title"
              value={chapter.title}
              onChange={(e) => updateChapter(index, "title", e.target.value)}
            />
            <Input
              placeholder="Video URL"
              value={chapter.videoUrl}
              onChange={(e) => updateChapter(index, "videoUrl", e.target.value)}
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-destructive"
            onClick={() => removeChapter(index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}