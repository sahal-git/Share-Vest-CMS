import { NextResponse } from 'next/server';
import { stocks } from '@/lib/data';

export async function POST(request: Request) {
  const { id } = await request.json();
  const stock = stocks.find((s) => s.id === id);
  
  if (!stock) {
    return NextResponse.json({ error: "Stock not found" }, { status: 404 });
  }

  const newStock = {
    ...stock,
    id: Math.max(...stocks.map(s => s.id)) + 1,
    name: `${stock.name} (Copy)`,
    full_name: `${stock.full_name} (Copy)`,
    Share_Vest_Featured: false
  };

  stocks.push(newStock);
  return NextResponse.json(stocks);
} 