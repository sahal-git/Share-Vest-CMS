"use client";

import { CustomField } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

interface CustomFieldItemProps {
  field: CustomField;
  onUpdate: (field: keyof CustomField, value: string) => void;
  onRemove: () => void;
}

export function CustomFieldItem({ field, onUpdate, onRemove }: CustomFieldItemProps) {
  return (
    <div className="flex gap-4 items-start bg-muted/50 p-4 rounded-lg group">
      <div className="flex-1 space-y-3">
        <Input
          placeholder="Field Name"
          value={field.key}
          onChange={(e) => onUpdate("key", e.target.value)}
        />
        <Input
          placeholder="Field Value"
          value={field.value}
          onChange={(e) => onUpdate("value", e.target.value)}
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