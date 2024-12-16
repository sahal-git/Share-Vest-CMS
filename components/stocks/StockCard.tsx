import { Stock } from "@/lib/types";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Edit2, Copy, Trash2 } from "lucide-react";
import Link from "next/link";

interface StockCardProps {
  stock: Stock;
  onEdit: (stock: Stock) => void;
  onDelete: (id: number) => void;
  onDuplicate: (id: number) => void;
}

export function StockCard({ stock, onEdit, onDelete, onDuplicate }: StockCardProps) {
  const isPositive = stock.status.includes('+');

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{stock.name}</h3>
            <p className="text-sm text-muted-foreground">{stock.full_name}</p>
          </div>
          {stock.Share_Vest_Featured && (
            <Badge variant="secondary">Featured</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">₹{stock.price}</span>
            <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="text-sm">{stock.status}</span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Market Cap: {stock.financial_details.market_cap}</p>
            <p>Industry: {stock.industry}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onEdit(stock)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDuplicate(stock.id)}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="text-destructive"
          onClick={() => onDelete(stock.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
} 