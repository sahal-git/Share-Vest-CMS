"use client";

import { Chapter } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, GripVertical } from "lucide-react";

interface ChapterItemProps {
  chapter: Chapter;
  onUpdate: (field: keyof Chapter, value: string) => void;
  onRemove: () => void;
}

export function ChapterItem({ chapter, onUpdate, onRemove }: ChapterItemProps) {
  return (
    <div className="flex gap-4 items-start bg-muted/50 p-4 rounded-lg group relative">
      <div className="flex items-center text-muted-foreground px-2">
        <GripVertical className="h-5 w-5" />
      </div>
      <div className="flex-1 space-y-3">
        <Input
          placeholder="Chapter Title"
          value={chapter.title}
          onChange={(e) => onUpdate("title", e.target.value)}
        />
        <Input
          placeholder="Video URL"
          value={chapter.videoUrl}
          onChange={(e) => onUpdate("videoUrl", e.target.value)}
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