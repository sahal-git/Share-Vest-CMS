"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CustomFieldItem } from "./custom-field/CustomFieldItem";

export function CustomFieldsTab() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "customFields"
  });

  const addField = () => {
    append({ key: "", value: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Custom Fields</h3>
        <Button 
          type="button" 
          variant="outline" 
          onClick={addField}
          className="gap-2"
        >
          Add Field
        </Button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <CustomFieldItem
            key={field.id}
            index={index}
            onRemove={() => remove(index)}
          />
        ))}
      </div>
    </div>
  );
}