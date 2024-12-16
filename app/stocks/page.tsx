"use client";

import { useEffect, useState } from "react";
import { Stock } from "@/lib/types";
import { stockService } from "@/lib/services/stockService";
import { StockCard } from "@/components/stocks/StockCard";
import { StockDialog } from "@/components/stocks/StockDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { SearchIcon, Plus } from "lucide-react";
import { toast } from "sonner";

export default function StocksPage() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  const fetchStocks = async () => {
    try {
      setIsLoading(true);
      const data = await stockService.fetchAll();
      setStocks(data || []);
    } catch (error) {
      console.error("Failed to fetch stocks:", error);
      toast.error("Failed to fetch stocks");
      setStocks([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await stockService.delete(id);
      toast.success("Stock deleted successfully");
      fetchStocks();
    } catch (error) {
      console.error("Failed to delete stock:", error);
      toast.error("Failed to delete stock");
    }
  };

  const handleDuplicate = async (id: number) => {
    try {
      await stockService.duplicate(id);
      toast.success("Stock duplicated successfully");
      fetchStocks();
    } catch (error) {
      console.error("Failed to duplicate stock:", error);
      toast.error("Failed to duplicate stock");
    }
  };

  const handleSubmit = async (stock: Partial<Stock>) => {
    try {
      if (selectedStock) {
        await stockService.update(stock);
        toast.success("Stock updated successfully");
      } else {
        await stockService.create(stock);
        toast.success("Stock created successfully");
      }
      setIsDialogOpen(false);
      setSelectedStock(null);
      fetchStocks();
    } catch (error) {
      console.error("Failed to save stock:", error);
      toast.error("Failed to save stock");
    }
  };

  const handleEdit = (stock: Stock) => {
    setSelectedStock(stock);
    setIsDialogOpen(true);
  };

  const filteredStocks = stocks?.filter(stock => 
    stock.name.toLowerCase().includes(search.toLowerCase()) ||
    stock.full_name.toLowerCase().includes(search.toLowerCase()) ||
    stock.industry.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Halal Stocks</h1>
          <p className="text-muted-foreground">
            Browse Shariah-compliant stocks
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedStock(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Stock
            </Button>
          </DialogTrigger>
          <StockDialog
            isOpen={isDialogOpen}
            selectedStock={selectedStock}
            onSubmit={handleSubmit}
          />
        </Dialog>
      </div>

      <div className="relative mb-6">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search stocks..."
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStocks.map((stock) => (
            <StockCard 
              key={stock.id} 
              stock={stock}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDuplicate={handleDuplicate}
            />
          ))}
        </div>
      )}
    </div>
  );
} 