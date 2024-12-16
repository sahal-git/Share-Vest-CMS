import { NextResponse } from 'next/server';
import { stocks } from '@/lib/stockData';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Stocks retrieved successfully",
    data: stocks
  });
}

export async function POST(request: Request) {
  const stock = await request.json();
  stocks.push({ 
    ...stock, 
    id: Math.max(...stocks.map(s => s.id)) + 1
  });
  return NextResponse.json({
    success: true,
    message: "Stock created successfully",
    data: stocks
  });
}

export async function PUT(request: Request) {
  const stock = await request.json();
  const index = stocks.findIndex((s) => s.id === stock.id);
  
  if (index === -1) {
    return NextResponse.json(
      { success: false, message: "Stock not found" },
      { status: 404 }
    );
  }

  stocks[index] = { ...stocks[index], ...stock };
  
  return NextResponse.json({
    success: true,
    message: "Stock updated successfully",
    data: stocks[index]
  });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const index = stocks.findIndex((s) => s.id === id);
  
  if (index === -1) {
    return NextResponse.json(
      { success: false, message: "Stock not found" },
      { status: 404 }
    );
  }

  stocks.splice(index, 1);
  
  return NextResponse.json({
    success: true,
    message: "Stock deleted successfully"
  });
} 