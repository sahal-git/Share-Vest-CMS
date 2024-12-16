import { NextResponse } from 'next/server';
import { stocks } from '@/lib/stockData';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const stock = stocks.find(s => s.id === parseInt(params.id));
  
  if (!stock) {
    return NextResponse.json(
      { success: false, message: "Stock not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Stock retrieved successfully",
    data: stock
  });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const updatedStock = await request.json();
  const index = stocks.findIndex(s => s.id === parseInt(params.id));
  
  if (index === -1) {
    return NextResponse.json(
      { success: false, message: "Stock not found" },
      { status: 404 }
    );
  }

  stocks[index] = { ...stocks[index], ...updatedStock };
  
  return NextResponse.json({
    success: true,
    message: "Stock updated successfully",
    data: stocks[index]
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const index = stocks.findIndex(s => s.id === parseInt(params.id));
  
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