"use client";

import { Button } from "@/components/ui/button";

interface SectionHeaderProps {
  title: string;
  buttonText: string;
  onAdd: () => void;
}

export function SectionHeader({ title, buttonText, onAdd }: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <Button type="button" variant="outline" onClick={onAdd}>
        {buttonText}
      </Button>
    </div>
  );
}