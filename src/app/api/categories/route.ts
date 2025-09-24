import { NextResponse } from 'next/server';
import { ghlProducts } from '@/lib/ghl-products';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const result = await ghlProducts.getCategories();

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to fetch categories' },
        { status: 500 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Categories API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
