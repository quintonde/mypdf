import { NextResponse } from 'next/server';

export async function POST(request) {
  return NextResponse.json({ 
    message: 'Client-side compression is active',
    note: 'All processing happens in browser for better performance'
  }, { status: 200 });
}