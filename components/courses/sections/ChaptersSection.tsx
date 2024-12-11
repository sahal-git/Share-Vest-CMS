"use client";

import { Chapter } from "@/lib/types";
import { ChapterItem } from "./chapter/ChapterItem";
import { SectionHeader } from "./SectionHeader";

interface ChaptersSectionProps {
  chapters: Chapter[];
  onChange: (chapters: Chapter[]) => void;
}

export function ChaptersSection({ chapters, onChange }: ChaptersSectionProps) {
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
    onChange(chapters.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Chapters"
        buttonText="Add Chapter"
        onAdd={addChapter}
      />
      
      <div className="space-y-4">
        {chapters.map((chapter, index) => (
          <ChapterItem
            key={chapter.id}
            chapter={chapter}
            onUpdate={(field, value) => updateChapter(index, field, value)}
            onRemove={() => removeChapter(index)}
          />
        ))}
      </div>
    </div>
  );
}