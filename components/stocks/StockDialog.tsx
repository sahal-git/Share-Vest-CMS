"use client";

import { Stock } from "@/lib/types";
import { StockForm } from "@/components/stocks/StockForm";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface StockDialogProps {
  isOpen: boolean;
  selectedStock: Stock | null;
  onSubmit: (stock: Partial<Stock>) => Promise<void>;
}

export function StockDialog({ isOpen, selectedStock, onSubmit }: StockDialogProps) {
  if (!isOpen) return null;

  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>
          {selectedStock ? "Edit Stock" : "Add New Stock"}
        </DialogTitle>
      </DialogHeader>
      <StockForm
        stock={selectedStock || undefined}
        onSubmit={onSubmit}
      />
    </DialogContent>
  );
} 