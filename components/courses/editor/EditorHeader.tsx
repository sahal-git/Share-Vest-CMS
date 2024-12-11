"use client";

import { Button } from "@/components/ui/button";
import { SaveIcon, PlusCircle } from "lucide-react";

interface EditorHeaderProps {
  isEdit: boolean;
}

export function EditorHeader({ isEdit }: EditorHeaderProps) {
  return (
    <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b pb-4">
      <div className="container mx-auto flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          {isEdit ? "Edit Course" : "New Course"}
        </h2>
        <Button 
          type="submit"
          size="lg"
          className="relative overflow-hidden group min-w-[200px] bg-primary hover:bg-primary/90"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary-foreground/5 to-primary/0 
                        group-hover:translate-x-full transition-transform duration-1000 ease-out" />
          <div className="flex items-center justify-center gap-2">
            {isEdit ? (
              <SaveIcon className="h-5 w-5" />
            ) : (
              <PlusCircle className="h-5 w-5" />
            )}
            <span className="font-medium">
              {isEdit ? "Save Changes" : "Create Course"}
            </span>
          </div>
        </Button>
      </div>
    </div>
  );
}