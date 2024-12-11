"use client";

import { CustomField } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

interface CustomFieldListProps {
  fields: CustomField[];
  onChange: (fields: CustomField[]) => void;
}

export function CustomFieldList({ fields, onChange }: CustomFieldListProps) {
  const addField = () => {
    const newField: CustomField = {
      key: "",
      value: ""
    };
    onChange([...fields, newField]);
  };

  const updateField = (index: number, field: keyof CustomField, value: string) => {
    const updatedFields = fields.map((f, i) => {
      if (i === index) {
        return { ...f, [field]: value };
      }
      return f;
    });
    onChange(updatedFields);
  };

  const removeField = (index: number) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    onChange(updatedFields);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Custom Fields</h3>
        <Button type="button" variant="outline" onClick={addField}>
          Add Field
        </Button>
      </div>
      
      {fields.map((field, index) => (
        <div key={index} className="flex gap-4 items-start">
          <div className="flex-1 space-y-2">
            <Input
              placeholder="Field Name"
              value={field.key}
              onChange={(e) => updateField(index, "key", e.target.value)}
            />
            <Input
              placeholder="Field Value"
              value={field.value}
              onChange={(e) => updateField(index, "value", e.target.value)}
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-destructive"
            onClick={() => removeField(index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}