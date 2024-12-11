"use client";

import { CustomField } from "@/lib/types";
import { CustomFieldItem } from "./custom-field/CustomFieldItem";
import { SectionHeader } from "./SectionHeader";

interface CustomFieldsSectionProps {
  fields: CustomField[];
  onChange: (fields: CustomField[]) => void;
}

export function CustomFieldsSection({ fields, onChange }: CustomFieldsSectionProps) {
  const addField = () => {
    onChange([...fields, { key: "", value: "" }]);
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
    onChange(fields.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Custom Fields"
        buttonText="Add Field"
        onAdd={addField}
      />
      
      <div className="space-y-4">
        {fields.map((field, index) => (
          <CustomFieldItem
            key={index}
            field={field}
            onUpdate={(field, value) => updateField(index, field, value)}
            onRemove={() => removeField(index)}
          />
        ))}
      </div>
    </div>
  );
}