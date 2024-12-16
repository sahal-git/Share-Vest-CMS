import { NextResponse } from 'next/server';
import { stocks } from '@/lib/data';

export async function GET() {
  return NextResponse.json(stocks);
}

export async function POST(request: Request) {
  const stock = await request.json();
  stocks.push({ 
    ...stock, 
    id: Math.max(...stocks.map(s => s.id)) + 1,
    Share_Vest_Featured: false 
  });
  return NextResponse.json(stocks);
}

export async function PUT(request: Request) {
  const stock = await request.json();
  const index = stocks.findIndex((s) => s.id === stock.id);
  if (index > -1) {
    stocks[index] = { ...stocks[index], ...stock };
  }
  return NextResponse.json(stocks);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const index = stocks.findIndex((s) => s.id === id);
  if (index > -1) {
    stocks.splice(index, 1);
  }
  return NextResponse.json(stocks);
} 