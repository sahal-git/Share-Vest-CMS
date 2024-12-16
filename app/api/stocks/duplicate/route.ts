import { NextResponse } from 'next/server';
import { stocks } from '@/lib/stockData';

export async function POST(request: Request) {
  const { id } = await request.json();
  const stockToDuplicate = stocks.find(s => s.id === id);

  if (!stockToDuplicate) {
    return NextResponse.json(
      { success: false, message: "Stock not found" },
      { status: 404 }
    );
  }

  const duplicatedStock = {
    ...stockToDuplicate,
    id: Math.max(...stocks.map(s => s.id)) + 1,
    name: `${stockToDuplicate.name} (Copy)`,
    Share_Vest_Featured: false
  };

  stocks.push(duplicatedStock);

  return NextResponse.json({
    success: true,
    message: "Stock duplicated successfully",
    data: duplicatedStock
  });
} 