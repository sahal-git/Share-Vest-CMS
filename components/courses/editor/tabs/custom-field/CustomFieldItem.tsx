"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { FormField } from "@/components/ui/form";

interface CustomFieldItemProps {
  index: number;
  onRemove: () => void;
}

export function CustomFieldItem({ index, onRemove }: CustomFieldItemProps) {
  const { control } = useFormContext();

  return (
    <div className="flex gap-4 items-start bg-muted/50 p-4 rounded-lg group">
      <div className="flex-1 space-y-3">
        <FormField
          control={control}
          name={`customFields.${index}.key`}
          render={({ field }) => (
            <Input
              placeholder="Field Name"
              {...field}
            />
          )}
        />

        <FormField
          control={control}
          name={`customFields.${index}.value`}
          render={({ field }) => (
            <Input
              placeholder="Field Value"
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