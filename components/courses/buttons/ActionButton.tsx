"use client";

import { Button } from "@/components/ui/button";
import { SaveIcon, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionButtonProps {
  isEdit: boolean;
  className?: string;
}

export function ActionButton({ isEdit, className }: ActionButtonProps) {
  return (
    <div className="container mx-auto flex justify-between items-center">
      <h2 className="text-xl font-semibold">
        {isEdit ? "Edit Course" : "New Course"}
      </h2>
      <Button 
        type="submit" 
        size="lg"
        className={cn(
          "relative overflow-hidden group min-w-[200px]",
          "bg-primary hover:bg-primary/90",
          "transition-all duration-300 ease-out transform hover:scale-105",
          className
        )}
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
  );
}