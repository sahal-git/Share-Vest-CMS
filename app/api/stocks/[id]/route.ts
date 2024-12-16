import { NextResponse } from 'next/server';
import { stocks } from '@/lib/data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const stock = stocks.find(s => s.id === parseInt(params.id));
  
  if (!stock) {
    return NextResponse.json(
      { error: "Stock not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(stock);
} 